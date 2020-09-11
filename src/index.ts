import readline from 'readline'
import io from 'socket.io-client'

const commands = {
  exit: 'exit',
}

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

reader.on('line', (line: string) => {
  console.log(`input: ${line}`)

  if (line === commands.exit) {
    reader.close()
  }

  process.stdout.write('> ')
})

reader.on('close', () => {
  console.log('bye!')
})

process.stdout.write('> ')
