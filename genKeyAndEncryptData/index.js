const crypto = require('crypto');


function Str_Random(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        const randomInd = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomInd);
    }
    return result;
}

function GenRandomSecretKey(){
    return `genetica-${Str_Random(5)}-${Str_Random(5)}-${Str_Random(5)}-${Str_Random(5)}`
}

const encryptionIV = crypto
  .createHash('sha512')
  .update("aaa")
  .digest('hex')
  .substring(0, 16)

// function encode private key to store in server
function encryptPrivateKey(privateKey, secretKey) {
    const key = crypto
    .createHash('sha512')
    .update(secretKey)
    .digest('hex')
    .substring(0, 32)
    const cipher = crypto.createCipheriv("aes-256-cbc", key, encryptionIV)
    return Buffer.from(
        cipher.update(privateKey, 'utf8', 'hex') + cipher.final('hex')
      ).toString('base64')
}

// function decode private key fetch from server
function decryptPrivateKey(encryptedPrivateKey, secretKey) {
    const key = crypto
    .createHash('sha512')
    .update(secretKey)
    .digest('hex')
    .substring(0, 32)
    const buff = Buffer.from(encryptedPrivateKey, 'base64')
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, encryptionIV)
    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    )
}

// encode data gen
function EndCodeData(data, publicKey){
    const encryptedData = crypto.publicEncrypt(
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        Buffer.from(data)
    );
    return encryptedData
}
// decode data gen
function DeCodeData(encryptedData, privateKey){
    const decryptedData = crypto.privateDecrypt(
        {
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        encryptedData
      );
    return decryptedData.toString("utf8")
}


function GenKeyPair(){
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem'
        }
      }); 
    return {privateKey: privateKey, publicKey: publicKey}
}

// demo

// gen key
const {publicKey, privateKey}= GenKeyPair()
const secretKey =  GenRandomSecretKey()


const dataGen = "testing"

const encode = EndCodeData(dataGen, publicKey)

console.log("isDataGen", dataGen === DeCodeData(encode, privateKey))

const encryptedPrivateKey = encryptPrivateKey(privateKey, secretKey)

// upload and store publicKey,encryptedPrivateKey, secretKey to server

console.log("isPrivateKey", decryptPrivateKey(encryptedPrivateKey, secretKey) === privateKey)