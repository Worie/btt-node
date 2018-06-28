/**
 * Represents a BTT TouchBar Widget.
 * For "typings structure" refer to the https://github.com/Microsoft/TypeScript/issues/13462#issuecomment-295685298
 */

import * as CommonUtils from '../../common/util';

/* static interface declaration */
export interface WidgetStatic<T> extends Type<Widget<T>> {}

/* interface declaration */
export interface Widget<T> {
  refresh(): Promise<void>
  click(): Promise<void>;
  update(data?: any): Promise<void>;
}

export function init(instanceConfig: IBTTConfig) {
  
  @CommonUtils.staticImplements<WidgetStatic<Widget<T>>>()
  class Widget<T> {

    // stores the uuid of the existing btt widget
    private uuid: string;

    // stores the default update behaviour of the widget
    private default: Function;    
    /**
     * Creates an instance representing BTT Widget
     * @param {*} config 
     */
    public constructor(config: IWidgetConfig) {
      this.uuid = config.uuid;
      this.default = config.default;
    }

    /**
     * Updates the current widget with given data
     * @param {*} data 
     */
    async update(data?: any): Promise<void> {
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
      return CommonUtils.makeAction('update_touch_bar_widget', updateData, instanceConfig);
    }

    /**
     * Refreshes current widget
     */
    public async refresh(): Promise<void> {
      return CommonUtils.makeAction('refresh_widget', { uuid: this.uuid }, instanceConfig);
    }

    /**
     * Triggers the widget
     */
    public async click(): Promise<void> {
      return CommonUtils.makeAction('execute_assigned_actions_for_trigger', {
        uuid: this.uuid,
      }, instanceConfig);
    }
  };

  return Widget;
}
