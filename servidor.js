let botaoConectar = document.querySelector("#conectar");
let botaoDesconectar = document.querySelector("#desconectar");
let mensagem1El = document.querySelector("#msg1");
let mensagem2El = document.querySelector("#msg2");
const socket = null;

botaoConectar.addEventListener('click', (socket) => {
    conectar(socket);
    botaoConectar.id = 'desconectar';
});

botaoDesconectar.addEventListener('click', (socket) => {
    desconectar(socket);
    botaoConectar.id = 'conectar';
})

function conectar(socket) {
    socket = new WebSocket('wss://echo.websocket.org');

    socket.onerror = function(error) {
        console.log('erros do WebSocket: ' + error);
    };

    socket.onopen = function(event) {
        mensagem1El.innerHTML = 'Conectado com: ' + event.currentTarget.URL;
    };

    socket.onmessage = function(event) {
        let mensagem = event.data;
        mensagem2El.innerHTML = '<p>Recebida: ' + mensagem + '</p>';
        botaoConectar.innerHTML = 'Desconectar';
    };
}

function desconectar(socket) {
    socket.onclose = function(event) {
        mensagem1El.innerHTML = 'Disconectando o WebSocket.';
        mensagem2El.innerHTML = '';

        botaoDesconectar.innerHTML = 'Conectar';
    }

    socket.close();
    socket = null;
    mensagem1El.innerHTML = '';
}
    