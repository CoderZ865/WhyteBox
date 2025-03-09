import React from 'react';

const ExplainabilityView = ({ model }) => {
  return (
    <div className="explainability-view">
      <h2>Explainability View</h2>
      <div className="coming-soon-message">
        <p>The explainability features are currently in development.</p>
        <p>This section will provide visual explanations of how MobileNetV2 processes images and makes predictions.</p>
        <div className="placeholder-feature">
          <h3>Coming Soon:</h3>
          <ul>
            <li>Feature visualization for each layer</li>
            <li>Activation heatmaps</li>
            <li>Filter visualization</li>
            <li>Attribution methods (Grad-CAM, Integrated Gradients)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExplainabilityView;