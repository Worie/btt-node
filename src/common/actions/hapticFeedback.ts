import * as Types from '../../../types';
import Action from '../../action';

export default function (
  instanceConfig: Types.IBTTConfig,
) {
  class IHapticFeedbackAction extends Action {
    // required for injecting current btt instance config
    protected instanceConfig = instanceConfig;

    private hapticMode: number;

    public constructor(hapticMode: number) {
      super(hapticMode);

      this.hapticMode = hapticMode;
    }
    /**
     * Returns a json of the current action. 
     * url and invoke properties of this class depend on this
     */
    public get json(): any {
      return {
        "BTTPredefinedActionType" : Types.ACTION.TRIGGER_HAPTIC_ENGINE,
        "BTTHapticFeedbackAction" : this.hapticMode,
        "BTTEnabled2" : 1,
        "BTTEnabled" : 1,
      };
    }
  }

  return {
    // this function will be called by user
    init(hapticMode: number): IHapticFeedbackAction {
      return new IHapticFeedbackAction(hapticMode);
    },
    // name of the action, used for easier loading of actions
    name: 'hapticFeedback',
  };
};