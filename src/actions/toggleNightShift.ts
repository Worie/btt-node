import { ACTION } from '../types';

/**
 * Gets valid JSON for given action
 * @param shortcut 
 */
function getJSON(
  shortcut: string, 
  applicationPath: string,
): any {
  
  return JSON.stringify({
    "BTTPredefinedActionType" : ACTION.TOGGLE_NIGHT_SHIFT,
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  });
}

/**
 * Sends a shortcut to specified Application
 * @param shortcut 
 * @param applicationPath 
 */
export default function toggleNightShift(
  shortcut: string,
  applicationPath: string,
) {
  this.do('trigger_action', {
    json: getJSON(shortcut, applicationPath),
  });
}