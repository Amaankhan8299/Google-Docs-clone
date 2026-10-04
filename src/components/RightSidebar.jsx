import React, { useState } from 'react';
import {
  Calendar,
  Bookmark,
  CheckSquare,
  User,
  MapPin,
  Plus,
  ChevronRight,
  ChevronLeft,
  X,
  Trash2,
  Check,
  Tag
} from 'lucide-react';

export default function RightSidebar({ addToast }) {
  const [activePanel, setActivePanel] = useState(null); // 'calendar' | 'keep' | 'tasks' | null
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Keep Notes State
  const [notes, setNotes] = useState([
    { id: 1, title: 'Project Specs', content: 'Review Google Docs clone requirements and styling polish.', color: '#fef08a' },
    { id: 2, title: 'Meeting Notes', content: 'Sync with design team on Tuesday at 10 AM.', color: '#bfdbfe' }
  ]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteColor, setNewNoteColor] = useState('#fef08a');

  // Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Draft product strategy document', completed: true },
    { id: 2, text: 'Review table styling in A4 view', completed: false },
    { id: 3, text: 'Share document with team members', completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  // Calendar State
  const [events, setEvents] = useState([
    { id: 1, title: 'Design Review', time: '10:00 AM - 11:00 AM', tag: 'Team' },
    { id: 2, title: 'Sprint Retrospective', time: '2:30 PM - 3:30 PM', tag: 'Agile' }
  ]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');

  const togglePanel = (panelName) => {
    if (activePanel === panelName) {
      setActivePanel(null);
    } else {
      setActivePanel(panelName);
      setIsCollapsed(false);
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    const newNote = {
      id: Date.now(),
      title: newNoteTitle.trim() || 'Untitled Note',
      content: newNoteContent,
      color: newNoteColor
    };
    setNotes([newNote, ...notes]);
    setNewNoteTitle('');
    setNewNoteContent('');
    addToast('Note saved to Google Keep');
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    addToast('Note deleted');
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTaskText.trim(), completed: false }]);
    setNewTaskText('');
    addToast('Task added');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    setEvents([
      ...events,
      { id: Date.now(), title: newEventTitle, time: newEventTime || '12:00 PM', tag: 'General' }
    ]);
    setNewEventTitle('');
    setNewEventTime('');
    addToast('Calendar event created');
  };

  return (
    <div className={`right-sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Drawer Panel (when active) */}
      {activePanel && (
        <div className="sidebar-drawer-panel">
          <div className="drawer-header">
            <div className="drawer-title">
              {activePanel === 'calendar' && (
                <>
                  <Calendar size={18} color="#4285f4" />
                  <span>Google Calendar</span>
                </>
              )}
              {activePanel === 'keep' && (
                <>
                  <Bookmark size={18} color="#fbbc04" />
                  <span>Google Keep</span>
                </>
              )}
              {activePanel === 'tasks' && (
                <>
                  <CheckSquare size={18} color="#1a73e8" />
                  <span>Google Tasks</span>
                </>
              )}
            </div>
            <button className="icon-btn close-drawer-btn" onClick={() => setActivePanel(null)}>
              <X size={16} />
            </button>
          </div>

          {/* CALENDAR DRAWER CONTENT */}
          {activePanel === 'calendar' && (
            <div className="drawer-body calendar-body">
              <div className="calendar-widget-header">
                <div className="today-badge">
                  <span className="month">{new Date().toLocaleString('default', { month: 'short' })}</span>
                  <span className="day-num">{new Date().getDate()}</span>
                </div>
                <div>
                  <div className="today-date-text">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="sub-text">Upcoming Schedule</div>
                </div>
              </div>

              <div className="events-list">
                {events.map((ev) => (
                  <div key={ev.id} className="event-card">
                    <div className="event-color-bar" />
                    <div className="event-details">
                      <div className="event-title">{ev.title}</div>
                      <div className="event-time">{ev.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddEvent} className="add-event-form">
                <input
                  type="text"
                  placeholder="New Event Title"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="drawer-input"
                />
                <input
                  type="text"
                  placeholder="Time (e.g. 4:00 PM)"
                  value={newEventTime}
                  onChange={(e) => setNewEventTime(e.target.value)}
                  className="drawer-input"
                />
                <button type="submit" className="drawer-btn primary">
                  Add Event
                </button>
              </form>
            </div>
          )}

          {/* KEEP DRAWER CONTENT */}
          {activePanel === 'keep' && (
            <div className="drawer-body keep-body">
              <form onSubmit={handleAddNote} className="keep-create-box" style={{ backgroundColor: newNoteColor }}>
                <input
                  type="text"
                  placeholder="Title"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="keep-title-input"
                />
                <textarea
                  placeholder="Take a note..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="keep-content-input"
                  rows={2}
                />
                <div className="keep-form-footer">
                  <div className="color-swatches-mini">
                    {['#fef08a', '#bfdbfe', '#bbf7d0', '#fbcfe8'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`mini-swatch ${newNoteColor === c ? 'selected' : ''}`}
                        style={{ backgroundColor: c }}
                        onClick={() => setNewNoteColor(c)}
                      />
                    ))}
                  </div>
                  <button type="submit" className="drawer-btn">Save</button>
                </div>
              </form>

              <div className="notes-list">
                {notes.map((note) => (
                  <div key={note.id} className="note-card" style={{ backgroundColor: note.color }}>
                    <div className="note-header">
                      <strong>{note.title}</strong>
                      <button className="icon-btn delete-note-btn" onClick={() => handleDeleteNote(note.id)}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <p>{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TASKS DRAWER CONTENT */}
          {activePanel === 'tasks' && (
            <div className="drawer-body tasks-body">
              <form onSubmit={handleAddTask} className="add-task-form">
                <input
                  type="text"
                  placeholder="Add a task"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  className="drawer-input"
                />
                <button type="submit" className="drawer-btn primary">
                  Add
                </button>
              </form>

              <div className="tasks-list">
                {tasks.map((task) => (
                  <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                      />
                      <span className="task-text">{task.text}</span>
                    </label>
                    <button className="icon-btn delete-task-btn" onClick={() => handleDeleteTask(task.id)}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Small Vertical Icons Dock */}
      <aside className="sidebar-dock">
        <div className="sidebar-app-icons">
          <button
            className={`dock-btn ${activePanel === 'calendar' ? 'active' : ''}`}
            onClick={() => togglePanel('calendar')}
            title="Google Calendar"
          >
            <Calendar size={20} color="#4285f4" />
          </button>

          <button
            className={`dock-btn ${activePanel === 'keep' ? 'active' : ''}`}
            onClick={() => togglePanel('keep')}
            title="Google Keep"
          >
            <Bookmark size={20} color="#fbbc04" />
          </button>

          <button
            className={`dock-btn ${activePanel === 'tasks' ? 'active' : ''}`}
            onClick={() => togglePanel('tasks')}
            title="Google Tasks"
          >
            <CheckSquare size={20} color="#1a73e8" />
          </button>

          <button
            className="dock-btn"
            onClick={() => addToast('Google Contacts Integration')}
            title="Google Contacts"
          >
            <User size={20} color="#ea4335" />
          </button>

          <button
            className="dock-btn"
            onClick={() => addToast('Google Maps Integration')}
            title="Google Maps"
          >
            <MapPin size={20} color="#34a853" />
          </button>

          <div className="dock-divider" />

          <button
            className="dock-btn"
            onClick={() => addToast('Get add-ons from Google Workspace Marketplace')}
            title="Get Add-ons"
          >
            <Plus size={20} color="#5f6368" />
          </button>
        </div>

        {/* Collapse toggle at bottom */}
        <button
          className="dock-btn collapse-toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand side panel' : 'Collapse side panel'}
        >
          {isCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </aside>
    </div>
  );
}
