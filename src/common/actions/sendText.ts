import * as Types from '../../../types';
import Action from '../../action';

/**
 * This action is responsible for typing / pasting text wherever the user currently is
 */
export default class ASendText extends Action { 
  // stores action config
  private actionConfig: Types.ISendTextConfig;

  // reference name
  public static alias: string = 'sendText';

  /**
   * Function that will be called once user requests this action
   * @param actionConfig 
   */
  public init(actionConfig: Types.ISendTextConfig): Types.IActionReturnValue {
    if (!this.initialized) {
      this.actionConfig = actionConfig;
      this.initialized = true;
    }

    return this.partial(this);
  }

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    const { text, moveCursorLeft } = this.actionConfig;

    return {
      "BTTPredefinedActionType" : Types.ACTION.INSERT_TYPE_PASTE_TEXT,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
      "BTTMoveCursorLeftBy" : `${moveCursorLeft}`,
      "BTTStringToType" : `${text || 0}`,
    };
  }
}