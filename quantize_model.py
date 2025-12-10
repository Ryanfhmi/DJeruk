#!/usr/bin/env python3
"""
Model Quantization Script for D'Jeruk Orange Quality Scanner
Converts tfjs_layers_model to tfjs_graph_model with float16 quantization
"""

import os
import json
import numpy as np
from pathlib import Path

# Input and output paths
INPUT_MODEL_DIR = "public/my_model"
OUTPUT_MODEL_DIR = "temp_quantized"

def load_model_json(model_json_path):
    """Load model.json metadata"""
    with open(model_json_path, 'r') as f:
        return json.load(f)

def quantize_float32_to_float16(data):
    """Convert float32 array to float16"""
    if isinstance(data, np.ndarray):
        return data.astype(np.float16)
    elif isinstance(data, list):
        return np.array(data, dtype=np.float16)
    return data

def process_model():
    """Main quantization process"""
    print("[*] Starting model quantization...")
    
    # Check input exists
    if not os.path.exists(INPUT_MODEL_DIR):
        print(f"[!] Input directory not found: {INPUT_MODEL_DIR}")
        return False
    
    model_json_path = os.path.join(INPUT_MODEL_DIR, "model.json")
    if not os.path.exists(model_json_path):
        print(f"[!] model.json not found: {model_json_path}")
        return False
    
    # Create output directory
    os.makedirs(OUTPUT_MODEL_DIR, exist_ok=True)
    print(f"[+] Created output directory: {OUTPUT_MODEL_DIR}")
    
    # Load model.json
    print(f"[*] Loading model.json from {INPUT_MODEL_DIR}...")
    model_config = load_model_json(model_json_path)
    
    # Copy and adapt model.json for graph model format
    print("[*] Adapting model configuration for graph model format...")
    
    # For TFJS graph model, we need to update the format
    output_model_json = {
        "format": "graph-model",
        "generatedBy": "quantize_model.py (D'Jeruk quantization)",
        "convertedBy": "tensorflowjs (via Python quantization script)",
        "modelTopology": model_config.get("modelTopology", {}),
        "weightsManifest": []
    }
    
    # Update weights manifest with quantized format
    if "weightsManifest" in model_config:
        for manifest_group in model_config["weightsManifest"]:
            quantized_group = {
                "paths": [path.replace(".bin", ".bin") for path in manifest_group.get("paths", [])],
                "weights": manifest_group.get("weights", [])
            }
            # Mark as quantized (float16)
            for weight in quantized_group.get("weights", []):
                weight["quantization"] = {"dtype": "float16"}
            output_model_json["weightsManifest"].append(quantized_group)
    
    # Save updated model.json
    output_model_json_path = os.path.join(OUTPUT_MODEL_DIR, "model.json")
    with open(output_model_json_path, 'w') as f:
        json.dump(output_model_json, f, indent=2)
    print(f"[+] Saved quantized model.json to {output_model_json_path}")
    
    # Copy weight files and quantize them
    print("[*] Processing weight files...")
    weight_files = [f for f in os.listdir(INPUT_MODEL_DIR) if f.endswith('.bin')]
    
    if not weight_files:
        print("[!] No .bin weight files found")
        return False
    
    total_size_original = 0
    total_size_quantized = 0
    
    for weight_file in weight_files:
        input_path = os.path.join(INPUT_MODEL_DIR, weight_file)
        output_path = os.path.join(OUTPUT_MODEL_DIR, weight_file)
        
        # Read original weights as float32
        with open(input_path, 'rb') as f:
            original_data = np.frombuffer(f.read(), dtype=np.float32)
        
        # Quantize to float16
        quantized_data = original_data.astype(np.float16)
        
        # Write quantized weights
        with open(output_path, 'wb') as f:
            quantized_data.tobytes()
            f.write(quantized_data.tobytes())
        
        original_size = os.path.getsize(input_path)
        quantized_size = os.path.getsize(output_path)
        total_size_original += original_size
        total_size_quantized += quantized_size
        
        reduction_pct = (1 - quantized_size / original_size) * 100 if original_size > 0 else 0
        print(f"    {weight_file}: {original_size/1024:.1f}KB -> {quantized_size/1024:.1f}KB ({reduction_pct:.1f}% reduction)")
    
    # Copy metadata.json if exists
    metadata_path = os.path.join(INPUT_MODEL_DIR, "metadata.json")
    if os.path.exists(metadata_path):
        import shutil
        shutil.copy(metadata_path, os.path.join(OUTPUT_MODEL_DIR, "metadata.json"))
        print("[+] Copied metadata.json")
    
    # Summary
    print("\n[=] QUANTIZATION SUMMARY [=]")
    print(f"Original total size: {total_size_original / 1024 / 1024:.2f} MB")
    print(f"Quantized total size: {total_size_quantized / 1024 / 1024:.2f} MB")
    reduction_overall = (1 - total_size_quantized / total_size_original) * 100 if total_size_original > 0 else 0
    print(f"Overall reduction: {reduction_overall:.1f}%")
    print(f"\n[+] Output directory: {os.path.abspath(OUTPUT_MODEL_DIR)}")
    print("[+] Quantization completed successfully!")
    
    return True

if __name__ == "__main__":
    process_model()
