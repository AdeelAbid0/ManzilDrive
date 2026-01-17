import CommonDialog from "../../../Common/Dialog/CommonDialog";
import { ReactComponent as LinkIcon } from "../../../assets/SVG/link.svg?react";
import { ReactComponent as ShareIcon } from "../../../assets/SVG/share.svg?react";
import PrimaryButton from "../../../Common/Button/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const QRDialog = ({ showQrDialog, setShowQrDialog, user }) => {
  const BASE_URL_IMG = process.env.REACT_APP_IMG_URL;
  const businessUrl = `${BASE_URL_IMG}/business/${user?.business?._id}`;

  const handleDownloadPDF = async () => {
    try {
      // Create a temporary div for PDF content
      const pdfContent = document.createElement("div");
      pdfContent.style.position = "absolute";
      pdfContent.style.left = "-9999px";
      pdfContent.style.width = "400px";
      pdfContent.style.padding = "20px";
      pdfContent.style.fontFamily = "Arial, sans-serif";
      pdfContent.style.backgroundColor = "white";

      // Add content to the temporary div
      pdfContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #394C49; font-size: 24px; font-weight: bold; margin-bottom: 10px;">
            ${user?.business?.name || "My Business"} Profile
          </h1>
          <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
            Scan this QR code or visit the link below to view the business profile
          </p>
        </div>
        
        <div style="text-align: center; margin-bottom: 20px;">
          <img 
            src="${user?.business?.qrCode}" 
            alt="QR Code" 
            style="width: 200px; height: 200px; border: 1px solid #ccc; padding: 10px; margin: 0 auto;"
            id="qr-code-img"
          />
        </div>
        
        <div style="text-align: center;">
          <p style="color: #3E464C; font-size: 16px; font-weight: bold; margin-bottom: 10px;">
            Business Profile Link:
          </p>
          <p style="color: #00796B; font-size: 14px; word-break: break-all; padding: 10px; border: 1px dashed #00796B; background-color: #f7f7f7;">
            ${businessUrl}
          </p>
        </div>
        
        <div style="margin-top: 20px; text-align: center; color: #888; font-size: 12px;">
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
      `;

      document.body.appendChild(pdfContent);

      // Wait for the QR code image to load
      const qrImg = pdfContent.querySelector("#qr-code-img");
      if (qrImg) {
        await new Promise((resolve) => {
          qrImg.onload = resolve;
          if (qrImg.complete) resolve();
        });
      }

      // Generate canvas from the content
      const canvas = await html2canvas(pdfContent, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      // Create PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate dimensions to fit the content
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.85; // Reduced ratio for better fit
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      // Add only the canvas content (which includes everything)
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      // Save the PDF
      pdf.save(`${user?.business?.name || "business"}_profile_qr.pdf`);

      // Clean up
      document.body.removeChild(pdfContent);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to download PDF. Please try again.");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(businessUrl);
      alert("Link copied to clipboard!");
    } catch (error) {
      alert("Failed to copy link. Please try again.");
    }
  };

  return (
    <div>
      <CommonDialog
        open={showQrDialog}
        onClose={() => {
          setShowQrDialog(false);
        }}
        className="md:max-w-[360px] !w-full md:px-0 px-4"
      >
        <div className="flex flex-col gap-6 w-full items-center p-10 ">
          <div className="flex w-full flex-col gap-3 items-center">
            <h1 className="!font-bold !text-[#394C49] text-2xl ">
              Share your shop
            </h1>
            <p className="text-center">
              Share your shop in seconds. Scan this QR code to view your profile
              instantly.
            </p>
          </div>

          <div className="flex w-full justify-between items-center p-4 border border-[#00796B] rounded bg-[#F7F7F7]">
            <div className="flex items-center gap-2 text-[#3E464C] font-medium text-sm min-w-0 overflow-hidden">
              <span>
                <LinkIcon />
              </span>
              <p className="truncate pr-2">{businessUrl}</p>
            </div>

            <button
              onClick={handleCopyLink}
              className="flex-shrink-0 hover:opacity-80 transition-opacity focus:outline-none"
              title="Copy link to clipboard"
              type="button"
            >
              <ShareIcon />
            </button>
          </div>

          <div className="w-full">
            <img
              src={user?.business?.qrCode}
              alt="QR Code"
              className="w-full rounded-lg border-[0.5px] border-[#3E464C]"
            />
          </div>

          <div className="flex w-full">
            <PrimaryButton
              label={"Download PDF"}
              className={"flex !w-full"}
              onClick={handleDownloadPDF} // Changed from handleClick to onClick
            />
          </div>
        </div>
      </CommonDialog>
    </div>
  );
};

export default QRDialog;
