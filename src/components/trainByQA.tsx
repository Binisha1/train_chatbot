import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquareText, Plus, Trash2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import useAppStore from "@/store/zustand";

// Add this constant at the top of the file, after the imports
const MAX_QA_PAIRS = 50;

// Update the TrainByQA component to use Zustand store
export default function TrainByQA() {
  const { qaPairs, addQAPair, removeQAPair } = useAppStore();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const pairCount = qaPairs.length;

  const handleAddPair = () => {
    if (!question.trim() || !answer.trim()) return;

    // Check if adding this pair would exceed the maximum
    if (qaPairs.length >= MAX_QA_PAIRS) {
      setError(`You can only add a maximum of ${MAX_QA_PAIRS} Q&A pairs`);
      return;
    }

    addQAPair({ question, answer });
    setQuestion("");
    setAnswer("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>Q&A Training</CardTitle>
          <CardDescription className="text-text-secondary">
            Create question and answer pairs for precise training
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="question"
                  className="text-sm font-medium block mb-1.5"
                >
                  Question
                </label>
                <Input
                  id="question"
                  placeholder="Enter a question..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="answer"
                  className="text-sm font-medium block mb-1.5"
                >
                  Answer
                </label>
                <Textarea
                  id="answer"
                  placeholder="Enter the answer..."
                  className="min-h-[100px] resize-none"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2  text-sm">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                onClick={handleAddPair}
                disabled={
                  !question.trim() ||
                  !answer.trim() ||
                  qaPairs.length >= MAX_QA_PAIRS
                }
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Q&A Pair
              </Button>
            </div>

            <div className=" p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Q&A Pairs</h3>
                <Badge variant="outline" className="bg-primary/10">
                  {pairCount}/{MAX_QA_PAIRS}
                </Badge>
              </div>

              {qaPairs.length === 0 ? (
                <div className="text-sm text-text-secondary py-2">
                  No Q&A pairs added yet. Add a pair to begin training.
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {qaPairs.map((pair, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-accent2 rounded-md p-3 "
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-2">
                            <div className="size-6 rounded  flex items-center justify-center flex-shrink-0 mt-0.5">
                              <MessageSquareText className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-medium">
                                {pair.question}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {pair.answer}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => removeQAPair(index)}
                          >
                            <Trash2 className="h-3.5 w-3.5 text-text-red brightness-200" />
                          </Button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-between">
          <div className="text-sm ">
            {pairCount > 0
              ? `${pairCount} pair${pairCount !== 1 ? "s" : ""} added`
              : "No Q&A pairs added"}
          </div>
          <Button
            className="bg-button text-text-black"
            disabled={qaPairs.length === 0}
          >
            Start Training
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
