import { ACTION } from '../../../types';

/**
 * Sends a shortcut to specified Application
 * @param shortcut 
 * @param applicationPath 
 */
export default async function keyBrightness(mode: string) {
  const json: any = {
    "BTTEnabled2" : 1,
    "BTTEnabled" : 1,
  }; 

  switch (mode) {
    case 'up': json["BTTPredefinedActionType"] = ACTION.KEYBOARD_BRIGHTNESS_UP; break;
    case 'down': json["BTTPredefinedActionType"] = ACTION.KEYBOARD_BRIGHTNESS_DOWN; break;
    default: {
      // handle custom case if this feature comes
    }
  }
  
  return this.do('trigger_action', {
    json: JSON.stringify(json),
  });
}