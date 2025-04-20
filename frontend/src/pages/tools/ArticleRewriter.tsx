
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, FileEdit } from "lucide-react";

const ArticleRewriter = () => {
  const [inputText, setInputText] = useState("");
  const [rewrittenText, setRewrittenText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRewriteArticle = async () => {
    try {
      if (!inputText.trim()) {
        toast({
          title: "Error",
          description: "Please enter some text to rewrite",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      console.log("Rewriting article with text:", inputText);
      
      const response = await toolsApi.rewriteArticle(inputText);
      setIsLoading(false);
      
      console.log("Article rewriter response:", response);
      
      if (response.success) {
        setRewrittenText(response.data.rewrittenText);
        toast({
          title: "Success",
          description: "Article rewritten successfully",
        });
      } else {
        throw new Error(response.message || "Failed to rewrite article");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error rewriting article:", error);
      toast({
        title: "Error",
        description: "Failed to rewrite article",
        variant: "destructive",
      });
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(rewrittenText).then(
      () => {
        toast({
          title: "Success",
          description: "Rewritten text copied to clipboard",
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
      title="Article Rewriter"
      description="Rewrite articles while maintaining their original meaning. Perfect for content repurposing and avoiding duplicate content."
      toolName="Article Rewriter"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter Article to Rewrite
          </label>
          <Textarea
            placeholder="Enter your article here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[200px]"
          />
        </div>

        <Button
          onClick={handleRewriteArticle}
          disabled={isLoading}
          className="w-full bg-seo-600 hover:bg-seo-700"
        >
          {isLoading ? (
            "Rewriting..."
          ) : (
            <>
              <FileEdit className="mr-2 h-4 w-4" />
              Rewrite Article
            </>
          )}
        </Button>

        {rewrittenText && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                Rewritten Article
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
                <p className="text-sm whitespace-pre-wrap">{rewrittenText}</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">About Article Rewriter</h3>
          <p className="text-gray-600 text-sm">
            Our Article Rewriter tool helps you create unique content by rewriting existing 
            articles while preserving their original meaning. It's perfect for content creators, 
            marketers, and students who need to avoid duplicate content or repurpose existing 
            materials. The tool uses advanced AI to ensure natural and readable results.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ArticleRewriter;
