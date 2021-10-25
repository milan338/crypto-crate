// Convert Blender export glb file to gltf

const path = require('path');
const fs = require('fs');
const gltfp = require('gltf-pipeline');

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
            if (file.split('.')[1] !== 'glb') {
                return false;
            }
            return true;
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
            const out = await gltfp.processGltf(gltf.gltf, options);
            // Write result to file
            fs.writeFileSync(gltfFile, JSON.stringify(out.gltf, null, 4));
        }
    } catch (err) {
        console.error(err);
        process.exit();
    }
}

module.exports = {
    convert: convert,
};
