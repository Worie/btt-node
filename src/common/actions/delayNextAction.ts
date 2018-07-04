import * as Types from '../../../types';
import Action from '../../action';

/**
 * This action is responsible for sending a haptic feedback to built in trackpad
 */
export default class ADelayNextAction extends Action { 
  // stores action config
  private timeout: number;

  // reference name
  public static alias: string = 'delayNextAction';

  /**
   * Function that will be called once user requests this action
   * @param actionConfig 
   */
  public init(timeout: number): Types.IActionReturnValue {
    if (!this.initialized) {
      this.timeout = timeout;
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
      "BTTPredefinedActionType" : Types.ACTION.DELAY_NEXT_ACTION,
      "BTTDelayNextActionBy" : String(this.timeout / 1000),
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}