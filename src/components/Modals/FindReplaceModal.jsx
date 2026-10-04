import React, { useState } from 'react';
import { X, Search, ChevronDown, ChevronUp, Replace } from 'lucide-react';

export default function FindReplaceModal({ editorRef, onClose, addToast }) {
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [matchCase, setMatchCase] = useState(false);

  const handleFindNext = () => {
    if (!findText) return;
    if (window.find) {
      const found = window.find(findText, matchCase, false, true, false, false, false);
      if (!found) {
        addToast(`No matches found for "${findText}"`);
      }
    }
  };

  const handleReplace = () => {
    if (!findText || !editorRef.current) return;
    const sel = window.getSelection();
    if (sel.toString().toLowerCase() === findText.toLowerCase()) {
      document.execCommand('insertText', false, replaceText);
      handleFindNext();
      addToast('Replaced 1 occurrence');
    } else {
      handleFindNext();
    }
  };

  const handleReplaceAll = () => {
    if (!findText || !editorRef.current) return;
    const content = editorRef.current.innerHTML;
    const flags = matchCase ? 'g' : 'gi';
    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
    const matches = (content.match(regex) || []).length;
    if (matches > 0) {
      editorRef.current.innerHTML = content.replace(regex, replaceText);
      addToast(`Replaced ${matches} occurrence(s)`);
    } else {
      addToast(`No matches found for "${findText}"`);
    }
  };

  return (
    <div className="find-replace-bar">
      <div className="find-input-wrapper">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Find in document"
          value={findText}
          onChange={(e) => setFindText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleFindNext();
          }}
          autoFocus
        />
        <button className="icon-btn" onClick={handleFindNext} title="Find Next">
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="replace-input-wrapper">
        <Replace size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Replace with..."
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleReplace();
          }}
        />
      </div>

      <div className="find-actions">
        <button className="find-btn" onClick={handleReplace}>Replace</button>
        <button className="find-btn primary" onClick={handleReplaceAll}>Replace all</button>
        <button className="icon-btn close-find-btn" onClick={onClose} title="Close">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
