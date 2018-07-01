// import { ACTION } from '../../../types';

// /**
//  * Gets valid JSON for given action
//  * @param shortcut 
//  */
// function getJSON(): any {
//   return JSON.stringify({
//     "BTTPredefinedActionType" : ACTION.RESTART_BTT,
//     "BTTEnabled2" : 1,
//     "BTTEnabled" : 1,
//   });
// }

// export default function restart() {
//   return this.do('trigger_action', {
//     json: getJSON(),
//   });
// }

import * as Types from '../../../types';
import Action from '../../action';

export default function (
  instanceConfig: Types.IBTTConfig,
) {
  class IRestartAction extends Action {
    // required for injecting current btt instance config
    protected instanceConfig = instanceConfig;

    /**
     * Returns a json of the current action. 
     * url and invoke properties of this class depend on this
     */
    public get json(): any {
      return {
        "BTTPredefinedActionType" : Types.ACTION.RESTART_BTT,
        "BTTEnabled2" : 1,
        "BTTEnabled" : 1,
      };
    }
  }

  return {
    // this function will be called by user
    init(): IRestartAction {
      return new IRestartAction();
    },
    // name of the action, used for easier loading of actions
    name: 'restart',
  };
};