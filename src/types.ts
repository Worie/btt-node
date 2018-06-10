export interface IBTTConfig {
  domain: string;
  port: number;
  protocol: string;
  sharedKey: string;
}

export interface ITriggerConfig {
  uuid: string;
  name: string;
}

export interface IWidgetConfig {
  uuid: string;
  default: Function;
}

export interface ITrigger {
  invoke(): Promise<void>;
  update(data: any): Promise<void>;
}

export interface IWidget {
  click(): Promise<void>
  refresh(): Promise<void>
  update(data: any): Promise<void>
}

export interface IBTT {
  // holds Trigger class
  readonly Trigger: ITrigger;
  
  // holds Widget class
  readonly Widget: IWidget;
  
  do(action: string, data: Record<string, any>): Promise<void>;
}