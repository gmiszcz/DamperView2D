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
/src
 ├── /components                          # Main UI components
 │    ├── /parts                          # Components representing individual damper parts
 │    │    ├── ReserveTube.jsx            # Component for the reserve tube
 │    │    ├── ... (other parts)
 │    │
 │    ├── DamperModelBuilder.jsx          # Handles drawing logic using Konva
 │    ├── DamperVisualizationWindow.jsx   # Manages damper visualization UI
 │    ├── DamperVisualizationWindow.css   # Manages damper visualization UI
 │    ├── Annotations.jsx                 # Handles annotations in visualization
 │
 ├── /utils                               # Utility functions
 │    ├── utils.js                        # General utility functions
 │
 ├── /reducers                            # Redux reducers for managing state
 │    ├── genericReducer.js               # Generic reducer for handling state updates
 │    ├── RT.js                           # Reducer handling state for the reserve tube
 │    ├── BP.js, PP.js, TT.js, etc.       # Reducers for other damper components
 │
 ├── App.js                               # Main React application component
 ├── App.css                              # Global styles for the application
 ├── index.js                             # Entry point for the React application
 ├── index.css                            # Global stylesheet
 ├── package.json                         # Project dependencies and scripts
 ├── vite.config.js                       # Vite configuration for bundling
 ├── .gitignore                           # Git ignore file
 ├── README.md                            # Project documentation
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
  if (window.controlRef?.current) {
    window.controlRef.current.setProperty = (payload) => {
      rtDispatch({ type: "SET_PROPERTY", payload });
    };
    window.controlRef.current.setGeometry = (payload) => {
      rtDispatch({ type: "SET_GEOMETRY", payload });
    };
    window.controlRef.current.addAnnotation = (payload) => {
      rtDispatch({ type: "ADD_ANNOTATION", payload });
    };
    window.controlRef.current.deleteAnnotation = (id) => {
      rtDispatch({ type: "DELETE_ANNOTATION", id });
    };
    window.controlRef.current.updateAnnotation = (id, payload) => {
      rtDispatch({ type: "UPDATE_ANNOTATION_BY_ID", id, payload });
    };
    // Show current state
    window.controlRef.current.showState = () => {
      console.log("Damper data", rtState);
    };
  }
}, [rtState]);
```

### Example Usage in Vanilla JavaScript

```js
// Set damper property
window.controlRef.setProperty({ color: "blue", opacity: 0.8 });

// Set new geometry
window.controlRef.setGeometry({ OD: 30, ID: 22, L: 450, TH: 4 });

// Add an annotation
window.controlRef.addAnnotation({ id: "an3", position: { x1: 50, y1: 10, x2: 250, y2: 10 }, label: "New annotation" });

// Delete an annotation
window.controlRef.deleteAnnotation("an3");

// Update an annotation
window.controlRef.updateAnnotation("an1", { label: "Updated label" });

// Log current state
window.controlRef.showState();
```

---

## Future Enhancements

- **Expand component customization options**.
- **Support for additional annotation types**.
- **Improve UI with better interaction feedback**.
