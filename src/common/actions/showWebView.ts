import * as Types from '../../../types';
import Action from '../../action';
import * as uuidv4 from 'uuid/v4';

/**
 * This action is responsible for disabling / enabling BTT. Does not affect this library or webserver
 */
export default class AShowWebView extends Action { 
  private actionConfig: Types.IShowWebViewConfig;

  // reference name
  public static alias: string = 'showWebView';

  /**
   * Function that will be called once user requests this action
   * @param actionConfig 
   */
  public init(
    actionConfig: Types.IShowWebViewConfig
  ): Types.IActionReturnValue {
    if (!this.initialized) {
      this.actionConfig = actionConfig;
      this.initialized = true;
    }
    
    return this.partial(this);
  }

  /**
   * Returns a json of the current action. 
   * url and invoke properties of this class depend on this
   */
  public get json(): any {
    const floatingHTMLConfig: Types.IFloatingHTMLConfig = this.actionConfig.config || {};
    const { width, height, x, y, name, url, html } = this.actionConfig;

    const BTTActionFloatingHTMLConfig: any = {
      "BTTCloseOnOutsideClick": floatingHTMLConfig.closeOnClickOut || true,
      "BTTUseWhiteBackground": floatingHTMLConfig.whiteBackground || false,
      "BTTCloseOnBrowserOpen": floatingHTMLConfig.closeOnBrowserOpen || true,
      "BTTShowButtons": floatingHTMLConfig.showButtons || false,
      "BTTDoNotCache": floatingHTMLConfig.cache || true,
      "BTTSize": `{${width}, ${height}}`,
    };
    
    // if user defined at least one partial of position, set this to absolute position
    if (typeof x !== 'undefined' || typeof y !== 'undefined') {
      BTTActionFloatingHTMLConfig["BTTPosition"] = `{${x || 0}, ${y || 0}`;
    }
  
    const result: any = {
      "BTTPredefinedActionType" : Types.ACTION.SHOW_WEB_VIEW,
      "BTTActionFloatingHTMLConfig" : JSON.stringify(BTTActionFloatingHTMLConfig),
      "BTTEnabled2" : 1,
      "BTTEnabled" : 1,
      "BTTActionFloatingHTMLName": name,
      "BTTUUID": uuidv4(),
    };
  
    if (url) {
      result["BTTActionURLToLoad"] = url;
    } else if (html) {
      result["BTTFiles"] = [{
        "BTTFileContent" : Buffer.from(html).toString('base64'),
        "BTTFileOther" : "html"
      }];
    } else {
      console.warn('Something went wrong - nor url nor html was passed');
    }
  
    return result;
  }
}