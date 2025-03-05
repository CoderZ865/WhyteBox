import tensorflow as tf
from tensorflow.keras.applications import VGG16
import json
import numpy as np
import os

def load_model():
    model = VGG16(weights='imagenet', include_top=True)
    return model

def save_layer_details(model):
    layer_details = []
    for layer in model.layers:
        if isinstance(layer, tf.keras.layers.InputLayer):
            # Modified InputLayer handling
            config = layer.get_config()
            layer_info = {
                'name': layer.name,
                'type': 'InputLayer',
                'input_dtype': str(layer.dtype),
                'shape': str(config.get('input_shape', None))  # Changed to use input_shape
            }
        else:
            # Create a serializable layer info dictionary
            layer_info = {
                'name': layer.name,
                'type': layer.__class__.__name__,
                'input_shape': str(layer.input_dtype),
                'output_shape': str(layer.output_shape),
                'activation': str(layer.activation.__name__ if hasattr(layer, 'activation') and layer.activation else None),
                'trainable': bool(layer.trainable),
                'weights_shape': [str(w.shape) for w in layer.get_weights()] if layer.get_weights() else []
            }
        layer_details.append(layer_info)
    
    # Use os.path for correct path handling
    current_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(current_dir, 'vgg16_layer_details.json')
    
    try:
        # Ensure all data is JSON serializable
        with open(json_path, 'w', encoding='utf-8') as json_file:
            json.dump(layer_details, json_file, indent=4, ensure_ascii=False)
        print(f"Successfully saved layer details to: {json_path}")
        # Verify file exists
        if os.path.exists(json_path):
            print(f"File size: {os.path.getsize(json_path)} bytes")
    except Exception as e:
        print(f"Error saving JSON file: {str(e)}")
        print(f"Current working directory: {os.getcwd()}")
        print(f"Attempting to save to: {json_path}")

if __name__ == "__main__":
    print("Loading VGG16 model...")
    model = load_model()
    print("Saving layer details...")
    save_layer_details(model)