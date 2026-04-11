import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const generateReport= async (element) => {
  const page= document.getElementById(element);
  if (!page){
    throw new Error ("Page doesn't exist");
  }
  const canvas= await html2canvas (page, {
    scale: 1,
    useCors: true,
    allowTaint: true,
    scrollX: 0,
    scrollY: 0,
    windowWidth: page.scrollWidth,
    windowHeight: page.scrollHeight,
    width: page.scrollWidth,
    height: page.scrollHeight,
    backgroundColor: "#F7FFFF",
  });
  const data= canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [129, 70],
  });

  const properties=pdf.getImageProperties(data);
  const pdfWidth=pdf.internal.pageSize.getWidth();
  const pdfHeight=(properties.height * pdfWidth) / properties.width;
  pdf.addImage(data, "PNG", 0,0, pdfWidth, pdfHeight);
  pdf.save("report.pdf");
}
