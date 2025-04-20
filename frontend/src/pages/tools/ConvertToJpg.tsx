
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const ConvertToJpg = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [convertedImageUrl, setConvertedImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleConvertImage = async () => {
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
      const response = await toolsApi.convertToJpg(imageUrl);
      setIsLoading(false);
      
      if (response.success) {
        setConvertedImageUrl(response.data.convertedImageUrl);
        toast({
          title: "Success",
          description: "Image converted to JPG successfully",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error converting image:", error);
      toast({
        title: "Error",
        description: "Failed to convert image to JPG",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Convert to JPG"
      description="Convert images from various formats to JPG format."
      toolName="Convert to JPG"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter Image URL
          </label>
          <Input
            type="url"
            placeholder="https://example.com/image.png"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: PNG, GIF, BMP, WEBP, TIFF
          </p>
        </div>

        <Button
          onClick={handleConvertImage}
          disabled={isLoading}
          className="w-full bg-seo-600 hover:bg-seo-700"
        >
          {isLoading ? "Converting..." : "Convert to JPG"}
        </Button>

        {convertedImageUrl && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Converted JPG Image
            </label>
            <Card>
              <CardContent className="p-4 flex justify-center">
                <img 
                  src={convertedImageUrl} 
                  alt="Converted" 
                  className="max-w-full h-auto"
                />
              </CardContent>
            </Card>
            <div className="mt-2 text-center">
              <a 
                href={convertedImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-seo-600 hover:text-seo-700 text-sm font-medium"
              >
                Download JPG Image
              </a>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">About Convert to JPG Tool</h3>
          <p className="text-gray-600 text-sm">
            This tool allows you to convert images from various formats to JPG (JPEG) format. 
            JPG is one of the most widely supported image formats, making it ideal for web 
            use, email attachments, and social media. Converting to JPG can also reduce file 
            size while maintaining reasonable image quality.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ConvertToJpg;
