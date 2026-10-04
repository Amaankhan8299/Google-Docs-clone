import React, { useEffect, useState } from 'react';
import { AlignLeft, ChevronLeft, Plus } from 'lucide-react';

export default function OutlinePanel({ editorRef, onClose }) {
  const [headings, setHeadings] = useState([]);
  const [summary, setSummary] = useState('');

  // Extract headings from editor DOM
  useEffect(() => {
    if (!editorRef.current) return;

    const updateOutline = () => {
      const elements = editorRef.current.querySelectorAll('h1, h2, h3, .heading-1, .heading-2, .heading-3');
      const list = [];
      elements.forEach((el, index) => {
        const text = el.innerText || el.textContent;
        if (text && text.trim()) {
          const level = el.tagName === 'H1' ? 1 : el.tagName === 'H2' ? 2 : 3;
          list.push({
            id: `heading-${index}`,
            text: text.trim(),
            level,
            element: el
          });
          el.setAttribute('id', `heading-${index}`);
        }
      });
      setHeadings(list);
    };

    updateOutline();
    const observer = new MutationObserver(updateOutline);
    observer.observe(editorRef.current, { childList: true, subtree: true, characterData: true });

    return () => observer.disconnect();
  }, [editorRef]);

  const scrollToHeading = (item) => {
    if (item.element) {
      item.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <aside className="outline-panel">
      <div className="outline-header">
        <div className="outline-title">
          <AlignLeft size={16} />
          <span>Outline</span>
        </div>
        <button className="icon-btn close-outline-btn" onClick={onClose} title="Close outline">
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Summary Section */}
      <div className="outline-summary">
        <div className="summary-header">
          <span>Summary</span>
          <button className="add-summary-btn" title="Add summary">
            <Plus size={14} />
          </button>
        </div>
        <input
          type="text"
          className="summary-input"
          placeholder="Add document summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>

      <div className="outline-divider" />

      {/* Headings List */}
      <div className="headings-list">
        {headings.length === 0 ? (
          <div className="no-headings">
            Headings you add to the document will appear here.
          </div>
        ) : (
          headings.map((item) => (
            <div
              key={item.id}
              className={`outline-item level-${item.level}`}
              onClick={() => scrollToHeading(item)}
              title={item.text}
            >
              {item.text}
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
