import * as Types from '../../../types';
import { Action } from '../../common/action';

/**
 * This action is responsible for disabling / enabling BTT. Does not affect this library or webserver
 */
export default class AToggleMouseSize extends Action { 
  // reference name
  public static alias: string = 'toggleMouseSize';

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    return {
      "BTTPredefinedActionType" : Types.ACTION.TOGGLE_MOUSE_SIZE,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}