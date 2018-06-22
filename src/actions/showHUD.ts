import * as Types from '../types';

/**
 * Gets valid JSON for given action
 */
function getJSON(config: Types.IShowHUDConfig): any {
  const { title, details, duration, background, direction } = config;
  
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

/**
 * Sends a shortcut to specified Application
 */
export default function showHUD(config: Types.IShowHUDConfig) {
  return this.do('trigger_action', {
    json: getJSON(config),
  });
}