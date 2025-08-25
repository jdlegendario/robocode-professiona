const nodemailer = require('nodemailer');
const ContactMessage = require('../models/ContactMessage');

/**
 * Configure nodemailer transporter
 */
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

/**
 * @desc    Send contact message
 * @route   POST /api/contact/send
 * @access  Public
 */
const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message, phone, company } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Create contact message in database
    const contactData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject?.trim() || 'New Contact Form Submission',
      message: message.trim(),
      phone: phone?.trim(),
      company: company?.trim(),
      ipAddress: req.ip || req.connection.remoteAddress
    };

    const contactMessage = await ContactMessage.create(contactData);

    // Send email notification
    try {
      const transporter = createTransporter();

      // Email to team
      const teamEmailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_FROM, // Send to team email
        subject: `New Contact Form Message: ${contactData.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #007BFF;">New Contact Form Submission</h2>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
              <h3>Contact Details:</h3>
              <p><strong>Name:</strong> ${contactData.name}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
              <p><strong>Company:</strong> ${contactData.company || 'Not provided'}</p>
              <p><strong>Subject:</strong> ${contactData.subject}</p>
              
              <h3>Message:</h3>
              <div style="background-color: white; padding: 15px; border-left: 4px solid #007BFF; margin: 10px 0;">
                ${contactData.message.replace(/\n/g, '<br>')}
              </div>
              
              <hr style="margin: 20px 0;">
              <p style="color: #6c757d; font-size: 12px;">
                Sent from Robocode Portfolio Website<br>
                Date: ${new Date().toLocaleString()}<br>
                IP: ${contactData.ipAddress}
              </p>
            </div>
          </div>
        `
      };

      // Auto-reply to sender
      const autoReplyOptions = {
        from: process.env.EMAIL_FROM,
        to: contactData.email,
        subject: 'Thank you for contacting Robocode!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #007BFF;">Robocode</h1>
              <p style="color: #6c757d;">The Robocoders - Professional Development Team</p>
            </div>
            
            <h2>Thank you for your message!</h2>
            
            <p>Hi ${contactData.name},</p>
            
            <p>Thank you for reaching out to us! We've received your message and will get back to you within 24-48 hours.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Your message:</h3>
              <p><strong>Subject:</strong> ${contactData.subject}</p>
              <div style="background-color: white; padding: 15px; border-left: 4px solid #007BFF;">
                ${contactData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <p>In the meantime, feel free to check out our latest projects and insights on our website.</p>
            
            <p>Best regards,<br>
            <strong>The Robocode Team</strong><br>
            Professional Development Solutions from Ecuador</p>
            
            <hr style="margin: 30px 0;">
            <div style="text-align: center; color: #6c757d; font-size: 12px;">
              <p>This is an automated response. Please do not reply to this email.</p>
              <p>For urgent matters, please contact us directly through our website.</p>
            </div>
          </div>
        `
      };

      // Send both emails
      await transporter.sendMail(teamEmailOptions);
      await transporter.sendMail(autoReplyOptions);

    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the request if email fails, but log the error
    }

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      data: {
        id: contactMessage._id,
        name: contactMessage.name,
        subject: contactMessage.subject,
        createdAt: contactMessage.createdAt
      }
    });

  } catch (error) {
    console.error('Send contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message. Please try again later.'
    });
  }
};

/**
 * @desc    Get all contact messages
 * @route   GET /api/contact/messages
 * @access  Private (Admin)
 */
const getContactMessages = async (req, res) => {
  try {
    const { page = 1, limit = 20, isRead } = req.query;

    // Build query
    const query = {};
    if (isRead !== undefined) query.isRead = isRead === 'true';

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ContactMessage.countDocuments(query);

    res.status(200).json({
      success: true,
      count: messages.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: messages
    });
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting contact messages'
    });
  }
};

/**
 * @desc    Mark message as read
 * @route   PUT /api/contact/messages/:id/read
 * @access  Private (Admin)
 */
const markMessageAsRead = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message marked as read',
      data: message
    });
  } catch (error) {
    console.error('Mark message as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating message'
    });
  }
};

/**
 * @desc    Delete contact message
 * @route   DELETE /api/contact/messages/:id
 * @access  Private (Admin)
 */
const deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting message'
    });
  }
};

/**
 * @desc    Get contact statistics
 * @route   GET /api/contact/stats
 * @access  Private (Admin)
 */
const getContactStats = async (req, res) => {
  try {
    const [total, unread, thisMonth] = await Promise.all([
      ContactMessage.countDocuments({}),
      ContactMessage.countDocuments({ isRead: false }),
      ContactMessage.countDocuments({
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      })
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        unread,
        thisMonth,
        read: total - unread
      }
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting contact statistics'
    });
  }
};

module.exports = {
  sendContactMessage,
  getContactMessages,
  markMessageAsRead,
  deleteContactMessage,
  getContactStats
};