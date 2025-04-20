
import { useState, useEffect } from "react";
import ToolLayout from "@/components/tools/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WordCounter = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  useEffect(() => {
    // Call the API to get the stats
    if (text) {
      fetchWordCount(text);
    } else {
      setStats({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
      });
    }
  }, [text]);

  const fetchWordCount = async (text: string) => {
    try {
      // In a production environment, this would make an API call
      // Since we don't have the backend running in this demo, we'll calculate locally
      const characters = text.length;
      const charactersNoSpaces = text.replace(/\s+/g, "").length;
      const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
      const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
      const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(s => s.trim()).length;
      const readingTime = Math.ceil(words / 225); // Average reading speed: 225 words per minute

      setStats({
        characters,
        charactersNoSpaces,
        words,
        sentences,
        paragraphs,
        readingTime,
      });

      // When backend is set up, use this code instead:
      // import { toolsApi } from "@/utils/api";
      // const response = await toolsApi.countWords(text);
      // if (response.success) {
      //   setStats(response.data);
      // }
    } catch (error) {
      console.error("Error fetching word count:", error);
    }
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.\n\nCras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.\n\nDuis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue."
    );
  };

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs in your text. Useful for content creators, students, and SEO professionals."
      toolName="Word Counter"
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
          placeholder="Enter or paste your text here..."
          className="min-h-[200px] resize-y"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-seo-600">{stats.words}</div>
              <div className="text-sm text-gray-500">Words</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-seo-600">{stats.characters}</div>
              <div className="text-sm text-gray-500">Characters</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-seo-600">{stats.charactersNoSpaces}</div>
              <div className="text-sm text-gray-500">Characters (no spaces)</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-seo-600">{stats.sentences}</div>
              <div className="text-sm text-gray-500">Sentences</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-seo-600">{stats.paragraphs}</div>
              <div className="text-sm text-gray-500">Paragraphs</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-seo-600">{stats.readingTime}</div>
              <div className="text-sm text-gray-500">Min Read</div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <h3 className="font-semibold mb-2">About Word Counter</h3>
          <p className="text-gray-600 text-sm">
            This tool counts the number of words, characters, sentences, and paragraphs in your text.
            It's useful for content creators, students writing essays with word limits, and SEO professionals
            optimizing content length.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default WordCounter;
