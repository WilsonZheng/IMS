using IMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Text;
using System.Web;
using System.Web.Mvc;
using IMS.ViewModels;
using Microsoft.AspNet.Identity;
using IMS.Common;
using System.Net;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;

namespace IMS.Controllers
{
    public class RegistrationController : Controller
    {
        // GET: Contract
        public ActionResult Index(string InvitationCode)
        {
            using(var db = new ApplicationDbContext())
            {


                try
                {
                    var invitation = db.Invitations.Where(x => x.InvitationCode == InvitationCode && x.RecruitStatusType.Code == (int)RecruitStatusCode.InvitationSent).Single();
                    ApplicantInfo model = new ApplicantInfo();
                    model.Invitation = invitation;
                    model.Email = invitation.Email;
                    model.TemplateId = invitation.TemplateId;
                    model.InvitationCode = InvitationCode;
                    return View(model);
                }
                catch(Exception e) {

                    return View("InvitationCodeNotExistOrAlreadyUsed");
                }


                
                

            }
            
            
        }

        
        [HttpPost]
        public ActionResult Index(ApplicantInfo model)
        {
            using (var db = new ApplicationDbContext())
            {


                try
                {
                    var invitation = db.Invitations.Where(x => x.InvitationCode == model.InvitationCode && x.RecruitStatusType.Code == (int)RecruitStatusCode.InvitationSent).Single();
                    return View(model);
                }
                catch (Exception e)
                {

                    return View("InvitationCodeNotExistOrAlreadyUsed");
                }





            }


        }
        //[HttpPost]
        //public ActionResult FileUpload(HttpPostedFileBase file)
        //{
        //    if (file != null && file.ContentLength > 0)
        //        try
        //        {
        //            string path = Path.Combine(Server.MapPath("~/uploaded_files"),
        //            Path.GetFileName(file.FileName));
        //            file.SaveAs(@"d:\visa.pdf");
        //            ViewBag.Message = "File uploaded successfully";
        //        }
        //        catch (Exception ex)
        //        {
        //            ViewBag.Message = "ERROR:" + ex.Message.ToString();
        //        }
        //    else
        //    {
        //        ViewBag.Message = "You have not specified a file.";
        //    }
        //    return View("Index");
        //}

        [HttpPost]
        public ActionResult AddApplicant(ApplicantInfo model)
        {
            //get binary data of input signature
            string theSource = model.SignImgData.Replace("data:image/png;base64,", "");
            var binData = Convert.FromBase64String(theSource);
            model.SignBinData = binData;

            //store ApplicantInfo view model data into Applicant entity
            using (var db = new ApplicationDbContext())
            {
                var orgid = db.Invitations.Include(x => x.EmailTemplate).Where(x => x.TemplateId == model.TemplateId && x.Email == model.Email).Single().EmailTemplate.OrgId;
                var m = new Applicant
                {
                    TemplateId = model.TemplateId,
                    Invitation = model.Invitation,
                    Firstname = model.Firstname,
                    Lastname = model.Lastname,
                    Mobile = model.Mobile,
                    MedicalCondition = model.MedicalCondition,
                    Address = model.Address + ", " + model.Suburb,
                    Email = model.Email,
                    VisaStatus = model.VisaStatus,
                    IsActive = true,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                    ApplicationDt = DateTime.Now,

                    OrgId = orgid
                    

                };
                var errorMessage = "";



                //Set where the files stored
                var storePath = IMSEnvProperties.ContractFileLocation;
                var contractPath = storePath + "\\"+model.TemplateId+"_"+model.Email+"_Contract.pdf";
                var signPath = storePath + "\\"+model.TemplateId + "_" + model.Email + "_sign.png";
                model.SignPath = signPath;// to make template where signature file stored


                try
                {
                    

                    //get contract template
                    var template = db.Templates.Where(x => x.TemplateType.Code == (int)TemplateTypeCode.Contract && x.IsActive).OrderByDescending(x => x.Id).First();
                    var content = Encoding.UTF8.GetString(template.Content);
                    //merge contract template and data into html(it contains the source path of signature
                    var html = IMS.Media.DocGenerator.Html(content, model);
                    //generate the signature image 
                    System.IO.File.WriteAllBytes(model.SignPath, model.SignBinData);
                    //write pdf from above merged html
                    IMS.Media.DocGenerator.Pdf(html, contractPath);
                    //merge contract.pdf with passport.pdf
                    MergeTwoPDF(contractPath,model.PassportFileLocation,model);
                    //add the applicant to database
                    db.Applicants.Add(m);

                    //update recruit status to Replied
                    var statusReplied = db.RecruitStatusType.Where(x => x.Code == (int)RecruitStatusCode.ContractReceived).Single();
                    var invitation = db.Invitations.Where(x => x.InvitationCode == model.InvitationCode && x.RecruitStatusType.Code == (int)RecruitStatusCode.InvitationSent).Single();
                    invitation.RecruitStatusType = statusReplied;


                    //delete the generated img of signature
                   
                    System.IO.File.Delete(model.SignPath);
                    System.IO.File.Delete(contractPath);
                    System.IO.File.Delete(model.PassportFileLocation);

                    //save all changes to database
                    db.SaveChanges();

                }
                catch (Exception e)
                {
                    if (System.IO.File.Exists(model.SignPath))
                    {
                        System.IO.File.Delete(model.SignPath);
                    }
                    if (System.IO.File.Exists(contractPath))
                    {
                        System.IO.File.Delete(contractPath);
                    }
                    errorMessage = e.ToString();
                }

                if (string.IsNullOrEmpty(errorMessage))
                {
                    int successRegistered = 1;
                    return Json(new { Result = successRegistered } );
                }
                else {
                    ViewBag.ErrorMessage = errorMessage;
                    int failRegistered = 0;
                    Console.Write(errorMessage);
                    return Json(new {Result=failRegistered});
                }

               
      
                
                //ReadPdfFile(); // This line will show the generated pdf but currently not in use
                
                
            }
      
            
        }

