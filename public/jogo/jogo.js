/* /////////////////////
Este é o código do servidor do jogo. Nosso objetivo é:
    1. O usuário abrirá jogo.html
    2. Ao abrir o site:
        - Nº ímpar de jog.: Conectará uma "partida" com outro jogador disponível
        - Nº par de jog.: Ficará em espera até outro jogador conectar
    3. A partida começará, criando um campo de jogo
*/ /////////////////////


/* express setup */ 
    const express = require('express');                                            // importa express
    const app = express();                                                         // cria servidor 'express'
    const port = 3000;


/* socket.io setup */
    const http = require('http');                                                  // importa pacote 'http'
    const server = http.createServer(app);                                         // cria servidor 'http'
    const { Server } = require('socket.io');                                       // importa socket.io em objeto 'Socket'
    const io = new Server(server);                                                 // cria servidor socket.io

    app.get('/', (req, res) => {
        res.send('');
    });

    server.listen(port, () => console.log('http://localhost:' + port));


/* Partidas */
    const partidas = {};
    class Partida {
        constructor(id) {
            this.id = id;
            this.jogadores = []; // Máximo = 2 
            this.estado = 'espera'; // espera, ativa, encerrada
            this.turno = 0; // Índice do jogador da vez (0 ou 1)
            this.data = new Date();
        }

        adicionarJogador(jogadorId, nome) {
            if(this.jogadores.length < 2) {
                this.jogadores.push({
                    id: jogadorId,
                    nome: nome,
                    pontos: 0,
                });
                return true;
            }

            else return false;
        }

        removerJogador(jogadorId) {
            this.jogadores = this.jogadores.filter(jog => jog.id !== jogadorId); // apaga jogador
            if(this.jogadores.length === 0) delete partidas[this.id];
        }

        rodada(jogadorId) {}

        verificarVencedor() {}

        encerrarPartida() {}
    }

    io.on('connection', (socket) => {
        console.log('+ 1 conexão');

        socket.on('esperar-partida', (turno) => {});
        socket.on('jogar-rodada', () => {});
        socket.on('deixar-partida', () => {});
    });




// const io = require('socket.io')(http, {
//     cors: { origin: '*' }
// });



