const path = require('path')
const DeltaChat = require('..')
const dc = new DeltaChat()

const addr = process.env.DC_ADDR
const mail_pw = process.env.DC_MAIL_PW

if (typeof addr !== 'string' && typeof mail_pw !== 'string') {
  throw new Error('Invalid credentials')
}

dc.open(() => {
  const onReady = () => {
    console.log('configured, test successful!')
    process.exit(0)
  }
  dc.on('ALL', (event, data1, data2) => {
    console.log(event, data1, data2)
  })
  dc.on('DC_EVENT_ERROR', (code, error) => {
    console.log('received error, test unsuccessful')
    process.exit(1)
  })
  if (!dc.isConfigured()) {
    dc.once('ready', onReady)
    dc.configure({ addr, mail_pw })
  } else {
    onReady()
  }
})
