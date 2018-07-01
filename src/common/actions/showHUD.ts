import * as Types from '../../../types';
import Action from '../../action';

export default function (
  instanceConfig: Types.IBTTConfig,
) {
  class IShowHUDAction extends Action {
    // required for injecting current btt instance config
    protected instanceConfig = instanceConfig;

    private config: Types.IShowHUDConfig;

    public constructor(config: Types.IShowHUDConfig) {
      super(config);
      
      this.config = config;
    }

    /**
     * Returns a json of the current action. 
     * url and invoke properties of this class depend on this
     */
    public get json(): any {
      const { title, details, duration, background, direction } = this.config;
      
      // limit the duration to 10 seconds, and ignore negative values
      const reasonableDuration = Math.abs(Math.max(duration, 10));
    
      const BTTAdditionalConfig: any = {
        "BTTActionHUDDetail": details,
        "BTTActionHUDTitle": title,
        "BTTActionHUDDuration": reasonableDuration || 0.8,
        "BTTActionHUDBackground": background, 
        "BTTActionHUDSlideDirection": direction,
      };
      
      const result: string = JSON.stringify({
        "BTTPredefinedActionType" : Types.ACTION.SHOW_HUD,
        "BTTHUDActionConfiguration" : JSON.stringify(BTTAdditionalConfig),
        "BTTEnabled2" : 1,
        "BTTEnabled" : 1,
      });
    
      return result;
    }
  }

  return {
    // this function will be called by user
    init(config: Types.IShowHUDConfig): IShowHUDAction {
      return new IShowHUDAction(config);
    },
    // name of the action, used for easier loading of actions
    name: 'showHUD',
  };
};