import * as Types from '../../../types';
import Action from '../../action';

/**
 * This action is responsible for launching an application
 */
export default class ALaunchApplication extends Action {
  private applicationPath: string;
  // reference name
  public static alias: string = 'launchApplication';

  public init(applicationPath: string): Types.IActionReturnValue {
    if (!this.initialized) {
      this.applicationPath = applicationPath;
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
      "BTTPredefinedActionType" : Types.ACTION.LAUNCH_APPLICATION,
      "BTTLaunchPath" : `file://${this.applicationPath}`,
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
    };
  }
}
