const CryptoJS = require('crypto-js')
const JsEncrypt = require('jsencrypt')
const Base64 = require('js-base64').Base64


/**
 * 生成随机字符串
 */
function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        let pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

/**
 * 字节数组转换成十六进制
 * @param {字节数组} bytes 
 */
function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
    }
    return hex.join("");
}

/**
 * 字符串转字节数组
 * @param {字符串} str 
 */
function stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for(var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if(c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if(c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if(c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;


}

/**
 * 字符串转十六进制
 * @param {字符串} str 
 */
function strToHexCharCode(str) {
　　if(str === "")
　　　　return "";
　　var hexCharCode = [];
　　for(var i = 0; i < str.length; i++) {
　　　　hexCharCode.push((str.charCodeAt(i)).toString(16));
　　}
　　return hexCharCode.join("");
}
        


/**
 * aes加密
 * @param {加密秘钥} key 
 * @param {秘钥向量} iv 
 * @param {明文（字符串）} word 
 */
function aesEncrypt(key, iv, word) {
    let hiv = strToHexCharCode(iv)
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let base64Cipher = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    return hiv + base64Cipher;
}

/**
 * rsa加密
 * @param {明文（字符串类型）} data 
 */
function rsaEncrypt(data) {
    // debugger;
    const publicKey =  `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDWsQSvuEHuCs1DatRNEvMD6pU5
    TQMejzyr0iWwyrtOc3nIChbJL9N3BnkjCZCQ+6kePLFFSkRn3VqQF2wQhT/q2LRd
    Yf49tXjJay5Sc90I1NM7xfqNR5Tt0N7uJ7SD2W3yD0e7dcIp/3SfKQTfQeV+obbD
    YAG0cPdC1MM+nhp7YwIDAQAB
    -----END PUBLIC KEY-----`
    let jsEncryptor = new JSEncrypt();
    jsEncryptor.setPublicKey(publicKey);
    const defaultLength = 117;
    const encryptWordLength = data.length;
    if (encryptWordLength <= defaultLength) {
        return Base64.encode(strToHexCharCode(jsEncryptor.encrypt(data)));
    }
    let offset = 0;
    let paramsList = [];
    while (encryptWordLength - offset > 0) {
        if (encryptWordLength - offset > defaultLength) {
            paramsList.push(strToHexCharCode(jsEncryptor.encrypt(data.slice(offset, offset + defaultLength))));
        } else {
            paramsList.push(strToHexCharCode(jsEncryptor.encrypt(data.slice(offset))));
        }
        offset += defaultLength;
    }
    let target = paramsList.join('');
    return Base64.encode(target);

}

/**
 * 数据加密
 * @param {明文（字符串）} word 
 */
function encrypt(word) {
    let key = randomWord(false, 16)
    let iv = CryptoJS.lib.WordArray.random(128/16).toString(CryptoJS.enc.Hex);
    let encryptWord = aesEncrypt(key, iv, word);
    let data = {
        key: key,
        data: encryptWord
    }
    data = JSON.stringify(data);
    return rsaEncrypt(data);
}

export default{
    encrypt
}