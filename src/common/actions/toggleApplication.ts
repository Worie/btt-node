import * as Types from '../../../types';
import Action from '../../action';
import * as DetectNode from 'detect-node';

let getMdlsName: any;

if (DetectNode) {
  getMdlsName = require('../../backend/util').getMdlsName;
} else {
  getMdlsName = (): null => undefined;
}

/**
 * This action is responsible for disabling / enabling BTT. Does not affect this library or webserver
 */
export default class AToggleApplication extends Action { 
  private applicationPath: string;
  private mdlsName: string;

  // reference name
  public static alias: string = 'toggleApplication';

  /**
   * Function that will be called once user requests this action
   * @param actionConfig 
   */
  public init(
    applicationPath: string,
    mdlsName?: string,
  ): Types.IActionReturnValue {
    if (!this.initialized) {
      this.applicationPath = applicationPath;
      this.mdlsName = mdlsName;
      this.initialized = true;
    }
    
    return this.partial(this);
  }

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    const mdlsValue: string = getMdlsName(this.applicationPath) || this.mdlsName;
      
    if (!mdlsValue) {
      console.error(`Sorry, you'll have to manually provide mdls name of the app for this action to work`);
      return;
    }

    return {
      "BTTPredefinedActionType" : Types.ACTION.TOGGLE_APPLICATION,
      "BTTAppToShowOrHide": mdlsValue,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}