# DamperView2D

## Overview

DamperView2D is a **2D visualization tool** for a **shock absorber**, built using **React.js** and the **Konva.js** library. It integrates seamlessly into Vanilla JavaScript or React-based applications, offering interactive control over damper geometry, properties, and annotations.

### Key Features

- **Interactive visualization** using Konva.js.
- Efficient **state management using Context API and Reducers**.
- **Modular structure** facilitating easy customization and extension.
- Provides an **external JavaScript API** (`window.controlRef`) for dynamic control.

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
│   │   │   ├── Poppins-Regular.woff
│   │   │   └── (...)
│   │   └── /images
│   │       └── logo.svg
│   ├── /components
│   │   ├── /DamperVisualization
│   │   │   ├── DamperVisualizationWindow.jsx
│   │   │   ├── DamperVisualizationWindow.css
│   │   │   ├── DamperModelBuilder.jsx
│   │   │   ├── Annotations.jsx
│   │   └── /parts
│   │       ├── ReserveTube.jsx
│   │       ├── PressureTube.jsx
│   │       ├── Rod.jsx
│   │       └── (... other parts)
│   ├── /context
│   │   ├── GlobalContext.jsx
│   │   ├── GlobalProvider.jsx
│   │   ├── RTContext.jsx
│   │   └── (... other part contexts)
│   ├── /reducers
│   │   ├── partsReducer.js
│   ├── /utils
│   │   ├── utils.js
│   │   └── constants.js
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

DamperView2D uses the **Context API and Reducers** for efficient state handling.

- **partsReducer.js** – General reducer for common actions.
- Specific context files (e.g., `RTContext.jsx`, `RodContext.jsx`) manage states of individual damper components.

---

## External Control with `window.controlRef`

The project exposes a global `window.controlRef` object, allowing external JavaScript applications to dynamically manage damper properties, geometry, and annotations.

### Available Methods:

```js
window.controlRef.current.<Part>.setProperty(payload);
window.controlRef.current.<Part>.setGeometry(payload);
window.controlRef.current.<Part>.addAnnotation(payload);
window.controlRef.current.<Part>.deleteAnnotation(id);
window.controlRef.current.<Part>.updateAnnotation(id, payload);
window.controlRef.current.<Part>.showState();
```

Replace `<Part>` with component keys like `RT`, `Rod`, `Bearing`, etc.

### Example Usage (Vanilla JS)

```js
// Update Reserve Tube property
window.controlRef.current.RT.setProperty({ color: "blue", opacity: 0.8 });

// Update Rod geometry
window.controlRef.current.Rod.setGeometry({ Rod_OD: 22, Rod_Length: 330 });

// Add annotation to Bearing
window.controlRef.current.Bearing.addAnnotation({
  id: "bearingAn3",
  position: { x1: 10, y1: 20, x2: 210, y2: 20 },
  label: "New Bearing Annotation",
});

// Log current state of Piston Post
window.controlRef.current.PP.showState();
```

---

## Future Enhancements

- Enhanced component customization.
- Additional annotation types.
- Improved interactive feedback and UI responsiveness.
