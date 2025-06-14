
import React from "react";
import { Button } from "@/components/ui/button";

interface ExportCareersModalProps {
  open: boolean;
  onClose: () => void;
  onExport: () => void;
}

export function ExportCareersModal({ open, onClose, onExport }: ExportCareersModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-2">Export Careers Data</h3>
        <p className="text-sm text-gray-500 mb-4">
          Download the selected careers as a CSV file for further analysis or reporting.
        </p>
        <Button
          onClick={() => {
            onExport();
            onClose();
          }}
          className="w-full mb-2"
        >
          Download CSV
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
