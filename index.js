const os = require('os');

function run()
{
    var version = process.env.VERSION || process.env.INPUT_VERSION;
    var position = process.env.INCREMENT_POSITION || process.env.INPUT_INCREMENT_POSITION;

    console.log(`VERSION: ${version}`);
    console.log(`INCREMENT_POSITION: ${position}`);
    
    const versionRegex = /^\d+(\.\d+){0,3}$/;

    if (!versionRegex.test(version))
        throw new Error(`Invalid version provided: ${version}`);
    
    let positionToIncrement = 2;

    if (position)
        positionToIncrement = position - 1;

    const versionSplit = version.split('.');

    if (position && (positionToIncrement < 0 || positionToIncrement > 3))
        throw new Error('Position to increment must be between 1 and 4.');
    if (position && position > versionSplit.length)
        throw new Error(`Invalid increment position specified. Position specified, ${position}, is outside the bounds of the specified version, ${version}.`);

    versionSplit[positionToIncrement] = versionSplit[positionToIncrement] + 1;

    for (var i = positionToIncrement + 1; i < 4; i++){
        versionSplit[i] = 0;
    }
    
    const newVersion = versionSplit.join('.');
    console.log(`Version: ${newVersion}`)
    process.stdout.write(`::set-output name=VERSION::${newVersion}` + os.EOL)
}

run();
