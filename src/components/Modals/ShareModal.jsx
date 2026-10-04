import React, { useState } from 'react';
import { X, Lock, Globe, Copy, Check, UserPlus, ChevronDown, ShieldCheck } from 'lucide-react';

export default function ShareModal({ docTitle, onClose, addToast }) {
  const [emailInput, setEmailInput] = useState('');
  const [selectedRole, setSelectedRole] = useState('Editor');
  const [accessType, setAccessType] = useState('anyone'); // 'restricted' | 'anyone'
  const [isCopied, setIsCopied] = useState(false);

  const [people, setPeople] = useState([
    { name: 'Aman Khan', email: 'aman@example.com', role: 'Owner', isOwner: true, avatar: 'A' },
    { name: 'Sarah Jenkins', email: 'sarah.j@example.com', role: 'Editor', isOwner: false, avatar: 'S' },
    { name: 'Alex Rivera', email: 'alex.r@example.com', role: 'Viewer', isOwner: false, avatar: 'A' }
  ]);

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    const newPerson = {
      name: emailInput.split('@')[0],
      email: emailInput.trim(),
      role: selectedRole,
      isOwner: false,
      avatar: emailInput.charAt(0).toUpperCase()
    };

    setPeople([...people, newPerson]);
    setEmailInput('');
    addToast(`Invitation sent to ${emailInput}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    addToast('Link copied to clipboard');
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content share-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="share-title-row">
            <Lock size={20} className="share-lock-icon" />
            <div>
              <h2>Share "{docTitle || 'Untitled document'}"</h2>
              <p className="sub-text">Collaborate with others in real-time</p>
            </div>
          </div>
          <button className="icon-btn modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Invite Form */}
        <form onSubmit={handleAddPerson} className="share-invite-form">
          <div className="invite-input-group">
            <UserPlus size={18} className="input-icon" />
            <input
              type="email"
              placeholder="Add people and groups by email..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="share-email-input"
            />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="share-role-select"
            >
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
              <option value="Commenter">Commenter</option>
            </select>
          </div>
          <button type="submit" className="modal-btn primary-btn">
            Send
          </button>
        </form>

        {/* People with access */}
        <div className="share-section">
          <h3>People with access</h3>
          <div className="people-list">
            {people.map((person, idx) => (
              <div key={idx} className="person-row">
                <div className="person-info">
                  <div className="person-avatar">{person.avatar}</div>
                  <div>
                    <div className="person-name">
                      {person.name} {person.isOwner && <span className="owner-badge">(you)</span>}
                    </div>
                    <div className="person-email">{person.email}</div>
                  </div>
                </div>

                <div className="person-role">
                  {person.isOwner ? (
                    <span className="owner-text">Owner</span>
                  ) : (
                    <select
                      value={person.role}
                      onChange={(e) => {
                        const updated = [...people];
                        updated[idx].role = e.target.value;
                        setPeople(updated);
                        addToast(`Permission updated to ${e.target.value}`);
                      }}
                      className="role-dropdown"
                    >
                      <option value="Editor">Editor</option>
                      <option value="Viewer">Viewer</option>
                      <option value="Commenter">Commenter</option>
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Access */}
        <div className="share-section">
          <h3>General access</h3>
          <div className="access-setting-row">
            <div className={`access-icon-badge ${accessType === 'anyone' ? 'public' : 'restricted'}`}>
              {accessType === 'anyone' ? <Globe size={20} /> : <Lock size={20} />}
            </div>
            <div className="access-details">
              <select
                value={accessType}
                onChange={(e) => {
                  setAccessType(e.target.value);
                  addToast(`Access changed to ${e.target.value === 'anyone' ? 'Anyone with the link' : 'Restricted'}`);
                }}
                className="access-select"
              >
                <option value="anyone">Anyone with the link</option>
                <option value="restricted">Restricted</option>
              </select>
              <div className="access-subtext">
                {accessType === 'anyone'
                  ? 'Anyone on the internet with this link can view'
                  : 'Only people added can open with this link'}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="copy-link-btn" onClick={handleCopyLink}>
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
            <span>{isCopied ? 'Link Copied' : 'Copy link'}</span>
          </button>
          <button className="modal-btn primary-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
