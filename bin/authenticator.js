#!/usr/bin/env node
const fs = require('fs')
const sleep = require('sleep')
const DNSClient = require('../utils/ali-dns-client')
let createdRecordId

console.log('===CERTBOT_VALIDATION===')
const recordValue = process.env.CERTBOT_VALIDATION
console.log(recordValue)

console.log('===CERTBOT_DOMAIN===')
const domain = process.env.CERTBOT_DOMAIN
console.log(domain)

async function authenticate () {
  console.log('manual-auth-hook')

  console.log('===获取解析记录列表===')

  const { DomainRecords } = await DNSClient.request('DescribeDomainRecords', {
    DomainName: domain,
    TypeKeyWord: 'TXT'
  })

  console.log(JSON.stringify(DomainRecords, null, 2))

  console.log('===DNS Challenge===')

  const { RecordId } = await DNSClient.request('AddDomainRecord', {
    DomainName: domain,
    Type: 'TXT',
    RR: '_acme-challenge',
    Value: recordValue
  })

  createdRecordId = RecordId
  fs.writeFileSync(`/tmp/CERTBOT_${domain}`, createdRecordId)

  console.log('===新增解析记录===')

  const res = await DNSClient.request('DescribeDomainRecordInfo', {
    RecordId: createdRecordId
  })

  console.log(JSON.stringify(res, null, 2))
  // sleep.sleep(25)
}

authenticate()
