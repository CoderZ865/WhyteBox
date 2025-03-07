import React from 'react';

const BeginnersGuide = ({ onClose }) => {
  return (
    <div className="beginners-guide">
      <div className="guide-header">
        <h2>Understanding Computer Vision - For Complete Beginners</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="guide-content">
        <section>
          <h3>What is a CNN?</h3>
          <p>
            A <strong>Convolutional Neural Network (CNN)</strong> is like a brain that learns to see. 
            Just as you can recognize a cat in a photo, a CNN can be trained to do the same!
          </p>
          <div className="analogy">
            <h4>Real-life Analogy</h4>
            <p>
              Imagine you're trying to find Waldo in a crowded picture. You don't look at every tiny detail at once.
              Instead, your eyes scan for patterns - red and white stripes, glasses, etc.
              A CNN works the same way! It learns to recognize important patterns.
            </p>
          </div>
        </section>
        
        <section>
          <h3>How Does It Work?</h3>
          <ol>
            <li>
              <strong>Seeing Features</strong>: First layers detect simple features like edges and colors
              <div className="example-image">
                <img src="/assets/images/guide/simple-features.jpg" alt="Simple features like edges" />
              </div>
            </li>
            <li>
              <strong>Combining Features</strong>: Middle layers combine these to find patterns like "whiskers" or "wheels"
              <div className="example-image">
                <img src="/assets/images/guide/combined-features.jpg" alt="Combined features like shapes" />
              </div>
            </li>
            <li>
              <strong>Making Decisions</strong>: Final layers put everything together to decide "That's a cat!" or "That's a car!"
              <div className="example-image">
                <img src="/assets/images/guide/final-decision.jpg" alt="Final classification" />
              </div>
            </li>
          </ol>
        </section>
        
        <section>
          <h3>Why Do We Need to Explain AI?</h3>
          <p>
            AI systems can sometimes be "black boxes" - we know they work, but not exactly how they make decisions.
            <strong>Explainable AI</strong> helps us peek inside to understand:
          </p>
          <ul>
            <li>Which parts of an image influenced the decision most</li>
            <li>What patterns the AI has learned to recognize</li>
            <li>When and why the AI might make mistakes</li>
          </ul>
        </section>
        
        <div className="guide-controls">
          <button className="primary-btn" onClick={onClose}>Got it, let's explore!</button>
        </div>
      </div>
    </div>
  );
};

export default BeginnersGuide;
