// @ts-check
/** @typedef {import('esbuild').BuildOptions} BuildOptions */
const { build } = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const { glob } = require('glob');

(async () => {
    const sourceFiles = await glob(['src/**/*.ts', 'src/**/*.tsx']);

    /** @type {BuildOptions} */
    const commonConfig = {
        target: 'ES2020',
        platform: 'node',
        entryPoints: sourceFiles,
        bundle: false,
        minify: false,
        sourcemap: true,
        plugins: [nodeExternalsPlugin()],
    };

    /** @type {BuildOptions[]} */
    const configurations = [
        {
            ...commonConfig,
            outdir: 'dist/esm',
            format: 'esm',
        },
        {
            ...commonConfig,
            outdir: 'dist/cjs',
            format: 'cjs',
        },
    ];

    await Promise.all(configurations.map(build));
})();
