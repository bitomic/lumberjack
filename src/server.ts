import { Level, PrismaClient } from '@prisma/client'
import { s } from '@sapphire/shapeshift'
import net from 'net'

const prisma = new PrismaClient()

const server = net.createServer( socket => {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	socket.on( 'error', () => {} )
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	socket.on( 'end', () => {} )

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	socket.on( 'data', async data => {
		try {
			const schema = s.object( {
				component: s.string.optional,
				data: s.object( {} ).passthrough.optional,
				level: s.nativeEnum( Level ),
				message: s.string.optional,
				module: s.string.optional,
				service: s.string
			} ).strict
			const json = schema.parse( JSON.parse( data.toString() ) )
			if ( !json.data && !json.message ) {
				throw new Error( 'No content' )
			}

			await prisma.logs.create( {
				data: json
			} )
		} catch ( e ) {
			// eslint-disable-next-line no-console
			console.error( e, data.toString() )
		}
	} )
} )

server.listen( 1337, '127.0.0.1' )
