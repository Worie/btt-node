import * as Util from './util';
import * as Types from './types';
import Trigger from './trigger';
import Widget from './widget';
import fetch from 'node-fetch-polyfill';

/**
 * Class used to manage the BTT webserver 
 */
class BTT {
  // holds the domain name / ip address where BTT webserver is
  private domain: string;

  // holds the port type of the webserver
  private port: number;

  // holds whether the webserver is encrypted or not
  private protocol: string;

  // shared key, needed if you set up webserver to allow only specific calls
  private sharedKey: string;

  // holds Trigger class
  private Trigger: any;
  
  // holds Widget class
  private Widget: any;

  /**
   * Constructor for BetterTouchTool webserver related actions
   * @param {*} config 
   */
  constructor(config: Types.IBTTConfig) {
    const { domain, port, protocol, sharedKey } = config;
    
    if (!domain || !port || !protocol) {
      throw new Error('Missing config');
    }

    this.domain = domain;
    this.port = port;
    this.protocol = protocol;
    this.sharedKey = sharedKey;

    // that looks creepy
    // get class with scoped dependency of current BTT instance
    this.Trigger = Trigger(this);

    this.Widget = Widget(this);
  }

  /**
   * Returns a base url for the BTT webserver endpoint
   */
  get url(): string {
    return `${this.protocol}://${this.domain}:${this.port}/`;
  }

  /**
   * Makes an action of BTT server with given params
   * @param {*} action
   * @param {*} data 
   */
  async do(action: string, data: Record<string, any>): Promise<void> {
    const url = `${this.url}${action}/?${this.params(data)}`;
    return fetch(url);
  }

  /**
   * Parses given list of params (key-value object) and converts it 
   * to query parameters
   * @param {*} data 
   */
  private params(data: Record<string, string>): string {
    const params = Object.keys(data).map(param => {
      return `${param}=${Util.escapeForBtt(data[param])}`;
    }).join('&');

    // if sharedKey was passed, add shared_key get parameter to enable the calls
    if (this.sharedKey) {
      return `${params}&shared_key=${this.sharedKey}`;
    }

    return params;
  }
}

export default BTT;
