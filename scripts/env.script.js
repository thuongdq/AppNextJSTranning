const { copyFile } = require('node:fs/promises');
const path = require('node:path');

void (async () => {
    const listArgs = process.argv.splice(2);
    const sourceEnvironment = listArgs[0] ?? 'dev';
    const destinationEnvironment = listArgs[1];

    const sourceFilePath = path.resolve(
        path.join('scripts', 'misc', `${sourceEnvironment}.env`)
    );
    const destinationFilePath = destinationEnvironment
        ? path.resolve(
              path.join('scripts', 'misc', `${destinationEnvironment}.env`)
          )
        : path.resolve('.env');

    await copyFile(sourceFilePath, destinationFilePath);
})();
