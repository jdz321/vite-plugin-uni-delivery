import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'uni-delivery',
  },
  locales: [
    { id: 'en-US', name: 'EN' },
    { id: 'zh-CN', name: '中文' },
  ],
  resolve: {
    codeBlockMode: 'passive',
  },
});
