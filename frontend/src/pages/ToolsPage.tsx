
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Search, FileText, BarChart, Hash, Globe, Info, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Tool categories
const categories = [
  { id: "all", name: "All Tools" },
  { id: "content", name: "Content Tools" },
  { id: "meta", name: "Meta & Structure" },
  { id: "backlinks", name: "Backlink Tools" },
  { id: "keywords", name: "Keyword Tools" },
  { id: "conversion", name: "Conversion Tools" },
];

// Tools data
const tools = [
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, and sentences in your content",
    icon: FileText,
    color: "bg-blue-100 text-blue-600",
    category: "content",
  },
  {
    id: "plagiarism-checker",
    name: "Plagiarism Checker",
    description: "Check if your content is unique and free from plagiarism",
    icon: Search,
    color: "bg-red-100 text-red-600",
    category: "content",
  },
  {
    id: "keyword-density",
    name: "Keyword Density Analyzer",
    description: "Analyze keyword usage and optimize content for SEO",
    icon: BarChart,
    color: "bg-green-100 text-green-600",
    category: "keywords",
  },
  {
    id: "meta-tag-generator",
    name: "Meta Tag Generator",
    description: "Create optimized meta tags for better search visibility",
    icon: Hash,
    color: "bg-purple-100 text-purple-600",
    category: "meta",
  },
  {
    id: "text-case-converter",
    name: "Text Case Converter",
    description: "Convert text between different cases (uppercase, lowercase, title case)",
    icon: Globe,
    color: "bg-amber-100 text-amber-600",
    category: "conversion",
  },
  {
    id: "backlink-checker",
    name: "Backlink Checker",
    description: "Analyze your website's backlink profile",
    icon: LinkIcon,
    color: "bg-indigo-100 text-indigo-600",
    category: "backlinks",
  },
  {
    id: "robots-txt-generator",
    name: "Robots.txt Generator",
    description: "Create a proper robots.txt file for your website",
    icon: Info,
    color: "bg-cyan-100 text-cyan-600",
    category: "meta",
  },
];

const ToolsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter tools based on search term and active category
  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout
      title="SEO Tools - Complete List of Free SEO Tools | ShoaibAkhtar.org - Online SEO Tools"
      description="Explore our comprehensive collection of free SEO tools to optimize your website, improve rankings, and boost your online visibility."
      keywords="seo tools, free seo tools, website optimization, content analysis, keyword research, meta tags"
    >
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Free SEO Tools</h1>
            <p className="text-lg text-gray-600">
              Explore our complete collection of free SEO tools to help you optimize your website and improve your search engine rankings.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for a tool..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="max-w-4xl mx-auto">
            <TabsList className="mb-8 flex flex-wrap justify-center">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="px-4 py-2 data-[state=active]:bg-seo-600 data-[state=active]:text-white"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeCategory} className="mt-0">
              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map((tool) => (
                    <Link key={tool.id} to={`/tools/${tool.id}`}>
                      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-seo-400">
                        <CardHeader className="pb-2">
                          <div className={`w-12 h-12 rounded-full ${tool.color} flex items-center justify-center mb-2`}>
                            <tool.icon className="w-6 h-6" />
                          </div>
                          <CardTitle>{tool.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-gray-600">
                            {tool.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600 mb-4">No tools found matching your search.</p>
                  <Button onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ToolsPage;
