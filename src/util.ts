import { execSync } from 'child_process';

/**
 * Escapes given text to be valid query param value
 * @param {*} text 
 */
export function escapeSpaces(text: string) {
  return text.replace(/ /g, '%20');
}

/**
 * Escapes slashes and spaces for BTT endpoints
 * @param {*} text 
 */
export function escapeForBtt(text: string) {
  const result = String(text);
  return result
    .replace(/ /g, '%20')
    .replace(/\//g, '\/');
}

export function getMdlsName(applicationPath: string): string {
  const mdlsName: string = execSync(`mdls -name kMDItemCFBundleIdentifier -r ${applicationPath}`).toString();
  return mdlsName;
}