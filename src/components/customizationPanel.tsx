import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUpload from "./file-upload";

export default function CustomizationPanel() {
  const [config, setConfig] = useState({
    model: "gpt-4o",
    temperature: 0.7,
    systemPrompt: "You are a helpful assistant.",
    initialMessage: "Hello! How can I help you today?",
    userFeedback: false,
    regenerateMessage: true,
    profilePicture: null,
    chatIcon: null,
    themeColor: "#3b82f6",
    chatbotMessageColor: "#f3f4f6",
    userMessageColor: "#eff6ff",
  });

  const handleChange = (field: string, value: any) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className=" md:flex items-center justify-between">
        <Label htmlFor="model">Model</Label>
        <Select
          value={config.model}
          onValueChange={(value) => handleChange("model", value)}
        >
          <SelectTrigger id="model" className="w-2/5">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent className="bg-background ">
            <SelectItem value="gpt-4o">GPT-4o</SelectItem>
            <SelectItem value="gpt-4">GPT-4</SelectItem>
            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="md:flex items-center justify-between">
        <Label htmlFor="temperature">Temperature: </Label>
        <div className="w-1/2 flex">
          <Slider
            className=""
            id="temperature"
            defaultValue={[config.temperature]}
            max={1}
            step={0.1}
            onValueChange={(value) => handleChange("temperature", value[0])}
          />
          <span className="ml-3">{config.temperature}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="systemPrompt">System Prompt</Label>
        <Textarea
          className="text-text-decoration"
          id="systemPrompt"
          value={config.systemPrompt}
          onChange={(e) => handleChange("systemPrompt", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="initialMessage">Initial Message</Label>
        <Textarea
          className="text-text-decoration"
          id="initialMessage"
          value={config.initialMessage}
          onChange={(e) => handleChange("initialMessage", e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="userFeedback">User Feedback</Label>
        <Switch
          id="userFeedback"
          checked={config.userFeedback}
          onCheckedChange={(checked) => handleChange("userFeedback", checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="regenerateMessage">Regenerate Message</Label>
        <Switch
          id="regenerateMessage"
          checked={config.regenerateMessage}
          onCheckedChange={(checked) =>
            handleChange("regenerateMessage", checked)
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Profile Picture</Label>
        <FileUpload
          accept="image/*"
          onChange={(file) => handleChange("profilePicture", file)}
        />
      </div>

      <div className="space-y-2">
        <Label>Chat Icon</Label>
        <FileUpload
          accept="image/*"
          onChange={(file) => handleChange("chatIcon", file)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="themeColor">Theme Color</Label>
        <div className="flex items-center gap-2">
          <Input
            id="themeColor"
            type="color"
            value={config.themeColor}
            onChange={(e) => handleChange("themeColor", e.target.value)}
            className="w-12 h-10 p-1 border-none"
          />
          <Input
            value={config.themeColor}
            onChange={(e) => handleChange("themeColor", e.target.value)}
            className="flex-1 border-accent1 focus:ring-accent1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="chatbotMessageColor">Chatbot Message Color</Label>
        <div className="flex items-center gap-2">
          <Input
            id="chatbotMessageColor"
            type="color"
            value={config.chatbotMessageColor}
            onChange={(e) =>
              handleChange("chatbotMessageColor", e.target.value)
            }
            className="w-12 h-10 p-1 border-none"
          />
          <Input
            value={config.chatbotMessageColor}
            onChange={(e) =>
              handleChange("chatbotMessageColor", e.target.value)
            }
            className="flex-1 border-accent1 focus:ring-accent1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="userMessageColor">User Message Color</Label>
        <div className="flex items-center gap-2">
          <Input
            id="userMessageColor"
            type="color"
            value={config.userMessageColor}
            onChange={(e) => handleChange("userMessageColor", e.target.value)}
            className="w-12 h-10 p-1 border-none"
          />
          <Input
            value={config.userMessageColor}
            onChange={(e) => handleChange("userMessageColor", e.target.value)}
            className="flex-1 border-accent1 focus:ring-accent1"
          />
        </div>
      </div>
    </div>
  );
}
