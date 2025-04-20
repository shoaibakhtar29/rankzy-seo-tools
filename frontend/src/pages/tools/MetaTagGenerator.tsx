
import { useState, useEffect } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MetaTagGenerator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [twitterSite, setTwitterSite] = useState("");
  const [canonical, setCanonical] = useState("");
  
  const [generatedCode, setGeneratedCode] = useState("");
  
  useEffect(() => {
    generateMetaTags();
  }, [
    title,
    description,
    keywords,
    author,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    twitterSite,
    canonical
  ]);
  
  const generateMetaTags = () => {
    // This would normally be an API call to the backend
    // For now, we'll generate it on the frontend
    
    let metaTagsHtml = "";
    
    // Basic meta tags
    if (title) {
      metaTagsHtml += `<title>${title}</title>\n`;
    }
    
    if (description) {
      metaTagsHtml += `<meta name="description" content="${description}" />\n`;
    }
    
    if (keywords) {
      metaTagsHtml += `<meta name="keywords" content="${keywords}" />\n`;
    }
    
    if (author) {
      metaTagsHtml += `<meta name="author" content="${author}" />\n`;
    }
    
    // Open Graph meta tags
    if (ogTitle || title) {
      metaTagsHtml += `<meta property="og:title" content="${ogTitle || title}" />\n`;
    }
    
    if (ogDescription || description) {
      metaTagsHtml += `<meta property="og:description" content="${ogDescription || description}" />\n`;
    }
    
    if (ogImage) {
      metaTagsHtml += `<meta property="og:image" content="${ogImage}" />\n`;
    }
    
    metaTagsHtml += `<meta property="og:type" content="website" />\n`;
    
    // Twitter meta tags
    if (twitterCard) {
      metaTagsHtml += `<meta name="twitter:card" content="${twitterCard}" />\n`;
    }
    
    if (twitterSite) {
      metaTagsHtml += `<meta name="twitter:site" content="@${twitterSite.replace('@', '')}" />\n`;
    }
    
    if (ogTitle || title) {
      metaTagsHtml += `<meta name="twitter:title" content="${ogTitle || title}" />\n`;
    }
    
    if (ogDescription || description) {
      metaTagsHtml += `<meta name="twitter:description" content="${ogDescription || description}" />\n`;
    }
    
    if (ogImage) {
      metaTagsHtml += `<meta name="twitter:image" content="${ogImage}" />\n`;
    }
    
    // Canonical URL
    if (canonical) {
      metaTagsHtml += `<link rel="canonical" href="${canonical}" />\n`;
    }
    
    setGeneratedCode(metaTagsHtml);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode).then(
      () => {
        alert("Meta tags copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };
  
  return (
    <ToolLayout
      title="Meta Tag Generator"
      description="Create optimized meta tags for your website to improve SEO and social media sharing."
      toolName="Meta Tag Generator"
    >
      <Tabs defaultValue="basic">
        <TabsList className="mb-6">
          <TabsTrigger value="basic">Basic Meta Tags</TabsTrigger>
          <TabsTrigger value="social">Social Media Tags</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Title Tag (50-60 characters)
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your page title"
              maxLength={60}
            />
            <div className="text-xs text-gray-500 mt-1">
              Characters: {title.length}/60
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Meta Description (150-160 characters)
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your page"
              maxLength={160}
            />
            <div className="text-xs text-gray-500 mt-1">
              Characters: {description.length}/160
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Meta Keywords (comma separated)
            </label>
            <Input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Author
            </label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Page author"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Open Graph Title (will use page title if empty)
            </label>
            <Input
              value={ogTitle}
              onChange={(e) => setOgTitle(e.target.value)}
              placeholder="Title for social sharing"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Open Graph Description (will use meta description if empty)
            </label>
            <Textarea
              value={ogDescription}
              onChange={(e) => setOgDescription(e.target.value)}
              placeholder="Description for social sharing"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Open Graph Image URL
            </label>
            <Input
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Twitter Card Type
            </label>
            <select
              value={twitterCard}
              onChange={(e) => setTwitterCard(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-seo-500 focus:border-seo-500"
            >
              <option value="summary">Summary</option>
              <option value="summary_large_image">Summary with Large Image</option>
              <option value="app">App</option>
              <option value="player">Player</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Twitter @username
            </label>
            <Input
              value={twitterSite}
              onChange={(e) => setTwitterSite(e.target.value)}
              placeholder="yourusername (without @)"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Canonical URL
            </label>
            <Input
              value={canonical}
              onChange={(e) => setCanonical(e.target.value)}
              placeholder="https://example.com/page"
            />
          </div>
        </TabsContent>
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Generated Meta Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap break-all">{generatedCode}</pre>
              </div>
              <Button className="mt-4" onClick={copyToClipboard}>
                Copy to Clipboard
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <h3 className="font-semibold mb-2">About Meta Tags</h3>
          <p className="text-gray-600 text-sm">
            Meta tags provide information about your webpage to search engines and website visitors. 
            These HTML tags are placed in the head section of your HTML document and affect how your 
            pages are displayed in search engine results and when shared on social media.
          </p>
        </div>
      </Tabs>
    </ToolLayout>
  );
};

export default MetaTagGenerator;
