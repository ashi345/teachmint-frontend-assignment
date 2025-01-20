# Pizza Shop Order Management System

A React application that simulates a pizza restaurant's order management system. The application handles pizza orders from placement to delivery, with real-time tracking of order stages and time management.

## Resources
1. https://react.dev/learn/describing-the-ui
2. https://redux.js.org/tutorials/quick-start
3. https://tailwindcss.com/docs/utility-first

# For Redux through Youtube
4. https://www.youtube.com/watch?v=DnRY5yG67u8

## 🚀 Live Demo

[View Live Demo](https://vercel.com/ashi345s-projects/pizza-orders-management-app)

## ✨ Features

- **Order Management**
  - Place customized pizza orders with options for type, size, and base
  - Maximum capacity of 10 concurrent orders
  - Real-time order tracking through different stages
  - Order cancellation functionality before the "Ready" stage

- **Order Stages**
  1. Order Placed
  2. Order in Making
  3. Order Ready
  4. Order Picked

- **Time Management**
  - Real-time tracking of time spent in each stage
  - Visual alerts (red highlight) for orders exceeding 3 minutes in a stage
  - Different making times based on pizza size:
    - Small: 3 minutes
    - Medium: 4 minutes
    - Large: 5 minutes

- **Display Features**
  - Split-view interface showing both order stages and main display
  - Main display showing all in-progress orders with remaining times
  - Daily delivery counter
  - Orders sorted based on stage delays

## 🛠️ Built With

- [React](https://reactjs.org/) - Frontend framework
- [Vite](https://vitejs.dev/) - Build tool
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/ashi345/teachmint-frontend-assignment.git
```

2. Navigate to project directory
```bash
cd teachmint-frontend-assignment
```

3. Install dependencies
```bash
npm install
# or
yarn
```

4. Start development server
```bash
npm run dev
# or
yarn dev
```

5. Open http://localhost:5173 to view it in your browser

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── OrderForm.jsx
│   ├── StageDisplay.jsx
│   └── MainDisplay.jsx
├── store/             # Redux store configuration
│   └── store.js       # Redux store setup
├── features/          # Redux slices
│   └── ordersSlice.js # Order management slice
├── utils/             # Utility functions
│   ├── constants.js   # App constants and enums
│   └── timeUtils.js   # Time formatting and calculations
├── App.jsx           # Root component
└── main.jsx         # Entry point
```

## 🎮 Key Files Overview

### Store Configuration
- `store/store.js`: Redux store configuration with reducers and middleware setup

### Features
- `features/ordersSlice.js`: Redux slice for managing order state, including actions for adding, updating, and canceling orders

### Utils
- `utils/constants.js`: Contains important constants like:
  - Order stages enum
  - Pizza types
  - Size configurations
  - Time limits
- `utils/timeUtils.js`: Helper functions for:
  - Time formatting
  - Stage duration calculations
  - Delay checking

## 💻 State Management

The application uses Redux Toolkit for state management with the following main states:
- Active Orders
- Order History
- Delivery Counter
- Stage Timers


## 👨‍💻 Author

Ashish Kumar - [Ashi345](https://github.com/ashi345)

## 🙏 Acknowledgments
