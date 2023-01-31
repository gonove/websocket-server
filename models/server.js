const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app ); //Server a conectar
        this.io = require('socket.io')(this.server) //Informacion de los clientes conectados

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        // this.app.use( this.paths.auth, require('../routes/auth'));
    }

    sockets() {

        this.io.on( 'connection', socket => {
            // console.log('cliente conectado ❤️', socket.id );

            socket.on( 'disconnect', () => {
                // console.log('Cliente desconectado 💔', socket.id );
            } )

            // Se escucha los mensaje del cliente -> se necesita escuchar desde el cliente
            socket.on( 'enviar-mensaje', ( payload, callback ) => {

                const id = 12345;
                callback( id );
                // callback( {id, fecha : new Date().getTime()} ); se puede enviar objetos
                // this.io.emit( 'enviar-mensaje', payload )
            })
        })


    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;