import React, { useState, useRef, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import Toolbar from './components/Toolbar';
import Ruler from './components/Ruler';
import OutlinePanel from './components/OutlinePanel';
import DocumentEditor from './components/DocumentEditor';
import RightSidebar from './components/RightSidebar';
import ShareModal from './components/Modals/ShareModal';
import ImageModal from './components/Modals/ImageModal';
import TableModal from './components/Modals/TableModal';
import WordCountModal from './components/Modals/WordCountModal';
import FindReplaceModal from './components/Modals/FindReplaceModal';
import Toast from './components/Toast';
import './App.css';

export default function App() {
  // Main Document States
  const [docTitle, setDocTitle] = useState('Untitled document');
  const [isSaved, setIsSaved] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [editorMode, setEditorMode] = useState('editing'); // 'editing' | 'suggesting' | 'viewing'
  const [zoom, setZoom] = useState(100);
  const [showRuler, setShowRuler] = useState(true);
  const [showOutline, setShowOutline] = useState(true);
  const [showWordCountPill, setShowWordCountPill] = useState(false);

  // Modals state
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [isWordCountOpen, setIsWordCountOpen] = useState(false);
  const [isFindReplaceOpen, setIsFindReplaceOpen] = useState(false);

  // Formatting state synced with cursor
  const [formatState, setFormatState] = useState({
    fontName: 'Arial',
    fontSize: '11pt',
    style: 'Normal text',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrikethrough: false,
    textColor: '#000000',
    highlightColor: 'transparent',
    alignment: 'left'
  });

  // Document Stats
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    pages: 1
  });

  // Toasts
  const [toasts, setToasts] = useState([]);
  const saveTimeoutRef = useRef(null);
  const editorRef = useRef(null);

  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync format state with current selection in editor
  const updateFormatState = useCallback(() => {
    if (!editorRef.current) return;
    const sel = window.getSelection();
    if (!sel || !sel.anchorNode) return;

    const isBold = document.queryCommandState('bold');
    const isItalic = document.queryCommandState('italic');
    const isUnderline = document.queryCommandState('underline');
    const isStrikethrough = document.queryCommandState('strikeThrough');

    // Font Family & Size
    let fontName = document.queryCommandValue('fontName') || 'Arial';
    fontName = fontName.replace(/["']/g, '');

    const parentEl = sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement;
    let computedFont = '11pt';
    let computedColor = '#000000';
    let computedBg = 'transparent';
    let computedAlign = 'left';
    let styleLabel = 'Normal text';

    if (parentEl) {
      const style = window.getComputedStyle(parentEl);
      if (style.fontSize) computedFont = style.fontSize;
      if (style.color) computedColor = style.color;
      if (style.backgroundColor) computedBg = style.backgroundColor;
      if (style.textAlign) computedAlign = style.textAlign;

      const tag = parentEl.tagName ? parentEl.tagName.toLowerCase() : '';
      if (tag === 'h1') styleLabel = 'Heading 1';
      else if (tag === 'h2') styleLabel = 'Heading 2';
      else if (tag === 'h3') styleLabel = 'Heading 3';
    }

    setFormatState({
      fontName: fontName.split(',')[0] || 'Arial',
      fontSize: computedFont,
      style: styleLabel,
      isBold,
      isItalic,
      isUnderline,
      isStrikethrough,
      textColor: computedColor,
      highlightColor: computedBg,
      alignment: computedAlign
    });
  }, []);

  // Execute Rich Text Format Commands
  const executeCommand = (command, value = null) => {
    if (editorMode === 'viewing') {
      addToast('Document is in Viewing mode');
      return;
    }

    if (!editorRef.current) return;
    editorRef.current.focus();

    if (command === 'fontSizePx') {
      // Font size custom handler
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const span = document.createElement('span');
        span.style.fontSize = value;
        span.appendChild(range.extractContents());
        range.insertNode(span);
      }
    } else if (command === 'lineSpacing') {
      const sel = window.getSelection();
      if (sel && sel.anchorNode) {
        let parent = sel.anchorNode.nodeType === 1 ? sel.anchorNode : sel.anchorNode.parentElement;
        while (parent && parent !== editorRef.current && parent.tagName !== 'P' && parent.tagName !== 'DIV' && !parent.tagName.startsWith('H')) {
          parent = parent.parentElement;
        }
        if (parent) {
          parent.style.lineHeight = value;
        }
      }
    } else {
      document.execCommand(command, false, value);
    }

    onContentChange();
    updateFormatState();
  };

  // On Document Content Edit
  const onContentChange = () => {
    setIsSaved(false);
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(() => {
      setIsSaved(true);
    }, 900);

    // Calculate Word & Character Stats
    if (editorRef.current) {
      const text = editorRef.current.innerText || '';
      const wordsArr = text.trim().split(/\s+/).filter(Boolean);
      const words = text.trim() === '' ? 0 : wordsArr.length;
      const characters = text.length;
      const charactersNoSpaces = text.replace(/\s/g, '').length;
      const pages = Math.max(1, Math.ceil(words / 450));

      setStats({ words, characters, charactersNoSpaces, pages });
    }
  };

  // Export Handlers
  const handleExportHTML = () => {
    if (!editorRef.current) return;
    const content = editorRef.current.innerHTML;
    const blob = new Blob([`<!DOCTYPE html><html><head><title>${docTitle}</title></head><body>${content}</body></html>`], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docTitle}.html`;
    a.click();
    addToast('Exported document as HTML');
  };

  const handleExportTXT = () => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docTitle}.txt`;
    a.click();
    addToast('Exported document as Text');
  };

  return (
    <div className={`google-docs-app ${darkMode ? 'dark-mode' : ''}`}>
      {/* Top Navbar */}
      <Navbar
        docTitle={docTitle}
        setDocTitle={setDocTitle}
        isSaved={isSaved}
        onShareOpen={() => setIsShareOpen(true)}
        onWordCountOpen={() => setIsWordCountOpen(true)}
        onImageOpen={() => setIsImageOpen(true)}
        onTableOpen={() => setIsTableOpen(true)}
        onFindReplaceOpen={() => setIsFindReplaceOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        editorMode={editorMode}
        setEditorMode={setEditorMode}
        showRuler={showRuler}
        setShowRuler={setShowRuler}
        showOutline={showOutline}
        setShowOutline={setShowOutline}
        executeCommand={executeCommand}
        addToast={addToast}
        onExportPDF={() => window.print()}
        onExportHTML={handleExportHTML}
        onExportTXT={handleExportTXT}
      />

      {/* Formatting Toolbar */}
      <Toolbar
        formatState={formatState}
        executeCommand={executeCommand}
        zoom={zoom}
        setZoom={setZoom}
        editorMode={editorMode}
        setEditorMode={setEditorMode}
        onImageOpen={() => setIsImageOpen(true)}
        addToast={addToast}
      />

      {/* Find & Replace Bar (when open) */}
      {isFindReplaceOpen && (
        <FindReplaceModal
          editorRef={editorRef}
          onClose={() => setIsFindReplaceOpen(false)}
          addToast={addToast}
        />
      )}

      {/* Main Workspace Area */}
      <div className="main-workspace">
        {/* Document Outline Panel */}
        {showOutline && (
          <OutlinePanel
            editorRef={editorRef}
            onClose={() => setShowOutline(false)}
          />
        )}

        {/* Center Canvas Area with Optional Ruler */}
        <div className="center-canvas">
          {showRuler && <Ruler />}
          <DocumentEditor
            editorRef={editorRef}
            zoom={zoom}
            editorMode={editorMode}
            updateFormatState={updateFormatState}
            onContentChange={onContentChange}
          />
        </div>

        {/* Right Sidebar (Google Apps Dock) */}
        <RightSidebar addToast={addToast} />
      </div>

      {/* Optional Word Count Floating Pill */}
      {showWordCountPill && (
        <div className="word-count-pill" onClick={() => setIsWordCountOpen(true)}>
          {stats.words} words
        </div>
      )}

      {/* Modals */}
      {isShareOpen && (
        <ShareModal
          docTitle={docTitle}
          onClose={() => setIsShareOpen(false)}
          addToast={addToast}
        />
      )}

      {isImageOpen && (
        <ImageModal
          onClose={() => setIsImageOpen(false)}
          executeCommand={executeCommand}
          addToast={addToast}
        />
      )}

      {isTableOpen && (
        <TableModal
          onClose={() => setIsTableOpen(false)}
          executeCommand={executeCommand}
          addToast={addToast}
        />
      )}

      {isWordCountOpen && (
        <WordCountModal
          stats={stats}
          showWordCountPill={showWordCountPill}
          setShowWordCountPill={setShowWordCountPill}
          onClose={() => setIsWordCountOpen(false)}
        />
      )}

      {/* Toast Notifications */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
