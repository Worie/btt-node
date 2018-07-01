import * as Types from '../../../types';
import Action from '../../action';

export default function (
  instanceConfig: Types.IBTTConfig,
) {
  class ISleepComputer extends Action {
    // required for injecting current btt instance config
    protected instanceConfig = instanceConfig;

    /**
     * Returns a json of the current action. 
     * url and invoke properties of this class depend on this
     */
    public get json(): any {
      return {
        "BTTPredefinedActionType" : Types.ACTION.SLEEP_COMPUTER,
        "BTTEnabled2" : 1,
        "BTTEnabled" : 1,
      };
    }
  }

  return {
    // this function will be called by user
    init(): ISleepComputer {
      return new ISleepComputer();
    },
    // name of the action, used for easier loading of actions
    name: 'sleepComputer',
  };
};