import triggerShortcut from './triggerShortcut';
import sendShortcut from './sendShortcut';
import toggleDnD from './toggleDnD';
import toggleNightShift from './toggleNightShift';
import setVolume from './setVolume';
import showHUD from './showHUD';

const actionsList = [
  triggerShortcut,
  sendShortcut,
  toggleDnD,
  toggleNightShift,
  setVolume,
  showHUD,
];

export default function init() {
  const actions: Record<string, Function> = {};

  actionsList.forEach((action: Function) => {
    actions[action.name] = action.bind(this);
  });

  return actions;
};