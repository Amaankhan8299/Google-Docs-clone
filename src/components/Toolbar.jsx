import React, { useState, useRef, useEffect } from 'react';
import {
  Undo2,
  Redo2,
  Printer,
  CheckCheck,
  Paintbrush,
  Minus,
  Plus,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Baseline,
  Highlighter,
  Link,
  MessageSquarePlus,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ListOrdered,
  List,
  ListTodo,
  Outdent,
  Indent,
  RemoveFormatting,
  ChevronDown,
  Check,
  Pencil,
  Eye,
  MessageCircle
} from 'lucide-react';

const FONT_FAMILIES = [
  { name: 'Arial', val: 'Arial, sans-serif' },
  { name: 'Comic Sans MS', val: 'Comic Sans MS, cursive' },
  { name: 'Courier Prime', val: 'Courier Prime, monospace' },
  { name: 'Georgia', val: 'Georgia, serif' },
  { name: 'Inter', val: 'Inter, sans-serif' },
  { name: 'Lora', val: 'Lora, serif' },
  { name: 'Merriweather', val: 'Merriweather, serif' },
  { name: 'Outfit', val: 'Outfit, sans-serif' },
  { name: 'Playfair Display', val: 'Playfair Display, serif' },
  { name: 'Roboto', val: 'Roboto, sans-serif' },
  { name: 'Times New Roman', val: 'Times New Roman, serif' },
  { name: 'Verdana', val: 'Verdana, sans-serif' }
];

const STYLES = [
  { name: 'Normal text', tag: 'p', fontSize: '11pt', fontWeight: 'normal' },
  { name: 'Title', tag: 'h1', fontSize: '26pt', fontWeight: 'bold' },
  { name: 'Subtitle', tag: 'p', fontSize: '15pt', color: '#666' },
  { name: 'Heading 1', tag: 'h1', fontSize: '20pt', fontWeight: 'bold' },
  { name: 'Heading 2', tag: 'h2', fontSize: '16pt', fontWeight: 'bold' },
  { name: 'Heading 3', tag: 'h3', fontSize: '14pt', fontWeight: 'semibold' }
];

const COLOR_SWATCHES = [
  '#000000', '#434343', '#666666', '#999999', '#cccccc', '#d9d9d9', '#efefef', '#ffffff',
  '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff',
  '#9900ff', '#ff00ff', '#e6b8af', '#f4ccd0', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3',
  '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc', '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599',
  '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd', '#cc4125', '#e06666',
  '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6fa8dc', '#6fa8dc', '#8e7cc3', '#c27ba0'
];

