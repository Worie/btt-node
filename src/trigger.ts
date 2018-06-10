/**
 * Represents BTT Trigger. Shouldn't be called directly
 */

import * as Types from './types';

// fix typings
let btt: any;

class Trigger {
  private uuid: string;
  private name: string;
  
  /**
   * 
   * @param {*} config 
   */
  private constructor(config: Types.ITriggerConfig) {
    this.uuid = config.uuid;
    this.name = config.name;
  }

  /**
   * Calls the given trigger. Based on the data it was constructed with
   * the method of invoke varies
   */
  invoke() {
    // if this is a named trigger
    if (this.name) {
      // perform a named trigger execution
      return btt.do('trigger_named', { trigger_name: this.name });
    // if this was a generic trigger
    } else if (this.uuid) {
      // executre the actions for this trigger
      return btt.do('execute_assigned_actions_for_trigger', {
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
    return btt.do('update_trigger', {
      uuid: this.uuid,
      json: JSON.stringify(data),
    });
  }

  /**
   * Triggers given json
   * @param json 
   */
  static invoke(json: any) {
    return btt.do('trigger_action', {
      json: JSON.stringify(json),
    });
  }

  /**
   * Gets existing trigger instance
   */
  static get(config: Types.ITriggerConfig) {
    return new this(config);
  }

  /**
   * Creates a new trigger and returns it instance 
   * @param config 
   */
  static async create(data: any): Promise<Trigger> {
    // create it here basing on config
    await btt.do('add_new_trigger', {
      json: JSON.stringify(data),
    });

    const config: Types.ITriggerConfig = {
      ...data.uuid,
      ...data.name,
    };

    return this.get(config);
  }
}

/**
 * Exports a function to which BTT instance should be passed to make sure
 * that triggers / widgets are created on the right BTT webserver
 * @param bttInstance 
 */
export default function init(bttInstance: any) {
  // silly way to inject BTT class, don't know the pattern yet
  btt = bttInstance;
  return Trigger;
}
