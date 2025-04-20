
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const ImageResizer = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [resizedImageUrl, setResizedImageUrl] = useState("");
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

      if (!width.trim() || !height.trim()) {
        toast({
          title: "Error",
          description: "Please enter both width and height",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      const response = await toolsApi.resizeImage(
        imageUrl, 
        parseInt(width), 
        parseInt(height)
      );
      setIsLoading(false);
      
      if (response.success) {
        setResizedImageUrl(response.data.resizedImageUrl);
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
      title="Image Resizer"
      description="Resize images to specific dimensions without losing quality."
      toolName="Image Resizer"
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Width (px)
            </label>
            <Input
              type="number"
              placeholder="Width in pixels"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Height (px)
            </label>
            <Input
              type="number"
              placeholder="Height in pixels"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="1"
            />
          </div>
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
              Resized Image
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
          <h3 className="font-semibold mb-2">About Image Resizer</h3>
          <p className="text-gray-600 text-sm">
            The Image Resizer tool allows you to quickly resize images to specific dimensions. 
            This is useful for preparing images for your website, social media, or other 
            online platforms. Simply provide the image URL and your desired dimensions, 
            and our tool will resize the image while maintaining optimal quality.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ImageResizer;
