import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  FileIcon,
  FileText,
  Trash2,
  Upload,
  FileArchive,
  FileImage,
  FileCode,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import useAppStore from "@/store/zustand";

const MAX_FILES = 20;

const TrainByFile = () => {
  const { files } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 ">
        <Card className="border-none ">
          <CardHeader className="pb-3">
            <CardTitle>Upload Files</CardTitle>
            <CardDescription className="text-text-secondary">
              Upload documents to train your chatbot with custom knowledge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileInput accept=".pdf,.doc,.docx,.txt" />
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="">
          <CardTitle>Training Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <FileQueue />
        </CardContent>
        <CardFooter className="border-t flex justify-between">
          <div className="text-sm ">
            {files.length > 0
              ? `${files.length} file${
                  files.length !== 1 ? "s" : ""
                } ready for training`
              : "No files selected"}
          </div>
          <Button
            className="bg-button text-text-black"
            disabled={files.length === 0}
          >
            Start Training
          </Button>
        </CardFooter>
      </Card>
    </div>
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

      // Check if adding these files would exceed the maximum
      if (files.length + acceptedFiles.length > MAX_FILES) {
        setError(`You can only upload a maximum of ${MAX_FILES} files`);
        return;
      }

      setError(null);
      addFiles(acceptedFiles);

      if (acceptedFiles.length > 0) {
        simulateUpload();
      }
    },
    [addFiles, files.length]
  );

  const simulateUpload = () => {
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploading(false), 500);
          return 100;
        }
        return newProgress;
      });
    }, 150);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    accept: accept ? { [accept]: [] } : undefined,
    maxSize,
    multiple: true,
  });

  return (
    <div className="space-y-4 hover:bg-accent2">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 transition-all",
          isDragActive
            ? "border-primary bg-primary/5 scale-[0.98]"
            : "border-muted-foreground/20 hover:border-primary/40 hover:bg-muted/50",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <Input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div
            className={cn(
              "size-16 rounded-full flex items-center justify-center",
              isDragActive ? "bg-primary/10" : "bg-muted"
            )}
          >
            <Upload
              className={cn(
                "h-8 w-8",
                isDragActive ? "text-primary" : "text-muted-foreground"
              )}
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-medium">
              {isDragActive ? "Drop files here" : "Drag & drop files"}
            </h3>
            <p className="text-sm text-muted-foreground">
              or click to browse your device
            </p>
          </div>
          {!isDragActive && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              disabled={disabled}
            >
              Select files
            </Button>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            Supported formats: .pdf, .doc, .docx, .txt
            {maxSize && ` (Max size: ${formatFileSize(maxSize)})`}
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {uploading && (
        <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Uploading files...</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 " />
        </div>
      )}
    </div>
  );
}

function FileQueue() {
  const { files, removeFile } = useAppStore();
  const fileCount = files.length;

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="size-16 rounded-full flex items-center justify-center ">
          <FileText className="h-8 w-8 " />
        </div>
        <h3 className="text-lg font-medium">No files in queue</h3>
        <p className="text-sm text-text-secondary  max-w-md">
          Upload files to start training your chatbot
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Files in queue</span>
        <Badge variant="outline" className="bg-primary/10">
          {fileCount}/{MAX_FILES}
        </Badge>
      </div>
      <ul className="space-y-3">
        <AnimatePresence initial={false}>
          {files.map((file, index) => (
            <motion.li
              key={`${file.name}-${index}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between p-3 bg-accent2  rounded-lg border border-border  transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="size-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {getFileIcon(file.name)}
                  </div>
                  <div className="min-w-0 overflow-hidden">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className="text-xs font-normal">
                        {getFileExtension(file.name).toUpperCase()}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeFile(index)}
                >
                  <Trash2 className="h-4 w-4 " />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

// Helper functions
function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  );
}

function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

function getFileIcon(filename: string) {
  const extension = getFileExtension(filename).toLowerCase();

  switch (extension) {
    case "pdf":
      return <FileText className="h-5 w-5 text-red-500" />;
    case "doc":
    case "docx":
      return <FileText className="h-5 w-5 text-blue-500" />;
    case "txt":
      return <FileText className="h-5 w-5 text-gray-500" />;
    case "zip":
    case "rar":
      return <FileArchive className="h-5 w-5 text-amber-500" />;
    case "jpg":
    case "jpeg":
    case "png":
      return <FileImage className="h-5 w-5 text-purple-500" />;
    case "js":
    case "ts":
    case "jsx":
    case "tsx":
      return <FileCode className="h-5 w-5 text-yellow-500" />;
    default:
      return <FileIcon className="h-5 w-5 text-primary" />;
  }
}
