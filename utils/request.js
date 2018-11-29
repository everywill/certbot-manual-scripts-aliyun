const axios = require('axios')
const methods = ['post', 'get', 'put', 'delete']
const ins = {}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
axios.defaults.headers.get.Accept = 'application/json'


methods.forEach((method) => {
  ins[method] = (url, data, options = {}) => {
    data = data || {}

    if (method === 'get') {
      data = { params: data }
    } else {
      data = { data }
    }

    const promise = new Promise((resolve, reject) => axios({
      url,
      method,
      ...data,
      ...options
    }).then(response => response.data).then(({code, ...rest}) => {
      if (code === 0 || code === 200) {
        resolve(rest)
      }  else {
        reject(rest)
      }
    }).catch((error) => {
      reject(error)
    }))

    return promise
  }
})

module.exports = ins
