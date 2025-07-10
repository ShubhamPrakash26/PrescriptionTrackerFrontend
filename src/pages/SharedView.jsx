import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '../api';

const SharedView = () => {
  const { type, token } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/share/${token}`);
        setDocument(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching shared document:', err);
        setError(err.response?.data?.message || 'Failed to load document');
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md w-full">
          <div className="text-center">
            <FileText className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-500 mb-2">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md w-full">
          <div className="text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Document Not Found</h2>
            <p className="text-gray-600">This document may have expired or been removed.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {type === 'prescription' ? document.title : document.type}
          </h1>
          <p className="text-sm text-gray-500">
            Shared {type} • {new Date(document.date).toLocaleDateString()}
          </p>
        </div>

        {/* Document Details */}
        <div className="space-y-4">
          {document.tags && (
            <div className="flex gap-2">
              {document.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* File Preview */}
          <div className="mt-6">
            {document.imageUrl || document.fileUrl ? (
              <div className="border rounded-lg p-4">
                {(document.imageUrl || document.fileUrl).endsWith('.pdf') ? (
                  <iframe
                    src={document.imageUrl || document.fileUrl}
                    className="w-full h-[600px]"
                    title="Document Preview"
                  />
                ) : (
                  <img
                    src={document.imageUrl || document.fileUrl}
                    alt="Document Preview"
                    className="max-w-full h-auto mx-auto"
                  />
                )}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No preview available</p>
              </div>
            )}
          </div>

          {/* View Full Size Button */}
          {(document.imageUrl || document.fileUrl) && (
            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => window.open(document.imageUrl || document.fileUrl, '_blank')}
                className="inline-flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Full Size
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SharedView; 