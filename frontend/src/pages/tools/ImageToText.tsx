
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Upload } from "lucide-react";

const ImageToText = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleExtractText = async () => {
    try {
      if (!imageUrl.trim()) {
        toast({
          title: "Error",
          description: "Please enter an image URL",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      console.log("Extracting text from image URL:", imageUrl);
      
      const response = await toolsApi.extractTextFromImage(imageUrl);
      setIsLoading(false);
      
      console.log("Image to text response:", response);
      
      if (response.success) {
        setExtractedText(response.data.text);
        toast({
          title: "Success",
          description: "Text extracted successfully",
        });
      } else {
        throw new Error(response.message || "Failed to extract text");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error extracting text:", error);
      toast({
        title: "Error",
        description: "Failed to extract text from image",
        variant: "destructive",
      });
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(extractedText).then(
      () => {
        toast({
          title: "Success",
          description: "Text copied to clipboard",
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
      title="Image to Text"
      description="Extract text from images using OCR (Optical Character Recognition) technology."
      toolName="Image to Text"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter Image URL
          </label>
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Button
              onClick={handleExtractText}
              disabled={isLoading}
              className="flex-shrink-0 bg-seo-600 hover:bg-seo-700"
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Extract Text
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: JPG, PNG, GIF, BMP
          </p>
        </div>

        {extractedText && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                Extracted Text
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
                <p className="text-sm whitespace-pre-wrap">{extractedText}</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">About Image to Text</h3>
          <p className="text-gray-600 text-sm">
            Our Image to Text tool uses advanced OCR technology to extract text from images. 
            It can recognize printed text in various languages and fonts. This tool is perfect 
            for digitizing printed documents, extracting text from screenshots, or converting 
            image-based text into editable format.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ImageToText;
