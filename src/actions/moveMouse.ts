import * as Types from '../types';

/**
 * Gets valid JSON for given action
 */
function getJSON(config: Types.IMoveMouseConfig): any {
  const { x, y, relativeTo } = config;
  
  const result: string = JSON.stringify({
    "BTTPredefinedActionType" : Types.ACTION.MOVE_MOUSE,
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
export default function moveMouse(config: Types.IMoveMouseConfig) {
  return this.do('trigger_action', {
    json: getJSON(config),
  });
}


0 - 18