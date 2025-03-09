# WhyteBox
KTU S6 DATASCIENCE MiniProject - CNN Visualizer

## Overview
The CNN Visualizer is a web application designed to help users understand convolutional neural networks (CNNs), focusing specifically on MobileNetV2 architecture and explainable AI (XAI). This project provides an interactive platform for visualizing CNN architectures in 3D, exploring layer functionalities, and understanding how these efficient models make predictions.

## Features
- **3D Model Visualization**: Interactive 3D visualization of MobileNetV2's architecture with detailed layer representation
- **Layer Interaction**: Click on individual layers to view detailed information about their purpose, parameters, and role
- **Performance Metrics**: Compare MobileNetV2's efficiency with other popular CNN architectures (ResNet50, VGG16, etc.)
- **Educational Content**: Interactive MobileNetV2 architecture explainer with visual diagrams
- **Data Flow Animation**: Visualize how data flows through the neural network
- **Interactive Elements**: Rotate, zoom, and navigate the 3D model visualization
- **Efficiency Insights**: Understand how MobileNetV2's design choices (depthwise separable convolutions, inverted residuals, etc.) impact efficiency
- **Beginner-Friendly Guide**: Built-in guidance for users new to CNNs and deep learning concepts

## Project Structure
```
WhyteBox
├── cnn-visualizer
│   ├── src
│   │   ├── assets
│   │   │   ├── css
│   │   │   │   └── styles.css
│   │   │   └── js
│   │   │       └── utils.js
│   │   ├── components
│   │   │   ├── BeginnersGuide.js
│   │   │   ├── CNNModel.js
│   │   │   ├── ExplainabilityView.js
│   │   │   ├── GuidedTour.js
│   │   │   ├── HomePage.js
│   │   │   ├── LayerVisualizer.js
│   │   │   ├── ModelVisualizer.js
│   │   │   ├── SimpleImageUpload.js
│   │   │   ├── SimplifiedExplanation.js
│   │   │   └── UserControls.js
│   │   ├── data
│   │   │   └── sampleData.json
│   │   ├── services
│   │   │   ├── modelLoader.js
│   │   │   └── xaiService.js
│   │   ├── app.js
│   │   └── index.html
│   ├── models
│   │   └── pretrainedModel.json
│   ├── package.json
│   ├── webpack.config.js
│   └── README.md
└── README.md
```

## Prerequisites
- **Node.js**: Version 14.x or later recommended
- **npm**: Usually comes with Node.js
- **Git**: For cloning and version control
- **Modern web browser**: Chrome, Firefox, or Edge with WebGL support for 3D visualization

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/WhyteBox.git
cd WhyteBox/cnn-visualizer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Application in Development Mode
```bash
npm start
```

### 4. Access the Application
Open your browser and navigate to `http://localhost:8080`

### 5. Building for Production
```bash
npm run build
```
This creates a `dist` folder with optimized files ready for deployment.

## Deployment

### Deploying to GitHub Pages

1. Install gh-pages package (if not already installed):
```bash
npm install --save-dev gh-pages
```

2. Add these scripts to package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Deploy the application:
```bash
npm run deploy
```

### Pushing to Your Own GitHub Repository

1. Initialize Git (if not already done):
```bash
git init
```

2. Add files to staging:
```bash
git add .
```

3. Commit your files:
```bash
git commit -m "Initial commit of CNN Visualizer"
```

4. Add your GitHub repository as remote:
```bash
git remote add origin https://github.com/yourusername/WhyteBox.git
```

5. Push your files to GitHub:
```bash
git push -u origin main
```

## Troubleshooting

### Common Issues and Solutions

1. **Node version conflicts**
   - Solution: Use nvm (Node Version Manager) to switch to a compatible Node.js version

2. **Port already in use**
   - Solution: If port 8080 is already in use, modify the port in webpack.config.js

3. **WebGL not supported**
   - Solution: The 3D model visualization requires WebGL. The app should automatically fall back to a simplified 2D visualization.

4. **TensorFlow.js model loading issues**
   - Solution: The application has fallback mechanisms built-in. If loading online models fails, it will default to the embedded model.

5. **Asset loading problems**
   - Solution: Make sure the models folder is in the correct location. The app expects it in the cnn-visualizer directory.

## Usage Guidelines
- Use the user controls to select different layers of the CNN and visualize their outputs.
- Explore the explainability features to understand which parts of the input data are most influential in the model's predictions.
- Experiment with different input images to see how the model responds.
- Use the "Need Help?" button for a beginner-friendly explanation of CNN concepts.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.