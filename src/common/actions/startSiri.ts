import * as Types from '../../../types';
import Action from '../../action';

/**
 * This action is responsible for starting siri
 */
export default class AStartSiri extends Action { 
  // reference name
  public static alias: string = 'startSiri';

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
      "BTTPredefinedActionType" : Types.ACTION.START_SIRI,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}