import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Globe, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import useAppStore from "@/store/zustand";

// Add this constant at the top of the file, after the imports
const MAX_URLS = 20;

// Update the TrainByWebsite component to use Zustand store
export default function TrainByWebsite() {
  const { urls, addUrl, removeUrl } = useAppStore();
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const urlCount = urls.length;

  const handleAddUrl = () => {
    // Basic URL validation
    if (!urlInput.trim()) {
      setError("Please enter a URL");
      return;
    }

    // Check if adding this URL would exceed the maximum
    if (urls.length >= MAX_URLS) {
      setError(`You can only add a maximum of ${MAX_URLS} URLs`);
      return;
    }

    try {
      new URL(urlInput);
      addUrl(urlInput);
      setUrlInput("");
      setError(null);
    } catch (e) {
      setError("Please enter a valid URL");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>Website Training</CardTitle>
          <CardDescription className="text-text-secondary">
            Train your chatbot using content from websites
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="https://example.com"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    if (error) setError(null);
                  }}
                  className="h-10 border-accent1"
                />
              </div>
              <Button
                onClick={handleAddUrl}
                size="icon"
                className="h-10 w-10 bg-button text-text-black"
                disabled={urls.length >= MAX_URLS}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-text-red brightness-200 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Added URLs</h3>
                <Badge variant="outline" className="">
                  {urlCount}/{MAX_URLS}
                </Badge>
              </div>

              {urls.length === 0 ? (
                <div className="text-sm text-text-secondary py-2">
                  No URLs added yet. Add a URL to begin training.
                </div>
              ) : (
                <ul className="space-y-2">
                  <AnimatePresence initial={false}>
                    {urls.map((url, index) => (
                      <motion.li
                        key={`${url}-${index}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between gap-2 bg-accent2 rounded-md p-2 "
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <div className="size-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Globe className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm truncate">{url}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-text-red brightness-200"
                          onClick={() => removeUrl(index)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-between">
          <div className="text-sm text-muted-foreground">
            {urlCount > 0
              ? `${urlCount} URL${urlCount !== 1 ? "s" : ""} added`
              : "No URLs added"}
          </div>
          <Button
            className="bg-button text-text-black"
            disabled={urls.length === 0}
          >
            Start Training
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
