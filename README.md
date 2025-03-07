# DamperView2D

## Overview

DamperView2D is a **2D visualization tool** for a **shock absorber** built using **React.js** and the **Konva.js** library. This project allows for easy integration into a Vanilla JavaScript or React-based application, enabling interactive control of damper geometry and annotations.

### Features

- **Interactive visualization** of damper geometry.
- **State management with Context API & Reducers**.
- **Modular structure**, allowing easy customization and extension.
- **Supports external control** via `window.controlRef`.

---

## Installation

### 1. Clone the repository

```sh
 git clone https://github.com/your-repository/DamperView2D.git
 cd DamperView2D
```

### 2. Install dependencies

```sh
npm install
```

### 3. Run the application

```sh
npm start
```

---

## Project Structure

```
/DamperView2D
├── /src
│   ├── /assets
│   │   ├── /fonts
│   │   │   ├── Poppins-Bold.woff
│   │   │   ├── Poppins-Bold.woff2
│   │   │   ├── Poppins-Regular.woff
│   │   │   └── Poppins-Regular.woff2
│   │   └── /images
│   │       └── logo.svg
│   │
│   ├── /components
│   │   ├── /DamperVisualization
│   │   │   ├── DamperVisualizationWindow.jsx   # Main component managing visualization & API exposure
│   │   │   ├── DamperVisualizationWindow.css   # Styles for main visualization window
│   │   │   ├── DamperModelBuilder.jsx          # Handles drawing logic using Konva
│   │   │   ├── Annotations.jsx                 # Manages annotations
│   │   │
│   │   └── /parts
│   │       ├── ReserveTube.jsx
│   │       ├── PressureTube.jsx
│   │       ├── Rod.jsx
│   │       ├── RodGuide.jsx
│   │       ├── Bearing.jsx
│   │       ├── BaseEnd.jsx
│   │       ├── Piston.jsx
│   │       ├── PistonPost.jsx
│   │       ├── FootBracket.jsx
│   │       ├── Knuckle.jsx
│   │       ├── CesValve.jsx
│   │       ├── ThirdTube.jsx
│   │       └── SpringSeat.jsx
│   │
│   ├── /context
│   │   ├── GlobalContext.jsx
│   │   ├── GlobalProvider.jsx
│   │   ├── RTContext.jsx
│   │   ├── RodContext.jsx
│   │   ├── TTContext.jsx
│   │   ├── SSContext.jsx
│   │   ├── BearingContext.jsx
│   │   ├── RGContext.jsx
│   │   ├── BPContext.jsx
│   │   ├── PTContext.jsx
│   │   ├── PPContext.jsx
│   │   ├── FBContext.jsx
│   │   ├── PositionsContext.jsx
│   │   ├── KnuckleContext.jsx
│   │   └── CVSAeContext.jsx
│   │
│   ├── /reducers
│   │   ├── genericReducer.js
│   │   └── (inne reducery, jeśli masz lub będziesz mieć specyficzne dla komponentów)
│   │
│   ├── /utils
│   │   ├── utils.js
│   │   └── constants.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.jsx
│   ├── index.css
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
└── .gitignore
```

### State Management

This project uses **Context API and Reducers** instead of Redux to efficiently manage states.

- **genericReducer.js** – A reusable reducer that handles state updates.
- **RT.js** – Specific reducer managing the reserve tube state.

---

## External Control with `window.controlRef`

This project allows **external JavaScript control** through the global `window.controlRef` object. You can manipulate damper properties, geometry, and annotations dynamically.

### Example Implementation in a React Component

```jsx
useEffect(() => {
  if (!window.controlRef) window.controlRef = controlRef;
  if (!window.controlRef.current) window.controlRef.current = {};

  Object.keys(globalContext).forEach((key) => {
    if (!window.controlRef.current[key]) window.controlRef.current[key] = {};

    window.controlRef.current[key].setProperty = (payload) => {
      globalContext[key].dispatch({ type: "SET_PROPERTY", payload });
    };
    window.controlRef.current[key].setGeometry = (payload) => {
      globalContext[key].dispatch({ type: "SET_GEOMETRY", payload });
    };
    window.controlRef.current[key].addAnnotation = (payload) => {
      globalContext[key].dispatch({ type: "ADD_ANNOTATION", payload });
    };
    window.controlRef.current[key].deleteAnnotation = (id) => {
      globalContext[key].dispatch({ type: "DELETE_ANNOTATION", id });
    };
    window.controlRef.current[key].updateAnnotation = (id, payload) => {
      globalContext[key].dispatch({ type: "UPDATE_ANNOTATION_BY_ID", id, payload });
    };
    window.controlRef.current[key].showState = () => {
      console.log(`${key} data`, globalContext[key].state);
    };
  });

  // Show global context after update
  console.log("🔄 GlobalContext updated:", globalContext);
}, [globalContext]);
```

### Example Usage in Vanilla JavaScript

```js
// Set damper property
window.controlRef.current.RT.setProperty({ color: "blue", opacity: 0.8 });

// Set new geometry
window.controlRef.current.RT.setGeometry({ OD: 30, ID: 22, L: 450, TH: 4 });

// Add an annotation
window.controlRef.current.RT.addAnnotation({ id: "an3", position: { x1: 50, y1: 10, x2: 250, y2: 10 }, label: "New annotation" });

// Delete an annotation
window.controlRef.current.RT.deleteAnnotation("an3");

// Update an annotation
window.controlRef.current.RT.updateAnnotation("an1", { label: "Updated label" });

// Log current state
window.controlRef.current.RT.showState();
```

---

## Future Enhancements

- **Expand component customization options**.
- **Support for additional annotation types**.
- **Improve UI with better interaction feedback**.
