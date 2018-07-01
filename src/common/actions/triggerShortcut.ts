import { mapShortcutNotationToBTT } from '../../common/keys';
import * as Types from '../../../types';
import Action from '../../action';

export default function (
  instanceConfig: Types.IBTTConfig,
) {
  class ITriggerShortcutAction extends Action {
    // required for injecting current btt instance config
    protected instanceConfig = instanceConfig;

    private shortcut: string;

    public constructor(shortcut: string) {
      super(shortcut);

      this.shortcut = shortcut;
    }

    /**
     * Returns a json of the current action. 
     * url and invoke properties of this class depend on this
     */
    public get json(): any {

      const shortcutToSend: string = mapShortcutNotationToBTT(this.shortcut);

      return {
        "BTTPredefinedActionType" : Types.ACTION.SEND_SHORTCUT,
        "BTTShortcutToSend" : shortcutToSend,
        "BTTEnabled2" : 1,
        "BTTEnabled" : 1,
      };
    }
  }

  return {
    // this function will be called by user
    init(shortcut: string): ITriggerShortcutAction {
      return new ITriggerShortcutAction(shortcut);
    },
    // name of the action, used for easier loading of actions
    name: 'triggerShortcut',
  };
};