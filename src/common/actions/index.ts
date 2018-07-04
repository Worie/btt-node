import * as Types from '../../../types';

import AHapticFeedback from './hapticFeedback';
import Action from '../../action';
import ASendText from './sendText';
import ADelayNextAction from './delayNextAction';
import AToggleBTT from './toggle';
import AStartSiri from './startSiri';
import ALaunchApplication from './launchApplication';
import AToggleApplication from './toggleApplication';
import AMute from './mute';
import ATriggerShortcut from './triggerShortcut';
import AToggleNightShift from './toggleNightShift';
import AToggleDnD from './toggleDnD';
import AToggleMouseSize from './toggleMouseSize';
import AToggleMouseSpeed from './toggleMouseSpeed';
import AToggleMouseCursor from './toggleMouseCursor';
import AToggleDarkMode from './toggleDarkMode';
import ALockScreen from './lockScreen';
import ALogout from './logout';
import ASleepDisplay from './sleepDisplay';
import ASleepComputer from './sleepComputer';
import ARestartBTT from './restart';
import AQuitBTT from './quit';
import ASendShortcut from './sendShortcut';
import AShowHUD from './showHUD';
import AMoveMouse from './moveMouse';
import AShowWebView from './showWebView';

const actionsList = [
  ATriggerShortcut,
  ASendShortcut,
  AToggleDnD,
  AToggleNightShift,
  AShowHUD,
  ASendText,
  AHapticFeedback,
  ALaunchApplication,
  AToggleApplication,
  AMute,
  AStartSiri,
  AToggleBTT,
  ADelayNextAction,
  AToggleMouseSize,
  AMoveMouse,
  AToggleMouseCursor,
  AToggleMouseSpeed,
  AToggleDarkMode,
  AShowWebView,
  ALockScreen,
  ALogout,
  ASleepDisplay,
  ASleepComputer,
  ARestartBTT,
  AQuitBTT,
];

export function init(config: Types.IBTTConfig) {
  const actions: Record<string, Types.IActionFunction> = {};

  actionsList.forEach(function (action: Types.Type<Action>) {
    actions[(action as any).alias] = (...args: any[]) => {
      return new action(config).init(...args);
    };
  });

  return actions;
};