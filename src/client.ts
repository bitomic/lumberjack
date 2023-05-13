import net from 'net'

const client = new net.Socket()
client.connect( 1337, '127.0.0.1', () => {
	client.write( JSON.stringify( { level: 'INFO', message: 'hi', service: 'test' } ) )
	client.destroy()
} )
