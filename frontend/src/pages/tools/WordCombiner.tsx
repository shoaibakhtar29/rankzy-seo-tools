
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Plus, X } from "lucide-react";

const WordCombiner = () => {
  const [words, setWords] = useState<string[]>([""]);
  const [combinedText, setCombinedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddWord = () => {
    setWords([...words, ""]);
  };

  const handleRemoveWord = (index: number) => {
    const newWords = words.filter((_, i) => i !== index);
    setWords(newWords);
  };

  const handleWordChange = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  const handleCombineWords = async () => {
    try {
      const filteredWords = words.filter(word => word.trim() !== "");
      if (filteredWords.length === 0) {
        toast({
          title: "Error",
          description: "Please enter at least one word",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      console.log("Combining words:", filteredWords);
      
      const response = await toolsApi.combineWords(filteredWords);
      setIsLoading(false);
      
      console.log("Word combiner response:", response);
      
      if (response.success) {
        setCombinedText(response.data.combinedText);
        toast({
          title: "Success",
          description: "Words combined successfully",
        });
      } else {
        throw new Error(response.message || "Failed to combine words");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error combining words:", error);
      toast({
        title: "Error",
        description: "Failed to combine words",
        variant: "destructive",
      });
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(combinedText).then(
      () => {
        toast({
          title: "Success",
          description: "Combined text copied to clipboard",
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast({
          title: "Error",
          description: "Failed to copy text",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <ToolLayout
      title="Word Combiner"
      description="Combine multiple words into a single text string. Perfect for creating word lists or concatenating terms."
      toolName="Word Combiner"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          {words.map((word, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Word ${index + 1}`}
                value={word}
                onChange={(e) => handleWordChange(index, e.target.value)}
              />
              {words.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveWord(index)}
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handleAddWord}
            className="flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Word
          </Button>
          <Button
            onClick={handleCombineWords}
            disabled={isLoading}
            className="flex-1 bg-seo-600 hover:bg-seo-700"
          >
            {isLoading ? "Combining..." : "Combine Words"}
          </Button>
        </div>

        {combinedText && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                Combined Text
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyText}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Text
              </Button>
            </div>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm break-words">{combinedText}</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">About Word Combiner</h3>
          <p className="text-gray-600 text-sm">
            Word Combiner is a simple tool that helps you combine multiple words into a single 
            text string. It's useful for creating word lists, concatenating terms, or generating 
            compound words. Simply enter your words and choose how you want them combined.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default WordCombiner;
