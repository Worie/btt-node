import { ACTION } from '../../../types';

/**
 * Gets valid JSON for given action
 * @param shortcut 
 */
function getJSON(): any {
  return JSON.stringify({
    "BTTPredefinedActionType" : ACTION.QUIT_BTT,
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  });
}

export default function quit() {
  return this.do('trigger_action', {
    json: getJSON(),
  });
}
