#!/usr/bin/env node

const request = require('../utils/request')
const Nonce = require('../utils/nonce')
const baseUrl = 'https://alidns.aliyuncs.com'

const nonceGenerator = Nonce(9)
const nonce = nonceGenerator()

const commonParams = {
  Format: 'JSON',
  Version: '2015-01-09', 
  AccessKeyId: 'LTAIoYy0HlYDqLRQ',
  Signature: 
  SignatureMethod: 'HMAC-SHA1',
  Timestamp: (new Date()).toISOString(),
  SignatureVersion: '1.0',
  SignatureNonce: nonce
}
