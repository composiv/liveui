const fs = require('fs');
const path = require('path');

const destination = path.resolve(process.cwd(), 'liveui.config.js');

if (fs.existsSync(destination)) {
    throw new Error('Error: EEXIST, file already exists ' + destination)
} else {
    console.log('Creating liveui.config.js...');

    const source = path.resolve(__dirname, '..', 'config', 'liveui.config.js');
    fs.copyFileSync(source, destination);
    
    console.log('Success!')
}

