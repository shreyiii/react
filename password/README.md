# Password Generator (React)

>A small, polished password generator built with React and Tailwind CSS (Vite).

## Features
- Generate secure random passwords
- Options: include uppercase, lowercase, numbers, symbols
- Adjustable length (configurable min/max)
- Password strength meter (Weak / Medium / Strong)
- Show / Hide toggle for the generated password
- Copy-to-clipboard with feedback
- Local history (last 10 generated passwords) with quick copy and clear
- Polished UI with gradients, glass effect, and responsive layout

## Getting Started

Prerequisites:
- Node.js (16+) and npm

Install and run the dev server:

```bash
cd password
npm install
npm run dev
```

Open the app in your browser at the local Vite URL printed in the terminal (e.g. http://localhost:5173 or 5174).

## Usage
- Choose which character sets to include (Uppercase, Lowercase, Numbers, Symbols).
- Set desired password length (defaults provided).
- Click "Generate Password" to produce a new password.
- Use the "Show" button to reveal the password, and "Copy" to copy it to your clipboard.
- Generated passwords are saved to a small local history list for quick reuse.

## Configuration
- Default min/max length are defined in `src/App.jsx` via `MIN_LEN` and `MAX_LEN` (currently 4 and 64).
- To change styles, edit `src/App.css` and `src/index.css` (Tailwind utilities are used).

## Notes
- The app stores history only in memory (not persisted across page reloads). You can extend it to `localStorage` if needed.
- This project uses the Clipboard API; some browsers may require a secure context (https or localhost).

## License
MIT
