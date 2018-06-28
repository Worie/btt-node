import { ACTION } from '../../../types';
import * as uuidv4 from 'uuid/v4'; 

/**
 * Gets valid JSON for given action
 */
function getJSON(data: IShowWebViewConfig): any {
  const floatingHTMLConfig: IFloatingHTMLConfig = data.config || {};

  const BTTActionFloatingHTMLConfig: any = {
    "BTTCloseOnOutsideClick": floatingHTMLConfig.closeOnClickOut || true,
    "BTTUseWhiteBackground": floatingHTMLConfig.whiteBackground || false,
    "BTTCloseOnBrowserOpen": floatingHTMLConfig.closeOnBrowserOpen || true,
    "BTTShowButtons": floatingHTMLConfig.showButtons || false,
    "BTTDoNotCache": floatingHTMLConfig.cache || true,
    "BTTSize": `{${data.width}, ${data.height}}`,
  };
  
  // if user defined at least one partial of position, set this to absolute position
  if (
    typeof data.x !== 'undefined' || 
    typeof data.y !== 'undefined'
  ) {
    BTTActionFloatingHTMLConfig["BTTPosition"] = `{${data.x || 0}, ${data.y || 0}`;
  }

  const result: any = {
    "BTTPredefinedActionType" : ACTION.SHOW_WEB_VIEW,
    "BTTActionFloatingHTMLConfig" : JSON.stringify(BTTActionFloatingHTMLConfig),
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
    "BTTActionFloatingHTMLName": data.name,
    "BTTUUID": uuidv4(),
  };

  if (data.url) {
    result["BTTActionURLToLoad"] = data.url;
  } else if (data.html) {
    result["BTTFiles"] = [{
      "BTTFileContent" : Buffer.from(data.html).toString('base64'),
      "BTTFileOther" : "html"
    }];
  } else {
    console.warn('Something went wrong - nor url nor html was passed');
  }

  return JSON.stringify(result);
}

/**
 * Sends a shortcut to specified Application
 */
export default function showWebView(config: IShowWebViewConfig) {
  return this.do('trigger_action', {
    json: getJSON(config),
  });
}