"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import TrainByFile from "@/components/trainByFile";
import { FileText, Globe, MessageSquareText, Upload } from "lucide-react";
import TrainByText from "@/components/trainByText";
import TrainByWebsite from "@/components/trainByWebsite";
import TrainByQA from "@/components/trainByQA";

const Training = () => {
  const trainingWays = [
    {
      label: "Files",
      content: <TrainByFile />,
      icon: <Upload className="h-5 w-5" />,
      description: "Upload documents to train your chatbot",
    },
    {
      label: "Text",
      content: <TrainByText />,
      icon: <FileText className="h-5 w-5" />,
      description: "Enter text directly to train your chatbot",
    },
    {
      label: "Website",
      content: <TrainByWebsite />,
      icon: <Globe className="h-5 w-5" />,
      description: "Train your chatbot using content from websites",
    },
    {
      label: "Q & A",
      content: <TrainByQA />,
      icon: <MessageSquareText className="h-5 w-5" />,
      description: "Create question and answer pairs for training",
    },
  ];

  const [selectedTab, setSelectedTab] = useState(trainingWays[0]);

  return (
    <main className="flex flex-col justify-center  w-full p-4">
      <div className="max-w-7xl w-full mx-auto space-y-8">
        <div className="py-8 mx-auto max-w-2xl space-y-2">
          <h1 className="text-center ">TRAIN YOUR CHATBOT</h1>
          <p className="text-text-secondary ">
            Choose a training method below to enhance your chatbot's knowledge
            and capabilities
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <ul className="flex flex-row justify-around border-b border-border">
            {trainingWays.map((item) => (
              <motion.li
                key={item.label}
                initial={false}
                className="flex-1 relative  flex flex-col items-center  cursor-pointer transition-colors hover:text-text-primary hover:bg-container-background"
                onClick={() => setSelectedTab(item)}
              >
                {/* Tab label */}
                <div
                  className={`${
                    item.label === selectedTab.label
                      ? "text-text-primary"
                      : "text-text-secondary"
                  } hover:text-text-primary flex items-center  gap-2 mb-2`}
                >
                  <span>{item.icon}</span>
                  <h2>{item.label}</h2>
                </div>
                {/* Animated underline */}
                {item.label === selectedTab.label && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-text-green"
                    layoutId="underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab.label}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4"
            >
              <div className="">
                <div className="">{selectedTab.content}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default Training;
