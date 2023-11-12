// @ts-check
/** @typedef {import('esbuild').BuildOptions} BuildOptions */
const { Generator }  = require('npm-dts');
const { build } = require('esbuild');

/** @type {any} */
const packageJSON = require('./package.json');
const externalDependencies = [
    ...Object.keys(packageJSON.dependencies || {}),
    ...Object.keys(packageJSON.peerDependencies || {})
]

/** @type {BuildOptions} */
const commonConfig = {
    target: ['ES2022'],
    platform: 'node',
    entryPoints: ['src/index.ts'],
    external: externalDependencies,
    bundle: true,
    minify: true,
    sourcemap: true,
};

/** @type {BuildOptions[]} */
const configurations = [
    {
        ...commonConfig,
        outfile: 'dist/index.esm.js',
        format: 'esm',
    },
    {
        ...commonConfig,
        outfile: 'dist/index.cjs.js',
        format: 'cjs',
    },
];

(async () => {
    const dtsGenerator = new Generator({
        output: 'dist/index.d.ts',
    });
    await Promise.all(
        [
            ...configurations.map((config) => build(config)),
            dtsGenerator.generate()
        ]
    );
})();
