import * as Types from '../../../types';
import Action from '../../action';
import { mapShortcutNotationToBTT } from '../../common/keys';
import * as DetectNode from 'detect-node';

// hacky workaround, use proper DI
let getMdlsName: any;

if (DetectNode) {
  getMdlsName = require('../../backend/util').getMdlsName;
} else {
  getMdlsName = (): null => undefined;
}

export default function (
  instanceConfig: Types.IBTTConfig,
) {
  class IMuteAction extends Action {
    // required for injecting current btt instance config
    protected instanceConfig = instanceConfig;

    private shortcut: string;
    private applicationPath: string;
    private mdlsName: string;

    public constructor(
      shortcut: string,
      applicationPath: string,
      mdlsName?: string
    ) {
      super(
        shortcut,
        applicationPath,
        mdlsName,
      );

      this.shortcut = shortcut;
      this.applicationPath = applicationPath;
      this.mdlsName = mdlsName;
    }

    /**
     * Returns a json of the current action. 
     * url and invoke properties of this class depend on this
     */
    public get json(): any {
      const shortcutToSend: string = mapShortcutNotationToBTT(this.shortcut);

      const mdlsValue = getMdlsName(this.applicationPath) || this.mdlsName;

      if (!mdlsValue) {
        console.error(`Sorry, you'll have to manually provide mdls name of the app for this action to work`);
        return;
      }

      return {
        "BTTPredefinedActionType" : Types.ACTION.SEND_SHORTCUT_TO_APP,
        "BTTShortcutApp" : this.applicationPath,
        "BTTShortcutToSend" : shortcutToSend,
        "BTTShortcutAppUnderCursor": mdlsValue.replace('/', '\\/'),
        "BTTEnabled2" : 1,
        "BTTEnabled" : 1,
      };
    }
  }

  return {
    // this function will be called by user
    init(
      shortcut: string,
      applicationPath: string,
      mdlsName?: string
    ): IMuteAction {
      return new IMuteAction(
        shortcut,
        applicationPath,
        mdlsName,
      );
    },
    // name of the action, used for easier loading of actions
    name: 'sendShortcut',
  };
};