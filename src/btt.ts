import * as Util from './util';
import * as Types from './types';
import TriggerInit, { TriggerStatic } from './trigger';
import WidgetInit, { WidgetStatic } from './widget';
import fetch from 'node-fetch-polyfill';
import Actions from './actions';

/**
 * Class used to manage the BTT webserver 
 */
export class BTT {
  // holds the domain name / ip address where BTT webserver is
  private domain: string;

  // holds the port type of the webserver
  private port: number;

  // holds whether the webserver is encrypted or not
  private protocol: string;

  // shared key, needed if you set up webserver to allow only specific calls
  private sharedKey: string;

  // version of BTT
  private version: string;

  // holds various actions definitions
  private actions: Record<string, Types.IAction>;

  // stores a Trigger factory
  public Trigger: TriggerStatic<Types.ITriggerConfig>;
  
  // stores a Widget factory
  public Widget: WidgetStatic<Types.IWidgetConfig>;

  /**
   * Creates BTT instance which communicates with BetterTouchTool built in webserver
   */
  constructor(config: Types.IBTTConfig) {
    const { domain, port, protocol, sharedKey, version } = config;
    
    if (!domain || !port || !protocol) {
      throw new Error('Missing required config');
    }

    this.domain = domain;
    this.port = port;
    this.protocol = protocol;
    this.sharedKey = sharedKey;
    this.version = version;
    
    // get all the actions
    this.actions = Actions.bind(this)();

    // initialize the Trigger factory
    this.Trigger = TriggerInit(this);
    
    // initialize the Widget factory
    this.Widget = WidgetInit(this);
  }

  /**
   * Returns a base url for the BTT webserver endpoint
   */
  private get url(): string {
    return `${this.protocol}://${this.domain}:${this.port}/`;
  }

  /**
   * Sends a request to real BTT built in webserver with given data translated as GET query params
   */
  public do(action: string, data: Record<string, any>): Promise<void> {
    try {
      const params = `?${this.params(data)}`;
      const url = `${this.url}${action}/${params}`;
      return fetch(url);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Returns current config of the instance
   * may be handy with factory functions?
   */
  public get config(): Types.IBTTConfig {
    return {
      domain: this.domain,
      version: this.version,
      sharedKey: this.sharedKey,
      port: this.port,
      protocol: this.protocol,
    };
  }

  /**
   * Parses given list of params (key-value object) and converts it 
   * to query parameters
   */
  private params(data: Record<string, string>): string {
    // parses keys of the object into query params
    const params = Object.keys(data).map(param => {
      return `${param}=${encodeURIComponent(data[param])}`;
    }).join('&');

    // if sharedKey was passed, add shared_key get parameter to enable the calls
    if (this.sharedKey) {
      return `${params}&shared_key=${this.sharedKey}`;
    }

    return params;
  }

  /** ACTIONS */

  /**
   * Sends shortcut to the application. Some apps need to have focus so they can recieve shortcuts.
   * 
   * @param shortcut key identifiers separated by space
   * @param applicationPath absolute path pointing to the app which should recieve shortcut
   */
  public async sendShortcut(shortcut: string, applicationPath: string) {
    return this.actions.sendShortcut(shortcut, applicationPath);
  }

  /**
   * Sets the volume of the system
   * @param volume 
   */
  public async setVolume(volume: string) {
    return this.actions.setVolume(volume);
  }

  /**
   * Toggles do not disturb mode
   */
  public async toggleDnD() {
    return this.actions.toggleDnD();
  }

  /**
   * Toggles night shift
   */
  public async toggleNightShift() {
    return this.actions.toggleNightShift();
  }

  /**
   * Triggers system wide keyboard shortcut
   * @param shortcut key identifiers separated by space
   */
  public async triggerShortcut(shortcut: string) {
    return this.actions.triggerShortcut(shortcut);
  }

  /**
   * Shows HUD with given config
   */
  public async showHUD(config: Types.IShowHUDConfig) {
    return this.actions.showHUD(config);
  }

  /**
   * Sends / Types / Inserts / Pastes custom text
   */
  public async sendText(config: Types.ISendTextConfig) {
    return this.actions.sendText(config);
  }

  /**
   * Triggers a haptic response. Takes a number as a param due to BTT lack of information
   * which ID represents which mode, in order to know what value represents what open BTT and map 
   * the order of selects options in config of "Perform Haptic Feedback on Trackpad" action
   * 
   * @param hapticMode a number representing each mode.
   */
  public async hapticFeedback(hapticMode: number) {
    return this.actions.hapticFeedback(hapticMode);
  }

  /**
   * Open an application on the given path
   */
  public async launchApplication(applicationPath: string) {
    return this.actions.launchApplication(applicationPath);
  }

  /**
   * Toggles the visibility of given application
   */
  public async toggleApplication(applicationPath: string) {
    return this.actions.toggleApplication(applicationPath);
  }

  /**
   * Toggles the mute state in the system
   */
  public async mute() {
    return this.actions.mute();
  }

  /**
   * Starts Siri
   */
  public async startSiri() {
    return this.actions.startSiri();
  }

  /**
   * Toggles the BetterTouchTool gesture recognition
   */
  public async toggle() {
    return this.actions.toggle();
  }

  /**
   * Delays the next action. For most cases manually managing the execution of actions in JavaScript
   * should be sufficient - this will block any new action that BTT will recieve by the given am
   * 
   * @param timeout - time in miliseconds during any action execution will be delayed
   */
  public async delayNextAction(timeout: number) {
    return this.actions.delayNextAction(timeout);
  }

  /**
   * Moves mouse to specified position
   */
  public async moveMouse(config: Types.IMoveMouseConfig) {
    return this.actions.moveMouse(config);
  }

  /**
   * Toggles the mouse speed between a regular and speeded up one
   */
  public async toggleMouseSpeed() {
    return this.actions.toggleMouseSpeed();
  }

  /**
   * Toggles mouse cursor visibility
   */
  public async toggleMouseCursor() {
    return this.actions.toggleMouseCursor();
  }

  /**
   * Toggles between the big and regular mouse cursor size
   */
  public async toggleMouseSize() {
    return this.actions.toggleMouseSize();
  }

  /**
   * Manages the keyboard bright
   * @param mode 'up' | 'down'
   */
  public async keyBrightness(mode: string) {
    return this.actions.keyBrightness(mode);
  }

  /**
   * Toggles the system dark mode 
   */
  public async toggleDarkMode() {
    return this.actions.toggleDarkMode();
  }

  /**
   * Opens a web view
   */
  public async showWebView(config: Types.IShowWebViewConfig) {
    return this.actions.showWebView(config);
  }

  /**
   * Locks the screen
   */
  public async lockScreen() {
    return this.actions.lockScreen();
  }

  /**
   * Logouts current user
   */
  public async logout() {
    return this.actions.logout();
  }

  /**
   * Sleeps computer display
   */
  public async sleepDisplay() {
    return this.actions.sleepDisplay();
  }

  /**
   * Sleeps computer
   */
  public async sleepComputer() {
    return this.actions.sleepComputer();
  }

  /**
   * Restarts BetterTouchTool
   */
  public async restart() {
    return this.actions.restart();
  }
}
