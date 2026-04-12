import CommonDialog from "../../../Common/Dialog/CommonDialog";
import { ReactComponent as LinkIcon } from "../../../assets/SVG/link.svg?react";
import { ReactComponent as ShareIcon } from "../../../assets/SVG/share.svg?react";
import PrimaryButton from "../../../Common/Button/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import steeringWheel from "../../../assets/images/steering-wheel.png";
import logo from "../../../assets/images/Logo.png";

const QRDialog = ({ showQrDialog, setShowQrDialog, user }) => {
  const businessUrl = `https://manzil-drive.vercel.app/viewAll/${user?.business?._id}`;
  const handleDownloadPDF = async () => {
    try {
      // Use online URLs for images
      const logoUrl = "https://manzil-drive.vercel.app/Logo.png";
      const steeringWheelUrl =
        typeof steeringWheel === "string"
          ? steeringWheel
          : URL.createObjectURL(steeringWheel);

      // Create a temporary div for PDF content
      const pdfContent = document.createElement("div");
      pdfContent.style.position = "absolute";
      pdfContent.style.left = "-9999px";
      pdfContent.style.width = "600px";
      pdfContent.style.minHeight = "800px";
      pdfContent.style.fontFamily = "Arial, sans-serif";
      pdfContent.style.backgroundColor = "white";

      // Add content to the temporary div
      pdfContent.innerHTML = `
        <div style="display: flex; flex-direction: column; width: 100%; align-items: center; justify-content: flex-start; background-color: white; padding: 0px;">
          <div style="display: flex; width: 100%; justify-content: center; gap: 8px; margin-top: 24px; align-items: center; height: 40px;">
               <img
                src="${logoUrl}"
                alt="Logo"
                style="width: 40px; max-height: 40px; object-fit: contain; margin-top: 24px;"
              />
            <h1 style="color: #00796B; font-weight: bold; font-size: 24px; margin: 0; display: flex; align-items: center; height: 40px;">Manzil Drive</h1>
          </div>
          <div style="margin-top: 32px; display: flex; flex-direction: column; align-items: center; gap: 4px;">
            <h2 style="color: #394543; font-weight: 800; font-size: 24px; margin: 0;">
              ${user?.business?.shopName || "Business Name"}
            </h2>
            <p style="color: #394543; font-weight: 400; font-size: 24px; margin: 0;">
              SCAN To view car list
            </p>
            <p style="color: #000000; font-weight: 400; font-size: 24px; margin: 0;">
              ہماری کار کی فہرست دیکھیں
            </p>
          </div>
          <div style="position: relative; background-color: #00796B; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; min-height: 500px; margin-top: 16px;">
            <img src="${steeringWheelUrl}" alt="" style="width: 100%; height: auto; opacity: 0.3; position: absolute;" />
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 360px; position: relative; z-index: 1;">
              <img
                src="${user?.business?.qrCode}"
                alt="QR Code"
                style="width: 300px; height: 300px; margin: auto; border-radius: 6px; background-color: white; padding: 10px;"
                id="qr-code-img"
              />
              <div style="background-color: white; width: 300px; border-radius: 4px; margin-top: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h3 style="color: #394543; font-weight: 400; font-size: 32px; line-height: 0; padding: 16px 12px;">
                  ${user?.business?.name || "Business Name"}
                </h3>
                <p style="font-weight: bold; color: #394543; font-size: 32px; padding: 0px 12px 16px 12px;">
                  +92 ${user?.business?.phoneNumber || "N/A"}
                </p>
              </div>
            </div>
          </div>
         
        </div>
      `;

      document.body.appendChild(pdfContent);

      // Wait for images to load
      const images = pdfContent.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }),
      );

      // Generate canvas from the content
      const canvas = await html2canvas(pdfContent, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
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
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.85;
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      // Add the canvas content to PDF
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio,
      );

      // Save the PDF
      pdf.save(`${user?.business?.name || "business"}_profile_qr.pdf`);

      // Clean up
      document.body.removeChild(pdfContent);

      // Clean up object URLs if created
      if (logoUrl !== logo) URL.revokeObjectURL(logoUrl);
      if (steeringWheelUrl !== steeringWheel)
        URL.revokeObjectURL(steeringWheelUrl);
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

  console.log({ user });

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
              onClick={handleDownloadPDF}
            />
          </div>
        </div>
      </CommonDialog>
    </div>
  );
};

export default QRDialog;