        public void MergeTwoPDF(string file1Loc,string file2Loc,ApplicantInfo model)
        {
            String[] source_files = { file1Loc, file2Loc };
            var storePath = IMSEnvProperties.ContractFileLocation;
            String result = storePath+"\\"+model.TemplateId+"_"+model.Email+"_Contract_Passport.pdf";
            //create Document object
            Document document = new Document();
            //create PdfCopy object
            var fs = new FileStream(result, FileMode.Create);
            PdfCopy copy = new PdfCopy(document, fs);
            //open the document
            document.Open();
            //PdfReader variable
            PdfReader reader;
            for (int i = 0; i < source_files.Length; i++)
            {
                //create PdfReader object
                reader = new PdfReader(source_files[i]);
                //merge combine pages
                for (int page = 1; page <= reader.NumberOfPages; page++)
                {
                    copy.AddPage(copy.GetImportedPage(reader, page));
                    
                }
                reader.Close();

            }

            //close the document object
            
            document.Close();
            fs.Close();
        }

        // Method for display pdf, currently not in use.
        //public void ReadPdfFile()
        //{
        //    string path = @"d:\test.pdf";
        //    WebClient client = new WebClient();
        //    Byte[] buffer = client.DownloadData(path);

        //    if (buffer != null)
        //    {
        //        Response.ContentType = "application/pdf";
        //        Response.AddHeader("content-length", buffer.Length.ToString());
        //        Response.BinaryWrite(buffer);
        //    }

        //}
        public ActionResult ShowSampleContract()
        {
            return View();
        }

        public ActionResult AddApplicantSuccess()
        {
            return View();
        }



        [HttpPost]
        public ActionResult GetSign(ApplicantInfo model, HttpPostedFileBase file)
        {

            if (file != null && file.ContentLength > 0)
            {
                var storePath = IMSEnvProperties.ContractFileLocation;
                var temp = Path.GetFileName(file.FileName);
                var fileName = "" + model.TemplateId + "_" + model.Email + "_" + temp;
                var path = Path.Combine(storePath, fileName);
                try
                {
                    
                    file.SaveAs(path);
                    model.PassportFileLocation = path;
                    
                    
                }
                catch (Exception ex)
                {
                    if (System.IO.File.Exists(path))
                    {
                        System.IO.File.Delete(path);
                    }
                    ViewBag.Message = "ERROR:" + ex.Message.ToString();
                }
            }
                
            else
            {
                ViewBag.Message = "You have not specified a file.";
                return View("NullFile");
            }

            return View(model);
        }





        //When user close the window during signing page, delete the existing uploaded file.
        [HttpPost]
        public void DeleteUploadedFile(ApplicantInfo model)
        {
            if (System.IO.File.Exists(model.PassportFileLocation))
            {
                System.IO.File.Delete(model.PassportFileLocation);
            }
        }

       
    }
    
}