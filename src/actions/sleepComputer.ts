import { ACTION } from '../types';

/**
 * Gets valid JSON for given action
 * @param shortcut 
 */
function getJSON(): any {
  return JSON.stringify({
    "BTTPredefinedActionType" : ACTION.SLEEP_COMPUTER,
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  });
}

export default function sleepComputer() {
  return this.do('trigger_action', {
    json: getJSON(),
  });
}
