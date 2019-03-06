const path = require('path');

const appDirectory = process.cwd();
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const paths = {
    appBuild: resolveApp('build'),
    appIndexFile: resolveApp('src/index.tsx'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    appTsConfig: resolveApp('tsconfig.json'),
    appTsLintConfig: resolveApp('tslint.json'),
    appHtmlFile: resolveApp('public/index.html'),
};

module.exports = paths;
