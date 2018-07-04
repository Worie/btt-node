import { mapShortcutNotationToBTT } from '../../common/keys';
import * as Types from '../../../types';
import Action from '../../action';

/**
 * This action is responsible for disabling / enabling BTT. Does not affect this library or webserver
 */
export default class ATriggerShortcut extends Action {
  private shortcut: string;
  // reference name
  public static alias: string = 'triggerShortcut';

  /**
   * Function that will be called once user requests this action
   * @param actionConfig 
   */
  public init(shortcut: string): Types.IActionReturnValue {
    if (!this.initialized) {
      this.shortcut = shortcut;
      this.initialized = true;
    }
    return this.partial(this);
  }

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    const shortcutToSend: string = mapShortcutNotationToBTT(this.shortcut);

    return {
      "BTTPredefinedActionType" : Types.ACTION.SEND_SHORTCUT,
      "BTTShortcutToSend" : shortcutToSend,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}