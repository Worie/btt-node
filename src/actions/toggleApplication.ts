import * as Types from '../types';
import * as Util from '../util';

/**
 * Gets valid JSON for given action
 * @param config 
 */
function getJSON(applicationPath: string): any {

  const mdlsName: string = Util.getMdlsName(applicationPath);

  return JSON.stringify({
    "BTTPredefinedActionType" : Types.ACTION.TOGGLE_APPLICATION,
    "BTTAppToShowOrHide": mdlsName,
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  });
}

/**
 * Sends / Types / Inserts / Pastes custom text
 * @param config 
 */
export default function toggleApplication(applicationPath: string) {
  return this.do('trigger_action', {
    json: getJSON(applicationPath),
  });
}
