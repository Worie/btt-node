import { mapShortcutNotationToBTT } from '../util/keys';
import { ACTION } from '../types';
import { execSync } from 'child_process';

/**
 * Gets valid JSON for given action
 * @param shortcut 
 */
function getJSON(
  shortcut: string, 
  applicationPath: string,
): any {
  
  const shortcutToSend: string = mapShortcutNotationToBTT(shortcut);

  const mdlsName: string = execSync(`mdls -name kMDItemCFBundleIdentifier -r ${applicationPath}`).toString();

  const result = JSON.stringify({
    "BTTPredefinedActionType" : ACTION.SEND_SHORTCUT_TO_APP,
    "BTTShortcutApp" : applicationPath,
    "BTTShortcutToSend" : shortcutToSend,
    "BTTShortcutAppUnderCursor": mdlsName.replace('/', '\\/'),
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
) {
  this.do('trigger_action', {
    json: getJSON(shortcut, applicationPath),
  });
}
