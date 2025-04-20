
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";

const CompressImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [quality, setQuality] = useState([80]);
  const [compressedImageUrl, setCompressedImageUrl] = useState("");
  const [originalSize, setOriginalSize] = useState("");
  const [compressedSize, setCompressedSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCompressImage = async () => {
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
      const response = await toolsApi.compressImage(imageUrl, quality[0]);
      setIsLoading(false);
      
      if (response.success) {
        setCompressedImageUrl(response.data.compressedImageUrl);
        setOriginalSize(response.data.originalSize);
        setCompressedSize(response.data.compressedSize);
        toast({
          title: "Success",
          description: "Image compressed successfully",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error compressing image:", error);
      toast({
        title: "Error",
        description: "Failed to compress image",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Compress Image"
      description="Reduce image file size while maintaining visual quality."
      toolName="Compress Image"
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
            Supported formats: JPG, PNG, WEBP
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">
              Quality: {quality[0]}%
            </label>
          </div>
          <Slider
            value={quality}
            onValueChange={setQuality}
            min={1}
            max={100}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Smaller file</span>
            <span>Better quality</span>
          </div>
        </div>

        <Button
          onClick={handleCompressImage}
          disabled={isLoading}
          className="w-full bg-seo-600 hover:bg-seo-700"
        >
          {isLoading ? "Compressing..." : "Compress Image"}
        </Button>

        {compressedImageUrl && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                Compressed Image
              </label>
              <div className="text-xs text-gray-500">
                {originalSize} → {compressedSize}
              </div>
            </div>
            <Card>
              <CardContent className="p-4 flex justify-center">
                <img 
                  src={compressedImageUrl} 
                  alt="Compressed" 
                  className="max-w-full h-auto"
                />
              </CardContent>
            </Card>
            <div className="mt-2 text-center">
              <a 
                href={compressedImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-seo-600 hover:text-seo-700 text-sm font-medium"
              >
                Download Compressed Image
              </a>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">About Compress Image Tool</h3>
          <p className="text-gray-600 text-sm">
            The Compress Image tool reduces file sizes while maintaining acceptable visual quality. 
            This is essential for websites that need to load quickly, saving bandwidth, 
            and meeting file size restrictions on various platforms. Our tool uses advanced 
            compression algorithms to remove unnecessary data without significantly degrading 
            image appearance.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default CompressImage;
