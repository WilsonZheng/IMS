using System.IO;


/*
using (var stream = new StreamReader(Server.MapPath("~/Views/Home/Generate1.cshtml")))
{
    var html = Media.DocGenerator.Html(Convert.ToString(stream.ReadToEnd()), new GenerateViewModel { Name = "Home" });
    Media.DocGenerator.Pdf(html, "C:\\Users\\jeong\\testtest.pdf");
}
*/

namespace IMS.Media
{
    public class DocGenerator
    {
        public static string Html(string template,object model)
        {
            var razor = RazorTemplates.Core.Template.Compile(template);
            return razor.Render(model);
        }
        
        public static void Pdf(string htmlDocument,string pdfPath)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                var pdf = TheArtOfDev.HtmlRenderer.PdfSharp.PdfGenerator.GeneratePdf(htmlDocument,PdfSharp.PageSize.A4);
                pdf.Save(ms);
                using (FileStream stream = new FileStream(pdfPath, FileMode.Create))
                {
                    using (BinaryWriter writer = new BinaryWriter(stream))
                    {
                        writer.Write(ms.ToArray());
                        writer.Close();
                    }
                }
            }
        }
    }
}