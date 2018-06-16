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

export interface ITrigger {
  invoke(): Promise<void>;
  update(data: any): Promise<void>; 
  
  get(config: ITriggerConfig): ITrigger;
  invoke(data: any): Promise<void>;
  delete(uuid: string): Promise<void>;
}

export declare var ITrigger: {
  constructor(config: ITriggerConfig): ITrigger
}

export interface IWidget {
  click(): Promise<void>
  refresh(): Promise<void>
  update(data: any): Promise<void>

  get(config: IWidgetConfig): IWidget;
}

export declare var IWidget: {
  constructor(config: IWidgetConfig): IWidget
}

export interface IWidgetConstructor {
  constructor(config: IWidgetConfig): IWidget;
}

export interface IQueue {

}

export interface ActionRequirements {
  // a version in which this action has been introduced
  min: string;
  // a version in which this action has become deprecated
  max: string;
  // versions in which this action seems buggy
  bugged: string[]; 
}

export declare var IQueue: {
  constructor(): IQueue
}

export interface IBTT {
  // holds Trigger class
  readonly Trigger: ITrigger;
  
  // holds Widget class
  readonly Widget: IWidget;

  readonly queue: IQueue;
  
  do(action: string, data: Record<string, any>): Promise<void>;
}

export declare var IBTT: {
  new (config: IBTTConfig): IBTT;
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


// {
//   "BTTPredefinedActionType" : ACTION.SHOW_HUD,
//   "BTTHUDActionConfiguration" : config,
//   "BTTEnabled2" : 1,
//   "BTTEnabled" : 1,
// }

// const config = {
//   "BTTActionHUDDetail": "test",
//   "BTTActionHUDTitle": "test",
//   "BTTActionHUDDuration": 1.2988669872283936,
//   "BTTActionHUDBackground": "114.773936, 250.237260, 120.947282, 50.145815",
//   "BTTActionHUDSlideDirection": 0
// };
