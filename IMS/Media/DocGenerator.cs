using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.tool.xml;
using System.IO;

namespace IMS.Media
{
    public class DocGenerator
    {
        public static string Html(string template,object model)
        {
            var razor = RazorTemplates.Core.Template.Compile(template);
            return razor.Render(model);
        }
        
        public static void Pdf(string pHTML,string pdfPath)
        {
            Document document = new Document();
            PdfWriter writer = PdfWriter.GetInstance(document,new  FileStream(pdfPath,FileMode.Create));
            document.Open();
            XMLWorkerHelper.GetInstance().ParseXHtml(writer, document, new StringReader(pHTML));
            document.Close();
        }
    }
}