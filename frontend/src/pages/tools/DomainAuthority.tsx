
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const DomainAuthority = () => {
  const [domain, setDomain] = useState("");
  const [domainInfo, setDomainInfo] = useState<{
    domain: string;
    domainAuthority: number;
    pageAuthority: number;
    spamScore: number;
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
      const response = await toolsApi.checkDomainAuthority(domain);
      setIsLoading(false);
      
      if (response.success) {
        setDomainInfo(response.data);
        toast({
          title: "Success",
          description: "Domain authority retrieved successfully",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error checking domain authority:", error);
      toast({
        title: "Error",
        description: "Failed to check domain authority",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Domain Authority Checker"
      description="Check the authority and trust score of any domain."
      toolName="Domain Authority Checker"
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
              Domain Authority Results
            </label>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Domain</p>
                    <p className="text-base">{domainInfo.domain}</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-gray-500">Domain Authority</p>
                      <p className="text-sm font-medium">
                        {domainInfo.domainAuthority}/100
                      </p>
                    </div>
                    <Progress value={domainInfo.domainAuthority} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-gray-500">Page Authority</p>
                      <p className="text-sm font-medium">
                        {domainInfo.pageAuthority}/100
                      </p>
                    </div>
                    <Progress value={domainInfo.pageAuthority} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-gray-500">Spam Score</p>
                      <p className="text-sm font-medium">
                        {domainInfo.spamScore}/10
                      </p>
                    </div>
                    <Progress 
                      value={domainInfo.spamScore * 10} 
                      className={`h-2 ${domainInfo.spamScore > 5 ? 'bg-red-500' : 'bg-yellow-500'}`} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">About Domain Authority Checker</h3>
          <p className="text-gray-600 text-sm">
            The Domain Authority Checker tool helps you measure a website's predicted ranking 
            strength in search engines. Domain Authority (DA) is a score developed by Moz 
            that predicts how well a website will rank on search engine result pages. A higher 
            DA score means the website has more potential to receive organic traffic from 
            search engines. This tool also shows Page Authority and Spam Score metrics, which 
            are valuable for SEO analysis and competitor research.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default DomainAuthority;
