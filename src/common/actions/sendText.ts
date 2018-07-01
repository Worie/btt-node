import * as Types from '../../../types';
import Action from '../../action';

export default function (
  instanceConfig: Types.IBTTConfig,
) {
  class ISentTextAction extends Action {
    // required for injecting current btt instance config
    protected instanceConfig = instanceConfig;

    private config: Types.ISendTextConfig;

    public constructor(config: Types.ISendTextConfig) {
      super(config);
      
      this.config = config;
    }

    /**
     * Returns a json of the current action. 
     * url and invoke properties of this class depend on this
     */
    public get json(): any {
      const { text, moveCursorLeft } = this.config;

      return {
        "BTTPredefinedActionType" : Types.ACTION.INSERT_TYPE_PASTE_TEXT,
        "BTTEnabled2" : 1,
        "BTTEnabled" : 1,
        "BTTMoveCursorLeftBy" : `${moveCursorLeft}`,
        "BTTStringToType" : `${text || 0}`,
      };
    }
  }

  return {
    // this function will be called by user
    init(config: Types.ISendTextConfig): ISentTextAction {
      return new ISentTextAction(config);
    },
    // name of the action, used for easier loading of actions
    name: 'sendText',
  };
};