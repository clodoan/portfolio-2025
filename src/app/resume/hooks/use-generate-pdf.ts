import { useState } from "react";
import { pdf, type DocumentProps, Font } from "@react-pdf/renderer";

// Register Inter font
Font.register({
  family: "Inter",
  src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
});

// Fallback to Helvetica if Inter fails
Font.register({
  family: "Helvetica",
  src: "Helvetica",
});

interface UseGeneratePDFOptions {
  filename?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface UseGeneratePDFReturn {
  isGenerating: boolean;
  generatePDF: (component: React.ReactElement) => Promise<void>;
}

export const useGeneratePDF = (
  options: UseGeneratePDFOptions = {}
): UseGeneratePDFReturn => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { filename = "document.pdf", onSuccess, onError } = options;

  const generatePDF = async (component: React.ReactElement): Promise<void> => {
    setIsGenerating(true);
    try {
      const blob = await pdf(
        component as React.ReactElement<DocumentProps>
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      onSuccess?.();
    } catch (error) {
      console.error("Error generating PDF:", error);
      onError?.(error as Error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generatePDF,
  };
};
