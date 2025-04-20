
import { useState } from "react";
import { toolsApi } from "@/utils/api";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DnsRecords = () => {
  const [domain, setDomain] = useState("");
  const [dnsInfo, setDnsInfo] = useState<{
    domain: string;
    records: {
      a: string[];
      mx: string[];
      txt: string[];
      ns: string[];
    };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLookupDns = async () => {
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
      const response = await toolsApi.lookupDnsRecords(domain);
      setIsLoading(false);
      
      if (response.success) {
        setDnsInfo(response.data);
        toast({
          title: "Success",
          description: "DNS records retrieved successfully",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error looking up DNS records:", error);
      toast({
        title: "Error",
        description: "Failed to lookup DNS records",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="DNS Records Lookup"
      description="Look up all DNS records for any domain including A, MX, TXT, and NS records."
      toolName="DNS Records Lookup"
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
              onClick={handleLookupDns}
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

        {dnsInfo && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                DNS Records for {dnsInfo.domain}
              </label>
            </div>
            <Card>
              <CardContent className="p-4">
                <Tabs defaultValue="a">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="a">A Records</TabsTrigger>
                    <TabsTrigger value="mx">MX Records</TabsTrigger>
                    <TabsTrigger value="txt">TXT Records</TabsTrigger>
                    <TabsTrigger value="ns">NS Records</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="a">
                    <h3 className="text-sm font-medium mb-2">A Records (IPv4 Addresses)</h3>
                    {dnsInfo.records.a.length > 0 ? (
                      <ul className="space-y-1">
                        {dnsInfo.records.a.map((record, index) => (
                          <li key={index} className="text-sm font-mono">{record}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No A records found</p>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="mx">
                    <h3 className="text-sm font-medium mb-2">MX Records (Mail Servers)</h3>
                    {dnsInfo.records.mx.length > 0 ? (
                      <ul className="space-y-1">
                        {dnsInfo.records.mx.map((record, index) => (
                          <li key={index} className="text-sm font-mono">{record}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No MX records found</p>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="txt">
                    <h3 className="text-sm font-medium mb-2">TXT Records (Text Information)</h3>
                    {dnsInfo.records.txt.length > 0 ? (
                      <ul className="space-y-1">
                        {dnsInfo.records.txt.map((record, index) => (
                          <li key={index} className="text-sm font-mono break-words">{record}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No TXT records found</p>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="ns">
                    <h3 className="text-sm font-medium mb-2">NS Records (Nameservers)</h3>
                    {dnsInfo.records.ns.length > 0 ? (
                      <ul className="space-y-1">
                        {dnsInfo.records.ns.map((record, index) => (
                          <li key={index} className="text-sm font-mono">{record}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No NS records found</p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">About DNS Records Lookup</h3>
          <p className="text-gray-600 text-sm">
            The DNS Records Lookup tool allows you to view all the DNS records for a domain. 
            This includes A records (IP addresses), MX records (mail servers), TXT records 
            (verification and policy information), and NS records (nameservers). This tool 
            is useful for diagnosing DNS issues, verifying domain configurations, and 
            understanding a website's infrastructure.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default DnsRecords;
