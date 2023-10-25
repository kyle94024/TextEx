# Project Title

TextEx - A Chrome extension tool for turning text into layperson language.

## Technologies<a name="technologies"></a>

TextEx is built using the following technologies:

- JavaScript
- npm
- TypeScript
- Node
- Chat-GPT 3.5 Turbo
- Vite

## Introduction<a name="introduction"></a>

TextEx is a Chrome extension tool that allows users to understand any text using the "Lay-ify" and "Summary" tools. The aim of the project is to provide laypersons a powerful and flexible tool to understand jargon-filled and expert-level text easily, whether for personal or professional use.

## Launch<a name="launch"></a>

To launch TextEx, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the `textex` directory.
3. Run the command `npm install` to install the necessary dependencies.
4. Run the command `npm run dev` to create build folder.  <!--- This is what worked for me, not sure if it was different on your computer, npm build gave an error.  ---> 
5. To use TextEx as a Chrome extension, set your Chrome browser to 'Developer mode', click 'Load unpacked', and select the `textex/build` folder.

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Launch](#launch)
- [Scope of Functionalities](#scope-of-functionalities)
- [Examples of Use](#examples-of-use)
- [Project Status](#project-status)
- [Future Features/Bugs Priority](#future)

## Scope of Functionalities<a name="scope-of-functionalities"></a>

TextEx has two main tools:

- Lay-ify
- Summary

## Examples of Use<a name="examples-of-use"></a>

Here are some examples of how TextEx can be used:

- Reading a medical diagnosis report to understand jargon, to easily and quickly know what action steps you need to take.
- Reading a scientific article for comprehension, without ever having to leave the article to google complex terminology
- Summarizing a lengthy piece of text into the key points

## Project Status<a name="project-status"></a>

TextEx is currently in active development, and is being sorta actively maybe not maintained and updated by me.

## Future Features/Bugs Priority<a name="future"></a>

## Additional Features and Bugs

Here are some additional features and bugs that can be added or fixed in TextEx:

### Feature: Improved User Experience

1. QOL, but very important for the older audience: After someone highlights the text, a little small button, that isn't in the way, should appear near the cursor which will have the option to lay or summarize (instead of having to open the context menu by right-clicking).

### Bug: Console Errors

2. There are usually some errors in the tab console that don't seem to critically affect performance, but maybe they do.

### Feature: Return to text
3. When a popup appears, it can be freely dragged, yet what if the user wants to have it return to the relevant text, in case they lost track?

### Feature: Text Conversion

4. Create a button to layify the text from a summary, or vice versa. I have already tried implementing this, but have not yet figured out how.

### Feature: Persistent Popups

5. QOL. When closing a tab and reopening, stores previous text popups and can redisplay them.

### Feature: Improved Visuals

6. Graphic. Improve visuals using Tailwindcss or other means.



