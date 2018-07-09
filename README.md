## btt-node 
[![npm version](https://badge.fury.io/js/btt-node.svg)](https://badge.fury.io/js/btt-node) [![Known Vulnerabilities](https://snyk.io/test/github/worie/btt-node/badge.svg)](https://snyk.io/test/github/worie/btt-node)


[![NPM](https://nodei.co/npm/btt-node.png?downloads=true&downloadRank=true)](https://nodei.co/npm/btt-node/)
[![NPM](https://nodei.co/npm-dl/btt-node.png?months=9&height=3)](https://nodei.co/npm/btt-node/)

Easier way to manage your BetterTouchTool in JavaScript.

## About 
This package is a handy wrapper over BetterTouchTool built in webserver API.

This package provides it's own type definitions and can be run both on browser and nodejs environment.

## Installation

`npm install btt-node`

## Docs

You can visit the docs [here](#).

## Example usage

```ts
// import Btt class from the package
import { Btt } from 'btt-node';

// create an instance representing btt webserver
// can be remote or local
const btt = new Btt({
  domain: '127.0.0.1',
  port: 8000,
  protocol: 'http',
  version: '2.525',
});

// sequentially run three actions - spotlight, type text and night shift
btt.triggerShortcut('cmd+space').invoke()
  .then(() => btt.sendText({ text: 'Hello world!'}).invoke())
  .then(() => btt.toggleNightShift().invoke());

// creates a trigger in BetterTouchTool. Keep in mind that this is persistent until you manually delete it!
btt.addEventListener('oneFingerForceClick', (ev) => {
  // create a list of actions that you want to perform on single finger force click
  const actionsToInvoke = [
    btt.showHUD({
      title: 'Awesome!',
      details: 'I triggered!',
    });
  ];
  
  // and push them to `actions` property in the event object.
  ev.actions.push(...actionsToInvoke);
});


// you can also delete an event listener - trigger: 
// btt.removeEventListener('oneFingerForceClick', callbackFuntion);
```

For more advanced examples you can visit [the example section](#)

## Testing

`npm run test` 

## Notice

Keep in mind that this module only provides handy utility functions that underneath sends request to BTT built in webserver.
So depending on your BTT version some actions may be glitchy. Do not hestitate to report those issues here or in [official BTT community forum](https://community.folivora.ai/categories).

### Related projects:

* [btt](https://github.com/Worie/btt) - BetterTouchTool management in JS
* [btt-json-loader](https://github.com/Worie/btt-json-loader) - JSON loader for BTT
* [btt-node](https://github.com/Worie/btt-node) Premature version of [btt](https://github.com/Worie/btt)
* [btt-touchbar-widgets](https://github.com/Worie/btt-touchbar-widgets) - Working touchbar widgets, based on [btt](https://github.com/Worie/btt)