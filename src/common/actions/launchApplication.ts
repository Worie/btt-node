import * as Types from '../../../types';
import Action from '../../action';

export default function (
  instanceConfig: Types.IBTTConfig,
) {
  class ILaunchApplicationAction extends Action {
    // required for injecting current btt instance config
    protected instanceConfig = instanceConfig;

    private applicationPath: string;

    public constructor(applicationPath: string) {
      super(applicationPath);

      this.applicationPath = applicationPath;
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

  return {
    // this function will be called by user
    init(applicationPath: string): ILaunchApplicationAction {
      return new ILaunchApplicationAction(applicationPath);
    },
    // name of the action, used for easier loading of actions
    name: 'launchApplication',
  };
};