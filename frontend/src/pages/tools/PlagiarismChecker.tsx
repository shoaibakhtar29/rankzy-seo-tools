
import { useState } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

const PlagiarismChecker = () => {
  const [text, setText] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<null | {
    originalityScore: number;
    matchedSources: Array<{ url: string; matchPercentage: number; matchedText: string }>;
  }>(null);

  const handleCheck = () => {
    if (!text.trim()) {
      alert("Please enter some text to check for plagiarism");
      return;
    }

    setIsChecking(true);

    // This would normally be an API call to the backend
    // For now, we'll simulate a response after a delay
    setTimeout(() => {
      // Mock response - in a real app, this would come from the backend
      const mockResults = {
        originalityScore: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        matchedSources: [
          {
            url: "https://example.com/article-about-seo",
            matchPercentage: Math.floor(Math.random() * 20) + 1,
            matchedText: text.substring(0, 50) + "..."
          },
          {
            url: "https://another-site.com/similar-content",
            matchPercentage: Math.floor(Math.random() * 15) + 1,
            matchedText: text.substring(50, 100) + "..."
          }
        ]
      };

      setResults(mockResults);
      setIsChecking(false);
    }, 2000);
  };

  const handleClearText = () => {
    setText("");
    setResults(null);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      setResults(null);
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  };

  const handleSampleText = () => {
    setText(
      "Search engine optimization (SEO) is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic rather than direct traffic or paid traffic. The practice of SEO can involve techniques such as keyword research, content optimization, and backlink building."
    );
    setResults(null);
  };

  return (
    <ToolLayout
      title="Plagiarism Checker"
      description="Check your content for plagiarism to ensure it is unique and original."
      toolName="Plagiarism Checker"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={handlePasteFromClipboard}>
            Paste from Clipboard
          </Button>
          <Button variant="outline" size="sm" onClick={handleSampleText}>
            Sample Text
          </Button>
          <Button variant="outline" size="sm" onClick={handleClearText}>
            Clear
          </Button>
        </div>
        
        <div>
          <Textarea
            placeholder="Enter or paste your text here to check for plagiarism..."
            className="min-h-[200px] resize-y"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="text-xs text-gray-500 mt-1">
            Characters: {text.length} (minimum 50 characters recommended)
          </div>
        </div>
        
        <Button
          onClick={handleCheck}
          disabled={isChecking || text.length < 20}
          className="w-full bg-seo-600 hover:bg-seo-700"
        >
          {isChecking ? "Checking..." : "Check for Plagiarism"}
        </Button>
        
        {isChecking && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-seo-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking your text for plagiarism...</p>
          </div>
        )}
        
        {results && (
          <div className="mt-8 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Plagiarism Check Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-1/3 text-center">
                    <div className="relative w-40 h-40 mx-auto">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">
                          {results.originalityScore}%
                        </span>
                      </div>
                      <svg className="w-40 h-40" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={results.originalityScore > 80 ? "#10b981" : results.originalityScore > 60 ? "#f59e0b" : "#ef4444"}
                          strokeWidth="8"
                          strokeDasharray="282.7"
                          strokeDashoffset={282.7 - (282.7 * results.originalityScore) / 100}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                    <p className="mt-2 font-medium">Originality Score</p>
                  </div>
                  
                  <div className="w-full md:w-2/3">
                    <div className="flex items-center gap-2 mb-4">
                      {results.originalityScore > 80 ? (
                        <>
                          <CheckCircle className="text-green-500 h-5 w-5" />
                          <span className="font-medium text-green-600">Mostly Original Content</span>
                        </>
                      ) : results.originalityScore > 60 ? (
                        <>
                          <Info className="text-amber-500 h-5 w-5" />
                          <span className="font-medium text-amber-600">Some Similarities Found</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="text-red-500 h-5 w-5" />
                          <span className="font-medium text-red-600">Significant Plagiarism Detected</span>
                        </>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p>
                        {results.originalityScore > 80
                          ? "Your content appears to be mostly original. Great job!"
                          : results.originalityScore > 60
                          ? "Your content has some similarities with existing online content. Consider revising the highlighted sections."
                          : "Your content contains significant similarities with existing online content. Please revise to avoid plagiarism issues."}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {results.matchedSources.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Similar Content Found</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.matchedSources.map((source, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium text-seo-700 truncate">{source.url}</p>
                          <span className="text-sm font-semibold">{source.matchPercentage}% match</span>
                        </div>
                        <Progress value={source.matchPercentage * 5} className="h-1 mb-2" />
                        <div className="text-sm text-gray-600 italic">
                          <p>"{source.matchedText}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
        
        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <h3 className="font-semibold mb-2">About Plagiarism Checker</h3>
          <p className="text-gray-600 text-sm">
            This tool helps you check your content for plagiarism by comparing it against billions of web pages, 
            academic papers, and publications. Using original content is crucial for SEO success and avoiding 
            potential copyright issues. Always aim for unique, high-quality content to improve your search rankings.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PlagiarismChecker;
