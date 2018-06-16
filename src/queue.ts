/**
 * 
 */

import * as Types from './types';

// fix typings
let btt: Types.IBTT;

class Queue {
  
}

/**
 * Exports a function to which BTT instance should be passed to make sure
 * that triggers / widgets are created on the right BTT webserver
 * @param bttInstance 
 */
export default function init(bttInstance: Types.IBTT) {
  // silly way to inject BTT class
  
  btt = bttInstance;
  return Queue;
}
