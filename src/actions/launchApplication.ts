import * as Types from '../types';

/**
 * Gets valid JSON for given action
 * @param config 
 */
function getJSON(applicationPath: string): any {
  return JSON.stringify({
    "BTTPredefinedActionType" : Types.ACTION.LAUNCH_APPLICATION,
    "BTTLaunchPath" : `file://${applicationPath}`,
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  });
}

/**
 * Sends / Types / Inserts / Pastes custom text
 * @param config 
 */
export default function launchApplication(applicationPath: string) {
  return this.do('trigger_action', {
    json: getJSON(applicationPath),
  });
}



