const fs = require('fs');
const os = require('os');

function run()
{
    console.log(`VERSION: ${process.env.VERSION}`);
    console.log(`INCREMENT_POSITION: ${process.env.INCREMENT_POSITION}`);
    
    const versionRegex = new RegExp('^\d+(\.\d+){0,3}$');

    if (!versionRegex.test(process.env.VERSION))
        throw new Error(`Invalid version provided: ${process.env.VERSION}`);
    
    const positionToIncrement = 2;

    if (process.env.INCREMENT_POSITION)
        positionToIncrement = process.env.INCREMENT_POSITION - 1;

    const versionSplit = process.env.VERSION.split('.');

    if (process.env.INCREMENT_POSITION && (positionToIncrement < 0 || positionToIncrement > 3))
        throw new Error('Position to increment must be between 1 and 4.');
    if (process.env.INCREMENT_POSITION && process.env.INCREMENT_POSITION > versionSplit.length)
        throw new Error(`Invalid increment position specified. Position specified, ${process.env.INCREMENT_POSITION}, is outside the bounds of the specified version, ${process.env.VERSION}.`);

    versionSplit[positionToIncrement] = versionSplit[positionToIncrement] + 1;

    for (var i = positionToIncrement + 1; i < 4; i++){
        versionSplit[i] = 0;
    }
    
    const newVersion = versionSplit.join('.');
    
    console.log(`Version: ${ver}`)

    process.stdout.write(`::set-output name=VERSION::${ver}` + os.EOL)
}

run();
