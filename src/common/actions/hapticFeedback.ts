import * as Types from '../../../types';
import Action from '../../action';

/**
 * This action is responsible for sending a haptic feedback to built in trackpad
 */
export default class AHapticFeedback extends Action { 
  // stores action config
  private hapticMode: number;

  // reference name
  public static alias: string = 'hapticFeedback';

  /**
   * Function that will be called once user requests this action
   * @param actionConfig 
   */
  public init(hapticMode: number): Types.IActionReturnValue {
    if (!this.initialized) {
      this.hapticMode = hapticMode;
      this.initialized = true;
    }

    return this.partial(this);
  }

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    return {
      "BTTPredefinedActionType" : Types.ACTION.TRIGGER_HAPTIC_ENGINE,
      "BTTHapticFeedbackAction" : this.hapticMode,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}