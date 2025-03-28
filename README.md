# Idle Clicker Game

A modern, mobile-friendly idle clicker game built with React and TypeScript. Features an engaging UI with animated characters, upgrades system, and automatic resource generation.

## Features

- 🎮 Engaging click-based gameplay
- 🚀 Multiple upgrade paths
- 🎨 Modern, responsive UI design
- 🌟 Animated character and effects
- 📱 Mobile-friendly interface
- 🔄 Auto-generation system
- 💰 Progressive upgrade costs
- 🎯 Multiple upgrade types:
  - Click power upgrades
  - Auto-collector upgrades
  - Multiplier upgrades

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd idle-clicker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Game Mechanics

### Resources
- Start with basic coin generation
- Earn coins through clicking and auto-collectors
- Progressive scaling difficulty

### Upgrades
1. **Better Clicking**
   - Adds +1 coin per click
   - Base cost: 10 coins

2. **Power Click**
   - Multiplies click value by 2
   - Base cost: 50 coins

3. **Auto Collector**
   - Generates 0.5 coins per second
   - Base cost: 25 coins

4. **Coin Factory**
   - Generates 2 coins per second
   - Base cost: 100 coins

5. **Mining Rig**
   - Generates 5 coins per second
   - Base cost: 250 coins

6. **Golden Touch**
   - Multiplies click value by 5
   - Base cost: 500 coins

### Upgrade System
- Each upgrade can be purchased multiple times
- Costs increase by 1.5x per level
- Two types of upgrades:
  - Click upgrades (immediate boost to click value)
  - Auto-generation upgrades (passive income)

## Technology Stack

- React
- TypeScript
- Vite
- CSS3 with custom properties
- SVG animations

## Project Structure
