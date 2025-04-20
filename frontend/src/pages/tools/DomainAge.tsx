
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const DomainAge = () => {
  const [domain, setDomain] = useState("");
  const [domainInfo, setDomainInfo] = useState<{
    domain: string;
    registrationDate: string;
    age: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckDomain = async () => {
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
      const response = await toolsApi.checkDomainAge(domain);
      setIsLoading(false);
      
      if (response.success) {
        setDomainInfo(response.data);
        toast({
          title: "Success",
          description: "Domain age retrieved successfully",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error checking domain age:", error);
      toast({
        title: "Error",
        description: "Failed to check domain age",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Domain Age Checker"
      description="Check how old a domain is based on its registration date."
      toolName="Domain Age Checker"
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
              onClick={handleCheckDomain}
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
              Domain Age Results
            </label>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Domain</p>
                    <p className="text-base">{domainInfo.domain}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Registration Date</p>
                    <p className="text-base">{domainInfo.registrationDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Age</p>
                    <p className="text-base font-medium text-seo-600">{domainInfo.age}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">About Domain Age Checker</h3>
          <p className="text-gray-600 text-sm">
            The Domain Age Checker tool determines how long a domain name has been registered. 
            This is important for SEO as search engines often give more credibility to older 
            domains. It can also be useful for competitive analysis, domain buying decisions, 
            and verifying the established history of a website.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default DomainAge;
