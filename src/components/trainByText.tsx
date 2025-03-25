import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import useAppStore from "@/store/zustand";

// Add these constants at the top of the file, after the imports
const MAX_WORDS = 5000;
const MIN_WORDS = 5;

// Update the TrainByText component to use Zustand store
export default function TrainByText() {
  const { trainingText, setTrainingText } = useAppStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Calculate word count
  const wordCount = trainingText.trim()
    ? trainingText.trim().split(/\s+/).length
    : 0;
  const isWordCountValid = wordCount >= MIN_WORDS && wordCount <= MAX_WORDS;

  const handleSubmit = () => {
    if (!trainingText.trim() || !isWordCountValid) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>Text Training</CardTitle>
          <CardDescription className="text-text-secondary">
            Enter text directly to train your chatbot
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="training-text" className="text-sm font-medium">
                  Training Text
                </label>
                <Badge
                  variant="outline"
                  className={`${
                    wordCount > MAX_WORDS
                      ? "bg-destructive/10 text-destructive"
                      : "bg-primary/10"
                  }`}
                >
                  {wordCount}/{MAX_WORDS} words
                </Badge>
              </div>
              <Textarea
                id="training-text"
                placeholder="Enter text to train your chatbot..."
                className="min-h-[200px] resize-none border-accent1"
                value={trainingText}
                onChange={(e) => setTrainingText(e.target.value)}
              />
              {wordCount > 0 && wordCount < MIN_WORDS && (
                <p className="text-xs text-amber-500 mt-1">
                  Please enter at least {MIN_WORDS} words for effective training
                </p>
              )}
              {wordCount > MAX_WORDS && (
                <p className="text-xs text-destructive mt-1">
                  Text exceeds the maximum word count of {MAX_WORDS}
                </p>
              )}
            </div>

            {isSuccess && (
              <Alert variant="default" className="bg-yellow text-text-black">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your text has been successfully added to the training queue.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-between">
          <div className="text-sm text-muted-foreground">
            {wordCount > 0
              ? `${wordCount} word${wordCount !== 1 ? "s" : ""} entered`
              : "No text entered"}
          </div>
          <Button
            className="bg-button text-text-black"
            onClick={handleSubmit}
            disabled={!trainingText.trim() || !isWordCountValid || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Start Training"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
