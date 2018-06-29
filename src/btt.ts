import * as Trigger from './common/trigger/index';
import * as Widget from './common/widget/index';
import * as State from './common/state';
import Actions from './common/actions/index';
import * as CommonUtils from './common/util';

// TODO: 
// - Check if BTT server is running upon initialisation
// - Action that has a method (static?) get URL or smth
// - BTT, and all reuse the helpers - so theres no need for circular dependecy 
// - Alternatively: find out a proper way to inject dependencies so it works both ways (later)
// - Fix backend

/**
 * Class used to manage the BTT webserver 
 */
export class BTT {
  // holds various actions definitions
  private actions: Record<string, IAction>;

  // stores a Trigger factory
  public Trigger: Trigger.TriggerStatic<ITriggerConfig>;
  
  // stores a Widget factory
  public Widget: Widget.WidgetStatic<IWidgetConfig>;

  // state, manages BTT variables
  public state: IState;

  // stores the config from the constructor
  private config: IBTTConfig;

  /**
   * Creates BTT instance which communicates with BetterTouchTool built in webserver
   */
  constructor(config: IBTTConfig) {
    this.config = config;
    
    // get all the actions
    this.actions = Actions.bind(this)();

    // initialize the Trigger factory
    this.Trigger = Trigger.init(config);
    
    // initialize the Widget factory
    this.Widget = Widget.init(config);

    // initialize the state (variable management)
    this.state = State.init(config);
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
  public async sendShortcut(
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
  public async showHUD(config: IShowHUDConfig) {
    return this.actions.showHUD(config);
  }

  /**
   * Sends / Types / Inserts / Pastes custom text
   */
  public async sendText(config: ISendTextConfig) {
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
  public async moveMouse(config: IMoveMouseConfig) {
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
  public async showWebView(config: IShowWebViewConfig) {
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
