import * as Types from '../../../types';
import Action from '../../action';
import * as uuidv4 from 'uuid/v4';

export default function (
  instanceConfig: Types.IBTTConfig,
) {
  class IShowWebViewAction extends Action {
    // required for injecting current btt instance config
    protected instanceConfig = instanceConfig;

    private config: Types.IShowWebViewConfig;

    public constructor(config: Types.IShowWebViewConfig) {
      super(config);

      this.config = config;
    }

    /**
     * Returns a json of the current action. 
     * url and invoke properties of this class depend on this
     */
    public get json(): any {
      const floatingHTMLConfig: Types.IFloatingHTMLConfig = this.config.config || {};

      const BTTActionFloatingHTMLConfig: any = {
        "BTTCloseOnOutsideClick": floatingHTMLConfig.closeOnClickOut || true,
        "BTTUseWhiteBackground": floatingHTMLConfig.whiteBackground || false,
        "BTTCloseOnBrowserOpen": floatingHTMLConfig.closeOnBrowserOpen || true,
        "BTTShowButtons": floatingHTMLConfig.showButtons || false,
        "BTTDoNotCache": floatingHTMLConfig.cache || true,
        "BTTSize": `{${this.config.width}, ${this.config.height}}`,
      };
      
      // if user defined at least one partial of position, set this to absolute position
      if (
        typeof this.config.x !== 'undefined' || 
        typeof this.config.y !== 'undefined'
      ) {
        BTTActionFloatingHTMLConfig["BTTPosition"] = `{${this.config.x || 0}, ${this.config.y || 0}`;
      }
    
      const result: any = {
        "BTTPredefinedActionType" : Types.ACTION.SHOW_WEB_VIEW,
        "BTTActionFloatingHTMLConfig" : JSON.stringify(BTTActionFloatingHTMLConfig),
        "BTTEnabled2" : 1,
        "BTTEnabled" : 1,
        "BTTActionFloatingHTMLName": this.config.name,
        "BTTUUID": uuidv4(),
      };
    
      if (this.config.url) {
        result["BTTActionURLToLoad"] = this.config.url;
      } else if (this.config.html) {
        result["BTTFiles"] = [{
          "BTTFileContent" : Buffer.from(this.config.html).toString('base64'),
          "BTTFileOther" : "html"
        }];
      } else {
        console.warn('Something went wrong - nor url nor html was passed');
      }
    
      return result;
    }
  }

  return {
    // this function will be called by user
    init(config: Types.IShowWebViewConfig): IShowWebViewAction {
      return new IShowWebViewAction(config);
    },
    // name of the action, used for easier loading of actions
    name: 'showWebView',
  };
};