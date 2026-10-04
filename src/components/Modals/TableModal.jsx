import React, { useState } from 'react';
import { X, Table as TableIcon } from 'lucide-react';

export default function TableModal({ onClose, executeCommand, addToast }) {
  const [hoverRows, setHoverRows] = useState(3);
  const [hoverCols, setHoverCols] = useState(3);

  const handleInsert = () => {
    let tableHTML = `<table style="width:100%; border-collapse:collapse; margin:16px 0; font-size:10.5pt;">`;
    
    // Header Row
    tableHTML += `<tr style="background-color:#f1f3f4;">`;
    for (let c = 0; c < hoverCols; c++) {
      tableHTML += `<th style="padding:8px 12px; border:1px solid #dadce0; text-align:left; font-weight:bold;">Header ${c + 1}</th>`;
    }
    tableHTML += `</tr>`;

    // Data Rows
    for (let r = 1; r < hoverRows; r++) {
      tableHTML += `<tr>`;
      for (let c = 0; c < hoverCols; c++) {
        tableHTML += `<td style="padding:8px 12px; border:1px solid #dadce0;">Cell ${r + 1}-${c + 1}</td>`;
      }
      tableHTML += `</tr>`;
    }
    tableHTML += `</table><p><br></p>`;

    executeCommand('insertHTML', tableHTML);
    addToast(`Inserted ${hoverRows}x${hoverCols} table`);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content table-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-row">
            <TableIcon size={20} color="#1a73e8" />
            <h2>Insert Table</h2>
          </div>
          <button className="icon-btn modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="table-grid-picker">
          <div className="grid-dimensions-label">
            {hoverRows} &times; {hoverCols} Table
          </div>
          <div className="grid-container">
            {Array.from({ length: 6 }).map((_, r) => (
              <div key={r} className="grid-row">
                {Array.from({ length: 6 }).map((_, c) => (
                  <div
                    key={c}
                    className={`grid-cell ${r < hoverRows && c < hoverCols ? 'active' : ''}`}
                    onMouseEnter={() => {
                      setHoverRows(r + 1);
                      setHoverCols(c + 1);
                    }}
                    onClick={handleInsert}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-btn" onClick={onClose}>Cancel</button>
          <button className="modal-btn primary-btn" onClick={handleInsert}>
            Insert {hoverRows}x{hoverCols}
          </button>
        </div>
      </div>
    </div>
  );
}
