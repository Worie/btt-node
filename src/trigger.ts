/**
 * Represents BTT Trigger.
 * For "typings structure" refer to the https://github.com/Microsoft/TypeScript/issues/13462#issuecomment-295685298
 */

import * as Types from './types';
import { BTT } from './btt';

// scoped instance of BTT
let btt: BTT;

/* static interface declaration */
export interface TriggerStatic<T> extends Types.Type<Trigger<T>> {
  invoke(json: any): Promise<void>;
  create(data: Types.ITriggerConfig): Promise<Trigger<T>>;
  delete(uuid: string): Promise<void>;
}

/* interface declaration */
export interface Trigger<T> {
  invoke(): Promise<void>;
  update(data: any): Promise<void>
}

@Types.staticImplements<TriggerStatic<Trigger<T>>>()
export class Trigger<T> {
  // holds the uuid of the newly created / initialized trigger
  private uuid: string;
  
  // holds the name of the newly created / initialized trigger
  private name: string;
  
  /**
   * Constructs the Trigger instance, sets the uuid and name for further calls
   * @param {*} config 
   */
  public constructor(config: Types.ITriggerConfig) {
    this.uuid = config.uuid;
    this.name = config.name;
  }

  /**
   * Calls the given trigger. Based on the data it was constructed with
   * the method of invoke varies
   */
  invoke(): Promise<void> {
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
  update(data: any): Promise<void> {
    if (!data) {
      console.warn('No update data passed to Trigger');
      return;
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
   * Creates a new trigger and returns it instance 
   * @param config 
   */
  static async create(data: any): Promise<Trigger<Types.ITriggerConfig>> {
    // create it here basing on config
    await btt.do('add_new_trigger', {
      json: JSON.stringify(data),
    });

    const config: Types.ITriggerConfig = {
      ...data.uuid,
      ...data.name,
    };

    return new this(config);
  }
  
  /**
   * Removes the given trigger 
   * @param uuid 
   */
  static async delete(uuid: string): Promise<void> {
    return btt.do('delete_trigger', {
      uuid,
    });
  }
}

/**
 * Exports a function to which BTT instance should be passed to make sure
 * that triggers / widgets are created on the right BTT webserver
 * @param bttInstance 
 */
export default function init(bttInstance: BTT): TriggerStatic<Types.ITriggerConfig> {
  // silly way to inject BTT class
  btt = bttInstance;
  
  return Trigger;
}