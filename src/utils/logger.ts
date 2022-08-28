import CONFIG from '../../configuration';

type LoggerMode = 'warn' | 'error' | 'default';

/**
 *
 * This is a logger function that will disable console logs outside of development mode
 *
 * @param {input} any[]
 * @param {mode} "warn" || "error"
 * @param {source} "file name/function name"
 *
 */
export function Logger(input: any[], mode?: LoggerMode, source = 'Logger') {
  if (CONFIG.mode !== 'prod') {
    if (mode === 'warn') {
      console.warn(source + ': ', ...input);
    } else if (mode === 'error') {
      console.error(source + ': ', ...input);
    } else {
      console.log(source + ': ', ...input);
    }
  }
}

/**
 *
 * This returns a debugging logger keeps takes a location and keeps track of it when the logger function is called
 *
 * @param {source} "file name"
 *
 */
export function DebugLogger(source: string) {
  return (input: any[], mode?: LoggerMode, src = '') =>
    Logger(input, mode, source + '/' + src);
}

export default Logger;