/* // servidor.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// ============================
// GERENCIADOR DE PARTIDAS
// ============================

const partidas = {};  // Todas as partidas ativas
const salaEspera = []; // Jogadores esperando partida

class Partida {
    constructor(id) {
        this.id = id;
        this.jogadores = []; // Máximo 2 jogadores
        this.estado = 'aguardando'; // aguardando, ativa, finalizada
        this.tabuleiro = Array(9).fill(null); // Exemplo jogo da velha
        this.turno = 0; // Índice do jogador da vez (0 ou 1)
        this.criadaEm = new Date();
    }
    
    adicionarJogador(jogadorId, nome) {
        if (this.jogadores.length < 2) {
            this.jogadores.push({
                id: jogadorId,
                nome: nome,
                pontos: 0,
                simbolo: this.jogadores.length === 0 ? 'X' : 'O'
            });
            
            if (this.jogadores.length === 2) {
                this.estado = 'ativa';
                this.notificarInicio();
            }
            
            return true;
        }
        return false;
    }
    
    removerJogador(jogadorId) {
        this.jogadores = this.jogadores.filter(j => j.id !== jogadorId);
        if (this.jogadores.length === 0) {
            delete partidas[this.id];
        }
    }
    
    notificarInicio() {
        // Enviar para AMBOS os jogadores da partida
        this.jogadores.forEach(jogador => {
            io.to(jogador.id).emit('partida-iniciada', {
                partidaId: this.id,
                oponente: this.jogadores.find(j => j.id !== jogador.id),
                seuSimbolo: jogador.simbolo,
                voceComeca: this.turno === this.jogadores.indexOf(jogador)
            });
        });
    }
    
    fazerJogada(jogadorId, posicao) {
        const jogadorIndex = this.jogadores.findIndex(j => j.id === jogadorId);
        
        if (jogadorIndex !== this.turno) return false;
        if (this.tabuleiro[posicao] !== null) return false;
        
        this.tabuleiro[posicao] = jogadorIndex; // 0 ou 1
        
        // Notificar ambos os jogadores
        this.enviarParaPartida('jogada-feita', {
            posicao: posicao,
            jogador: jogadorId,
            simbolo: this.jogadores[jogadorIndex].simbolo
        });
        
        // Verificar vitória
        if (this.verificarVitoria(jogadorIndex)) {
            this.finalizarPartida(jogadorId);
            return true;
        }
        
        // Próximo turno
        this.turno = (this.turno + 1) % 2;
        this.enviarParaPartida('turno-alterado', {
            jogadorDaVez: this.jogadores[this.turno].id
        });
        
        return true;
    }
    
    enviarParaPartida(evento, dados) {
        this.jogadores.forEach(jogador => {
            io.to(jogador.id).emit(evento, dados);
        });
    }
    
    verificarVitoria(jogadorIndex) {
        const combinacoes = [
            [0,1,2], [3,4,5], [6,7,8], // Linhas
            [0,3,6], [1,4,7], [2,5,8], // Colunas
            [0,4,8], [2,4,6]           // Diagonais
        ];
        
        return combinacoes.some(combinacao => 
            combinacao.every(pos => this.tabuleiro[pos] === jogadorIndex)
        );
    }
    
    finalizarPartida(vencedorId) {
        this.estado = 'finalizada';
        this.enviarParaPartida('partida-finalizada', {
            vencedor: vencedorId,
            tabuleiroFinal: this.tabuleiro
        });
        
        // Limpar partida após 30 segundos
        setTimeout(() => {
            if (partidas[this.id]) {
                delete partidas[this.id];
            }
        }, 30000);
    }
}

// ============================
// LÓGICA DE CONEXÃO
// ============================

io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);
    
    // 1. Jogador procura partida
    socket.on('procurar-partida', (nomeJogador) => {
        console.log(`${nomeJogador} está procurando partida`);
        
        socket.nome = nomeJogador;
        
        if (salaEspera.length > 0) {
            // Tem jogador esperando - criar partida
            const oponenteSocketId = salaEspera.shift();
            const partidaId = `partida_${Date.now()}`;
            
            // Criar nova partida
            const partida = new Partida(partidaId);
            partidas[partidaId] = partida;
            
            // Adicionar ambos os jogadores
            partida.adicionarJogador(oponenteSocketId, io.sockets.sockets.get(oponenteSocketId).nome);
            partida.adicionarJogador(socket.id, nomeJogador);
            
            // Colocar sockets nas salas
            socket.join(partidaId);
            io.sockets.sockets.get(oponenteSocketId).join(partidaId);
            
            // Notificar jogadores
            io.to(oponenteSocketId).emit('partida-encontrada', { partidaId });
            socket.emit('partida-encontrada', { partidaId });
            
        } else {
            // Ninguém esperando - colocar na fila
            salaEspera.push(socket.id);
            socket.emit('aguardando-oponente');
        }
    });
    
    // 2. Jogador faz jogada
    socket.on('fazer-jogada', (dados) => {
        const { partidaId, posicao } = dados;
        const partida = partidas[partidaId];
        
        if (partida && partida.jogadores.some(j => j.id === socket.id)) {
            partida.fazerJogada(socket.id, posicao);
        }
    });
    
    // 3. Jogador deixa partida
    socket.on('sair-partida', (partidaId) => {
        const partida = partidas[partidaId];
        if (partida) {
            partida.removerJogador(socket.id);
            socket.leave(partidaId);
        }
    });
    
    // 4. Desconexão
    socket.on('disconnect', () => {
        console.log(`${socket.id} desconectou`);
        
        // Remover da sala de espera
        const index = salaEspera.indexOf(socket.id);
        if (index > -1) {
            salaEspera.splice(index, 1);
        }
        
        // Sair de todas as partidas
        for (const partidaId in partidas) {
            const partida = partidas[partidaId];
            if (partida.jogadores.some(j => j.id === socket.id)) {
                partida.removerJogador(socket.id);
                
                // Notificar oponente
                const oponente = partida.jogadores.find(j => j.id !== socket.id);
                if (oponente) {
                    io.to(oponente.id).emit('oponente-desconectou');
                }
            }
        }
    });
});

// ============================
// INICIAR SERVIDOR
// ============================

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Gerenciando partidas 1vs1`);
});
*/
