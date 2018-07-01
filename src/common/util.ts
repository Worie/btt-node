import * as DetectNode from 'detect-node';
import * as Types from '../../types';

let fetch: any;

if (DetectNode) {
  fetch = require('node-fetch-polyfill');
} else {
  fetch = window.fetch;
}

/**
 * Returns a base url for the BTT webserver endpoint
 */
export function getUrl(config: Partial<Types.IBTTConfig>): string {
  const { protocol, domain, port } = config; 
  return `${protocol}://${domain}:${port}/`;
}

/**
 * Sends a request to real BTT built in webserver with given data translated as GET query params
 */
export function makeAction(
  action: string, 
  data: Record<string, any>,
  config: Types.IBTTConfig,
): Promise<any> {
  try {
    const parameters = `?${params(data, config.sharedKey)}`;
    const url = getUrl(config);
    const urlToFetch = `${url}${action}/${parameters}`;
    return fetch(urlToFetch);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Parses given list of params (key-value object) and converts it 
 * to query parameters
 */
export function params(data: Record<string, string>, sharedKey?: string): string {
  // parses keys of the object into query params
  const params = Object.keys(data).map(param => {
    return `${param}=${encodeURIComponent(data[param])}`;
  }).join('&');

  // if sharedKey was passed, add shared_key get parameter to enable the calls
  if (sharedKey) {
    return `${params}&shared_key=${sharedKey}`;
  }
  return params;
}

export function staticImplements<T>() {
 return (constructor: T) => {}
}