const express = require('express');
const router = express.Router();

// Import controllers
const {
  wordCounter,
  keywordDensity,
  metaTagGenerator,
  textCaseConverter,
  plagiarismChecker,
  
  paraphraseTool,
  md5Generator,
  wordCombiner,
  imageToText,
  articleRewriter,
  
  imageResizer,
  photoResizerKb,
  cropImage,
  convertToJpg,
  pngToJpg,
  jpgToPng,
  compressImage,
  
  domainAge,
  domainAuthority,
  domainIp,
  domainHosting,
  dnsRecords
} = require('../controllers/toolController');

// Word Counter route
router.post('/word-counter', wordCounter);

// Keyword Density route
router.post('/keyword-density', keywordDensity);

// Meta Tag Generator route
router.post('/meta-tag-generator', metaTagGenerator);

// Text Case Converter route
router.post('/text-case-converter', textCaseConverter);

// Plagiarism Checker route
router.post('/plagiarism-checker', plagiarismChecker);

// Text Analysis Tool Routes
router.post('/paraphrasing-tool', paraphraseTool);
router.post('/md5-generator', md5Generator);
router.post('/word-combiner', wordCombiner);
router.post('/image-to-text', imageToText);
router.post('/article-rewriter', articleRewriter);

// Image Editing Tool Routes
router.post('/image-resizer', imageResizer);
router.post('/photo-resizer-kb', photoResizerKb);
router.post('/crop-image', cropImage);
router.post('/convert-to-jpg', convertToJpg);
router.post('/png-to-jpg', pngToJpg);
router.post('/jpg-to-png', jpgToPng);
router.post('/compress-image', compressImage);

// Domain Tool Routes
router.post('/domain-age', domainAge);
router.post('/domain-authority', domainAuthority);
router.post('/domain-ip', domainIp);
router.post('/domain-hosting', domainHosting);
router.post('/dns-records', dnsRecords);

module.exports = router;
