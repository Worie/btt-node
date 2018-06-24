import { execSync } from 'child_process';

/**
 * Escapes given text to be valid query param value
 * @param {*} text 
 */
export function escapeSpaces(text: string) {
  return text.replace(/ /g, '%20');
}

export function getMdlsName(applicationPath: string): string {
  const mdlsName: string = execSync(`mdls -name kMDItemCFBundleIdentifier -r ${applicationPath}`).toString();
  return mdlsName;
}