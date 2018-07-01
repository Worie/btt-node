import Action from './src/action';

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
  // a BTT version in which this action has been introduced
  min: string;
  // a BTT version in which this action has become deprecated
  max?: string;
  // versions in which this action seems buggy
  buggy?: string[];
  // optional name of an action
  name?: string;
}

export interface IActionConfig {
  requirements: IActionRequirements;
  name: string;
}

export interface IState {
  set: (key: string, value: string | number, isPersistent: boolean) => Promise<any>;
  get: (key: string, mode?: 'string' | 'number') => Promise<number | string>;
  delete: (key: string) => Promise<any>;
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
  INSERT_TYPE_PASTE_TEXT = 118,
  LAUNCH_APPLICATION = 49,
  TOGGLE_APPLICATION = 177,
  MUTE = 22,
  START_SIRI = 173,
  TOGGLE_BTT = 101,
  DELAY_NEXT_ACTION = 129,
  MOVE_MOUSE = 153,
  TOGGLE_MOUSE_SPEED = 126,
  TOGGLE_MOUSE_CURSOR = 140,
  TOGGLE_MOUSE_SIZE = 123,
  KEYBOARD_BRIGHTNESS_UP = 31,
  KEYBOARD_BRIGHTNESS_DOWN = 32,
  TOGGLE_DARK_MODE = 197,
  SHOW_WEB_VIEW = 249,
  LOCK_SCREEN = 158,
  LOGOUT = 15,
  SLEEP_DISPLAY = 13,
  SLEEP_COMPUTER = 14,
  RESTART_BTT = 55,
  QUIT_BTT = 56,
  SWITCH_TO_PRESET = 139,
}

export interface Type<T> {
  new (...args: any[]): T;
}

export interface IShowHUDConfig {
  title ? : string;
  details ? : string;
  duration ? : number;
  background ? : string;
  direction ? : number;
}

export interface ISendTextConfig {
  text: string;
  moveCursorLeft ? : number;
}

export interface IMoveMouseConfig {
  x: number;
  y: number;
  relativeTo ? : number;
}

export interface IShowWebViewConfig {
  width: number;
  height: number;
  name: string;
  x ? : number;
  y ? : number;
  url ? : string;
  html ? : string;
  config ? : IFloatingHTMLConfig;
}

export interface IFloatingHTMLConfig {
  cache ? : boolean;
  closeOnClickOut ? : boolean;
  whiteBackground ? : boolean;
  closeOnBrowserOpen ? : boolean;
  showButtons ? : boolean;
}

export interface IRect {
  x: number;
  y: number;
}

// export interface IActionReturnValue {
//   invoke(): Promise<any>;
//   url: string;
//   json: any;
// }

// export interface IMuteAction extends IAction {
//   (): IActionReturnValue;
// } 



/**
 * used for Actions easier callee :( internal
 */
export interface IAction {
  init: IActionFunction;
  name: string;
}

/**
 * Used for initializing, getting the btt server dependecies 
 */
export interface IActionInitializer {
  (config: IBTTConfig): IAction;
}



export interface IActionFunction {
  (...args: any[]): Action;
}