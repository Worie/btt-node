import * as Trigger from './common/trigger/index';
import * as Widget from './common/widget/index';
import * as State from './common/state';
import * as Actions from './common/actions/index';
import * as Types from '../types';
import * as CommonUtils from './common/util';
import Action from './action';

/**
 * Class used to manage the BTT webserver 
 */
export class BTT {
  // holds various actions definitions
  private actions: Record<string, Types.IActionFunction>;

  // stores a Trigger factory
  public Trigger: Trigger.TriggerStatic<Types.ITriggerConfig>;
  
  // stores a Widget factory
  public Widget: Widget.WidgetStatic<Types.IWidgetConfig>;

  // state, manages BTT variables
  public state: Types.IState;

  // stores the config from the constructor
  private config: Types.IBTTConfig;

  // namespace for uuid/v5
  private static namespace: string = '87a84aef-11fe-4dce-8d00-429cea46f345';

  /**
   * Creates BTT instance which communicates with BetterTouchTool built in webserver
   */
  constructor(config: Types.IBTTConfig) {
    this.config = config;
    
    // get all the actions
    this.actions = Actions.init(config);

    // initialize the Trigger factory
    this.Trigger = Trigger.init(config);
    
    // initialize the Widget factory
    this.Widget = Widget.init(config);

    // initialize the state (variable management)
    this.state = State.init(config);
  }

  /**
   * Adds event listener to BTT. Keep in mind this is persistent, so if you call this method twice, 
   * two entries will be added to BTT. Closing the browser / node process won't make the listeners die
   * @param eventType 
   * @param cb 
   */
  public addEventListener(eventType: string, cb: (e: Types.IEventCallback) => {}): void {
    const actions: Action[] = [];
    let comment: string = '';

    const event: Types.IEventCallback = {
      actions,
      comment,
    };

    cb(event);

    // do something with those actions and eventType and the event that we got
    const batchAction: any = CommonUtils.buildActionSequence(event.actions);

    const listenerJSON: any = CommonUtils.buildTriggerAction(eventType, batchAction, {
      comment: event.comment,
    }); 

    // set up ids
    const listenerUuid: string = CommonUtils.generateUuidForString(
      `${eventType}:${String(cb)}`,
      BTT.namespace
    );

    listenerJSON['BTTUUID'] = listenerUuid;
    listenerJSON['BTTAdditionalActions'] = listenerJSON['BTTAdditionalActions'].map((action: any) => {
      return {
        ...action,
        "BTTUUID": CommonUtils.generateUuidForString(JSON.stringify(action), listenerUuid),
      };
    });

    // end set up ids

    this.do('add_new_trigger', {
      json: JSON.stringify(listenerJSON)
    });
  }


  /**
   * Removes event listener
   * @param eventType 
   * @param cb 
   */
  public removeEventListener(eventType: string, cb: (e: any) => {}): void {    
    // get the id from event type, callback and everything
    const triggerID: string = CommonUtils.generateUuidForString(
      `${eventType}:${String(cb)}`,
      BTT.namespace
    );
  
    CommonUtils.deleteTrigger(triggerID);
  }

  /**
   * Sends a request to real BTT built in webserver with given data translated as GET query params
   */
  public do(action: string, data: Record<string, any>): Promise<any> {
    return CommonUtils.makeAction(action, data, this.config);
  }

  /** ACTIONS */

  /**
   * Sends shortcut to txhe application. Some apps need to have focus so they can recieve shortcuts.
   * 
   * @param shortcut key identifiers separated by space
   * @param applicationPath absolute path pointing to the app which should recieve shortcut
   * @param applicationPath required for BTT to recognize the app, whithin browser env must be provided manually
   */
  public sendShortcut(
    shortcut: string,
    applicationPath: string,
    mdlsName?: string,
  ) {
    return this.actions.sendShortcut(
      shortcut,
      applicationPath,
      mdlsName,
    );
  }

