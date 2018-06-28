/**
 * Represents BTT Trigger.
 * For "typings structure" refer to the https://github.com/Microsoft/TypeScript/issues/13462#issuecomment-295685298
 */

import * as CommonUtils from '../../common/util';

/* static interface declaration */
export interface TriggerStatic<T> extends Type<Trigger<T>> {
  invoke(json: any): Promise<void>;
  create(data: ITriggerConfig): Promise<Trigger<T>>;
  delete(uuid: string): Promise<void>;
}

/* interface declaration */
export interface Trigger<T> {
  invoke(): Promise<void>;
  update(data: any): Promise<void>
}

export function init (instanceConfig: IBTTConfig) {
  
  @CommonUtils.staticImplements<TriggerStatic<Trigger<T>>>()
  class Trigger<T> {
    // holds the uuid of the newly created / initialized trigger
    private uuid: string;
    
    // holds the name of the newly created / initialized trigger
    private name: string;
    
    /**
     * Constructs the Trigger instance, sets the uuid and name for further calls
     * @param {*} config 
     */
    public constructor(config: ITriggerConfig) {
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
        return CommonUtils.makeAction(
          'trigger_named',
          { trigger_name: this.name },
          instanceConfig
        );
        
      // if this was a generic trigger
      } else if (this.uuid) {
        // executre the actions for this trigger
        return CommonUtils.makeAction(
          'execute_assigned_actions_for_trigger',
          { uuid: this.uuid },
          instanceConfig
        );
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
      return CommonUtils.makeAction(
        'update_trigger',
        {
          uuid: this.uuid,
          json: JSON.stringify(data),
        },
        instanceConfig,
      );
    }

    /**
     * Triggers given json
     * @param json 
     */
    static invoke(json: any) {
      return CommonUtils.makeAction(
        'trigger_action',
        {
          json: JSON.stringify(json),
        },
        instanceConfig,
      );
    }

    /**
     * Creates a new trigger and returns it instance 
     * @param config 
     */
    static async create(data: any): Promise<Trigger<ITriggerConfig>> {
      // create it here basing on config
      await CommonUtils.makeAction(
        'add_new_trigger',
        {
          json: JSON.stringify(data),
        },
        instanceConfig,
      );

      const config: ITriggerConfig = {
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
      return CommonUtils.makeAction(
        'delete_trigger',
        {
          uuid,
        },
        instanceConfig,
      );
    }
  };

  return Trigger;
}
