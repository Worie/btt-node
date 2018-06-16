import { ACTION } from '../types';

/**
 * Gets valid JSON for given action
 * @param shortcut 
 */
function getJSON(title: string, details: string): any {
  const result: string = JSON.stringify({
    "BTTPredefinedActionType" : ACTION.NO_ACTION,
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
    "BTTTriggerConfig" : {
      "BTTHUDText" : title,
      "BTTHUDDetailText" : details,
      "BTTShowHUD" : 1
    }
  });

  return result;
}

/**
 * Sends a shortcut to specified Application
 * @param shortcut 
 * @param applicationPath 
 */
export default function showHUD(title: string, details: string) {
  this.do('trigger_action', {
    json: getJSON(title, details),
  });
}