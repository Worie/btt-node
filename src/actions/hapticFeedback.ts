import * as Types from '../types';

/**
 * Gets valid JSON for given action
 * @param config 
 */
function getJSON(config: Types.ISendTextConfig): any {
  const { text, moveCursorLeft } = config;

  return JSON.stringify({
    "BTTPredefinedActionType" : Types.ACTION.INSERT_TYPE_PASTE_TEXT,
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
    "BTTMoveCursorLeftBy" : `${moveCursorLeft}`,
    "BTTStringToType" : `${text}`,
  });
}

/**
 * Sends / Types / Inserts / Pastes custom text
 * @param config 
 */
export default function hapticFeedback(config: Types.ISendTextConfig) {
  return this.do('trigger_action', {
    json: getJSON(config),
  });
}
