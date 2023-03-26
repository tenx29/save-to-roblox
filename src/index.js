const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const fs = require('fs');

try {
    const apiKey = core.getInput('api-key');
    const universeId = core.getInput('universe-id');
    const placeId = core.getInput('place-id');
    const versionType = core.getInput('version-type');
    const placeFile = core.getInput('place-file');

    // Validate the file
    if (!fs.existsSync(placeFile)) {
        throw new Error(`Place file does not exist: ${placeFile}`);
    }
    const extension = placeFile.split('.').pop();
    if (extension !== 'rbxl' && extension !== 'rbxlx') {
        throw new Error(`Unrecognized place file extension: ${extension}`);
    }

    const isBinary = extension === 'rbxl';

    console.log(`Uploading place file ${placeFile}`);
    axios.post(
        `https://apis.roblox.com/universes/v1/${universeId}/places/${placeId}/versions?versionType=${versionType}`,
        fs.readFileSync(placeFile, 'utf-8'),
        {
            headers: {
            'x-api-key': apiKey,
            'Content-Type': isBinary ? 'application/octet-stream' : 'application/xml',
            }
        }
    ).then((response) => {
        const data = response.data;
        const versionNumber = data.versionNumber;
        console.log(`Saved place file as version ${versionNumber}`);
        core.setOutput('version-number', versionNumber);
    });
} catch (error) {
    core.setFailed(error.message);
}