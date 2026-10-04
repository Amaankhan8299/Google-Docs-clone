import React, { useEffect } from 'react';

const INITIAL_CONTENT = `
  <h1 style="font-family: Arial, sans-serif; color: #1a73e8; font-size: 24pt; font-weight: bold; margin-bottom: 8px;">Product Strategy & Overview 2026</h1>
  <p style="color: #5f6368; font-size: 11pt; font-style: italic; margin-bottom: 24px;">Prepared by Aman Khan &bull; Confidential &bull; Last updated: October 2026</p>
  
  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />

  <h2 style="font-family: Arial, sans-serif; color: #202124; font-size: 16pt; font-weight: bold; margin-top: 20px; margin-bottom: 12px;">1. Executive Summary</h2>
  <p style="line-height: 1.6; color: #3c4043; margin-bottom: 16px;">
    Welcome to the next generation interactive document workspace. This document demonstrates the full rich-text formatting capabilities of our <b>Google Docs Clone</b>. You can seamlessly click, edit, select text, apply custom typography, format alignments, add comments, insert tables, upload images, and collaborate in real-time.
  </p>

  <div style="background-color: #f1f3f4; border-left: 4px solid #1a73e8; padding: 12px 16px; margin: 16px 0; border-radius: 0 4px 4px 0;">
    <strong style="color: #1a73e8;">Key Insight:</strong> Modern document processing relies on responsive typography, clean document hierarchy, and effortless intuitive toolbar controls.
  </div>

  <h2 style="font-family: Arial, sans-serif; color: #202124; font-size: 16pt; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">2. Core Feature Checklist</h2>
  <ul style="line-height: 1.8; color: #3c4043; padding-left: 24px; margin-bottom: 20px;">
    <li><b>Full Typography Suite:</b> Font families (Arial, Inter, Merriweather, Georgia), custom sizes, bold, italic, underline, strikethrough.</li>
    <li><span style="background-color: #fff2cc;">Highlighter & Text Colors:</span> Dynamic color pickers with custom hex input.</li>
    <li><b>Paragraph Formatting:</b> Left, center, right, and justify alignments, plus customizable line spacing (1.0 to 2.0).</li>
    <li><b>Interactive Sidebars:</b> Google Calendar, Keep sticky notes, and Task checklist managers directly inside the app.</li>
    <li><b>Document Navigation:</b> Live auto-generating outline side panel.</li>
  </ul>

  <h2 style="font-family: Arial, sans-serif; color: #202124; font-size: 16pt; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">3. Project Milestone Roadmap</h2>
  <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 10.5pt;">
    <thead>
      <tr style="background-color: #e8f0fe; color: #1967d2; text-align: left;">
        <th style="padding: 10px; border: 1px solid #dadce0;">Phase</th>
        <th style="padding: 10px; border: 1px solid #dadce0;">Deliverable</th>
        <th style="padding: 10px; border: 1px solid #dadce0;">Status</th>
        <th style="padding: 10px; border: 1px solid #dadce0;">Timeline</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 10px; border: 1px solid #dadce0; font-weight: bold;">Q1 2026</td>
        <td style="padding: 10px; border: 1px solid #dadce0;">Core Rich-Text Engine</td>
        <td style="padding: 10px; border: 1px solid #dadce0; color: #188038; font-weight: bold;">Completed</td>
        <td style="padding: 10px; border: 1px solid #dadce0;">Jan 15</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #dadce0; font-weight: bold;">Q2 2026</td>
        <td style="padding: 10px; border: 1px solid #dadce0;">Collaborative Share & Modals</td>
        <td style="padding: 10px; border: 1px solid #dadce0; color: #188038; font-weight: bold;">Completed</td>
        <td style="padding: 10px; border: 1px solid #dadce0;">Feb 28</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #dadce0; font-weight: bold;">Q3 2026</td>
        <td style="padding: 10px; border: 1px solid #dadce0;">Side Productivity Drawer (Keep, Tasks)</td>
        <td style="padding: 10px; border: 1px solid #dadce0; color: #188038; font-weight: bold;">Completed</td>
        <td style="padding: 10px; border: 1px solid #dadce0;">Mar 30</td>
      </tr>
    </tbody>
  </table>

  <h2 style="font-family: Arial, sans-serif; color: #202124; font-size: 16pt; font-weight: bold; margin-top: 24px; margin-bottom: 12px;">4. Visual Demonstration</h2>
  <p style="line-height: 1.6; color: #3c4043; margin-bottom: 16px;">Below is an embedded sample media asset demonstrating clean layout integration within an A4 paginated canvas:</p>
  
  <div style="text-align: center; margin: 20px 0;">
    <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80" alt="Workspace desk" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
    <p style="font-size: 9.5pt; color: #70757a; margin-top: 6px; font-style: italic;">Figure 1: High performance productive workspace environment.</p>
  </div>
`;

export default function DocumentEditor({
  editorRef,
  zoom,
  editorMode,
  updateFormatState,
  onContentChange
}) {
  // Initialize sample content on first mount
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML.trim()) {
      editorRef.current.innerHTML = INITIAL_CONTENT;
      onContentChange();
    }
  }, []);

  const handleSelectionChange = () => {
    updateFormatState();
  };

  const handleInput = () => {
    onContentChange();
    updateFormatState();
  };

  return (
    <div className="document-container">
      <div
        className="document-page-wrapper"
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top center'
        }}
      >
        <div
          ref={editorRef}
          className={`a4-page ${editorMode === 'viewing' ? 'read-only' : ''}`}
          contentEditable={editorMode !== 'viewing'}
          suppressContentEditableWarning={true}
          onSelect={handleSelectionChange}
          onKeyUp={handleSelectionChange}
          onMouseUp={handleSelectionChange}
          onInput={handleInput}
          spellCheck={true}
        />
      </div>
    </div>
  );
}
