// Word Counter Controller
exports.wordCounter = (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Text is required'
      });
    }
    
    // Calculate text stats
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s+/g, "").length;
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(s => s.trim()).length;
    const readingTime = Math.ceil(words / 225); // Average reading speed: 225 words per minute
    
    return res.status(200).json({
      success: true,
      data: {
        characters,
        charactersNoSpaces,
        words,
        sentences,
        paragraphs,
        readingTime
      }
    });
  } catch (error) {
    console.error('Word Counter Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing word count',
      error: error.message
    });
  }
};

// Keyword Density Controller
exports.keywordDensity = (req, res) => {
  try {
    const { text, excludeWords, minLength } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Text is required'
      });
    }
    
    // Normalize text and split into words
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const totalWords = words.length;
    
    // Convert excluded words to array and filter out short words
    const excludedWordsArray = (excludeWords || "a, an, the, and, or, but, in, on, at")
      .toLowerCase()
      .split(",")
      .map(word => word.trim());
    
    // Count words and calculate density
    const wordCounts = {};
    words.forEach(word => {
      if (
        word.length >= (minLength || 3) && 
        !excludedWordsArray.includes(word)
      ) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
    
    // Convert to array and calculate density
    const keywordArray = Object.entries(wordCounts).map(([keyword, count]) => ({
      keyword,
      count,
      density: (count / totalWords) * 100
    }));
    
    // Sort by count (descending)
    keywordArray.sort((a, b) => b.count - a.count);
    
    return res.status(200).json({
      success: true,
      data: {
        totalWords,
        keywords: keywordArray
      }
    });
  } catch (error) {
    console.error('Keyword Density Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error analyzing keyword density',
      error: error.message
    });
  }
};

// Meta Tag Generator Controller
exports.metaTagGenerator = (req, res) => {
  try {
    const {
      title,
      description,
      keywords,
      author,
      ogTitle,
      ogDescription,
      ogImage,
      twitterCard,
      twitterSite,
      canonical
    } = req.body;
    
    let metaTagsHtml = "";
    
    // Basic meta tags
    if (title) {
      metaTagsHtml += `<title>${title}</title>\n`;
    }
    
    if (description) {
      metaTagsHtml += `<meta name="description" content="${description}" />\n`;
    }
    
    if (keywords) {
      metaTagsHtml += `<meta name="keywords" content="${keywords}" />\n`;
    }
    
    if (author) {
      metaTagsHtml += `<meta name="author" content="${author}" />\n`;
    }
    
    // Open Graph meta tags
    if (ogTitle || title) {
      metaTagsHtml += `<meta property="og:title" content="${ogTitle || title}" />\n`;
    }
    
    if (ogDescription || description) {
      metaTagsHtml += `<meta property="og:description" content="${ogDescription || description}" />\n`;
    }
    
    if (ogImage) {
      metaTagsHtml += `<meta property="og:image" content="${ogImage}" />\n`;
    }
    
    metaTagsHtml += `<meta property="og:type" content="website" />\n`;
    
    // Twitter meta tags
    if (twitterCard) {
      metaTagsHtml += `<meta name="twitter:card" content="${twitterCard}" />\n`;
    }
    
    if (twitterSite) {
      metaTagsHtml += `<meta name="twitter:site" content="@${twitterSite.replace('@', '')}" />\n`;
    }
    
    if (ogTitle || title) {
      metaTagsHtml += `<meta name="twitter:title" content="${ogTitle || title}" />\n`;
    }
    
    if (ogDescription || description) {
      metaTagsHtml += `<meta name="twitter:description" content="${ogDescription || description}" />\n`;
    }
    
    if (ogImage) {
      metaTagsHtml += `<meta name="twitter:image" content="${ogImage}" />\n`;
    }
    
    // Canonical URL
    if (canonical) {
      metaTagsHtml += `<link rel="canonical" href="${canonical}" />\n`;
    }
    
    return res.status(200).json({
      success: true,
      data: {
        metaTagsHtml
      }
    });
  } catch (error) {
    console.error('Meta Tag Generator Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error generating meta tags',
      error: error.message
    });
  }
};

// Text Case Converter Controller
exports.textCaseConverter = (req, res) => {
  try {
    const { text, conversionType } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Text is required'
      });
    }
    
    if (!conversionType) {
      return res.status(400).json({
        success: false,
        message: 'Conversion type is required'
      });
    }
    
    let result = "";
    
    switch (conversionType) {
      case "uppercase":
        result = text.toUpperCase();
        break;
      case "lowercase":
        result = text.toLowerCase();
        break;
      case "titlecase":
        result = text
          .toLowerCase()
          .split(" ")
          .map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
        break;
      case "sentencecase":
        result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
        break;
      case "altercase":
        result = text
          .split("")
          .map((char, index) => {
            return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
          })
          .join("");
        break;
      case "inversecase":
        result = text
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
        result = text;
    }
    
    return res.status(200).json({
      success: true,
      data: {
        convertedText: result
      }
    });
  } catch (error) {
    console.error('Text Case Converter Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error converting text case',
      error: error.message
    });
  }
};

