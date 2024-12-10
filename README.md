# vite-plugin-uni-delivery

[![NPM version](https://img.shields.io/npm/v/vite-plugin-uni-delivery.svg?style=flat)](https://npmjs.org/package/vite-plugin-uni-delivery)
[![NPM downloads](http://img.shields.io/npm/dm/vite-plugin-uni-delivery.svg?style=flat)](https://npmjs.org/package/vite-plugin-uni-delivery)

A vite plug-in for customized compilation of uni-app.

## Features

- **Easy to use**: friendly prompt to choose app name/appid before compilation
- **Extensible**: expose the full ability to customize the behavior of the plugin
- **Type Strong**: written in TypeScript

## Install

```bash
npm i vite-plugin-uni-delivery -D 

# yarn 
yarn add vite-plugin-uni-delivery -D

# pnpm 
pnpm add vite-plugin-uni-delivery -D
```

## Usage

Add UniDelivery plugin to vite.config.js / vite.config.ts and configure it:

```ts
// vite.config.js / vite.config.ts
import UniDelivery from 'vite-plugin-uni-delivery'

export default {
  plugins: [
    UniDelivery()
  ]
}
```

## Options

TODO

## Development

```bash
# install dependencies
$ pnpm install

# develop library by docs demo
$ pnpm start

# build library source code
$ pnpm run build

# build library source code in watch mode
$ pnpm run build:watch

# build docs
$ pnpm run docs:build

# Locally preview the production build.
$ pnpm run docs:preview

# check your project for potential problems
$ pnpm run doctor
```

## LICENSE

MIT
