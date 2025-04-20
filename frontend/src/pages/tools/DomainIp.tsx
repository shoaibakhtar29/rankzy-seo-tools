
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const DomainIp = () => {
  const [domain, setDomain] = useState("");
  const [domainInfo, setDomainInfo] = useState<{
    domain: string;
    ipAddress: string;
    location: string;
    isp: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLookupIp = async () => {
    try {
      if (!domain.trim()) {
        toast({
          title: "Error",
          description: "Please enter a domain name",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      const response = await toolsApi.lookupDomainIp(domain);
      setIsLoading(false);
      
      if (response.success) {
        setDomainInfo(response.data);
        toast({
          title: "Success",
          description: "Domain IP information retrieved successfully",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error looking up domain IP:", error);
      toast({
        title: "Error",
        description: "Failed to lookup domain IP",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Domain IP Lookup"
      description="Find the IP address of any domain name and get its geolocation."
      toolName="Domain IP Lookup"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter Domain Name
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleLookupIp}
              disabled={isLoading}
              className="bg-seo-600 hover:bg-seo-700"
            >
              {isLoading ? "Looking up..." : "Lookup"}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Enter without http:// or www (e.g., example.com)
          </p>
        </div>

        {domainInfo && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Domain IP Results
            </label>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Domain</p>
                    <p className="text-base">{domainInfo.domain}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">IP Address</p>
                    <p className="text-base font-mono">{domainInfo.ipAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-base">{domainInfo.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">ISP</p>
                    <p className="text-base">{domainInfo.isp}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">About Domain IP Lookup</h3>
          <p className="text-gray-600 text-sm">
            The Domain IP Lookup tool allows you to find the IP address associated with a 
            domain name. This is useful for network diagnostics, cybersecurity research, 
            verifying hosting information, and tracking website changes. The tool also 
            provides geolocation information for the IP address and identifies the Internet 
            Service Provider (ISP) hosting the domain.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default DomainIp;
