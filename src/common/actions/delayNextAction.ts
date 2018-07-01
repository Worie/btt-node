import * as Types from '../../../types';
import Action from '../../action';

export default function (
  instanceConfig: Types.IBTTConfig,
) {
  class IDelayNextActionAction extends Action {
    // required for injecting current btt instance config
    protected instanceConfig = instanceConfig;

    private time: number;

    public constructor(time: number) {
      super(time);
      
      this.time = time;
    }

    /**
     * Returns a json of the current action. 
     * url and invoke properties of this class depend on this
     */
    public get json(): any {
      return {
        "BTTPredefinedActionType" : Types.ACTION.DELAY_NEXT_ACTION,
        "BTTDelayNextActionBy" : String(this.time / 1000),
        "BTTEnabled2" : 1,
        "BTTEnabled" : 1,
      };
    }
  }

  return {
    // this function will be called by user
    init(time: number): IDelayNextActionAction {
      return new IDelayNextActionAction(time);
    },
    // name of the action, used for easier loading of actions
    name: 'delayNextAction',
  };
};
