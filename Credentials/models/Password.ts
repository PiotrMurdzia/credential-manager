import * as CryptoJS from 'crypto-js';
const { ENCRYPTION_KEY_SECRET } = require('../../_common/parameters/EnvParameters');

export class Password {
  /**
    * Encrypt a password
    * @param password Password to encrypt.
    * @return Encrypted password as a base64-encoded string.
  */
  public static encryptPassword = (password: string): string => CryptoJS.AES.encrypt(password, ENCRYPTION_KEY_SECRET).toString();

  /**
    * Decrypt an encrypted password
    * @param encrypted_password Encrypted password as a base64-encoded string.
    * @return Decrypted password.
  */
  public static decryptPassword = (encrypted_password: string): string => {
    const bytes = CryptoJS.AES.decrypt(encrypted_password, ENCRYPTION_KEY_SECRET);

    const decrypted_password = bytes.toString(CryptoJS.enc.Utf8);

    return decrypted_password;
  }
}
