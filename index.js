let validate = require('naija-phone-number')
let axios = require('axios')

const API_ENDPOINT = 'http://account.kudisms.net/api/?' // version 1.0

function Kudi(KUDI_USER, KUDI_PASS, SENDER_ID, options) {
  if (!KUDI_USER || !KUDI_PASS || !SENDER_ID) {
    throw new Error(
      'You need to provide your KudiSMS Username and Password. \nSignup at www.kudisms.net'
    )
  }

  this.username = KUDI_USER
  this.password = KUDI_PASS
  this.senderId = SENDER_ID
  this.options = options
}

let actions = {
  callApi(query) {
    let baseQuery = {
      username: this.username,
      password: this.password,
      sender: this.senderId,
    }
    return new Promise((resolve, reject) => {
      axios
        .get(API_ENDPOINT, {
          params: Object.assign(baseQuery, query),
        })
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  },

  formatNumber(number) {
    let prefix = '234'
    let num = number.toString().replace(/\s+/, '')
    if (num.length <= 10) {
      return prefix + num
    } else if (num.startsWith('0')) {
      return prefix + num.slice(1)
    } else if (num.startsWith('+234')) {
      return prefix + num.slice(4)
    } else {
      return num
    }
  },

  sendSms(numbers, message) {
    let recepients
    if (Array.isArray(numbers)) {
      recepients = numbers
        .filter(number => {
          if (validate.isValid(number)) {
            return true
          } else {
            console.log(new Error(`Number: ${number}, is Invalid!`))
            return false
          }
        })
        .map(number => this.formatNumber(number))
        .join(',')
    } else {
      recepients = this.formatNumber(numbers)
    }
    let smsQuery = {
      mobiles: recepients,
      message: message,
    }
    // SEND SMS
    return new Promise((resolve, rejcet) => {
      return this.callApi(smsQuery)
        .then(res => resolve(res))
        .catch(err => rejcet(err))
    })
  },

  checkBalance() {
    return new Promise((resolve, reject) => {
      return this.callApi({ action: 'balance' })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  },

  setOptions(options) {
    if (options.username) {
      this.username = options.username
    }
    if (options.password) {
      this.password = options.password
    }
    if (this.senderId) {
      this.senderId = options.senderId
    }
  },
}

Object.assign(Kudi.prototype, actions)

module.exports = Kudi
