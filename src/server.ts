import { app as http } from './http'
import { env } from './env'
import { prisma } from './infra/database/prisma'

const PORT = env.PORT

const start = async (): Promise<void> => {
  try {
    await http.listen({ port: PORT })
    http.log.info(`App is running on the port: ${PORT}`)
  } catch (error) {
    http.log.error(error)
    process.exit(1)
  }
}

// Graceful shutdown
const shutdown = async () => {
  console.log('🧹 Gracefully shutting down...')
  try {
    await http.close()
    await prisma.$disconnect()

    console.log('✅ Server closed cleanly')
    process.exit(0)
  } catch (err) {
    console.error('❌ Error during shutdown', err)
    process.exit(1)
  }
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

start()
