// utils/cryptoUtils.js
const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secret = process.env.ORDER_HASH_SECRET || "mySuperSecretKey";
const key = crypto.createHash("sha256").update(secret).digest().slice(0, 32); // 256-bit key
const iv = Buffer.alloc(16, 0); // Static IV (can randomize if needed)

function encryptOrderId(orderId) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(orderId.toString(), "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decryptOrderId(encryptedId) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedId, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return parseInt(decrypted, 10);
}

module.exports = {
  encryptOrderId,
  decryptOrderId,
};
