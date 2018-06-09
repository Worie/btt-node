/**
 * Represents BTT Trigger. Shouldn't be called directly
 */

import * as Types from './types';

export default class Trigger {
  private uuid: string;
  private name: string;
  
  // @TODO: Fix typings
  private btt: any;

  /**
   * 
   * @param {*} config 
   * @param {*} btt 
   */
  constructor(config: Types.ITriggerConfig, btt: any) {
    this.uuid = config.uuid;
    this.name = config.name;
    this.btt = btt;
  }

  /**
   * Calls the given trigger. Based on the data it was constructed with
   * the method of invoke varies
   */
  invoke() {
    // if this is a named trigger
    if (this.name) {
      // perform a named trigger execution
      return this.btt.do('trigger_named', { trigger_name: this.name });
    // if this was a generic trigger
    } else if (this.uuid) {
      // executre the actions for this trigger
      return this.btt.do('execute_assigned_actions_for_trigger', {
        uuid: this.uuid,
      });
    }
  }

  /**
   * Updates the trigger data with given JSON
   * @param {*} data 
   */
  update(data: any) {
    if (!data) {
      return console.warn('No update data passed to Trigger');
    }

    // update the trigger with given json
    return this.btt.do('update_trigger', {
      uuid: this.uuid,
      json: JSON.stringify(data),
    });
  }
}
