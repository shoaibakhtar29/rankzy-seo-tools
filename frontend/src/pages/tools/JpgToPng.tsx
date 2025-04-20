
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const JpgToPng = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [pngImageUrl, setPngImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleConvertImage = async () => {
    try {
      if (!imageUrl.trim()) {
        toast({
          title: "Error",
          description: "Please enter a JPG image URL",
          variant: "destructive",
        });
        return;
      }

      if (!imageUrl.toLowerCase().endsWith('.jpg') && !imageUrl.toLowerCase().endsWith('.jpeg')) {
        toast({
          title: "Warning",
          description: "URL should point to a JPG image",
          variant: "destructive",
        });
      }

      setIsLoading(true);
      const response = await toolsApi.convertJpgToPng(imageUrl);
      setIsLoading(false);
      
      if (response.success) {
        setPngImageUrl(response.data.pngImageUrl);
        toast({
          title: "Success",
          description: "JPG converted to PNG successfully",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error converting image:", error);
      toast({
        title: "Error",
        description: "Failed to convert JPG to PNG",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="JPG to PNG Converter"
      description="Convert JPG images to PNG format quickly and easily."
      toolName="JPG to PNG Converter"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter JPG Image URL
          </label>
          <Input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            The URL should point to a JPG/JPEG image
          </p>
        </div>

        <Button
          onClick={handleConvertImage}
          disabled={isLoading}
          className="w-full bg-seo-600 hover:bg-seo-700"
        >
          {isLoading ? "Converting..." : "Convert to PNG"}
        </Button>

        {pngImageUrl && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Converted PNG Image
            </label>
            <Card>
              <CardContent className="p-4 flex justify-center">
                <img 
                  src={pngImageUrl} 
                  alt="Converted" 
                  className="max-w-full h-auto"
                />
              </CardContent>
            </Card>
            <div className="mt-2 text-center">
              <a 
                href={pngImageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-seo-600 hover:text-seo-700 text-sm font-medium"
              >
                Download PNG Image
              </a>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">About JPG to PNG Converter</h3>
          <p className="text-gray-600 text-sm">
            This tool converts JPG/JPEG images to PNG format. While JPG files are more 
            compact, PNG files offer lossless compression and support for transparency. 
            Converting to PNG is useful when you need a higher quality image without compression 
            artifacts, or when you need to overlay the image on different backgrounds in 
            design work.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default JpgToPng;
