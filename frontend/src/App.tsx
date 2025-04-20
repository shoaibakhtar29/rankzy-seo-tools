import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ToolsPage from "./pages/ToolsPage";
import WordCounter from "./pages/tools/WordCounter";
import KeywordDensity from "./pages/tools/KeywordDensity";
import MetaTagGenerator from "./pages/tools/MetaTagGenerator";
import TextCaseConverter from "./pages/tools/TextCaseConverter";
import PlagiarismChecker from "./pages/tools/PlagiarismChecker";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

// Text Analysis Tools
import ParaphrasingTool from "./pages/tools/ParaphrasingTool";
import MD5Generator from "./pages/tools/MD5Generator";
import WordCombiner from "./pages/tools/WordCombiner";
import ImageToText from "./pages/tools/ImageToText";
import ArticleRewriter from "./pages/tools/ArticleRewriter";

// Image Editing Tools
import ImageResizer from "./pages/tools/ImageResizer";
import PhotoResizerKb from "./pages/tools/PhotoResizerKb";
import CropImage from "./pages/tools/CropImage";
import ConvertToJpg from "./pages/tools/ConvertToJpg";
import PngToJpg from "./pages/tools/PngToJpg";
import JpgToPng from "./pages/tools/JpgToPng";
import CompressImage from "./pages/tools/CompressImage";

// Domain Tools
import DomainAge from "./pages/tools/DomainAge";
import DomainAuthority from "./pages/tools/DomainAuthority";
import DomainIp from "./pages/tools/DomainIp";
import DomainHosting from "./pages/tools/DomainHosting";
import DnsRecords from "./pages/tools/DnsRecords";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/tools/word-counter" element={<WordCounter />} />
          <Route path="/tools/keyword-density" element={<KeywordDensity />} />
          <Route path="/tools/meta-tag-generator" element={<MetaTagGenerator />} />
          <Route path="/tools/text-case-converter" element={<TextCaseConverter />} />
          <Route path="/tools/plagiarism-checker" element={<PlagiarismChecker />} />
          <Route path="/tools/paraphrasing-tool" element={<ParaphrasingTool />} />
          <Route path="/tools/md5-generator" element={<MD5Generator />} />
          <Route path="/tools/word-combiner" element={<WordCombiner />} />
          <Route path="/tools/image-to-text" element={<ImageToText />} />
          <Route path="/tools/article-rewriter" element={<ArticleRewriter />} />
          <Route path="/tools/image-resizer" element={<ImageResizer />} />
          <Route path="/tools/photo-resizer-kb" element={<PhotoResizerKb />} />
          <Route path="/tools/crop-image" element={<CropImage />} />
          <Route path="/tools/convert-to-jpg" element={<ConvertToJpg />} />
          <Route path="/tools/png-to-jpg" element={<PngToJpg />} />
          <Route path="/tools/jpg-to-png" element={<JpgToPng />} />
          <Route path="/tools/compress-image" element={<CompressImage />} />
          <Route path="/tools/domain-age" element={<DomainAge />} />
          <Route path="/tools/domain-authority" element={<DomainAuthority />} />
          <Route path="/tools/domain-ip" element={<DomainIp />} />
          <Route path="/tools/domain-hosting" element={<DomainHosting />} />
          <Route path="/tools/dns-records" element={<DnsRecords />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
