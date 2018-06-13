import { mapShortcutNotationToBTT } from '../util/keys';
import { ACTION } from '../types';

/**
 * Gets valid JSON for given action
 * @param shortcut 
 */
function getJSON(
  shortcut: string, 
  applicationPath: string,
): any {
  
  const shortcutToSend: string = mapShortcutNotationToBTT(shortcut);

  return JSON.stringify({
    "BTTPredefinedActionType" : ACTION.SEND_SHORTCUT_TO_APP,
    "BTTShortcutApp" : applicationPath,
    "BTTShortcutToSend" : shortcutToSend,
    // missing one field
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  });
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