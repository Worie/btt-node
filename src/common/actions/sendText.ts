import { ACTION } from '../../../types';

/**
 * Gets valid JSON for given action
 * @param config 
 */
function getJSON(config: ISendTextConfig): any {
  const { text, moveCursorLeft } = config;

  return JSON.stringify({
    "BTTPredefinedActionType" : ACTION.INSERT_TYPE_PASTE_TEXT,
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
    "BTTMoveCursorLeftBy" : `${moveCursorLeft}`,
    "BTTStringToType" : `${text || 0}`,
  });
}

/**
 * Sends / Types / Inserts / Pastes custom text
 * @param config 
 */
export default function sendText(config: ISendTextConfig) {
  return this.do('trigger_action', {
    json: getJSON(config),
  });
}
