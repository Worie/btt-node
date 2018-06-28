import { ACTION } from '../../../types';
import * as DetectNode from 'detect-node';

let getMdlsName: any;

if (DetectNode) {
  getMdlsName = require('../../backend/util').getMdlsName;
} else {
  getMdlsName = (): null => undefined;
}


/**
 * Gets valid JSON for given action
 * @param config 
 */
function getJSON(
  applicationPath: string,
  mdlsName?: string,
): any {

  const mdlsValue: string = getMdlsName(applicationPath) || mdlsName;
  
  if (!mdlsValue) {
    console.error(`Sorry, you'll have to manually provide mdls name of the app for this action to work`);
    return;
  }

  return JSON.stringify({
    "BTTPredefinedActionType" : ACTION.TOGGLE_APPLICATION,
    "BTTAppToShowOrHide": mdlsValue,
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  });
}

/**
 * Sends / Types / Inserts / Pastes custom text
 * @param config 
 */
export default function toggleApplication(
  applicationPath: string,
  mdlsName?: string,
) {
  return this.do('trigger_action', {
    json: getJSON(applicationPath, mdlsName),
  });
}
