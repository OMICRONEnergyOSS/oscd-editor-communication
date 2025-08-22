[![Tests](https://github.com/OMICRONEnergyOSS/oscd-editor-communication/actions/workflows/test.yml/badge.svg)](https://github.com/OMICRONEnergyOSS/oscd-editor-communication/actions/workflows/test.yml) ![NPM Version](https://img.shields.io/npm/v/@omicronenergy/oscd-editor-communication)

# \<oscd-editor-communication>

## What is this?

This is an editor plugin for the [OpenSCD](https://openscd.org) tool. With this plugin you can edit elements within the `Communication` section such as `SubNetwork`, `ConnectedAP`, `GSE` and `SMV`. Visit the [demo page](https://OMICRONEnergyOSS.githuub.io/oscd-editor-communication/demo/index.html) and see for yourself.

## Missing features

If you feel there is something missing you need please file an [issue](https://OMICRONEnergyOSS.githuub.io/oscd-editor-communication/issues).

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

> This demo plugin does nothing much that could be tested as it relies exclusively on built-in browser components to do its job. We therefore currently have no tests. If you find something that could be tested, please feel free!

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm run start
```

To run a local development server that serves the basic demo located in `demo/index.html`

&copy; Jakob Vogelsang
&copy; 2025 OMICRON electronics GmbH

## License

[Apache-2.0](LICENSE)
