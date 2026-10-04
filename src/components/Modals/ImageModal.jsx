import React, { useState } from 'react';
import { X, Upload, Link as LinkIcon, Image as ImageIcon, Check } from 'lucide-react';

const SAMPLE_IMAGES = [
  { title: 'Modern Workspace', url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80' },
  { title: 'Minimalist Desk', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80' },
  { title: 'Code & Screen', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' },
  { title: 'Team Meeting', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' }
];

export default function ImageModal({ onClose, executeCommand, addToast }) {
  const [activeTab, setActiveTab] = useState('stock'); // 'upload' | 'url' | 'stock'
  const [imageUrl, setImageUrl] = useState('');
  const [selectedStock, setSelectedStock] = useState(SAMPLE_IMAGES[0].url);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        executeCommand('insertImage', event.target.result);
        addToast('Image uploaded and inserted');
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertUrl = () => {
    if (imageUrl.trim()) {
      executeCommand('insertImage', imageUrl.trim());
      addToast('Image inserted from URL');
      onClose();
    }
  };

  const handleInsertStock = () => {
    if (selectedStock) {
      executeCommand('insertImage', selectedStock);
      addToast('Stock photo inserted');
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content image-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Insert Image</h2>
          <button className="icon-btn modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="modal-tabs">
          <button
            className={`tab-btn ${activeTab === 'stock' ? 'active' : ''}`}
            onClick={() => setActiveTab('stock')}
          >
            <ImageIcon size={16} />
            <span>Stock Library</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'url' ? 'active' : ''}`}
            onClick={() => setActiveTab('url')}
          >
            <LinkIcon size={16} />
            <span>By URL</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <Upload size={16} />
            <span>Upload File</span>
          </button>
        </div>

        <div className="modal-tab-body">
          {activeTab === 'stock' && (
            <div>
              <p className="sub-text">Choose a high quality sample photo:</p>
              <div className="stock-grid">
                {SAMPLE_IMAGES.map((img, idx) => (
                  <div
                    key={idx}
                    className={`stock-card ${selectedStock === img.url ? 'selected' : ''}`}
                    onClick={() => setSelectedStock(img.url)}
                  >
                    <img src={img.url} alt={img.title} />
                    <div className="stock-card-title">{img.title}</div>
                    {selectedStock === img.url && (
                      <div className="stock-check">
                        <Check size={14} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="modal-footer" style={{ marginTop: '20px' }}>
                <button className="modal-btn" onClick={onClose}>Cancel</button>
                <button className="modal-btn primary-btn" onClick={handleInsertStock}>
                  Insert Stock Image
                </button>
              </div>
            </div>
          )}

          {activeTab === 'url' && (
            <div>
              <p className="sub-text">Paste image address below:</p>
              <input
                type="text"
                placeholder="https://example.com/image.png"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="drawer-input"
                style={{ width: '100%', marginBottom: '16px' }}
              />
              {imageUrl && (
                <div className="image-preview-box">
                  <img src={imageUrl} alt="Preview" onError={() => addToast('Invalid image URL')} />
                </div>
              )}
              <div className="modal-footer" style={{ marginTop: '20px' }}>
                <button className="modal-btn" onClick={onClose}>Cancel</button>
                <button className="modal-btn primary-btn" onClick={handleInsertUrl} disabled={!imageUrl}>
                  Insert Image
                </button>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div>
              <label className="upload-dropzone">
                <Upload size={36} color="#1a73e8" />
                <span>Click or drag image file here</span>
                <span className="sub-text">Supports JPG, PNG, GIF, SVG</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} hidden />
              </label>
              <div className="modal-footer" style={{ marginTop: '20px' }}>
                <button className="modal-btn" onClick={onClose}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
