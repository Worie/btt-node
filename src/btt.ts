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

  /**
   * Constructor for BetterTouchTool webserver related actions
   * @param {*} config 
   */
  constructor(config: Types.IBTTConfig) {
    const { domain, port, protocol } = config;
    
    if (!domain || !port || !protocol) {
      throw new Error('Missing config');
    }

    this.domain = domain;
    this.port = port;
    this.protocol = protocol;
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
  params(data: Record<string, string>): string {
    return Object.keys(data).map(param => {
      return `${param}=${Util.escapeForBtt(data[param])}`;
    }).join('&');
  }

  /**
   * Exposes btt widget constructor, passing current BTT instance as dependency
   * @param {*} config 
   */
  Widget(config: any) {
    return new Widget(config, this);
  }

  /**
   * Returns various utility function for managing triggers
   */
  get Trigger() {
    const btt = this;
    
    return {
      /**
       * Creates a new trigger with given data
       */
      new: (data: any) => {
        this.do('add_new_trigger', {
          json: JSON.stringify(data),
        });
      },

      /**
       * Gets existing trigger instance
       */
      get: (config: any) => {
        return new Trigger(config, btt);
      },

      /**
       * Triggers a trigger passed via JSON
       */
      invoke: (json: any) => {
        return this.do('trigger_action', {
          json: JSON.stringify(json),
        });
      },
    }
  }
}

export default BTT;
