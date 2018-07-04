import * as Types from "../types";
import * as CommonUtils from './common/util';
import * as Url from 'url';

/**
 * Every action implementation derives from this class
 */
export default abstract class Action {
  protected config: Types.IBTTConfig;
  protected initialized: boolean = false;
  public static alias: string = '';
  
  /**
   * A constructor for abstract Action class
   * @param args 
   */
  public constructor(config: Types.IBTTConfig) {
    this.config = config;
  }
  
  /**
   * Returns the url of the given action, that this library generates
   */
  public get url(): string {
    let url: string = Url.resolve(
      CommonUtils.getUrl(this.config),
      'trigger_action/',
    );

    url = Url.resolve(url, `?${this.params}`);
    return url;
  }

  /**
   * Returns JSON structure for the current action. 
   * Must be overriden by instances
   */
  public get json(): any {
    return;
  }

  /**
   * Calls the prepared actions
   */
  public async invoke(): Promise<any> {
    return CommonUtils.makeAction(
      'trigger_action', 
      { json: JSON.stringify(this.json) },
      this.config
    );
  }

  /**
   * A function that'll be called by the end user
   * @param args 
   */
  public init(...args: any[]): Types.IActionReturnValue {
    return {
      url: '',
      json: {},
      invoke: async () => {},
    };
  }

  /**
   * Returns a partial of the class instance.
   * @param instance 
   */
  protected partial(instance: Action): Types.IActionReturnValue {
    const partial: any = instance;
    return partial;
  }
  
  /**
   * Returns parameters needed for url generation
   */
  protected get params(): string {
    return CommonUtils.params({
      json: JSON.stringify(this.json),
    }, this.config.sharedKey);
  }
}