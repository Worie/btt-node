/**
 * Represents a BTT TouchBar Widget.
 * Should not be created directly, only via btt.Widget
 */
class Widget {
  /**
   *
   * @param {*} config 
   * @param {*} btt 
   */
  constructor(config, btt) {
    this.uuid = config.uuid;
    this.default = config.default;
    this.btt = btt;
  }

  /**
   * Updates the current widget with given data
   * @param {*} data 
   */
  update(data) {
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
    return this.btt.do('update_touch_bar_widget', updateData);
  }

  /**
   * Refreshes current widget
   */
  refresh() {
    return this.btt.do('refresh_widget', { uuid: this.uuid });
  }
}

module.exports = Widget;