import * as Types from '../types';

import triggerShortcut from './triggerShortcut';
import sendShortcut from './sendShortcut';
import toggleDnD from './toggleDnD';
import toggleNightShift from './toggleNightShift';
import setVolume from './setVolume';
import showHUD from './showHUD';
import sendText from './sendText';
import hapticFeedback from './hapticFeedback';
import launchApplication from './launchApplication';
import toggleApplication from './toggleApplication';
import mute from './mute';
import startSiri from './startSiri';
import toggle from './toggle';
import delayNextAction from './delayNextAction';
import moveMouse from './moveMouse';
import toggleMouseSpeed from './toggleMouseSpeed';
import toggleMouseCursor from './toggleMouseCursor';
import toggleMouseSize from './toggleMouseSize';
import keyBrightness from './keyBrightness';
import toggleDarkMode from './toggleDarkMode';
import showWebView from './showWebView';
import lockScreen from './lockScreen';
import logout from './logout';
import sleepDisplay from './sleepDisplay';
import sleepComputer from './sleepComputer';
import restart from './restart';

const actionsList = [
  triggerShortcut,
  sendShortcut,
  toggleDnD,
  toggleNightShift,
  setVolume,
  showHUD,
  sendText,
  hapticFeedback,
  launchApplication,
  toggleApplication,
  mute,
  startSiri,
  toggle,
  delayNextAction,
  moveMouse,
  toggleMouseSpeed,
  toggleMouseCursor,
  toggleMouseSize,
  keyBrightness,
  toggleDarkMode,
  showWebView,
  lockScreen,
  logout,
  sleepDisplay,
  sleepComputer,
  restart,
];

export default function init() {
  const actions: Record<string, Types.IAction> = {};

  actionsList.forEach((action: Types.IAction) => {
    actions[action.name] = action.bind(this);
  });

  return actions;
};