
// Referencias HTML
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')

const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')

// Ver el cliente conectado
const socket = io();

// Listeners
socket.on('connect', () => {
    // console.log('conectado ❤️');

    lblOffline.style.display = 'none'
    lblOnline.style.display = ''
})


socket.on('disconnect', () => {
    // console.log('desconectado 💔');

    lblOnline.style.display = 'none'
    lblOffline.style.display = ''
})


// Escuchar mensaje del servidor
socket.on( 'enviar-mensaje', ( payload ) => {
    console.log(payload);
} )


// Enviar desde el cliente -> se necesita escuchar desde el server
btnEnviar.addEventListener( 'click', () => {

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id : '123abc',
        date : new Date().getTime()
    }

    // El tercer argumento es un callback que se recibe del servidor
    socket.emit( 'enviar-mensaje', payload, (id) => {
        console.log('Desde el server', id);
    })

})