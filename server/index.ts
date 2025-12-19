import 'dotenv/config'
import server from './server.ts'

process.on('unhandledRejection', (err: any) => {
  console.error('UNHANDLED REJECTION:')
  console.error(err)

  if (err?.errors) {
    err.errors.forEach((e: any, i: number) => {
      console.error(`Sub-error ${i}:`, e)
    })
  }
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', PORT)
})
