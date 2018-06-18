import * as Types from '../types';

/**
 * Gets valid JSON for given action
 * @param config 
 */
function getJSON(hapticMode: number): any {
  return JSON.stringify({
    "BTTPredefinedActionType" : Types.ACTION.TRIGGER_HAPTIC_ENGINE,
    "BTTHapticFeedbackAction" : hapticMode,
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  });
}

/**
 * Sends / Types / Inserts / Pastes custom text
 * @param config 
 */
export default function hapticFeedback(hapticMode: number) {
  return this.do('trigger_action', {
    json: getJSON(hapticMode),
  });
}