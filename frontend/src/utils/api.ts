
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Word Counter
const countWords = async (text: string) => {
  const response = await axios.post(`${API_URL}/tools/word-counter`, { text });
  return response.data;
};

// Keyword Density
const analyzeKeywordDensity = async (text: string, excludeWords?: string, minLength?: number) => {
  const response = await axios.post(`${API_URL}/tools/keyword-density`, {
    text,
    excludeWords,
    minLength
  });
  return response.data;
};

// Meta Tag Generator
const generateMetaTags = async (metaData: {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  twitterSite?: string;
  canonical?: string;
}) => {
  const response = await axios.post(`${API_URL}/tools/meta-tag-generator`, metaData);
  return response.data;
};

// Text Case Converter
const convertTextCase = async (text: string, conversionType: string) => {
  const response = await axios.post(`${API_URL}/tools/text-case-converter`, {
    text,
    conversionType
  });
  return response.data;
};

// Plagiarism Checker
const checkPlagiarism = async (text: string) => {
  const response = await axios.post(`${API_URL}/tools/plagiarism-checker`, { text });
  return response.data;
};

// Text Analysis Tools
// Paraphrasing Tool
const paraphraseText = async (text: string) => {
  const response = await axios.post(`${API_URL}/tools/paraphrasing-tool`, { text });
  return response.data;
};

// MD5 Generator
const generateMd5 = async (text: string) => {
  const response = await axios.post(`${API_URL}/tools/md5-generator`, { text });
  return response.data;
};

// Word Combiner
const combineWords = async (words: string[]) => {
  const response = await axios.post(`${API_URL}/tools/word-combiner`, { words });
  return response.data;
};

// Image to Text
const extractTextFromImage = async (imageUrl: string) => {
  const response = await axios.post(`${API_URL}/tools/image-to-text`, { imageUrl });
  return response.data;
};

// Article Rewriter
const rewriteArticle = async (text: string) => {
  const response = await axios.post(`${API_URL}/tools/article-rewriter`, { text });
  return response.data;
};

// Image Editing Tools
// Image Resizer
const resizeImage = async (imageUrl: string, width: number, height: number) => {
  const response = await axios.post(`${API_URL}/tools/image-resizer`, {
    imageUrl,
    width,
    height
  });
  return response.data;
};

// Photo Resizer KB
const resizeImageKb = async (imageUrl: string, targetSize: number) => {
  const response = await axios.post(`${API_URL}/tools/photo-resizer-kb`, {
    imageUrl,
    targetSize
  });
  return response.data;
};

// Crop Image
const cropImage = async (imageUrl: string, x: number, y: number, width: number, height: number) => {
  const response = await axios.post(`${API_URL}/tools/crop-image`, {
    imageUrl,
    x,
    y,
    width,
    height
  });
  return response.data;
};

// Convert to JPG
const convertToJpg = async (imageUrl: string) => {
  const response = await axios.post(`${API_URL}/tools/convert-to-jpg`, { imageUrl });
  return response.data;
};

// PNG to JPG
const convertPngToJpg = async (imageUrl: string) => {
  const response = await axios.post(`${API_URL}/tools/png-to-jpg`, { imageUrl });
  return response.data;
};

// JPG to PNG
const convertJpgToPng = async (imageUrl: string) => {
  const response = await axios.post(`${API_URL}/tools/jpg-to-png`, { imageUrl });
  return response.data;
};

// Compress Image
const compressImage = async (imageUrl: string, quality: number) => {
  const response = await axios.post(`${API_URL}/tools/compress-image`, {
    imageUrl,
    quality
  });
  return response.data;
};

// Domain Tools
// Domain Age
const checkDomainAge = async (domain: string) => {
  const response = await axios.post(`${API_URL}/tools/domain-age`, { domain });
  return response.data;
};

// Domain Authority
const checkDomainAuthority = async (domain: string) => {
  const response = await axios.post(`${API_URL}/tools/domain-authority`, { domain });
  return response.data;
};

// Domain IP
const lookupDomainIp = async (domain: string) => {
  const response = await axios.post(`${API_URL}/tools/domain-ip`, { domain });
  return response.data;
};

// Domain Hosting
const checkDomainHosting = async (domain: string) => {
  const response = await axios.post(`${API_URL}/tools/domain-hosting`, { domain });
  return response.data;
};

// DNS Records
const lookupDnsRecords = async (domain: string) => {
  const response = await axios.post(`${API_URL}/tools/dns-records`, { domain });
  return response.data;
};

export const toolsApi = {
  countWords,
  analyzeKeywordDensity,
  generateMetaTags,
  convertTextCase,
  checkPlagiarism,

  // Text Analysis Tools
  paraphraseText,
  generateMd5,
  combineWords,
  extractTextFromImage,
  rewriteArticle,

  // Image Editing Tools
  resizeImage,
  resizeImageKb,
  cropImage,
  convertToJpg,
  convertPngToJpg,
  convertJpgToPng,
  compressImage,

  // Domain Tools
  checkDomainAge,
  checkDomainAuthority,
  lookupDomainIp,
  checkDomainHosting,
  lookupDnsRecords
};
