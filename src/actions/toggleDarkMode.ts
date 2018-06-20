import { ACTION } from '../types';

/**
 * Gets valid JSON for given action
 * @param shortcut 
 */
function getJSON(): any {
  return JSON.stringify({
    "BTTPredefinedActionType" : ACTION.TOGGLE_DARK_MODE,
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  });
}

/**
 * Sends a shortcut to specified Application
 * @param shortcut 
 * @param applicationPath 
 */
export default function toggleDarkMode() {
  return this.do('trigger_action', {
    json: getJSON(),
  });
}