import { ACTION } from '../../../types';

/**
 * Gets valid JSON for given action
 * @param shortcut 
 */
function getJSON(): any {
  return JSON.stringify({
    "BTTPredefinedActionType" : ACTION.LOCK_SCREEN,
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  });
}

export default function lockScreen() {
  return this.do('trigger_action', {
    json: getJSON(),
  });
}
