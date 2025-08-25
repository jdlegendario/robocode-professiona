const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

// Configure multer for file uploads
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 // 5MB default
  }
});

/**
 * Middleware to process and optimize uploaded images
 */
const processImage = async (req, res, next) => {
  try {
    if (!req.file) return next();

    // Generate unique filename
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
    const outputPath = path.join(process.env.UPLOAD_PATH || './uploads', filename);

    // Ensure upload directory exists
    const uploadDir = path.dirname(outputPath);
    await fs.mkdir(uploadDir, { recursive: true });

    // Process image with Sharp
    await sharp(req.file.buffer)
      .resize(1200, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: 85
      })
      .toFile(outputPath);

    // Create thumbnail
    const thumbnailFilename = `thumb-${filename}`;
    const thumbnailPath = path.join(uploadDir, thumbnailFilename);

    await sharp(req.file.buffer)
      .resize(300, 200, {
        fit: 'cover'
      })
      .webp({
        quality: 75
      })
      .toFile(thumbnailPath);

    // Add processed file info to request
    req.processedFile = {
      filename: filename,
      thumbnailFilename: thumbnailFilename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: outputPath,
      thumbnailPath: thumbnailPath,
      url: `/uploads/${filename}`,
      thumbnailUrl: `/uploads/${thumbnailFilename}`
    };

    next();
  } catch (error) {
    console.error('Image processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing image'
    });
  }
};

/**
 * Error handling middleware for multer
 */
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large'
      });
    }
  }
  
  if (error.message === 'Only image files are allowed!') {
    return res.status(400).json({
      success: false,
      message: 'Only image files are allowed'
    });
  }

  next(error);
};

module.exports = {
  upload,
  processImage,
  handleUploadError
};