  /**
   * Sets the volume of the system
   * @param volume 
   */
  // public async setVolume(volume: string) {
  //   return this.actions.setVolume(volume);
  // }

  /**
   * Toggles do not disturb mode
   */
  public toggleDnD() {
    return this.actions.toggleDnD();
  }

  /**
   * Toggles night shift
   */
  public toggleNightShift() {
    return this.actions.toggleNightShift();
  }

  /**
   * Triggers system wide keyboard shortcut
   * @param shortcut key identifiers separated by space
   */
  public triggerShortcut(shortcut: string) {
    return this.actions.triggerShortcut(shortcut);
  }

  /**
   * Shows HUD with given config
   */
  public showHUD(config: Types.IShowHUDConfig) {
    return this.actions.showHUD(config);
  }

  /**
   * Sends / Types / Inserts / Pastes custom text
   */
  public sendText(config: Types.ISendTextConfig) {
    return this.actions.sendText(config);
  }

  /**
   * Triggers a haptic response. Takes a number as a param due to BTT lack of information
   * which ID represents which mode, in order to know what value represents what open BTT and map 
   * the order of selects options in config of "Perform Haptic Feedback on Trackpad" action
   * 
   * @param hapticMode a number representing each mode.
   */
  public hapticFeedback(hapticMode: number) {
    return this.actions.hapticFeedback(hapticMode);
  }

  /**
   * Open an application on the given path
   */
  public launchApplication(applicationPath: string) {
    return this.actions.launchApplication(applicationPath);
  }

  /**
   * Toggles the visibility of given application
   */
  public toggleApplication(applicationPath: string) {
    return this.actions.toggleApplication(applicationPath);
  }

  /**
   * Toggles the mute state in the system
   */
  public mute() {
    return this.actions.mute();
  }

  /**
   * Starts Siri
   */
  public startSiri() {
    return this.actions.startSiri();
  }

  /**
   * Toggles the BetterTouchTool gesture recognition
   */
  public toggle() {
    return this.actions.toggle();
  }

  /**
   * Delays the next action. For most cases manually managing the execution of actions in JavaScript
   * should be sufficient - this will block any new action that BTT will recieve by the given am
   * 
   * @param timeout - time in miliseconds during any action execution will be delayed
   */
  public delayNextAction(timeout: number) {
    return this.actions.delayNextAction(timeout);
  }

  /**
   * Moves mouse to specified position
   */
  public moveMouse(config: Types.IMoveMouseConfig) {
    return this.actions.moveMouse(config);
  }

  /**
   * Toggles the mouse speed between a regular and speeded up one
   */
  public toggleMouseSpeed() {
    return this.actions.toggleMouseSpeed();
  }

  /**
   * Toggles mouse cursor visibility
   */
  public toggleMouseCursor() {
    return this.actions.toggleMouseCursor();
  }

  /**
   * Toggles between the big and regular mouse cursor size
   */
  public toggleMouseSize() {
    return this.actions.toggleMouseSize();
  }

  /**
   * Manages the keyboard bright
   * @param mode 'up' | 'down'
   */
  // public async keyBrightness(mode: string) {
  //   return this.actions.keyBrightness(mode);
  // }

  /**
   * Toggles the system dark mode 
   */
  public toggleDarkMode() {
    return this.actions.toggleDarkMode();
  }

  /**
   * Opens a web view
   */
  public showWebView(config: Types.IShowWebViewConfig) {
    return this.actions.showWebView(config);
  }

  /**
   * Locks the screen
   */
  public lockScreen() {
    return this.actions.lockScreen();
  }

  /**
   * Logouts current user
   */
  public logout() {
    return this.actions.logout();
  }

  /**
   * Sleeps computer display
   */
  public sleepDisplay() {
    return this.actions.sleepDisplay();
  }

  /**
   * Sleeps computer
   */
  public sleepComputer() {
    return this.actions.sleepComputer();
  }

  /**
   * Restarts BetterTouchTool
   */
  public restart() {
    return this.actions.restart();
  }
}
