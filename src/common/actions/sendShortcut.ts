import { ACTION } from '../../../types';
import { mapShortcutNotationToBTT } from '../../common/keys';

import * as DetectNode from 'detect-node';

// hacky workaround, use proper DI
let getMdlsName: any;

if (DetectNode) {
  getMdlsName = require('../../backend/util').getMdlsName;
} else {
  getMdlsName = (): null => undefined;
}

/**
 * Gets valid JSON for given action
 * @param shortcut 
 */
function getJSON(
  shortcut: string, 
  applicationPath: string,
  mdlsName?: string
): any {
  
  const shortcutToSend: string = mapShortcutNotationToBTT(shortcut);

  const mdlsValue = getMdlsName(applicationPath) || mdlsName;

  if (!mdlsValue) {
    console.error(`Sorry, you'll have to manually provide mdls name of the app for this action to work`);
    return;
  }
  
  const result = JSON.stringify({
    "BTTPredefinedActionType" : ACTION.SEND_SHORTCUT_TO_APP,
    "BTTShortcutApp" : applicationPath,
    "BTTShortcutToSend" : shortcutToSend,
    "BTTShortcutAppUnderCursor": mdlsValue.replace('/', '\\/'),
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  });

  return result;
}

/**
 * Sends a shortcut to specified Application
 * @param shortcut 
 * @param applicationPath 
 */
export default function sendShortcut(
  shortcut: string,
  applicationPath: string,
  mdlsName?: string
) {
  return this.do('trigger_action', {
    json: getJSON(shortcut, applicationPath, mdlsName),
  });
}
