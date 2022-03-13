import { ScullyConfig } from '@scullyio/scully';

/** this loads the default render plugin, remove when switching to something else. */


export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "odin-ai",
  spsModulePath: './src/app',
  outDir: './dist/static',
  routes: {
  }
};