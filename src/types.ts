export interface IBTTConfig {
  domain: string;
  port: number;
  protocol: string;
  sharedKey: string;
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

export interface IBTT {
  // holds Trigger class
  readonly Trigger: ITrigger;
  
  // holds Widget class
  readonly Widget: IWidget;
  
  do(action: string, data: Record<string, any>): Promise<void>;
}

export declare var IBTT: {
  new (config: IBTTConfig): IBTT;
}

export enum ACTION {
  SEND_SHORTCUT_TO_APP = 128,
  SEND_SHORTCUT = -1,
  TOGGLE_DND = 200,
  TOGGLE_NIGHT_SHIFT = 201,
};
