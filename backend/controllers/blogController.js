const BlogPost = require('../models/BlogPost');

/**
 * @desc    Get all blog posts
 * @route   GET /api/blog
 * @access  Public
 */
const getBlogPosts = async (req, res) => {
  try {
    const { 
      category, 
      tag, 
      language = 'en', 
      page = 1, 
      limit = 10,
      published = true 
    } = req.query;
    
    // Build query
    const query = {};
    if (published) query.isPublished = true;
    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag.toLowerCase()] };
    if (language) query.language = language;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-content'); // Exclude full content from list

    const total = await BlogPost.countDocuments(query);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: posts
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting blog posts'
    });
  }
};

/**
 * @desc    Get single blog post
 * @route   GET /api/blog/:slug
 * @access  Public
 */
const getBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      slug: req.params.slug,
      isPublished: true
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting blog post'
    });
  }
};

/**
 * @desc    Get blog categories
 * @route   GET /api/blog/categories
 * @access  Public
 */
const getBlogCategories = async (req, res) => {
  try {
    const categories = await BlogPost.distinct('category', { isPublished: true });
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get blog categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting blog categories'
    });
  }
};

/**
 * @desc    Get blog tags
 * @route   GET /api/blog/tags
 * @access  Public
 */
const getBlogTags = async (req, res) => {
  try {
    const posts = await BlogPost.find({ isPublished: true }, 'tags');
    const allTags = posts.reduce((tags, post) => {
      return tags.concat(post.tags);
    }, []);
    
    const uniqueTags = [...new Set(allTags)];
    
    res.status(200).json({
      success: true,
      data: uniqueTags
    });
  } catch (error) {
    console.error('Get blog tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting blog tags'
    });
  }
};

/**
 * @desc    Create blog post
 * @route   POST /api/blog
 * @access  Private (Admin)
 */
const createBlogPost = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      author,
      tags,
      category,
      language,
      isPublished
    } = req.body;

    // Validate required fields
    if (!title || !excerpt || !content || !author) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, excerpt, content, and author'
      });
    }

    const postData = {
      title,
      excerpt,
      content,
      author,
      tags: Array.isArray(tags) ? tags.map(tag => tag.toLowerCase()) : [],
      category: category || 'General',
      language: language || 'en',
      isPublished: isPublished === true,
      publishedAt: isPublished ? new Date() : undefined
    };

    // Add featured image if uploaded
    if (req.processedFile) {
      postData.featuredImage = {
        url: req.processedFile.url,
        alt: title
      };
    }

    const blogPost = await BlogPost.create(postData);

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blogPost
    });
  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating blog post'
    });
  }
};

/**
 * @desc    Update blog post
 * @route   PUT /api/blog/:id
 * @access  Private (Admin)
 */
const updateBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    const updateData = { ...req.body };

    // Ensure tags is an array and lowercase
    if (updateData.tags && Array.isArray(updateData.tags)) {
      updateData.tags = updateData.tags.map(tag => tag.toLowerCase());
    }

    // Update published date if publishing for first time
    if (updateData.isPublished && !post.isPublished) {
      updateData.publishedAt = new Date();
    }

    // Handle new featured image
    if (req.processedFile) {
      updateData.featuredImage = {
        url: req.processedFile.url,
        alt: updateData.title || post.title
      };
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedPost
    });
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating blog post'
    });
  }
};

/**
 * @desc    Delete blog post
 * @route   DELETE /api/blog/:id
 * @access  Private (Admin)
 */
const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    await BlogPost.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting blog post'
    });
  }
};

/**
 * @desc    Get all blog posts for admin
 * @route   GET /api/blog/admin/all
 * @access  Private (Admin)
 */
const getAllBlogPostsAdmin = async (req, res) => {
  try {
    const posts = await BlogPost.find({})
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('Get all blog posts admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting blog posts'
    });
  }
};

/**
 * @desc    Get blog statistics
 * @route   GET /api/blog/stats
 * @access  Private (Admin)
 */
const getBlogStats = async (req, res) => {
  try {
    const [total, published, draft, totalViews] = await Promise.all([
      BlogPost.countDocuments({}),
      BlogPost.countDocuments({ isPublished: true }),
      BlogPost.countDocuments({ isPublished: false }),
      BlogPost.aggregate([
        { $group: { _id: null, totalViews: { $sum: '$views' } } }
      ])
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        published,
        draft,
        totalViews: totalViews[0]?.totalViews || 0
      }
    });
  } catch (error) {
    console.error('Get blog stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting blog statistics'
    });
  }
};

module.exports = {
  getBlogPosts,
  getBlogPost,
  getBlogCategories,
  getBlogTags,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getAllBlogPostsAdmin,
  getBlogStats
};