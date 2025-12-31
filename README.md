# Typing Speed Test – Web App

**Requirements**
- A modern web browser (Chrome, Firefox, Edge, Safari)  
- Active internet connection to fetch typing paragraphs  
- Basic understanding of HTML and JavaScript to customize or extend the project  
- No backend or server setup required (fully client-side application)  

**Technologies Used**
- **HTML** for structuring the typing test interface  
- **Vanilla JavaScript** for handling typing logic, timers, and statistics  
- **Fetch API** to load typing paragraphs dynamically  
- **Supabase Storage (public URLs)** for hosting difficulty-based text files  
- **JavaScript Timers (`setInterval`)** for countdown and test duration control  

**About the Data Source**
- Typing paragraphs are fetched from **Supabase Storage** using signed public URLs  
- Separate text files are maintained for:
  - Easy  
  - Medium  
  - Difficult  
- Each file contains multiple paragraphs, and one is randomly selected per test  
- Data is fetched in JSON format and parsed on the client side  

**Features Implemented**
- Difficulty selection (Easy, Medium, Difficult)  
- 60-second typing test with real-time countdown  
- Character-by-character highlighting:
  - Correct characters in green  
  - Incorrect characters in red with underline  
- Live statistics display:
  - Characters Per Minute (CPM)  
  - Words Per Minute (WPM)  
  - Mistake count  
- Hidden input technique to capture keystrokes seamlessly  
- Caret indicator to enhance typing experience  
- Restart test option without page reload  
- Responsive layout for desktop and mobile devices  

**Application Flow**
- User selects difficulty and starts the test  
- A random paragraph is loaded from the selected difficulty set  
- Timer starts immediately when the test begins  
- User types while stats update in real time  
- Test ends automatically after 60 seconds  
- User can restart the test using the **Try Again** button  

**Notes**
- WPM is calculated using the standard formula: `characters / 5`  
- All logic runs entirely in the browser  
- Designed as a practice project to improve:
  - DOM manipulation  
  - Event handling  
  - Real-time UI updates  
  - Typing performance tracking  

**Possible Enhancements**
- Add accuracy percentage calculation  
- Support custom test duration  
- Store best scores using localStorage  
- Add multiplayer or competitive mode  
- Add sound feedback for errors
- Proper color scheme for different difficulty level
- Record storing of frequently visiting users
