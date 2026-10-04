# Google Docs Clone 📝

A fully functional, pixel-perfect **Google Docs Clone** built using **React, HTML5, Vanilla CSS, and Vite**.

![Google Docs Clone](https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80)

## ✨ Features

- **Top Navbar:**
  - Google Docs branding & SVG logo.
  - Editable document title (default `"Untitled document"`, updates tab title dynamically).
  - Interactive menus: **File, Edit, View, Insert, Format, Tools, Help**.
  - Quick action status icons: Star document toggle, Move folder action, Live cloud save indicator (`Saving...` / `Saved to Drive`), Version history, Comment history, Google Meet call launcher.
  - Primary Google Blue **Share** button with interactive modal (invite members, permissions, copy link).

- **Rich Formatting Toolbar:**
  - Undo & Redo controls.
  - Print button & Spell Check tool.
  - Paint format painter.
  - Zoom selector (50% to 200%).
  - Text Style selector (Normal text, Title, Subtitle, Heading 1, 2, 3).
  - Font family dropdown (Arial, Inter, Roboto, Merriweather, Georgia, Outfit, Courier Prime, Playfair Display, etc.).
  - Font size selector (`-`, input box, `+`).
  - Bold, Italic, Underline, Strikethrough toggles.
  - Text color & Highlight color pickers with custom swatches.
  - Text alignment: Left, Center, Right, Justify.
  - Line spacing options (Single, 1.15, 1.5, Double, Add space before/after).
  - Lists & Indents (Bulleted list, Numbered list, Increase/Decrease indent, Clear formatting).
  - Editing mode indicator (Editing, Suggesting, Viewing).

- **Document Page Canvas:**
  - **Horizontal Ruler**: 8-inch scale with sub-ticks, left/right margin indicators, and first-line indent marker.
  - **Document Outline Panel**: Auto-parses H1, H2, H3 headings from text for jump navigation.
  - **A4 Centered Layout**: `816px` width, 1-inch margins, subtle paper drop-shadow.
  - **Rich-text Editable Engine**: Live sync between cursor position and active toolbar states.

- **Right Productivity Sidebar:**
  - **Google Calendar Drawer**: Mini calendar schedule feed and event creator.
  - **Google Keep Drawer**: Color-tagged sticky notes manager.
  - **Google Tasks Drawer**: Interactive checklist to-do manager.

- **Modals & File Export:**
  - Share modal, Insert Image modal (Stock library, URL, file upload), Insert Table modal, Word Count stats modal, Find & Replace bar.
  - Download document as HTML, TXT, or print to PDF.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- `npm` or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Amaankhan8299/Google-Docs-clone.git
   cd Google-Docs-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173/` in your browser.

---

## 🛠️ Built With

- **React 18**
- **Vite**
- **Lucide React** (Icons)
- **Vanilla CSS** (Custom CSS design system with light/dark theme variables)
