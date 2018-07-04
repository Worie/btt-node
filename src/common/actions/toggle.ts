import * as Types from '../../../types';
import Action from '../../action';

/**
 * This action is responsible for disabling / enabling BTT. Does not affect this library or webserver
 */
export default class AToggleBTT extends Action { 
  // reference name
  public static alias: string = 'toggle';

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
      "BTTPredefinedActionType" : Types.ACTION.TOGGLE_BTT,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}