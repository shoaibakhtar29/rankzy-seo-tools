
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const MD5Generator = () => {
  const [inputText, setInputText] = useState("");
  const [hash, setHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateHash = async () => {
    try {
      if (!inputText.trim()) {
        toast({
          title: "Error",
          description: "Please enter some text to hash",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      console.log("Generating MD5 hash for:", inputText);
      
      const response = await toolsApi.generateMd5(inputText);
      setIsLoading(false);
      
      console.log("MD5 hash response:", response);
      
      if (response.success) {
        setHash(response.data.hash);
        toast({
          title: "Success",
          description: "MD5 hash generated successfully",
        });
      } else {
        throw new Error(response.message || "Failed to generate hash");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error generating MD5 hash:", error);
      toast({
        title: "Error",
        description: "Failed to generate MD5 hash",
        variant: "destructive",
      });
    }
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(hash).then(
      () => {
        toast({
          title: "Success",
          description: "Hash copied to clipboard",
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast({
          title: "Error",
          description: "Failed to copy hash",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <ToolLayout
      title="MD5 Generator"
      description="Generate MD5 hashes from text input. Useful for checking data integrity and creating unique identifiers."
      toolName="MD5 Generator"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter Text to Hash
          </label>
          <Textarea
            placeholder="Enter your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px]"
          />
        </div>

        <Button
          onClick={handleGenerateHash}
          disabled={isLoading}
          className="w-full bg-seo-600 hover:bg-seo-700"
        >
          {isLoading ? "Generating..." : "Generate MD5 Hash"}
        </Button>

        {hash && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                MD5 Hash
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyHash}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Hash
              </Button>
            </div>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-mono break-all">{hash}</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">About MD5 Generator</h3>
          <p className="text-gray-600 text-sm">
            MD5 (Message Digest Algorithm 5) is a widely used hash function that produces 
            a 128-bit (16-byte) hash value. While not suitable for cryptographic security, 
            it's still commonly used for file integrity checking and generating unique identifiers.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default MD5Generator;
