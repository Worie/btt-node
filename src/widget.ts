/**
 * Represents a BTT TouchBar Widget.
 * Should not be created directly, only via btt.Widget
 */

import * as Types from './types';

let btt: Types.IBTT;

class Widget implements Types.IWidget{

  // stores the uuid of the existing btt widget
  private uuid: string;

  // stores the default update behaviour of the widget
  private default: Function;
  
  /**
   * Creates an instance representing BTT Widget
   * @param {*} config 
   */
  constructor(config: Types.IWidgetConfig) {
    this.uuid = config.uuid;
    this.default = config.default;
  }

  /**
   * Updates the current widget with given data
   * @param {*} data 
   */
  async update(data: any): Promise<void> {
    // if there was no data passed, nor there was no default fallback
    if (!data && !this.default) {
      // show a warning and stop the execution of the function
      console.warn('Nothing to do for widget ' + this.uuid);
      return;
    // if there's no data passed but default function was passed
    } else if (!data) {
      // update the widget using the data from default function
      return this.update(this.default());
    }

    // just make sure that uuid field does not exist in data
    delete data.uuid;

    // data used in query params in final endpoint
    const updateData = {
      uuid: this.uuid,
      ...data,
    };

    // update current widget
    return btt.do('update_touch_bar_widget', updateData);
  }

  /**
   * Refreshes current widget
   */
  async refresh(): Promise<void> {
    return btt.do('refresh_widget', { uuid: this.uuid });
  }

  /**
   * Triggers the widget
   */
  async click(): Promise<void> {
    return btt.do('execute_assigned_actions_for_trigger', {
      uuid: this.uuid,
    });
  }
}


/**
 * Exports a function to which BTT instance should be passed to make sure
 * that triggers / widgets are created on the right BTT webserver
 * @param bttInstance 
 */
export default function init(bttInstance: Types.IBTT) {
  // silly way to inject BTT class, don't know the pattern yet
  btt = bttInstance;
  return Widget;
}
