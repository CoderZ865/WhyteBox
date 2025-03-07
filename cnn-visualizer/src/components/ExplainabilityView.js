import React from 'react';
import { fetchFeatureMaps, highlightImportantFeatures } from '../services/xaiService';

class ExplainabilityView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            featureMaps: [],
            highlightedFeatures: [],
        };
    }

    componentDidMount() {
        this.loadFeatureMaps();
    }

    loadFeatureMaps = async () => {
        const featureMaps = await fetchFeatureMaps(this.props.model);
        this.setState({ featureMaps });
    };

    handleHighlightFeatures = () => {
        const highlightedFeatures = highlightImportantFeatures(this.state.featureMaps);
        this.setState({ highlightedFeatures });
    };

    render() {
        return (
            <div className="explainability-view">
                <h2>Explainability View</h2>
                <button onClick={this.handleHighlightFeatures}>Highlight Important Features</button>
                <div className="feature-maps">
                    {this.state.featureMaps.map((map, index) => (
                        <img key={index} src={map} alt={`Feature Map ${index}`} />
                    ))}
                </div>
                <div className="highlighted-features">
                    {this.state.highlightedFeatures.map((feature, index) => (
                        <img key={index} src={feature} alt={`Highlighted Feature ${index}`} />
                    ))}
                </div>
            </div>
        );
    }
}

export default ExplainabilityView;