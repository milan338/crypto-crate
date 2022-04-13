// Convert Blender export glb file to gltf

const path = require('path');
const fs = require('fs');
const gltfp = require('gltf-pipeline');
const jsonminify = require('jsonminify');

const MODELS_IN = path.join(__dirname, '..', 'models');
const MODELS_OUT = path.join(__dirname, '..', 'public', 'models');

// glb conversion options
const options = {
    dracoOptions: {
        compressionLevel: 10,
    },
};

// Convert glb files to compressed gltf files
async function convert() {
    // Only convert .glb files
    const files = fs
        .readdirSync(MODELS_IN)
        .filter((file) => {
            return file.split('.')[1] === 'glb';
        })
        .map((file) => {
            return file.split('.')[0];
        });
    // Convert files
    try {
        for (const file of files) {
            const glbFile = path.join(MODELS_IN, `${file}.glb`);
            const gltfFile = path.join(MODELS_OUT, `${file}.gltf`);
            // Ensure required files exist
            if (!fs.existsSync(glbFile)) {
                process.exit(`File ${glbFile} does not exist`);
            }
            // Read input glb file
            const glb = fs.readFileSync(glbFile);
            // Convert glb file to glTF
            const gltf = await gltfp.glbToGltf(glb);
            // Compress glTF
            const compressed = await gltfp.processGltf(gltf.gltf, options);
            // Minify output json
            const out = jsonminify(JSON.stringify(compressed.gltf, null, 4));
            // Write result to file
            fs.writeFileSync(gltfFile, out);
        }
    } catch (err) {
        console.error(err);
        process.exit();
    }
}

module.exports = {
    convert: convert,
};
