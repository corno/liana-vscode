const esbuild = require('esbuild');

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

async function main() {
  const baseConfig = {
    absWorkingDir: __dirname,
    bundle: true,
    format: 'cjs',
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    platform: 'node',
    logLevel: 'warning'
  };

  const extensionConfig = {
    ...baseConfig,
    // Bundle the extension host entrypoint under client/src.
    entryPoints: ['client/src/extension.ts'],
    // Keep output aligned with package.json "main": ./client/out/extension
    outfile: 'client/out/extension.js',
    external: ['vscode'],
    plugins: [esbuildProblemMatcherPlugin('extension')]
  };

  const serverConfig = {
    ...baseConfig,
    // Bundle the language server so runtime packaging doesn't need large node_modules trees.
    entryPoints: ['server/src/server.ts'],
    outfile: 'server/out/server.js',
    plugins: [esbuildProblemMatcherPlugin('server')]
  };

  if (watch) {
    const extensionCtx = await esbuild.context(extensionConfig);
    const serverCtx = await esbuild.context(serverConfig);
    await extensionCtx.watch();
    await serverCtx.watch();
  } else {
    await esbuild.build(extensionConfig);
    await esbuild.build(serverConfig);
  }
}

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = target => ({
  name: `esbuild-problem-matcher-${target}`,

  setup(build) {
    build.onStart(() => {
      console.log(`[watch] ${target} build started`);
    });
    build.onEnd(result => {
      result.errors.forEach(({ text, location }) => {
        console.error(`x [ERROR] [${target}] ${text}`);
        if (location == null) return;
        console.error(`    ${location.file}:${location.line}:${location.column}:`);
      });
      console.log(`[watch] ${target} build finished`);
    });
  }
});

main().catch(e => {
  console.error(e);
  process.exit(1);
});
