
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const PhotoResizerKb = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [targetSize, setTargetSize] = useState("");
  const [resizedImageUrl, setResizedImageUrl] = useState("");
  const [finalSize, setFinalSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleResizeImage = async () => {
    try {
      if (!imageUrl.trim()) {
        toast({
          title: "Error",
          description: "Please enter an image URL",
          variant: "destructive",
        });
        return;
      }

      if (!targetSize.trim()) {
        toast({
          title: "Error",
          description: "Please enter target size in KB",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      const response = await toolsApi.resizeImageKb(
        imageUrl, 
        parseInt(targetSize)
      );
      setIsLoading(false);
      
      if (response.success) {
        setResizedImageUrl(response.data.resizedImageUrl);
        setFinalSize(response.data.finalSize);
        toast({
          title: "Success",
          description: "Image resized successfully",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error resizing image:", error);
      toast({
        title: "Error",
        description: "Failed to resize image",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Photo Resizer by KB"
      description="Resize images to a specific file size in kilobytes (KB)."
      toolName="Photo Resizer by KB"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter Image URL
          </label>
          <Input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: JPG, PNG, GIF
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Target Size (KB)
          </label>
          <Input
            type="number"
            placeholder="Size in KB (e.g., 200)"
            value={targetSize}
            onChange={(e) => setTargetSize(e.target.value)}
            min="1"
          />
        </div>

        <Button
          onClick={handleResizeImage}
          disabled={isLoading}
          className="w-full bg-seo-600 hover:bg-seo-700"
        >
          {isLoading ? "Resizing..." : "Resize Image"}
        </Button>

        {resizedImageUrl && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Resized Image ({finalSize} KB)
            </label>
            <Card>
              <CardContent className="p-4 flex justify-center">
                <img 
                  src={resizedImageUrl} 
                  alt="Resized" 
                  className="max-w-full h-auto"
                />
              </CardContent>
            </Card>
            <div className="mt-2 text-center">
              <a 
                href={resizedImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-seo-600 hover:text-seo-700 text-sm font-medium"
              >
                Download Resized Image
              </a>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">About Photo Resizer by KB</h3>
          <p className="text-gray-600 text-sm">
            This tool helps you resize images to a specific file size in kilobytes. 
            It's particularly useful when you need to upload images with size restrictions 
            on websites, email attachments, or social media platforms. Our tool 
            intelligently adjusts the image quality and dimensions to meet your target 
            file size while maintaining the best possible visual quality.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PhotoResizerKb;
