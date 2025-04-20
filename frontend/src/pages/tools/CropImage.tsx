
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const CropImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [x, setX] = useState("0");
  const [y, setY] = useState("0");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCropImage = async () => {
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
      const response = await toolsApi.cropImage(
        imageUrl, 
        parseInt(x),
        parseInt(y),
        parseInt(width), 
        parseInt(height)
      );
      setIsLoading(false);
      
      if (response.success) {
        setCroppedImageUrl(response.data.croppedImageUrl);
        toast({
          title: "Success",
          description: "Image cropped successfully",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error cropping image:", error);
      toast({
        title: "Error",
        description: "Failed to crop image",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Crop Image"
      description="Crop images to specific dimensions from the specified starting position."
      toolName="Crop Image"
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
              X Position (px)
            </label>
            <Input
              type="number"
              placeholder="X coordinate"
              value={x}
              onChange={(e) => setX(e.target.value)}
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Y Position (px)
            </label>
            <Input
              type="number"
              placeholder="Y coordinate"
              value={y}
              onChange={(e) => setY(e.target.value)}
              min="0"
            />
          </div>
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
          onClick={handleCropImage}
          disabled={isLoading}
          className="w-full bg-seo-600 hover:bg-seo-700"
        >
          {isLoading ? "Cropping..." : "Crop Image"}
        </Button>

        {croppedImageUrl && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Cropped Image
            </label>
            <Card>
              <CardContent className="p-4 flex justify-center">
                <img 
                  src={croppedImageUrl} 
                  alt="Cropped" 
                  className="max-w-full h-auto"
                />
              </CardContent>
            </Card>
            <div className="mt-2 text-center">
              <a 
                href={croppedImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-seo-600 hover:text-seo-700 text-sm font-medium"
              >
                Download Cropped Image
              </a>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">About Crop Image Tool</h3>
          <p className="text-gray-600 text-sm">
            The Crop Image tool allows you to extract a specific portion of an image. 
            Specify the starting position (X and Y coordinates) and the dimensions 
            (width and height) to crop the exact area you need. This is useful for 
            removing unwanted parts of images, focusing on specific elements, or 
            preparing images for profile pictures.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default CropImage;
