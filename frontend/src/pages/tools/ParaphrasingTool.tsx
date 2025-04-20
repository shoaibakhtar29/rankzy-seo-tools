
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, FileEdit } from "lucide-react";

const ParaphrasingTool = () => {
  const [inputText, setInputText] = useState("");
  const [paraphrasedText, setParaphrasedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleParaphraseText = async () => {
    try {
      if (!inputText.trim()) {
        toast({
          title: "Error",
          description: "Please enter some text to paraphrase",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      console.log("Paraphrasing text:", inputText);
      
      const response = await toolsApi.paraphraseText(inputText);
      setIsLoading(false);
      
      console.log("Paraphrasing response:", response);
      
      if (response.success) {
        setParaphrasedText(response.data.paraphrasedText);
        toast({
          title: "Success",
          description: "Text paraphrased successfully",
        });
      } else {
        throw new Error(response.message || "Failed to paraphrase text");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error paraphrasing text:", error);
      toast({
        title: "Error",
        description: "Failed to paraphrase text",
        variant: "destructive",
      });
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(paraphrasedText).then(
      () => {
        toast({
          title: "Success",
          description: "Paraphrased text copied to clipboard",
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
      title="Paraphrasing Tool"
      description="Rewrite content while maintaining its original meaning. Great for avoiding plagiarism and creating unique content."
      toolName="Paraphrasing Tool"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter Text to Paraphrase
          </label>
          <Textarea
            placeholder="Enter your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px]"
          />
        </div>

        <Button
          onClick={handleParaphraseText}
          disabled={isLoading}
          className="w-full bg-seo-600 hover:bg-seo-700"
        >
          {isLoading ? (
            "Paraphrasing..."
          ) : (
            <>
              <FileEdit className="mr-2 h-4 w-4" />
              Paraphrase Text
            </>
          )}
        </Button>

        {paraphrasedText && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                Paraphrased Text
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
                <p className="text-sm whitespace-pre-wrap">{paraphrasedText}</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">About Paraphrasing Tool</h3>
          <p className="text-gray-600 text-sm">
            Our paraphrasing tool helps you rewrite content in a different way while 
            preserving the original meaning. It's useful for creating unique content, 
            avoiding plagiarism, and improving readability. The tool uses advanced 
            algorithms to generate high-quality paraphrased text.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ParaphrasingTool;
