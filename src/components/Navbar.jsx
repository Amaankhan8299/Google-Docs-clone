import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Star,
  Folder,
  Cloud,
  History,
  MessageSquare,
  Video,
  Lock,
  User,
  ChevronDown,
  Check,
  Printer,
  Download,
  Copy,
  FilePlus,
  Trash2,
  Moon,
  Sun,
  Eye,
  Edit3,
  MessageCircle,
  Scissors,
  Clipboard,
  Search,
  Sparkles,
  Type,
  List,
  Image as ImageIcon,
  Table as TableIcon,
  Link as LinkIcon,
  HelpCircle,
  Info
} from 'lucide-react';

export default function Navbar({
  docTitle,
  setDocTitle,
  isSaved,
  onShareOpen,
  onWordCountOpen,
  onImageOpen,
  onTableOpen,
  onFindReplaceOpen,
  darkMode,
  setDarkMode,
  editorMode,
  setEditorMode,
  showRuler,
  setShowRuler,
  showOutline,
  setShowOutline,
  executeCommand,
  addToast,
  onExportPDF,
  onExportHTML,
  onExportTXT
}) {
  const [isStarred, setIsStarred] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const menuRef = useRef(null);

  // Update browser tab title
  useEffect(() => {
    document.title = `${docTitle || 'Untitled document'} - Google Docs`;
  }, [docTitle]);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (!docTitle.trim()) {
      setDocTitle('Untitled document');
    }
  };

  const toggleStar = () => {
    setIsStarred(!isStarred);
    addToast(!isStarred ? 'Document added to starred' : 'Document removed from starred');
  };

  const menuItems = [
    {
      label: 'File',
      id: 'file',
      items: [
        { label: 'New document', icon: <FilePlus size={16} />, action: () => { window.open(window.location.href, '_blank'); } },
        { label: 'Make a copy', icon: <Copy size={16} />, action: () => addToast('Copy created in My Drive') },
        { label: 'divider' },
        { label: 'Share', icon: <Lock size={16} />, action: onShareOpen },
        { label: 'Download as PDF', icon: <Download size={16} />, action: onExportPDF },
        { label: 'Download as HTML', icon: <Download size={16} />, action: onExportHTML },
        { label: 'Download as Text (.txt)', icon: <Download size={16} />, action: onExportTXT },
        { label: 'divider' },
        { label: 'Rename', icon: <Edit3 size={16} />, action: () => setIsEditingTitle(true) },
        { label: 'Word count', icon: <Info size={16} />, action: onWordCountOpen },
        { label: 'Print', icon: <Printer size={16} />, action: () => window.print(), shortcut: 'Ctrl+P' }
      ]
    },
    {
      label: 'Edit',
      id: 'edit',
      items: [
        { label: 'Undo', action: () => executeCommand('undo'), shortcut: 'Ctrl+Z' },
        { label: 'Redo', action: () => executeCommand('redo'), shortcut: 'Ctrl+Y' },
        { label: 'divider' },
        { label: 'Cut', icon: <Scissors size={16} />, action: () => { executeCommand('cut'); addToast('Cut to clipboard'); }, shortcut: 'Ctrl+X' },
        { label: 'Copy', icon: <Copy size={16} />, action: () => { executeCommand('copy'); addToast('Copied to clipboard'); }, shortcut: 'Ctrl+C' },
        { label: 'Select all', action: () => executeCommand('selectAll'), shortcut: 'Ctrl+A' },
        { label: 'divider' },
        { label: 'Find and replace', icon: <Search size={16} />, action: onFindReplaceOpen, shortcut: 'Ctrl+H' }
      ]
    },
    {
      label: 'View',
      id: 'view',
      items: [
        {
          label: 'Mode',
          children: [
            { label: 'Editing', checked: editorMode === 'editing', action: () => setEditorMode('editing') },
            { label: 'Suggesting', checked: editorMode === 'suggesting', action: () => setEditorMode('suggesting') },
            { label: 'Viewing', checked: editorMode === 'viewing', action: () => setEditorMode('viewing') }
          ]
        },
        { label: 'divider' },
        { label: 'Show ruler', checked: showRuler, action: () => setShowRuler(!showRuler) },
        { label: 'Show document outline', checked: showOutline, action: () => setShowOutline(!showOutline) },
        { label: 'divider' },
        { label: darkMode ? 'Light mode' : 'Dark mode', icon: darkMode ? <Sun size={16} /> : <Moon size={16} />, action: () => setDarkMode(!darkMode) }
      ]
    },
    {
      label: 'Insert',
      id: 'insert',
      items: [
        { label: 'Image', icon: <ImageIcon size={16} />, action: onImageOpen },
        { label: 'Table', icon: <TableIcon size={16} />, action: onTableOpen },
        { label: 'Horizontal line', action: () => executeCommand('insertHorizontalRule') },
        { label: 'divider' },
        { label: 'Link', icon: <LinkIcon size={16} />, action: () => {
            const url = prompt('Enter link URL:');
            if (url) executeCommand('createLink', url);
          }, shortcut: 'Ctrl+K' },
        { label: 'Header & footer', action: () => addToast('Headers and footers enabled') },
        { label: 'Page break', action: () => executeCommand('insertHTML', '<div style="page-break-after: always; height: 1px; background: #ddd; margin: 20px 0;"></div>') }
      ]
    },
    {
      label: 'Format',
      id: 'format',
      items: [
        {
          label: 'Text',
          children: [
            { label: 'Bold', action: () => executeCommand('bold'), shortcut: 'Ctrl+B' },
            { label: 'Italic', action: () => executeCommand('italic'), shortcut: 'Ctrl+I' },
            { label: 'Underline', action: () => executeCommand('underline'), shortcut: 'Ctrl+U' },
            { label: 'Strikethrough', action: () => executeCommand('strikeThrough'), shortcut: 'Alt+Shift+5' }
          ]
        },
        {
          label: 'Align & indent',
          children: [
            { label: 'Left', action: () => executeCommand('justifyLeft') },
            { label: 'Center', action: () => executeCommand('justifyCenter') },
            { label: 'Right', action: () => executeCommand('justifyRight') },
            { label: 'Justify', action: () => executeCommand('justifyFull') }
          ]
        },
        { label: 'Clear formatting', action: () => executeCommand('removeFormat'), shortcut: 'Ctrl+\\' }
      ]
    },
    {
      label: 'Tools',
      id: 'tools',
      items: [
        { label: 'Spelling and grammar check', action: () => addToast('No spelling errors found') },
        { label: 'Word count', icon: <Info size={16} />, action: onWordCountOpen },
        { label: 'Find & replace', icon: <Search size={16} />, action: onFindReplaceOpen },
        { label: 'divider' },
        { label: 'Toggle Theme', icon: darkMode ? <Sun size={16} /> : <Moon size={16} />, action: () => setDarkMode(!darkMode) }
      ]
    },
    {
      label: 'Help',
      id: 'help',
      items: [
        { label: 'Docs Help', icon: <HelpCircle size={16} />, action: () => addToast('Google Docs Help Desk') },
        { label: 'Keyboard shortcuts', action: () => addToast('Shortcuts: Ctrl+B (Bold), Ctrl+I (Italic), Ctrl+U (Underline), Ctrl+P (Print)'), shortcut: 'Ctrl+/' }
      ]
    }
  ];

  return (
    <header className="docs-navbar">
      <div className="navbar-left">
        {/* Google Docs Icon */}
        <div className="docs-logo" title="Google Docs Home">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.1667 6.66666H10.8333C9.45262 6.66666 8.33334 7.78594 8.33334 9.16666V30.8333C8.33334 32.214 9.45262 33.3333 10.8333 33.3333H29.1667C30.5474 33.3333 31.6667 32.214 31.6667 30.8333V14.1667L24.1667 6.66666Z" fill="#2684FC"/>
            <path d="M24.1667 6.66666V14.1667H31.6667L24.1667 6.66666Z" fill="#0066DA"/>
            <path d="M14.1667 18.3333H25.8333V20H14.1667V18.3333Z" fill="white"/>
            <path d="M14.1667 22.5H25.8333V24.1667H14.1667V22.5Z" fill="white"/>
            <path d="M14.1667 26.6667H21.6667V28.3333H14.1667V26.6667Z" fill="white"/>
          </svg>
        </div>

        <div className="title-and-menu">
          {/* Editable Document Title & Status icons */}
          <div className="title-row">
            {isEditingTitle ? (
              <input
                type="text"
                className="document-title-input"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                onBlur={handleTitleBlur}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleBlur();
                }}
                autoFocus
              />
            ) : (
              <h1
                className="document-title"
                onClick={() => setIsEditingTitle(true)}
                title="Click to rename"
              >
                {docTitle}
              </h1>
            )}

            {/* Quick Actions */}
            <div className="title-actions">
              <button
                className={`title-btn ${isStarred ? 'starred' : ''}`}
                onClick={toggleStar}
                title={isStarred ? 'Unstar' : 'Star'}
              >
                <Star size={16} fill={isStarred ? '#f4b400' : 'none'} color={isStarred ? '#f4b400' : 'currentColor'} />
              </button>

              <button
                className="title-btn"
                onClick={() => addToast('Moved to "My Drive / Projects"')}
                title="Move"
              >
                <Folder size={16} />
              </button>

              <div className="save-status" title={isSaved ? 'Document saved to Drive' : 'Saving changes...'}>
                <Cloud size={16} className={!isSaved ? 'cloud-saving' : ''} />
                <span className="save-status-text">{isSaved ? '' : 'Saving...'}</span>
              </div>
            </div>
          </div>

          {/* Menubar */}
          <nav className="menu-bar" ref={menuRef}>
            {menuItems.map((menu) => (
              <div key={menu.id} className="menu-item-wrapper">
                <button
                  className={`menu-button ${activeMenu === menu.id ? 'active' : ''}`}
                  onClick={() => handleMenuClick(menu.id)}
                >
                  {menu.label}
                </button>

                {/* Dropdown Menu */}
                {activeMenu === menu.id && (
                  <div className="dropdown-menu">
                    {menu.items.map((item, index) => {
                      if (item.label === 'divider') {
                        return <div key={index} className="menu-divider" />;
                      }

                      return (
                        <div
                          key={index}
                          className="dropdown-item"
                          onClick={() => {
                            if (item.action) item.action();
                            setActiveMenu(null);
                          }}
                        >
                          <span className="dropdown-item-left">
                            {item.checked !== undefined && (
                              <span className="check-mark">
                                {item.checked ? <Check size={14} /> : null}
                              </span>
                            )}
                            {item.icon && <span className="item-icon">{item.icon}</span>}
                            <span>{item.label}</span>
                          </span>

                          {item.shortcut && (
                            <span className="dropdown-shortcut">{item.shortcut}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="navbar-right">
        {/* Version & Comment history */}
        <button
          className="icon-action-btn"
          onClick={() => addToast('Version history opened')}
          title="Last edit was seconds ago"
        >
          <History size={19} />
        </button>

        <button
          className="icon-action-btn"
          onClick={() => addToast('Open comment history')}
          title="Open comment history"
        >
          <MessageSquare size={19} />
        </button>

        {/* Video Call button */}
        <button
          className="icon-action-btn meet-btn"
          onClick={() => addToast('Starting Google Meet session...')}
          title="Join a call or share this tab"
        >
          <Video size={19} />
          <ChevronDown size={14} />
        </button>

        {/* Share Button */}
        <button className="share-btn" onClick={onShareOpen} title="Share with others">
          <Lock size={16} />
          <span>Share</span>
        </button>

        {/* User Avatar */}
        <div
          className="user-avatar"
          title="Google Account: Aman Khan (aman@example.com)"
          onClick={() => addToast('Google Account: Aman Khan (aman@example.com)')}
        >
          <span>A</span>
        </div>
      </div>
    </header>
  );
}
