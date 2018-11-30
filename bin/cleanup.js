#!/usr/bin/env node
const fs = require('fs')
const DNSClient = require('../utils/ali-dns-client')

console.log('===CERTBOT_DOMAIN===')
const domain = process.env.CERTBOT_DOMAIN
console.log(domain)

console.log('===RecordId===')
const recordId = fs.readFileSync(`/tmp/CERTBOT_${domain}`, 'utf8')
console.log(recordId)

console.log('==========')

async function cleanup() {
  console.log('manual-cleanup-hook')

  console.log('===删除此次新增解析记录===')

  const { DomainRecords } = await DNSClient.request('DeleteDomainRecord', {
    DomainName: domain,
    RecordId: recordId
  })
  console.log(JSON.stringify(DomainRecords, null, 2))

  console.log('===double check===')

  const res = await DNSClient.request('DescribeDomainRecordInfo', {
    RecordId: recordId
  })
  console.log(JSON.stringify(res, null, 2))
}

cleanup()
