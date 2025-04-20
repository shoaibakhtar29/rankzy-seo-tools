
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const PngToJpg = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [jpgImageUrl, setJpgImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleConvertImage = async () => {
    try {
      if (!imageUrl.trim()) {
        toast({
          title: "Error",
          description: "Please enter a PNG image URL",
          variant: "destructive",
        });
        return;
      }

      if (!imageUrl.toLowerCase().endsWith('.png')) {
        toast({
          title: "Warning",
          description: "URL should point to a PNG image",
          variant: "destructive",
        });
      }

      setIsLoading(true);
      const response = await toolsApi.convertPngToJpg(imageUrl);
      setIsLoading(false);
      
      if (response.success) {
        setJpgImageUrl(response.data.jpgImageUrl);
        toast({
          title: "Success",
          description: "PNG converted to JPG successfully",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error converting image:", error);
      toast({
        title: "Error",
        description: "Failed to convert PNG to JPG",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="PNG to JPG Converter"
      description="Convert PNG images to JPG format quickly and easily."
      toolName="PNG to JPG Converter"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter PNG Image URL
          </label>
          <Input
            type="url"
            placeholder="https://example.com/image.png"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            The URL should point to a PNG image
          </p>
        </div>

        <Button
          onClick={handleConvertImage}
          disabled={isLoading}
          className="w-full bg-seo-600 hover:bg-seo-700"
        >
          {isLoading ? "Converting..." : "Convert to JPG"}
        </Button>

        {jpgImageUrl && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Converted JPG Image
            </label>
            <Card>
              <CardContent className="p-4 flex justify-center">
                <img 
                  src={jpgImageUrl} 
                  alt="Converted" 
                  className="max-w-full h-auto"
                />
              </CardContent>
            </Card>
            <div className="mt-2 text-center">
              <a 
                href={jpgImageUrl}
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
          <h3 className="font-semibold mb-2">About PNG to JPG Converter</h3>
          <p className="text-gray-600 text-sm">
            This tool specifically converts PNG images to JPG format. While PNG files 
            support transparency and lossless compression, JPG files are generally smaller 
            and more suitable for photographs and complex images on the web. Converting 
            from PNG to JPG can significantly reduce file size, though transparency will 
            be lost in the process.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PngToJpg;
