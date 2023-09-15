import * as CryptoJS from 'crypto-js';

export class Password {
  // Replace these with your own secure keys
  private static readonly encryption_key = '6p.1V2p;0dV=(hS%*Zuj';

  /**
    * Encrypt a password
    * @param password Password to encrypt.
    * @return Encrypted password as a base64-encoded string.
  */
  public static encryptPassword = (password: string): string => CryptoJS.AES.encrypt(password, Password.encryption_key).toString();

  /**
    * Decrypt an encrypted password
    * @param encrypted_password Encrypted password as a base64-encoded string.
    * @return Decrypted password.
  */
  public static decryptPassword = (encrypted_password: string): string => {
    const bytes = CryptoJS.AES.decrypt(encrypted_password, Password.encryption_key);

    const decrypted_password = bytes.toString(CryptoJS.enc.Utf8);

    return decrypted_password;
  }
}
