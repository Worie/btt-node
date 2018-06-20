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
];

export default function init() {
  const actions: Record<string, Function> = {};

  actionsList.forEach((action: Function) => {
    actions[action.name] = action.bind(this);
  });

  return actions;
};