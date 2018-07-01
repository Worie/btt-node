import * as Types from "../types";
import * as CommonUtils from './common/util';
import * as Url from 'url';

/**
 * Every action implementation derives from this class
 */
export default abstract class Action {
  protected instanceConfig: Types.IBTTConfig;
  
  /**
   * A constructor for abstract Action class
   * @param args 
   */
  public constructor(...args: any[]) {}
  
  /**
   * Returns the url of the given action, that this library generates
   */
  public get url(): string {
    return Url.resolve(
      CommonUtils.getUrl(this.instanceConfig),
      this.params,
    );
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
      this.instanceConfig
    );
  }

  /**
   * Returns parameters needed for url generation
   */
  protected get params(): string {
    return CommonUtils.params({
      json: JSON.stringify(this.json),
    }, this.instanceConfig.sharedKey);
  }
}