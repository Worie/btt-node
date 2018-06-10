export interface IBTTConfig {
  domain: string;
  port: number;
  protocol: string;
  sharedKey: string;
  // add credentials
}

export interface ITriggerConfig {
  uuid: string;
  name: string;
}

export interface IWidgetConfig {
  uuid: string;
  default: Function;
}