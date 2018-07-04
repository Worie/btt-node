import * as Types from '../../../types';
import Action from '../../action';

/**
 * This action is responsible for disabling / enabling BTT. Does not affect this library or webserver
 */
export default class ASleepComputer extends Action { 
  // reference name
  public static alias: string = 'sleepComputer';

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
      "BTTPredefinedActionType" : Types.ACTION.SLEEP_COMPUTER,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}