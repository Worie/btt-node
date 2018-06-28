
function getJSON(time: number): any {
  return JSON.stringify({
    "BTTPredefinedActionType" : ACTION.DELAY_NEXT_ACTION,
    "BTTDelayNextActionBy" : String(time / 1000),
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  });
}

/**
 * Sends a shortcut to specified Application
 * @param shortcut 
 * @param applicationPath 
 */
export default function delayNextAction(time: number) {
  return this.do('trigger_action', {
    json: getJSON(time),
  });
}