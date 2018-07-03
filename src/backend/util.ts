import { execSync } from 'child_process';

export function getMdlsName(applicationPath: string): string {
  const mdlsName: string = execSync(`mdls -name kMDItemCFBundleIdentifier -r ${applicationPath}`).toString();
  return mdlsName;
}

export function deleteTrigger(uuid: string): void {
  execSync(`open 'btt://delete_trigger/?uuid=${uuid}'`);
}