import * as Types from '../../../types';
import Action from '../../action';
import * as DetectNode from 'detect-node';

let getMdlsName: any;

if (DetectNode) {
  getMdlsName = require('../../backend/util').getMdlsName;
} else {
  getMdlsName = (): null => undefined;
}

export default function (
  instanceConfig: Types.IBTTConfig,
) {
  class IToggleApplicaitonAction extends Action {
    // required for injecting current btt instance config
    protected instanceConfig = instanceConfig;

    private applicationPath: string;
    private mdlsName: string;

    public constructor(
      applicationPath: string,
      mdlsName?: string
    ) {
      super(
        applicationPath,
        mdlsName,
      );

      this.applicationPath = applicationPath;
      this.mdlsName = mdlsName;
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

      return JSON.stringify({
        "BTTPredefinedActionType" : Types.ACTION.TOGGLE_APPLICATION,
        "BTTAppToShowOrHide": mdlsValue,
        "BTTEnabled2" : 1,
        "BTTEnabled" : 1,
      });
    }
  }

  return {
    // this function will be called by user
    init(
      applicationPath: string,
      mdlsName?: string,
    ): IToggleApplicaitonAction {
      
      return new IToggleApplicaitonAction(
        applicationPath,
        mdlsName,
      );
    },
    // name of the action, used for easier loading of actions
    name: 'toggleApplication',
  };
};