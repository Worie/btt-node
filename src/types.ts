export interface IBTTConfig {
  domain: string;
  port: number;
  protocol: string;
  sharedKey: string;
  version?: string;
}

export interface ITriggerConfig {
  uuid?: string;
  name?: string;
}

export interface IWidgetConfig {
  uuid: string;
  default: Function;
}


export interface IActionRequirements {
  // a version in which this action has been introduced
  min: string;
  // a version in which this action has become deprecated
  max: string;
  // versions in which this action seems buggy
  bugged: string[]; 
}

export enum ACTION {
  SEND_SHORTCUT_TO_APP = 128,
  SEND_SHORTCUT = -1,
  NO_ACTION = -1,
  SHOW_HUD = 254,
  TOGGLE_DND = 200,
  TOGGLE_NIGHT_SHIFT = 201,
  VOLUME_UP = 24,
  VOLUME_UP_SLIGHTLY = 198,
  VOLUME_DOWN = 25,
  VOLUME_DOWN_SLIGHTLY = 199,
  TRIGGER_HAPTIC_ENGINE = 255,
};


export interface Type<T> {
  new (...args: any[]): T;
}

/* class decorator */
export function staticImplements<T>() {
  return (constructor: T) => {}
}

export interface IShowHUDConfig {
  title: string;
  details: string;
  duration: number;
  background: string;
  direction: number;
}