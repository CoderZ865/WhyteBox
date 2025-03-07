import React from 'react';
import ReactDOM from 'react-dom';
import CNNModel from './components/CNNModel';
import ExplainabilityView from './components/ExplainabilityView';
import LayerVisualizer from './components/LayerVisualizer';
import UserControls from './components/UserControls';
import ModelVisualizer from './components/ModelVisualizer';
import HomePage from './components/HomePage';
import BeginnersGuide from './components/BeginnersGuide';
import './assets/css/styles.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: null,
            layers: [],
            selectedLayer: null,
            isLoading: true,
            error: null,
            currentView: 'home', 
            activeTab: 'visualizer',
            showBeginnersGuide: false,
            modelName: 'MobileNetV2',
            availableModels: [],
            selectedModelType: 'mobilenetv2'
        };
    }

    async componentDidMount() {
        try {
            console.log("App mounting, loading embedded model by default...");
            // Always start with the embedded model which is guaranteed to work
            await this.loadModel('embedded');
        } catch (error) {
            console.error("Error in componentDidMount:", error);
            this.setState({ 
                isLoading: false,
                error: "Failed to initialize the application: " + error.message
            });
        }
    }

    async loadModel(modelType) {
        try {
            this.setState({ 
                isLoading: true, 
                error: null,
                selectedModelType: modelType // Immediately update selected model type
            });
            
            console.log(`Loading ${modelType} model...`);
            
            // Use direct path to local JSON model file
            const modelPath = modelType === 'custom' ? '/models/pretrainedModel.json' : null;
            
            // Create model instance
            const model = new CNNModel(modelPath);
            
            // Get available models to populate UI
            const availableModels = model.getAvailableModels();
            
            // Load the selected model
            const loadedModel = await model.loadModel(modelType);
            
            // Extra check - if we didn't get a model back, throw an error
            if (!loadedModel) {
                throw new Error(`Failed to load ${modelType} model - no model returned`);
            }
            
            // Do a quick validation
            if (!loadedModel.model || !loadedModel.model.layers) {
                throw new Error("Model loaded but has invalid structure");
            }
            
            // Get layers for visualization
            const layers = model.getLayers().map(layer => layer.type) || [];
            console.log(`Loaded ${model.getModelName()} model with ${layers.length} layers`);
            
            this.setState({
                model: model,
                layers: layers,
                modelName: model.getModelName(),
                isLoading: false,
                availableModels: availableModels,
                selectedModelType: modelType,
                error: null // Clear any previous errors
            });
        } catch (error) {
            console.error("Error loading model:", error);
            
            // Try loading the embedded model as a last resort
            try {
                if (modelType !== 'embedded') {
                    console.log("Trying embedded model as fallback");
                    const model = new CNNModel();
                    const availableModels = model.getAvailableModels();
                    await model.loadModel('embedded');
                    
                    const layers = model.getLayers().map(layer => layer.type) || [];
                    
                    this.setState({
                        model: model,
                        layers: layers,
                        modelName: model.getModelName(),
                        isLoading: false,
                        availableModels: availableModels,
                        selectedModelType: 'embedded',
                        error: `Failed to load ${modelType} model. Using built-in model instead.`
                    });
                    
                    // Show a temporary error but don't prevent the app from working
                    setTimeout(() => {
                        this.setState({ error: null });
                    }, 5000);
                    
                    return;
                }
            } catch (fallbackError) {
                console.error("Even embedded model failed:", fallbackError);
            }
            
            this.setState({ 
                isLoading: false,
                error: `Failed to load model: ${error.message}`
            });
        }
    }

    handleModelChange = async (modelType) => {
        console.log("Changing model to:", modelType);
        await this.loadModel(modelType);
    };

    handleLayerChange = (layer) => {
        console.log("Layer selected:", layer);
        this.setState({ selectedLayer: layer });
    };

    handleParameterChange = (param, value) => {
        console.log(`Parameter ${param} changed to ${value}`);
    };

    setActiveTab = (tab) => {
        this.setState({ activeTab: tab });
    };
    
    handleViewModelClick = () => {
        this.setState({ currentView: 'model' });
    };
    
    handleBackToHome = () => {
        this.setState({ currentView: 'home' });
    };

    toggleBeginnersGuide = () => {
        this.setState(prevState => ({ 
            showBeginnersGuide: !prevState.showBeginnersGuide 
        }));
    }

    renderContent() {
        const { 
            model, 
            layers, 
            selectedLayer, 
            isLoading, 
            error, 
            activeTab, 
            currentView, 
            showBeginnersGuide, 
            modelName,
            availableModels,
            selectedModelType
        } = this.state;

        if (isLoading) {
            return (
                <div className="loading-container">
                    <p>Loading {modelName} model...</p>
                    <div className="spinner"></div>
                    <p className="loading-tip">This may take a moment for larger models. If loading fails, try the built-in model option.</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="error-container">
                    <h2>Error Loading Model</h2>
                    <p>{error}</p>
                    <div className="error-actions">
                        <button 
                            className="button" 
                            onClick={() => this.loadModel('mobilenetv2')}
                        >
                            Try Loading MobileNetV2 Instead
                        </button>
                        <button 
                            className="button secondary" 
                            onClick={this.handleBackToHome}
                        >
                            Return to Home
                        </button>
                    </div>
                </div>
            );
        }
        
        return (
            <>
                {showBeginnersGuide && <BeginnersGuide onClose={this.toggleBeginnersGuide} />}
                
                {currentView === 'home' ? (
                    <HomePage 
                        onViewModelClick={this.handleViewModelClick} 
                        onHelpClick={this.toggleBeginnersGuide}
                        modelName={modelName}
                        availableModels={availableModels}
                        selectedModel={selectedModelType}
                        onModelChange={this.handleModelChange}
                    />
                ) : (
                    <>
                        <header>
                            <div className="header-content">
                                <button className="back-button" onClick={this.handleBackToHome}>
                                    &larr; Back to Home
                                </button>
                                <h1>{modelName} Visualizer</h1>
                                <button className="help-button" onClick={this.toggleBeginnersGuide}>
                                    Need Help?
                                </button>
                            </div>
                            <div className="model-selector">
                                <label>Select Model: </label>
                                <select 
                                    value={selectedModelType} 
                                    onChange={(e) => this.handleModelChange(e.target.value)}
                                >
                                    {availableModels.map(model => (
                                        <option key={model.id} value={model.id}>{model.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="tabs">
                                <button 
                                    className={`tab ${activeTab === 'visualizer' ? 'active' : ''}`}
                                    onClick={() => this.setActiveTab('visualizer')}
                                >
                                    3D Model Visualization
                                </button>
                                <button 
                                    className={`tab ${activeTab === 'explainability' ? 'active' : ''}`}
                                    onClick={() => this.setActiveTab('explainability')}
                                >
                                    Explainability
                                </button>
                            </div>
                        </header>

                        {activeTab === 'visualizer' ? (
                            <div className="model-container">
                                <UserControls 
                                    layers={layers} 
                                    onLayerChange={this.handleLayerChange}
                                    onParameterChange={this.handleParameterChange}
                                />
                                {/* Fix: Pass the model data correctly - model is a CNNModel instance, 
                                    so we need to pass the actual model data */}
                                <ModelVisualizer modelData={model ? model.model : null} />
                            </div>
                        ) : (
                            <div className="visualization">
                                <LayerVisualizer 
                                    model={model} 
                                    onLayerSelect={this.handleLayerChange}
                                />
                                <ExplainabilityView 
                                    model={model}
                                />
                            </div>
                        )}
                    </>
                )}
            </>
        );
    }

    render() {
        return (
            <div className="container">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));