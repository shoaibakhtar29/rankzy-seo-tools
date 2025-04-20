
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const DomainHosting = () => {
  const [domain, setDomain] = useState("");
  const [domainInfo, setDomainInfo] = useState<{
    domain: string;
    hostingProvider: string;
    nameservers: string[];
    country: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckHosting = async () => {
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
      const response = await toolsApi.checkDomainHosting(domain);
      setIsLoading(false);
      
      if (response.success) {
        setDomainInfo(response.data);
        toast({
          title: "Success",
          description: "Domain hosting information retrieved successfully",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error checking domain hosting:", error);
      toast({
        title: "Error",
        description: "Failed to check domain hosting",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Domain Hosting Checker"
      description="Discover where a website is hosted and which nameservers it uses."
      toolName="Domain Hosting Checker"
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
              onClick={handleCheckHosting}
              disabled={isLoading}
              className="bg-seo-600 hover:bg-seo-700"
            >
              {isLoading ? "Checking..." : "Check"}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Enter without http:// or www (e.g., example.com)
          </p>
        </div>

        {domainInfo && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Domain Hosting Results
            </label>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Domain</p>
                    <p className="text-base">{domainInfo.domain}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Hosting Provider</p>
                    <p className="text-base">{domainInfo.hostingProvider}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Country</p>
                    <p className="text-base">{domainInfo.country}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nameservers</p>
                    <ul className="list-disc pl-5 mt-1">
                      {domainInfo.nameservers.map((ns, index) => (
                        <li key={index} className="text-sm font-mono">{ns}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">About Domain Hosting Checker</h3>
          <p className="text-gray-600 text-sm">
            The Domain Hosting Checker tool allows you to discover which company is hosting 
            a website and which nameservers it uses. This information is useful for 
            competitive analysis, troubleshooting DNS issues, or researching a website's 
            infrastructure. The tool reveals the hosting provider, nameservers, and the 
            physical location of the hosting servers.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default DomainHosting;
