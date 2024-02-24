import { build, context } from 'esbuild';
import LiveServer from 'alive-server';
import imagePlugin from 'esbuild-plugin-inline-image';
import copy from 'esbuild-copy-static-files';

const Server = (setOpen) => {
    const liveParams = { open: setOpen, root: 'dist', port: 5700, host: 'localhost', file: 'index.html', wait: 1000 };
    LiveServer.start(liveParams);
};

let mode = '';

const args = process.argv;
const isProdFlag = args.includes('--prod');
const isBuildFlag = args.includes('--build');

if (isProdFlag) {
    process.env.NODE_ENV = 'production';
    mode = 'production mode';
} else if (isBuildFlag) {
    mode = 'build production mode';
} else {
    process.env.NODE_ENV = 'development';
    mode = 'development mode';
}

const isProduction = process.env.NODE_ENV === 'production';

const EsbuildOptions = {
    entryPoints: ['src/index.tsx', 'index.html'],
    outdir: 'dist',
    bundle: true,
    minify: isProduction,
    ignoreAnnotations: true,
    lineLimit: 50,
    treeShaking: true,
    metafile: true,
    splitting: true,
    format: 'esm',
    target: 'es6',
    chunkNames: './src/[name]-[hash]',
    loader: {
        '.html': 'copy',
        '.svg': 'copy',
        '.png': 'copy',
        '.jpg': 'copy',
        '.avif': 'copy',
        '.tsx': 'tsx',
        '.css': 'css'
    },
    plugins: [
        imagePlugin(),
        copy({
            src: './src/images',
            dest: './dist',
            recursive: true,
            minify: true,
            target: 'es5'
        }),
    ],
    define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    },
    inject: ['react-ts.d.ts']
};

const builds = async (isDev, isProd) => {
    const start = Date.now();
    try {
        await build(EsbuildOptions);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    const end = Date.now();
    console.log(`esbuild time: ${((end - start) / 1000).toFixed(2)}s`);
    if (isDev && !isProd) {
        Server(isDev);
        try {
            const ctx = await context(EsbuildOptions);
            ctx.watch();
            for (let i = 0; i < 3; i++) {
                ctx.rebuild();
            }
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
        console.log(mode);
    } else if (!isDev && isProd) {
        Server(isProd);
        console.log(mode);
        console.log(`you can't update your project in production.`);
    }
};

const isDev = !isBuildFlag && !isProduction;
const isProd = isProdFlag && isProduction;
builds(isDev, isProd);
