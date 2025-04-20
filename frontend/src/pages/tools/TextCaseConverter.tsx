
import { useState } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TextCaseConverter = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [conversionType, setConversionType] = useState("uppercase");

  const handleConversion = () => {
    // This would normally be an API call to the backend
    // For now, we'll process it on the frontend
    
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    let result = "";
    
    switch (conversionType) {
      case "uppercase":
        result = inputText.toUpperCase();
        break;
      case "lowercase":
        result = inputText.toLowerCase();
        break;
      case "titlecase":
        result = inputText
          .toLowerCase()
          .split(" ")
          .map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
        break;
      case "sentencecase":
        result = inputText.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
        break;
      case "altercase":
        result = inputText
          .split("")
          .map((char, index) => {
            return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
          })
          .join("");
        break;
      case "inversecase":
        result = inputText
          .split("")
          .map(char => {
            if (char === char.toUpperCase()) {
              return char.toLowerCase();
            }
            return char.toUpperCase();
          })
          .join("");
        break;
      default:
        result = inputText;
    }
    
    setOutputText(result);
  };

  const handleClearText = () => {
    setInputText("");
    setOutputText("");
  };

  const handlePasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setInputText(clipboardText);
    } catch (error) {
      console.error("Failed to read clipboard contents: ", error);
    }
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputText).then(
      () => {
        alert("Text copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleSampleText = () => {
    setInputText(
      "This is a sample text for the Text Case Converter tool. It contains lowercase and UPPERCASE letters. This tool can convert text to various cases like Title Case, Sentence case, and more."
    );
  };

  return (
    <ToolLayout
      title="Text Case Converter"
      description="Convert text between different cases: uppercase, lowercase, title case, sentence case, and more."
      toolName="Text Case Converter"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Input Text
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
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
            placeholder="Enter or paste your text here..."
            className="min-h-[150px] resize-y"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Conversion Type
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            <Tabs defaultValue="uppercase" 
                  value={conversionType} 
                  onValueChange={setConversionType}>
              <TabsList>
                <TabsTrigger value="uppercase">UPPERCASE</TabsTrigger>
                <TabsTrigger value="lowercase">lowercase</TabsTrigger>
                <TabsTrigger value="titlecase">Title Case</TabsTrigger>
                <TabsTrigger value="sentencecase">Sentence case</TabsTrigger>
                <TabsTrigger value="altercase">aLtErNaTiNg</TabsTrigger>
                <TabsTrigger value="inversecase">InVeRsE cAsE</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <Button 
            onClick={handleConversion}
            className="w-full bg-seo-600 hover:bg-seo-700"
          >
            Convert Text
          </Button>
        </div>
        
        {outputText && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium">
                Converted Text
              </label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopyOutput}
              >
                Copy to Clipboard
              </Button>
            </div>
            <Card>
              <CardContent className="p-4">
                <div className="whitespace-pre-wrap break-words">
                  {outputText}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <h3 className="font-semibold mb-2">About Text Case Converter</h3>
          <p className="text-gray-600 text-sm">
            This tool allows you to convert text between different cases such as uppercase, lowercase, 
            title case, sentence case, and more. It's useful for formatting text for headings, titles, 
            or when you need to quickly change the case of a block of text without manual retyping.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TextCaseConverter;
