
import * as Types from '../../../types';
import Action from '../../action';

/**
 * This action is responsible for disabling / enabling BTT. Does not affect this library or webserver
 */
export default class AMoveMouse extends Action { 
  private actionConfig: Types.IMoveMouseConfig;

  // reference name
  public static alias: string = 'moveMouse';

  /**
   * Function that will be called once user requests this action
   * @param actionConfig 
   */
  public init(
    actionConfig: Types.IMoveMouseConfig
  ): Types.IActionReturnValue {
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
    const { x, y, relativeTo } = this.actionConfig;


    return {
      "BTTPredefinedActionType" : Types.ACTION.MOVE_MOUSE,
      "BTTMoveMouseToPosition" : `{${x}, ${y}`,
      "BTTMoveMouseRelative" : `${relativeTo || 0}`,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}