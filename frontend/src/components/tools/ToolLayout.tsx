
import { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { FileText, BarChart, Hash, Globe, Search } from "lucide-react";

interface ToolLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  toolName: string;
}

const popularTools = [
  {
    id: "word-counter",
    name: "Word Counter",
    icon: FileText,
  },
  {
    id: "keyword-density",
    name: "Keyword Density",
    icon: BarChart,
  },
  {
    id: "meta-tag-generator",
    name: "Meta Tag Generator",
    icon: Hash,
  },
  {
    id: "text-case-converter",
    name: "Text Case Converter", 
    icon: Globe,
  },
  {
    id: "plagiarism-checker",
    name: "Plagiarism Checker",
    icon: Search,
  },
];

const ToolLayout = ({ children, title, description, toolName }: ToolLayoutProps) => {
  return (
    <Layout
      title={`${title} | Free SEO Tool | RankReadyTools`}
      description={description || `Use our free ${toolName} tool to improve your website's SEO and content quality.`}
      keywords={`${toolName.toLowerCase()}, free seo tools, ${toolName.toLowerCase()} tool, website optimization`}
    >
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{title}</h1>
              {description && <p className="text-gray-600">{description}</p>}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <Card className="p-6">
                  {children}
                </Card>
              </div>
              
              <div className="order-first lg:order-last mb-8 lg:mb-0">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 className="font-semibold text-lg mb-4">Popular Tools</h3>
                  <ul className="space-y-3">
                    {popularTools.map((tool) => (
                      <li key={tool.id}>
                        <Link 
                          to={`/tools/${tool.id}`}
                          className="flex items-center text-gray-600 hover:text-seo-600"
                        >
                          <tool.icon className="w-4 h-4 mr-2" />
                          <span>{tool.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link 
                      to="/tools"
                      className="text-seo-600 hover:text-seo-700 font-medium flex items-center"
                    >
                      View All Tools
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ToolLayout;
