import React from 'react';
import { X, FileText } from 'lucide-react';

export default function WordCountModal({ stats, showWordCountPill, setShowWordCountPill, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content word-count-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-row">
            <FileText size={20} color="#1a73e8" />
            <h2>Word Count Statistics</h2>
          </div>
          <button className="icon-btn modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="stats-table">
          <div className="stat-row">
            <span className="stat-label">Pages</span>
            <span className="stat-value">{stats.pages || 1}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Words</span>
            <span className="stat-value">{stats.words}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Characters</span>
            <span className="stat-value">{stats.characters}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Characters (excluding spaces)</span>
            <span className="stat-value">{stats.charactersNoSpaces}</span>
          </div>
        </div>

        <div className="modal-checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showWordCountPill}
              onChange={(e) => setShowWordCountPill(e.target.checked)}
            />
            <span>Display word count while typing</span>
          </label>
        </div>

        <div className="modal-footer">
          <button className="modal-btn primary-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
