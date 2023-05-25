import type { Plugin, OnLoadResult } from 'esbuild';
import { mergeRegExp } from './merge-regexp';

interface Options {
  modules: Module[];
}

interface Module {
  // match import
  filter: RegExp;
  // see https://esbuild.github.io/plugins/#on-load-results
  result: string | (() => Promise<Partial<OnLoadResult>>);
}

const NAMESPACE = 'virtual-ns';

export default (options: Options) =>
  ({
    name: 'virtual',
    setup(build) {
      const { modules } = options;
      build.onResolve(
        {
          filter: mergeRegExp(modules.map(module => module.filter)),
        },
        args => ({
          path: args.path,
          namespace: NAMESPACE,
          pluginData: {
            [NAMESPACE]: {
              resolveDir: args.resolveDir,
            },
          },
        }),
      );

      build.onLoad({ filter: /.*/, namespace: NAMESPACE }, async args => {
        const mod = modules.find(module => module.filter.test(args.path))!;
        const { resolveDir } = args.pluginData[NAMESPACE];
        return typeof mod.result === 'string'
          ? { contents: mod.result, resolveDir }
          : {
              resolveDir,
              ...(await mod.result()),
            };
      });
    },
  } as Plugin);
