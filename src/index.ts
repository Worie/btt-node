export { BTT } from './btt';
import { BTT } from './btt';
export * from '../types';

// initialize the BTT providing the data where the server is hosted
const btt = new BTT({
    domain: '127.0.0.1',
    port: 64472,
    protocol: 'http',
    sharedKey: 'sBP2fYAo2Fu8TdfzhLpwdUm'
  });
  
  // btt.triggerShortcut('cmd+space')
    // .then(() => btt.showHUD({ title: ':D :D 👌😹'}));
  
  
    btt.showHUD({ title: ':D :D 👌😹'});
  