// Plagiarism Checker Controller
exports.plagiarismChecker = (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Text is required'
      });
    }
    
    // This is a simplified mock implementation
    // In a real application, you would implement actual plagiarism detection
    // using APIs or your own algorithm
    
    // Generate a random originality score between 60-100
    const originalityScore = Math.floor(Math.random() * 40) + 60;
    
    // Generate mock matched sources
    const matchedSources = [
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
    ];
    
    return res.status(200).json({
      success: true,
      data: {
        originalityScore,
        matchedSources
      }
    });
  } catch (error) {
    console.error('Plagiarism Checker Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error checking for plagiarism',
      error: error.message
    });
  }
};

// Text Analysis Tools

// Paraphrasing Tool Controller
exports.paraphraseTool = (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Text is required'
      });
    }
    
    // This is a mock implementation
    // In a real app, you would integrate with an NLP API
    const paraphrasedText = `Paraphrased version of: ${text}`;
    
    return res.status(200).json({
      success: true,
      data: {
        paraphrasedText
      }
    });
  } catch (error) {
    console.error('Paraphrasing Tool Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error paraphrasing text',
      error: error.message
    });
  }
};

// MD5 Generator Controller
exports.md5Generator = (req, res) => {
  try {
    const { text } = req.body;
    const crypto = require('crypto');
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Text is required'
      });
    }
    
    const md5Hash = crypto.createHash('md5').update(text).digest('hex');
    
    return res.status(200).json({
      success: true,
      data: {
        hash: md5Hash
      }
    });
  } catch (error) {
    console.error('MD5 Generator Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error generating MD5 hash',
      error: error.message
    });
  }
};

// Word Combiner Controller
exports.wordCombiner = (req, res) => {
  try {
    const { words } = req.body;
    
    if (!words || !Array.isArray(words)) {
      return res.status(400).json({
        success: false,
        message: 'Words array is required'
      });
    }
    
    const combinedText = words.join(' ');
    
    return res.status(200).json({
      success: true,
      data: {
        combinedText
      }
    });
  } catch (error) {
    console.error('Word Combiner Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error combining words',
      error: error.message
    });
  }
};

// Image to Text Controller
exports.imageToText = (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image URL is required'
      });
    }
    
    // This is a mock implementation
    // In a real app, you would integrate with an OCR service
    const extractedText = "Sample extracted text from image";
    
    return res.status(200).json({
      success: true,
      data: {
        text: extractedText
      }
    });
  } catch (error) {
    console.error('Image to Text Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error extracting text from image',
      error: error.message
    });
  }
};

// Article Rewriter Controller
exports.articleRewriter = (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Text is required'
      });
    }
    
    // This is a mock implementation
    // In a real app, you would integrate with an NLP service
    const rewrittenText = `Rewritten version of: ${text}`;
    
    return res.status(200).json({
      success: true,
      data: {
        rewrittenText
      }
    });
  } catch (error) {
    console.error('Article Rewriter Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error rewriting article',
      error: error.message
    });
  }
};

// Image Editing Tools

// Image Resizer Controller
exports.imageResizer = (req, res) => {
  try {
    const { imageUrl, width, height } = req.body;
    
    if (!imageUrl || !width || !height) {
      return res.status(400).json({
        success: false,
        message: 'Image URL, width, and height are required'
      });
    }
    
    // This is a mock implementation
    // In a real app, you would use Sharp or another image processing library
    return res.status(200).json({
      success: true,
      data: {
        resizedImageUrl: imageUrl,
        width,
        height
      }
    });
  } catch (error) {
    console.error('Image Resizer Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error resizing image',
      error: error.message
    });
  }
};

// Photo Resizer KB Controller
exports.photoResizerKb = (req, res) => {
  try {
    const { imageUrl, targetSize } = req.body;
    
    if (!imageUrl || !targetSize) {
      return res.status(400).json({
        success: false,
        message: 'Image URL and target size are required'
      });
    }
    
    // This is a mock implementation
    return res.status(200).json({
      success: true,
      data: {
        resizedImageUrl: imageUrl,
        finalSize: targetSize
      }
    });
  } catch (error) {
    console.error('Photo Resizer KB Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error resizing photo',
      error: error.message
    });
  }
};

// Crop Image Controller
exports.cropImage = (req, res) => {
  try {
    const { imageUrl, x, y, width, height } = req.body;
    
    if (!imageUrl || !width || !height) {
      return res.status(400).json({
        success: false,
        message: 'Image URL, crop dimensions are required'
      });
    }
    
    // This is a mock implementation
    return res.status(200).json({
      success: true,
      data: {
        croppedImageUrl: imageUrl
      }
    });
  } catch (error) {
    console.error('Crop Image Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error cropping image',
      error: error.message
    });
  }
};

