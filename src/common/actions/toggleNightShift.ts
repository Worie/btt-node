import * as Types from '../../../types';
import Action from '../../action';

/**
 * This action is responsible for toggling night shift
 */
export default class AToggleNightShift extends Action { 
  // reference name
  public static alias: string = 'toggleNightShift';

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
      "BTTPredefinedActionType" : Types.ACTION.TOGGLE_NIGHT_SHIFT,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}
