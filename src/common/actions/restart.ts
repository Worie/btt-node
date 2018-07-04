import * as Types from '../../../types';
import Action from '../../action';

/**
 * This action is responsible for restarting BTT
 */
export default class ARestartBTT extends Action { 
  // reference name
  public static alias: string = 'restart';

  /**
   * Function that will be called once user requests this action
   * @param actionConfig 
   */
  public init(): Types.IActionReturnValue {
    return this.partial(this);
  }

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    return {
      "BTTPredefinedActionType" : Types.ACTION.RESTART_BTT,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}
