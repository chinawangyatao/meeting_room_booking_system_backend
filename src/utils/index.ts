import * as crypto from 'crypto';

/**
 * md5加密
 * @param str 加密的数据
 * **/
export function md5(str: string) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}
