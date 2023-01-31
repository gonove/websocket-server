

const socketController = (socket) => {

    console.log('cliente conectado ❤️', socket.id );

    socket.on( 'disconnect', () => {
        console.log('Cliente desconectado 💔', socket.id );
    } )

    // Se escucha los mensaje del cliente -> se necesita escuchar desde el cliente
    socket.on( 'enviar-mensaje', ( payload, callback ) => {

        const id = 12345;
        callback( id );
        // callback( {id, fecha : new Date().getTime()} ); se puede enviar objetos
        socket.broadcast.emit( 'enviar-mensaje', payload ) //broadcast para enviar a todos los client
        // socket.io se usa para peticiones rest
    })

}

module.exports = {socketController}
