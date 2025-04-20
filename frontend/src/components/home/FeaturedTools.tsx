import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, FileText, BarChart, Hash, Globe, Pencil, Image, CropIcon, FileImage, Archive, Server } from "lucide-react";

const toolCategories = [
  {
    id: "popular",
    title: "Popular SEO Tools",
    description: "Our most popular tools to help you optimize your website content and improve your search engine rankings.",
    tools: [
      {
        id: "word-counter",
        name: "Word Counter",
        description: "Count words, characters, and sentences in your content",
        icon: FileText,
        color: "bg-blue-100 text-blue-600",
      },
      {
        id: "plagiarism-checker",
        name: "Plagiarism Checker",
        description: "Check if your content is unique and free from plagiarism",
        icon: Search,
        color: "bg-red-100 text-red-600",
      },
      {
        id: "keyword-density",
        name: "Keyword Density Analyzer",
        description: "Analyze keyword usage and optimize content for SEO",
        icon: BarChart,
        color: "bg-green-100 text-green-600",
      },
      {
        id: "meta-tag-generator",
        name: "Meta Tag Generator",
        description: "Create optimized meta tags for better search visibility",
        icon: Hash,
        color: "bg-purple-100 text-purple-600",
      },
      {
        id: "text-case-converter",
        name: "Text Case Converter",
        description: "Convert text between different cases (uppercase, lowercase, title case)",
        icon: Globe,
        color: "bg-amber-100 text-amber-600",
      },
    ]
  },
  {
    id: "text-analysis",
    title: "Text Analysis Tools",
    description: "Advanced tools for analyzing and improving your text content.",
    tools: [
      {
        id: "paraphrasing-tool",
        name: "Paraphrasing Tool",
        description: "Rewrite content while maintaining its meaning",
        icon: Pencil,
        color: "bg-teal-100 text-teal-600",
      },
      {
        id: "md5-generator",
        name: "MD5 Generator",
        description: "Generate MD5 hash from text input",
        icon: Hash,
        color: "bg-indigo-100 text-indigo-600",
      },
      {
        id: "text-case-converter",
        name: "Text Case Converter",
        description: "Convert text between different cases",
        icon: Globe,
        color: "bg-amber-100 text-amber-600",
      },
      {
        id: "word-combiner",
        name: "Word Combiner",
        description: "Combine multiple words or texts together",
        icon: FileText,
        color: "bg-rose-100 text-rose-600",
      },
      {
        id: "image-to-text",
        name: "Image To Text Converter",
        description: "Extract text from images (OCR)",
        icon: Image,
        color: "bg-violet-100 text-violet-600",
      },
      {
        id: "article-rewriter",
        name: "Article Rewriter",
        description: "Rewrite articles maintaining context",
        icon: Pencil,
        color: "bg-emerald-100 text-emerald-600",
      },
    ]
  },
  {
    id: "image-editing",
    title: "Image Editing Tools",
    description: "Professional tools for editing and optimizing your images.",
    tools: [
      {
        id: "image-resizer",
        name: "Image Resizer",
        description: "Resize images to specific dimensions",
        icon: CropIcon,
        color: "bg-sky-100 text-sky-600",
      },
      {
        id: "photo-resizer-kb",
        name: "Photo Resizer In KB",
        description: "Resize images to specific file size",
        icon: CropIcon,
        color: "bg-pink-100 text-pink-600",
      },
      {
        id: "crop-image",
        name: "Crop Image",
        description: "Crop images to specific dimensions",
        icon: CropIcon,
        color: "bg-purple-100 text-purple-600",
      },
      {
        id: "convert-to-jpg",
        name: "Convert To JPG",
        description: "Convert images to JPG format",
        icon: FileImage,
        color: "bg-orange-100 text-orange-600",
      },
      {
        id: "png-to-jpg",
        name: "PNG To JPG",
        description: "Convert PNG images to JPG format",
        icon: FileImage,
        color: "bg-cyan-100 text-cyan-600",
      },
      {
        id: "jpg-to-png",
        name: "JPG To PNG",
        description: "Convert JPG images to PNG format",
        icon: FileImage,
        color: "bg-lime-100 text-lime-600",
      },
      {
        id: "compress-image",
        name: "Compress Image",
        description: "Reduce image file size",
        icon: Archive,
        color: "bg-yellow-100 text-yellow-600",
      },
    ]
  },
  {
    id: "domain-tools",
    title: "Domain Tools",
    description: "Essential tools for analyzing and managing domains.",
    tools: [
      {
        id: "domain-age",
        name: "Domain Age Checker",
        description: "Check how old a domain is",
        icon: Search,
        color: "bg-fuchsia-100 text-fuchsia-600",
      },
      {
        id: "domain-authority",
        name: "Domain Authority Checker",
        description: "Check domain authority score",
        icon: Search,
        color: "bg-red-100 text-red-600",
      },
      {
        id: "domain-ip",
        name: "Domain IP Lookup",
        description: "Find IP address of a domain",
        icon: Server,
        color: "bg-blue-100 text-blue-600",
      },
      {
        id: "domain-hosting",
        name: "Domain Hosting Checker",
        description: "Check where a domain is hosted",
        icon: Server,
        color: "bg-green-100 text-green-600",
      },
      {
        id: "dns-records",
        name: "Find DNS Records",
        description: "Look up DNS records for a domain",
        icon: FileText,
        color: "bg-purple-100 text-purple-600",
      },
    ]
  }
];

const FeaturedTools = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {toolCategories.map((category) => (
          <div key={category.id} className="mb-20 last:mb-0">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.tools.map((tool) => (
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
          </div>
        ))}
        
        <div className="text-center mt-12">
          <Link
            to="/tools"
            className="inline-flex items-center text-seo-600 hover:text-seo-700 font-medium"
          >
            View All Tools
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;