// Convert to JPG Controller
exports.convertToJpg = (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image URL is required'
      });
    }
    
    // This is a mock implementation
    return res.status(200).json({
      success: true,
      data: {
        convertedImageUrl: imageUrl.replace(/\.[^/.]+$/, '.jpg')
      }
    });
  } catch (error) {
    console.error('Convert to JPG Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error converting image to JPG',
      error: error.message
    });
  }
};

// PNG to JPG Controller
exports.pngToJpg = (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'PNG image URL is required'
      });
    }
    
    // This is a mock implementation
    return res.status(200).json({
      success: true,
      data: {
        jpgImageUrl: imageUrl.replace('.png', '.jpg')
      }
    });
  } catch (error) {
    console.error('PNG to JPG Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error converting PNG to JPG',
      error: error.message
    });
  }
};

// JPG to PNG Controller
exports.jpgToPng = (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'JPG image URL is required'
      });
    }
    
    // This is a mock implementation
    return res.status(200).json({
      success: true,
      data: {
        pngImageUrl: imageUrl.replace('.jpg', '.png')
      }
    });
  } catch (error) {
    console.error('JPG to PNG Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error converting JPG to PNG',
      error: error.message
    });
  }
};

// Compress Image Controller
exports.compressImage = (req, res) => {
  try {
    const { imageUrl, quality } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image URL is required'
      });
    }
    
    // This is a mock implementation
    return res.status(200).json({
      success: true,
      data: {
        compressedImageUrl: imageUrl,
        originalSize: '1.2MB',
        compressedSize: '400KB'
      }
    });
  } catch (error) {
    console.error('Compress Image Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error compressing image',
      error: error.message
    });
  }
};

// Domain Tools

// Domain Age Controller
exports.domainAge = (req, res) => {
  try {
    const { domain } = req.body;
    
    if (!domain) {
      return res.status(400).json({
        success: false,
        message: 'Domain name is required'
      });
    }
    
    // This is a mock implementation
    return res.status(200).json({
      success: true,
      data: {
        domain,
        registrationDate: '2020-01-01',
        age: '3 years, 2 months'
      }
    });
  } catch (error) {
    console.error('Domain Age Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error checking domain age',
      error: error.message
    });
  }
};

// Domain Authority Controller
exports.domainAuthority = (req, res) => {
  try {
    const { domain } = req.body;
    
    if (!domain) {
      return res.status(400).json({
        success: false,
        message: 'Domain name is required'
      });
    }
    
    // This is a mock implementation
    return res.status(200).json({
      success: true,
      data: {
        domain,
        domainAuthority: 45,
        pageAuthority: 38,
        spamScore: 1
      }
    });
  } catch (error) {
    console.error('Domain Authority Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error checking domain authority',
      error: error.message
    });
  }
};

// Domain IP Controller
exports.domainIp = (req, res) => {
  try {
    const { domain } = req.body;
    
    if (!domain) {
      return res.status(400).json({
        success: false,
        message: 'Domain name is required'
      });
    }
    
    // This is a mock implementation
    return res.status(200).json({
      success: true,
      data: {
        domain,
        ipAddress: '192.168.1.1',
        location: 'United States',
        isp: 'Example ISP'
      }
    });
  } catch (error) {
    console.error('Domain IP Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error looking up domain IP',
      error: error.message
    });
  }
};

// Domain Hosting Controller
exports.domainHosting = (req, res) => {
  try {
    const { domain } = req.body;
    
    if (!domain) {
      return res.status(400).json({
        success: false,
        message: 'Domain name is required'
      });
    }
    
    // This is a mock implementation
    return res.status(200).json({
      success: true,
      data: {
        domain,
        hostingProvider: 'Example Hosting',
        nameservers: [
          'ns1.example.com',
          'ns2.example.com'
        ],
        country: 'United States'
      }
    });
  } catch (error) {
    console.error('Domain Hosting Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error checking domain hosting',
      error: error.message
    });
  }
};

// DNS Records Controller
exports.dnsRecords = (req, res) => {
  try {
    const { domain } = req.body;
    
    if (!domain) {
      return res.status(400).json({
        success: false,
        message: 'Domain name is required'
      });
    }
    
    // This is a mock implementation
    return res.status(200).json({
      success: true,
      data: {
        domain,
        records: {
          a: ['192.168.1.1'],
          mx: ['mail.example.com'],
          txt: ['v=spf1 include:_spf.example.com ~all'],
          ns: ['ns1.example.com', 'ns2.example.com']
        }
      }
    });
  } catch (error) {
    console.error('DNS Records Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching DNS records',
      error: error.message
    });
  }
};
