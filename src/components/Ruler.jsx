import React from 'react';

export default function Ruler() {
  // 8 inches scale markers
  const inches = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="ruler-container">
      <div className="ruler-bar">
        {/* Left margin grey zone */}
        <div className="ruler-margin left-margin-zone" style={{ width: '96px' }} />

        {/* Scale Area */}
        <div className="ruler-scale">
          {/* First Line Indent Handle (Blue Down Triangle) */}
          <div className="ruler-marker first-line-indent" style={{ left: '96px' }} title="First Line Indent">
            <svg width="10" height="8" viewBox="0 0 10 8">
              <polygon points="0,0 10,0 5,8" fill="#1a73e8" />
            </svg>
          </div>

          {/* Left Indent Handle (Blue Rectangle + Up Triangle) */}
          <div className="ruler-marker left-indent" style={{ left: '96px' }} title="Left Indent">
            <svg width="10" height="10" viewBox="0 0 10 10">
              <polygon points="5,0 10,6 0,6" fill="#1a73e8" />
              <rect x="1" y="6" width="8" height="4" fill="#1a73e8" />
            </svg>
          </div>

          {/* Inch Markers */}
          {inches.map((inch) => (
            <div key={inch} className="ruler-inch" style={{ left: `${inch * 78}px` }}>
              <span className="inch-label">{inch}</span>
              {/* Quarter ticks */}
              <div className="tick sub-tick tick-25" />
              <div className="tick sub-tick tick-50" />
              <div className="tick sub-tick tick-75" />
            </div>
          ))}

          {/* Right Indent Handle (Blue Triangle) */}
          <div className="ruler-marker right-indent" style={{ right: '96px' }} title="Right Indent">
            <svg width="10" height="8" viewBox="0 0 10 8">
              <polygon points="0,0 10,0 5,8" fill="#1a73e8" />
            </svg>
          </div>
        </div>

        {/* Right margin grey zone */}
        <div className="ruler-margin right-margin-zone" style={{ width: '96px' }} />
      </div>
    </div>
  );
}
