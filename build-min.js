// @ts-check
/** @typedef {import('esbuild').BuildOptions} BuildOptions */
const { build } = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const { Generator }  = require('npm-dts');
const packageJSON = require('./package.json');

/** @type {BuildOptions} */
const commonConfig = {
    target: 'ES2020',
    platform: 'node',
    entryPoints: [packageJSON.source],
    bundle: true,
    minify: true,
    sourcemap: false,
    plugins: [nodeExternalsPlugin()],
};

/** @type {BuildOptions[]} */
const configurations = [
    {
        ...commonConfig,
        outfile: packageJSON.module,
        format: 'esm',
    },
    {
        ...commonConfig,
        outfile: packageJSON.main,
        format: 'cjs',
    },
];

const dtsGenerator = new Generator({
    entry: packageJSON.source,
    output: packageJSON.types,
});

(async () => {
    await Promise.all(
        [
            ...configurations.map((config) => build(config)),
            dtsGenerator.generate(),
        ]
    );
})();