export default function Toolbar({
  formatState,
  executeCommand,
  zoom,
  setZoom,
  editorMode,
  setEditorMode,
  onImageOpen,
  addToast
}) {
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showHighlightColorPicker, setShowHighlightColorPicker] = useState(false);
  const [showSpacingDropdown, setShowSpacingDropdown] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showZoomDropdown, setShowZoomDropdown] = useState(false);
  const [isPaintActive, setIsPaintActive] = useState(false);

  const toolbarRef = useRef(null);

  // Close popups when clicking outside toolbar
  useEffect(() => {
    function handleClickOutside(e) {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target)) {
        setShowFontDropdown(false);
        setShowStyleDropdown(false);
        setShowTextColorPicker(false);
        setShowHighlightColorPicker(false);
        setShowSpacingDropdown(false);
        setShowModeDropdown(false);
        setShowZoomDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFontSizeChange = (delta) => {
    const currentSize = parseInt(formatState.fontSize) || 11;
    const newSize = Math.max(6, Math.min(144, currentSize + delta));
    executeCommand('fontSizePx', `${newSize}pt`);
  };

  const handleFontSelect = (fontFamily) => {
    executeCommand('fontName', fontFamily);
    setShowFontDropdown(false);
  };

  const handleStyleSelect = (style) => {
    if (style.tag.startsWith('h')) {
      executeCommand('formatBlock', `<${style.tag}>`);
    } else {
      executeCommand('formatBlock', '<p>');
    }
    setShowStyleDropdown(false);
  };

  const handleTextColorSelect = (color) => {
    executeCommand('foreColor', color);
    setShowTextColorPicker(false);
  };

  const handleHighlightSelect = (color) => {
    executeCommand('hiliteColor', color);
    setShowHighlightColorPicker(false);
  };

  return (
    <div className="docs-toolbar" ref={toolbarRef}>
      {/* Undo & Redo */}
      <div className="toolbar-group">
        <button
          className="toolbar-btn"
          onClick={() => executeCommand('undo')}
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={16} />
        </button>
        <button
          className="toolbar-btn"
          onClick={() => executeCommand('redo')}
          title="Redo (Ctrl+Y)"
        >
          <Redo2 size={16} />
        </button>
        <button
          className="toolbar-btn"
          onClick={() => window.print()}
          title="Print (Ctrl+P)"
        >
          <Printer size={16} />
        </button>
        <button
          className="toolbar-btn"
          onClick={() => addToast('Spelling and grammar check complete')}
          title="Spelling and grammar check (Ctrl+Alt+X)"
        >
          <CheckCheck size={16} />
        </button>
        <button
          className={`toolbar-btn ${isPaintActive ? 'active' : ''}`}
          onClick={() => {
            setIsPaintActive(!isPaintActive);
            addToast(!isPaintActive ? 'Paint format active' : 'Paint format canceled');
          }}
          title="Paint format"
        >
          <Paintbrush size={16} />
        </button>
      </div>

      <div className="toolbar-divider" />

      {/* Zoom Selector */}
      <div className="toolbar-group dropdown-wrapper">
        <button
          className="toolbar-btn dropdown-btn zoom-btn"
          onClick={() => setShowZoomDropdown(!showZoomDropdown)}
          title="Zoom"
        >
          <span>{zoom}%</span>
          <ChevronDown size={12} />
        </button>
        {showZoomDropdown && (
          <div className="toolbar-dropdown-menu">
            {[50, 75, 90, 100, 125, 150, 200].map((z) => (
              <div
                key={z}
                className={`dropdown-item ${zoom === z ? 'active' : ''}`}
                onClick={() => {
                  setZoom(z);
                  setShowZoomDropdown(false);
                }}
              >
                {z}%
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="toolbar-divider" />

      {/* Text Style Dropdown */}
      <div className="toolbar-group dropdown-wrapper">
        <button
          className="toolbar-btn dropdown-btn style-btn"
          onClick={() => setShowStyleDropdown(!showStyleDropdown)}
          title="Styles"
        >
          <span className="truncate">{formatState.style || 'Normal text'}</span>
          <ChevronDown size={12} />
        </button>
        {showStyleDropdown && (
          <div className="toolbar-dropdown-menu styles-menu">
            {STYLES.map((style) => (
              <div
                key={style.name}
                className="dropdown-item style-option"
                onClick={() => handleStyleSelect(style)}
                style={{
                  fontSize: style.fontSize,
                  fontWeight: style.fontWeight || 'normal'
                }}
              >
                {style.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="toolbar-divider" />

      {/* Font Family Dropdown */}
      <div className="toolbar-group dropdown-wrapper">
        <button
          className="toolbar-btn dropdown-btn font-btn"
          onClick={() => setShowFontDropdown(!showFontDropdown)}
          title="Font"
        >
          <span className="truncate">{formatState.fontName || 'Arial'}</span>
          <ChevronDown size={12} />
        </button>
        {showFontDropdown && (
          <div className="toolbar-dropdown-menu font-menu">
            {FONT_FAMILIES.map((font) => (
              <div
                key={font.name}
                className={`dropdown-item ${formatState.fontName === font.name ? 'active' : ''}`}
                style={{ fontFamily: font.val }}
                onClick={() => handleFontSelect(font.name)}
              >
                {font.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="toolbar-divider" />

      {/* Font Size Selector */}
      <div className="toolbar-group font-size-group">
        <button
          className="toolbar-btn size-btn"
          onClick={() => handleFontSizeChange(-1)}
          title="Decrease font size (Ctrl+Shift+,)"
        >
          <Minus size={14} />
        </button>
        <input
          type="text"
          className="font-size-input"
          value={parseInt(formatState.fontSize) || 11}
          onChange={(e) => {
            const val = e.target.value;
            if (val && !isNaN(val)) {
              executeCommand('fontSizePx', `${val}pt`);
            }
          }}
          title="Font size"
        />
        <button
          className="toolbar-btn size-btn"
          onClick={() => handleFontSizeChange(1)}
          title="Increase font size (Ctrl+Shift+.)"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="toolbar-divider" />

      {/* Formatting Toggles */}
      <div className="toolbar-group">
        <button
          className={`toolbar-btn ${formatState.isBold ? 'active' : ''}`}
          onClick={() => executeCommand('bold')}
          title="Bold (Ctrl+B)"
        >
          <Bold size={16} />
        </button>
        <button
          className={`toolbar-btn ${formatState.isItalic ? 'active' : ''}`}
          onClick={() => executeCommand('italic')}
          title="Italic (Ctrl+I)"
        >
          <Italic size={16} />
        </button>
        <button
          className={`toolbar-btn ${formatState.isUnderline ? 'active' : ''}`}
          onClick={() => executeCommand('underline')}
          title="Underline (Ctrl+U)"
        >
          <Underline size={16} />
        </button>
        <button
          className={`toolbar-btn ${formatState.isStrikethrough ? 'active' : ''}`}
          onClick={() => executeCommand('strikeThrough')}
          title="Strikethrough (Alt+Shift+5)"
        >
          <Strikethrough size={16} />
        </button>
      </div>

      {/* Text Color Picker */}
      <div className="toolbar-group dropdown-wrapper">
        <button
          className="toolbar-btn color-btn"
          onClick={() => setShowTextColorPicker(!showTextColorPicker)}
          title="Text color"
        >
          <Baseline size={16} />
          <span
            className="color-bar"
            style={{ backgroundColor: formatState.textColor || '#000000' }}
          />
        </button>
        {showTextColorPicker && (
          <div className="color-picker-popover">
            <div className="color-picker-header">Text color</div>
            <div className="color-grid">
              {COLOR_SWATCHES.map((color, idx) => (
                <button
                  key={idx}
                  className="color-swatch"
                  style={{ backgroundColor: color }}
                  onClick={() => handleTextColorSelect(color)}
                />
              ))}
            </div>
            <div className="custom-color-row">
              <label>Custom:</label>
              <input
                type="color"
                value={formatState.textColor || '#000000'}
                onChange={(e) => handleTextColorSelect(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Highlight Color Picker */}
      <div className="toolbar-group dropdown-wrapper">
        <button
          className="toolbar-btn color-btn"
          onClick={() => setShowHighlightColorPicker(!showHighlightColorPicker)}
          title="Highlight color"
        >
          <Highlighter size={16} />
          <span
            className="color-bar"
            style={{ backgroundColor: formatState.highlightColor || '#ffff00' }}
          />
        </button>
        {showHighlightColorPicker && (
          <div className="color-picker-popover">
            <div className="color-picker-header">Highlight color</div>
            <button
              className="color-none-btn"
              onClick={() => handleHighlightSelect('transparent')}
            >
              None
            </button>
            <div className="color-grid">
              {COLOR_SWATCHES.map((color, idx) => (
                <button
                  key={idx}
                  className="color-swatch"
                  style={{ backgroundColor: color }}
                  onClick={() => handleHighlightSelect(color)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="toolbar-divider" />

      {/* Insert items */}
      <div className="toolbar-group">
        <button
          className="toolbar-btn"
          onClick={() => {
            const url = prompt('Enter link URL:');
            if (url) executeCommand('createLink', url);
          }}
          title="Insert link (Ctrl+K)"
        >
          <Link size={16} />
        </button>
        <button
          className="toolbar-btn"
          onClick={() => addToast('Comment added at selection')}
          title="Add comment (Ctrl+Alt+M)"
        >
          <MessageSquarePlus size={16} />
        </button>
        <button
          className="toolbar-btn"
          onClick={onImageOpen}
          title="Insert image"
        >
          <ImageIcon size={16} />
        </button>
      </div>

      <div className="toolbar-divider" />

      {/* Alignment options */}
      <div className="toolbar-group">
        <button
          className={`toolbar-btn ${formatState.alignment === 'left' ? 'active' : ''}`}
          onClick={() => executeCommand('justifyLeft')}
          title="Left align (Ctrl+Shift+L)"
        >
          <AlignLeft size={16} />
        </button>
        <button
          className={`toolbar-btn ${formatState.alignment === 'center' ? 'active' : ''}`}
          onClick={() => executeCommand('justifyCenter')}
          title="Center align (Ctrl+Shift+E)"
        >
          <AlignCenter size={16} />
        </button>
        <button
          className={`toolbar-btn ${formatState.alignment === 'right' ? 'active' : ''}`}
          onClick={() => executeCommand('justifyRight')}
          title="Right align (Ctrl+Shift+R)"
        >
          <AlignRight size={16} />
        </button>
        <button
          className={`toolbar-btn ${formatState.alignment === 'justify' ? 'active' : ''}`}
          onClick={() => executeCommand('justifyFull')}
          title="Justify (Ctrl+Shift+J)"
        >
          <AlignJustify size={16} />
        </button>
      </div>

      <div className="toolbar-divider" />

      {/* Line & Paragraph Spacing */}
      <div className="toolbar-group dropdown-wrapper">
        <button
          className="toolbar-btn"
          onClick={() => setShowSpacingDropdown(!showSpacingDropdown)}
          title="Line & paragraph spacing"
        >
          <List size={16} />
        </button>
        {showSpacingDropdown && (
          <div className="toolbar-dropdown-menu spacing-menu">
            <div className="dropdown-item" onClick={() => { executeCommand('lineSpacing', '1.0'); setShowSpacingDropdown(false); }}>
              Single (1.0)
            </div>
            <div className="dropdown-item" onClick={() => { executeCommand('lineSpacing', '1.15'); setShowSpacingDropdown(false); }}>
              1.15
            </div>
            <div className="dropdown-item" onClick={() => { executeCommand('lineSpacing', '1.5'); setShowSpacingDropdown(false); }}>
              1.5
            </div>
            <div className="dropdown-item" onClick={() => { executeCommand('lineSpacing', '2.0'); setShowSpacingDropdown(false); }}>
              Double (2.0)
            </div>
            <div className="menu-divider" />
            <div className="dropdown-item" onClick={() => { addToast('Added space before paragraph'); setShowSpacingDropdown(false); }}>
              Add space before paragraph
            </div>
            <div className="dropdown-item" onClick={() => { addToast('Added space after paragraph'); setShowSpacingDropdown(false); }}>
              Add space after paragraph
            </div>
          </div>
        )}
      </div>

      {/* Lists & Indents */}
      <div className="toolbar-group">
        <button
          className="toolbar-btn"
          onClick={() => executeCommand('insertUnorderedList')}
          title="Bulleted list (Ctrl+Shift+8)"
        >
          <List size={16} />
        </button>
        <button
          className="toolbar-btn"
          onClick={() => executeCommand('insertOrderedList')}
          title="Numbered list (Ctrl+Shift+7)"
        >
          <ListOrdered size={16} />
        </button>
        <button
          className="toolbar-btn"
          onClick={() => executeCommand('outdent')}
          title="Decrease indent (Ctrl+[)"
        >
          <Outdent size={16} />
        </button>
        <button
          className="toolbar-btn"
          onClick={() => executeCommand('indent')}
          title="Increase indent (Ctrl+])"
        >
          <Indent size={16} />
        </button>
        <button
          className="toolbar-btn"
          onClick={() => executeCommand('removeFormat')}
          title="Clear formatting (Ctrl+\\)"
        >
          <RemoveFormatting size={16} />
        </button>
      </div>

      {/* Right side Editing mode indicator button */}
      <div className="toolbar-right-mode dropdown-wrapper">
        <button
          className="toolbar-btn mode-btn"
          onClick={() => setShowModeDropdown(!showModeDropdown)}
          title="Editing mode"
        >
          {editorMode === 'editing' && <Pencil size={15} />}
          {editorMode === 'suggesting' && <MessageCircle size={15} />}
          {editorMode === 'viewing' && <Eye size={15} />}
          <span className="mode-text">
            {editorMode === 'editing' ? 'Editing' : editorMode === 'suggesting' ? 'Suggesting' : 'Viewing'}
          </span>
          <ChevronDown size={12} />
        </button>
        {showModeDropdown && (
          <div className="toolbar-dropdown-menu mode-menu">
            <div
              className={`dropdown-item mode-option ${editorMode === 'editing' ? 'active' : ''}`}
              onClick={() => { setEditorMode('editing'); setShowModeDropdown(false); }}
            >
              <Pencil size={16} />
              <div>
                <div className="mode-title">Editing</div>
                <div className="mode-desc">Edit document directly</div>
              </div>
            </div>
            <div
              className={`dropdown-item mode-option ${editorMode === 'suggesting' ? 'active' : ''}`}
              onClick={() => { setEditorMode('suggesting'); setShowModeDropdown(false); }}
            >
              <MessageCircle size={16} />
              <div>
                <div className="mode-title">Suggesting</div>
                <div className="mode-desc">Edits become suggestions</div>
              </div>
            </div>
            <div
              className={`dropdown-item mode-option ${editorMode === 'viewing' ? 'active' : ''}`}
              onClick={() => { setEditorMode('viewing'); setShowModeDropdown(false); }}
            >
              <Eye size={16} />
              <div>
                <div className="mode-title">Viewing</div>
                <div className="mode-desc">Read or print final document</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
