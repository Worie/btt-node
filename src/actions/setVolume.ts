/**
 * This module is horrible
 */
import { ACTION } from '../types';


/**
 * Updates the system volume to given amount. Could be done outside of BTT and be simpler and more efficient.
 * Probably a will do, but I'll keep the current implementation anyway for now.
 * @param volumeString 
 */
function updateVolume(volumeString: string) {
  const VOLUME = Number.parseInt(volumeString, 10);

  // this is the amout of small volume steps that represents 100% volume
  const MAX_VOLUME = 64; 

  const ONE_PERCENT = MAX_VOLUME / 100;

  const ITERATION_COUNT = Math.round(ONE_PERCENT * VOLUME);

  const promises = [];
  for (let i = 0; i <= ITERATION_COUNT; i++) {
    promises.push(
      this.do('trigger_action', {
        json: JSON.stringify({
          "BTTPredefinedActionType" : ACTION.VOLUME_UP_SLIGHTLY,
          "BTTEnabled2" : 1,
          "BTTEnabled" : 1,
        })
      }),
    );
  }

  return Promise.all(promises);
}

/**
 * Sets the volume to 0
 */
function resetVolume(): Promise<any> {
  const promises = [];

  for (let i = 0; i < 16; i++) {
    promises.push(
      this.do('trigger_action', {
        json: JSON.stringify({
          "BTTPredefinedActionType" : ACTION.VOLUME_DOWN,
          "BTTEnabled2" : 1,
          "BTTEnabled" : 1,
        })
      })
    );
  }

  return Promise.all(promises);
}

/**
 * Sends a shortcut to specified Application
 * @param shortcut 
 * @param applicationPath 
 */
export default async function setVolume(volumeString: string) {
  // reset the volume to 0
  await resetVolume.apply(this);

  // update the volume
  return updateVolume.apply(this, [volumeString]);
}