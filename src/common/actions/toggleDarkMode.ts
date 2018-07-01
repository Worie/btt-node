import * as Types from '../../../types';
import Action from '../../action';

export default function (
  instanceConfig: Types.IBTTConfig,
) {
  class IToggleDarkModeAction extends Action {
    // required for injecting current btt instance config
    protected instanceConfig = instanceConfig;

    /**
     * Returns a json of the current action. 
     * url and invoke properties of this class depend on this
     */
    public get json(): any {
      return {
        "BTTPredefinedActionType" : Types.ACTION.TOGGLE_DARK_MODE,
        "BTTEnabled2" : 1,
        "BTTEnabled" : 1,
      };
    }
  }

  return {
    // this function will be called by user
    init(): IToggleDarkModeAction {
      return new IToggleDarkModeAction();
    },
    // name of the action, used for easier loading of actions
    name: 'toggleDarkMode',
  };
};