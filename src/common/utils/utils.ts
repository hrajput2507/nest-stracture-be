import "dotenv/config";
import axios, { AxiosResponse } from 'axios';
import { ErrorMessages, RefStrings } from '../constants';
const crypto = require('crypto');
export class Utils {
  public static async externalRequest(
    provider: string,
    type: string,
    url: any,
    body: any,
    headers: any,
  ) {
    // Reference
    let response: any;
    const throwException = true;
    try {
      // Request
      if (type == RefStrings.requestType.post) {
        response = await axios.post(url, body, {
          headers,
        });
      } else if (type == RefStrings.requestType.get) {
        response = await axios.get(url, {
          headers,
        });
      } else if (type == RefStrings.requestType.put) {
        response = await axios.put(url, body, {
          headers,
        });
      } else {
        throw ErrorMessages.systemError.invalidRequest;
      }
      response = response.data;
     
      //Add LogDetails
      return response;
    } catch (error: any) {
     
      // throw error;
      // Log Error
      // 
      // 
      // 
      // Throw Exception

      //Add LogDetails
      
      if (throwException) {
        throw ErrorMessages.systemError.externalProviderIssue;
      } else {
        // Return error
        return error;
      }
    }
  }

  static genrateOtp(length: number) {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  static encryptPin(pin: string) {
    return new Promise((resolve, reject) => {
      let salt = crypto.randomBytes(8).toString('hex');
      crypto.scrypt(pin, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(salt + ':' + derivedKey.toString('hex'));
      });
    });
  }

  static isPinValid(pin: any, dbpin: any) {
    return new Promise((resolve, reject) => {
      let [salt, key] = dbpin.split(':');
      crypto.scrypt(pin, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(key == derivedKey.toString('hex'));
      });
    });
  }

  static async withTimeout(msecs, promise) {
    const timeout = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('timeout'));
      }, msecs);
    });
    return Promise.race([timeout, promise]);
  }


  // encrypt and decrypt key 
  static async encryptKey(data) {
    try {

      // Reference
      let cipher: { update: (arg0: any) => any; final: () => Uint8Array; }
      let encrypted: Uint8Array | Buffer

      // Convert to buffer
      const key = Buffer.from(process.env.SECRET_SAUCE, 'hex')
      const iv = Buffer.from(process.env.SECRET_IV, 'hex')

      // Encrypt
      cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv)
      encrypted = cipher.update(data)
      encrypted = Buffer.concat([encrypted, cipher.final()])

      // Return
      return encrypted.toString('hex')

    } catch (error) {
      throw error
    }
  }
  // encrypt and decrypt key 
  static async credEncryptKey(data) {
    try {

      // Reference
      let cipher: { update: (arg0: any) => any; final: () => Uint8Array; }
      let encrypted: Uint8Array | Buffer

      // Convert to buffer
      const key = Buffer.from(process.env.CRED_SECRET_SAUCE, 'hex')
      const iv = Buffer.from(process.env.CRED_SECRET_IV, 'hex')

      // Encrypt
      cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv)
      encrypted = cipher.update(data)
      encrypted = Buffer.concat([encrypted, cipher.final()])

      // Return
      return encrypted.toString('hex')

    } catch (error) {
      throw error
    }
  }

  static async decryptKey(encryptedData) {

    try {

      // Reference
      let encryptedText: Buffer
      let decipher: { update: (arg0: Buffer) => any; final: () => Uint8Array; }
      let decrypted: Uint8Array | Buffer

      // Convert to buffer
      const key: any = Buffer.from(process.env.SECRET_SAUCE, 'hex')
      const iv = Buffer.from(process.env.SECRET_IV, 'hex')

      // Decrypt
      encryptedText = Buffer.from(encryptedData, 'hex')
      decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv)
      decrypted = decipher.update(encryptedText)
      decrypted = Buffer.concat([decrypted, decipher.final()])

      const getKey = decrypted.toString().split(',')[0]
      // Return
      return getKey

    } catch (error) {
      throw error
    }

  }
  static async credDecryptKey(encryptedData) {

    try {

      // Reference
      let encryptedText: Buffer
      let decipher: { update: (arg0: Buffer) => any; final: () => Uint8Array; }
      let decrypted: Uint8Array | Buffer

      // Convert to buffer
      const key: any = Buffer.from(process.env.CRED_SECRET_SAUCE, 'hex')
      const iv = Buffer.from(process.env.CRED_SECRET_IV, 'hex')

      if (!encryptedData ||!key ||!iv) {
        console.error('Missing required parameters');
        process.exit(1);
      }

      // Decrypt
      encryptedText = Buffer.from(encryptedData, 'hex')
      decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), Buffer.from(iv))
      decrypted = decipher.update(encryptedText)
      decrypted =  Buffer.concat([decrypted, decipher.final()])

      const getKey =  String(decrypted);
      // Return
      return getKey

    } catch (error) {
      throw error
    }

  }






}
