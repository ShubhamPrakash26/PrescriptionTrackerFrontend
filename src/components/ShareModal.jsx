import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Copy, Mail, Share2, MessageCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api';

const ShareModal = ({ isOpen, onClose, document, documentType }) => {
  const [email, setEmail] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset state when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setShareLink('');
      setError(null);
    }
  }, [isOpen]);

  // Generate a shareable link
  const generateLink = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/api/share/generate-link', {
        type: documentType.toLowerCase(),
        id: document._id
      });
      setShareLink(response.data.shareLink);
      toast.success('Share link generated successfully!');
    } catch (error) {
      console.error('Error generating share link:', error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      toast.error('Failed to generate share link: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  // Send via email
  const sendEmail = async () => {
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await api.post('/api/share/send-email', {
        email,
        type: documentType.toLowerCase(),
        id: document._id
      });
      toast.success('Email sent successfully!');
      setEmail('');
    } catch (error) {
      console.error('Error sending email:', error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      toast.error('Failed to send email: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Share via WhatsApp
  const shareViaWhatsApp = async () => {
    try {
      if (!shareLink) {
        setLoading(true);
        const response = await api.post('/api/share/generate-link', {
          type: documentType.toLowerCase(),
          id: document._id
        });
        setShareLink(response.data.shareLink);
      }
      const whatsappText = encodeURIComponent(
        `Check out this ${documentType}: ${shareLink}`
      );
      window.open(`https://wa.me/?text=${whatsappText}`, '_blank');
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error);
      if (error.response) {
        console.error('Backend error:', error.response.data);
        toast.error('Failed to share via WhatsApp: ' + (error.response.data.message || error.message));
      } else {
        toast.error('Failed to share via WhatsApp: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Share {documentType}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Generate Link Section */}
          <div>
            <Button
              onClick={generateLink}
              disabled={loading}
              className="w-full mb-2 flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Generate Share Link
            </Button>
            
            {shareLink && (
              <div className="flex gap-2">
                <Input
                  value={shareLink}
                  readOnly
                  className="flex-1"
                />
                <Button onClick={copyToClipboard} variant="outline">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Email Section */}
          <div>
            <Label htmlFor="email">Share via Email</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={sendEmail}
                disabled={loading || !email}
                variant="outline"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Share Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={shareViaWhatsApp}
              disabled={loading}
              variant="outline"
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShareModal; 