
import * as Types from '../../../types';
import Action from '../../action';

export default function (
  instanceConfig: Types.IBTTConfig,
) {
  class IMuteAction extends Action {
    // required for injecting current btt instance config
    protected instanceConfig = instanceConfig;

    private config: Types.IMoveMouseConfig;

    public constructor(config: Types.IMoveMouseConfig) {
      super(config);

      this.config = config;
    }

    /**
     * Returns a json of the current action. 
     * url and invoke properties of this class depend on this
     */
    public get json(): any {
      const { x, y, relativeTo } = this.config;

      return {
        "BTTPredefinedActionType" : Types.ACTION.MOVE_MOUSE,
        "BTTMoveMouseToPosition" : `{${x}, ${y}`,
        "BTTMoveMouseRelative" : `${relativeTo || 0}`,
        "BTTEnabled2" : 1,
        "BTTEnabled" : 1,
      };
    }
  }

  return {
    // this function will be called by user
    init(config: Types.IMoveMouseConfig): IMuteAction {
      return new IMuteAction(config);
    },
    // name of the action, used for easier loading of actions
    name: 'moveMouse',
  };
};