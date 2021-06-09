const
  rl = require('readline-sync'),
  app = require('../src/api/app')

const getCredentials = () => {
  const name = rl.question('Name: ')
  const email = rl.question('Email: ')
  const password = rl.question('Password: ', { hideEchoBack: true })
  const password_repeat = rl.question('Repeat password: ', { hideEchoBack: true })
  if (password !== password_repeat) {
    console.error('Passwords do not match! Try again...')
    return false
  }
  return {
    name, email, password
  }
}

const main = async function () {
  let credentials
  while (!credentials) credentials = getCredentials()
  try {
    const user = await app.service('users').create(credentials)
    console.log('Created user', user._id)
    console.log('Log in at', `${app.get('uiHost')}/login`)
    process.exit(0)
  }
  catch (err) {
    console.error('Failed to create user:', err.message)
    process.exit(1)
  }
}

main()
