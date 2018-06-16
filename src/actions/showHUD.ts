import { ACTION } from '../types';

interface IShowHUDConfig {
  title: string;
  details: string;
  duration: number;
  background: string;
  direction: number;
}

/**
 * Gets valid JSON for given action
 */
function getJSON(config: IShowHUDConfig): any {
  const { title, details, duration, background, direction } = config;

  const BTTAdditionalConfig: any = {
    "BTTActionHUDDetail": details,
    "BTTActionHUDTitle": title,
    "BTTActionHUDDuration": duration,
    "BTTActionHUDBackground": background, //"114.773936, 250.237260, 120.947282, 50.145815",
    "BTTActionHUDSlideDirection": direction // 0
  };
  
  const result: string = JSON.stringify({
    "BTTPredefinedActionType" : ACTION.SHOW_HUD,
    "BTTHUDActionConfiguration" : JSON.stringify(BTTAdditionalConfig),
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  });

  return result;
}

/**
 * Sends a shortcut to specified Application
 */
export default function showHUD(config: IShowHUDConfig) {
  return this.do('trigger_action', {
    json: getJSON(config),
  });
}