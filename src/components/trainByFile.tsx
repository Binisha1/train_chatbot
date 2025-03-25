import { useCallback } from "react";

import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Upload, File, AlertCircle, Trash2Icon } from "lucide-react";
import { useState } from "react";
import useAppStore from "@/store/zustand";

const TrainByFile = () => {
  return (
    <main className="container  py-10 space-y-8">
      <div>
        <div>
          <h2 className="text-lg font-medium mb-2">Upload File</h2>
          <FileInput accept=".pdf,.doc,.docx,.txt" />
        </div>
      </div>
    </main>
  );
};

export default TrainByFile;

interface FileInputProps {
  disabled?: boolean;
  accept?: string;
  maxSize?: number;
  className?: string;
}

export function FileInput({
  disabled = false,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  className,
}: FileInputProps) {
  const { files, addFiles, removeFile } = useAppStore();
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const rejectionErrors = rejectedFiles[0].errors
          .map((err: any) => err.message)
          .join(", ");
        setError(rejectionErrors);
        return;
      }

      setError(null);
      addFiles(acceptedFiles);

      if (acceptedFiles.length > 0) {
        simulateUpload();
      }
    },
    [addFiles]
  );

  const simulateUpload = () => {
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploading(false), 100);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    accept: accept ? { [accept]: [] } : undefined,
    maxSize,
    multiple: true,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className="space-y-4, w-3/5">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <Input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <Upload
            className={cn(
              "h-10 w-10",
              isDragActive ? "text-primary" : "text-muted-foreground"
            )}
          />
          <h3 className="text-lg font-medium">
            {isDragActive ? "Drop files here" : "Drag & drop files here"}
          </h3>
          <p className="text-sm text-text-secondary">
            or click to browse files
          </p>
          {!isDragActive && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="mt-2"
              disabled={disabled}
            >
              Select files
            </Button>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            (.pdf, .doc, .docx, .txt){" "}
            {maxSize && ` (Max size: ${formatFileSize(maxSize)})`}
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <File className="h-5 w-5 flex-shrink-0 text-primary" />
                <div className="min-w-0 overflow-hidden">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-text-red brightness-200 hover:-skew-y-2"
                onClick={() => removeFile(index)}
                disabled={disabled}
              >
                <Trash2Icon className="h-4 w-4 hover:-skew-y-12" />
                <span className="sr-only">Remove file</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
