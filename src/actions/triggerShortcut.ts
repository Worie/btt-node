import { mapShortcutNotationToBTT } from '../util/keys';
import { ACTION } from '../types';

/**
 * Gets valid JSON for given action
 * @param shortcut 
 */
function getJSON(
  shortcut: string,
): any {
  
  const shortcutToSend: string = mapShortcutNotationToBTT(shortcut);

  return JSON.stringify({
    "BTTPredefinedActionType" : ACTION.SEND_SHORTCUT,
    "BTTShortcutToSend" : shortcutToSend,
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  });
}

/**
 * Triggers specified keyboard shortcut
 * @param shortcut 
 */
export default function triggerShortcut(shortcut: string) {
  this.do('trigger_action', {
    json: getJSON(shortcut)
  });
} 