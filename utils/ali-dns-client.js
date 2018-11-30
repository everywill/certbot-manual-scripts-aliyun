const path = require('path')
const RPCClient = require('@alicloud/pop-core').RPCClient

console.log(`.env location: ${path.join(__dirname, '../.env')}`)

require('dotenv').config({path: path.join(__dirname, '../.env')})

const {
  ACCESSKEY_ID,
  ACCESSKEY_SECRET
} = process.env

console.log(`accessKeyId: ${ACCESSKEY_ID}`)
console.log(`accessKeySecret: ${ACCESSKEY_SECRET}`)

const client = new RPCClient({
  accessKeyId: ACCESSKEY_ID,
  accessKeySecret: ACCESSKEY_SECRET,
  endpoint: 'https://alidns.aliyuncs.com',
  apiVersion: '2015-01-09'
})

module.exports = client
