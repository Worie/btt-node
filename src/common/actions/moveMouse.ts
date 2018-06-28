import { ACTION } from '../../../types';

/**
 * Gets valid JSON for given action
 */
function getJSON(config: IMoveMouseConfig): any {
  const { x, y, relativeTo } = config;
  
  const result: string = JSON.stringify({
    "BTTPredefinedActionType" : ACTION.MOVE_MOUSE,
    "BTTMoveMouseToPosition" : `{${x}, ${y}`,
    "BTTMoveMouseRelative" : `${relativeTo || 0}`,
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  });

  return result;
}

/**
 * Sends a shortcut to specified Application
 */
export default function moveMouse(config: IMoveMouseConfig) {
  return this.do('trigger_action', {
    json: getJSON(config),
  });
}


0 - 18