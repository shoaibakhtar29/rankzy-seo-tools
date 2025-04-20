
import { useState, useEffect } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface KeywordData {
  keyword: string;
  count: number;
  density: number;
}

const KeywordDensity = () => {
  const [text, setText] = useState("");
  const [excludeWords, setExcludeWords] = useState("a, an, the, and, or, but, in, on, at, to, for, by, with, about");
  const [minLength, setMinLength] = useState(3);
  const [keywordData, setKeywordData] = useState<KeywordData[]>([]);
  const [totalWords, setTotalWords] = useState(0);

  useEffect(() => {
    // Call the API to analyze the text when it changes
    analyzeKeywordDensity();
  }, [text, excludeWords, minLength]);

  const analyzeKeywordDensity = () => {
    // This would normally be an API call to the backend
    // For now, we'll calculate it on the frontend
    
    if (!text.trim()) {
      setKeywordData([]);
      setTotalWords(0);
      return;
    }

    // Normalize text and split into words
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    setTotalWords(words.length);

    // Convert excluded words to array and filter out short words
    const excludedWordsArray = excludeWords
      .toLowerCase()
      .split(",")
      .map(word => word.trim());

    // Count words and calculate density
    const wordCounts: Record<string, number> = {};
    words.forEach(word => {
      if (
        word.length >= minLength && 
        !excludedWordsArray.includes(word)
      ) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });

    // Convert to array and calculate density
    const keywordArray = Object.entries(wordCounts).map(([keyword, count]) => ({
      keyword,
      count,
      density: (count / words.length) * 100
    }));

    // Sort by count (descending)
    keywordArray.sort((a, b) => b.count - a.count);

    // Take top 20 keywords
    setKeywordData(keywordArray.slice(0, 20));
  };

  const handleClearText = () => {
    setText("");
  };

  const handlePasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  };

  const handleSampleText = () => {
    setText(
      "Search engine optimization (SEO) is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic rather than direct traffic or paid traffic. The practice of SEO can involve techniques such as keyword research, content creation, link building, and technical website optimization. Many SEO professionals use keyword density as a factor in determining how to optimize content for search engines."
    );
  };

  return (
    <ToolLayout
      title="Keyword Density Analyzer"
      description="Analyze keyword usage and optimize your content for SEO by checking keyword density and frequency."
      toolName="Keyword Density Analyzer"
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
        
        <Textarea
          placeholder="Enter or paste your text here to analyze keyword density..."
          className="min-h-[200px] resize-y"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Excluded Words (comma separated)
            </label>
            <Input
              value={excludeWords}
              onChange={(e) => setExcludeWords(e.target.value)}
              placeholder="Words to exclude from analysis"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Minimum Word Length
            </label>
            <Input
              type="number"
              min="1"
              max="10"
              value={minLength}
              onChange={(e) => setMinLength(parseInt(e.target.value) || 3)}
            />
          </div>
        </div>
        
        {keywordData.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Keyword Analysis Results</h3>
            <p className="text-sm text-gray-600 mb-4">
              Total words analyzed: {totalWords}
            </p>
            
            <div className="space-y-4">
              {keywordData.slice(0, 10).map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">"{item.keyword}"</span>
                    <span className="text-gray-600">
                      {item.count} times ({item.density.toFixed(2)}%)
                    </span>
                  </div>
                  <Progress value={item.density * 4} className="h-2" />
                </div>
              ))}
            </div>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keywordData.slice(10).map((item, index) => (
                <div key={index + 10} className="flex justify-between text-sm">
                  <span className="font-medium">"{item.keyword}"</span>
                  <span className="text-gray-600">
                    {item.count} ({item.density.toFixed(2)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <h3 className="font-semibold mb-2">About Keyword Density Analysis</h3>
          <p className="text-gray-600 text-sm">
            Keyword density is the percentage of times a keyword or phrase appears on a web page compared 
            to the total number of words on the page. In SEO, finding the right keyword density can help 
            optimize your content. Aim for a natural density (usually 1-2%) to avoid keyword stuffing, 
            which can negatively impact rankings.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default KeywordDensity;
