////
/* CANVAS */
////
    /* Setup */
        const canvas = document.getElementById("arena");
        const ctx = canvas.getContext("2d");


    /* Redimensionamento */
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            draw();
        }
        window.onresize = resize;


    /* Imagem de Fundo */
        const boardImg = new Image();
        boardImg.src = "arena.jpeg";  // imagem enviada por você

        boardImg.onload = () => resize();


    /* Setup das interações */
        let arenas = [];
        let button = { x: 0, y: 0, r: 0 };
        let buttonHover = false;


    /* Função de Desenho */
        function draw() {
            const W = canvas.width;
            const H = canvas.height;


            /* Área do Tabuleiro */ 
                const gameAreaW = W * 0.80;
                const gameAreaX = 0; 


            /* Imagem de Fundo */ 
                // proporções originais da imagem
                const imgW = boardImg.width;
                const imgH = boardImg.height;
                const imgRatio = imgW / imgH;

                // proporção da área de exibição disponível
                const areaRatio = gameAreaW / H;
                let drawW, drawH;

                if(imgRatio > areaRatio) {
                    // limita a largura
                    drawW = gameAreaW;
                    drawH = drawW / imgRatio;
                } else {
                    // limita a altura
                    drawH = H;
                    drawW = drawH * imgRatio;
                }

                // centra dentro da área do tabuleiro
                const drawX = gameAreaX + (gameAreaW - drawW) / 2;
                const drawY = (H - drawH) / 2;
                ctx.clearRect(0, 0, W, H);

                // desenha imagem sem distorção
                ctx.drawImage(boardImg, drawX, drawY, drawW, drawH);

                // borda do tabuleiro, se houver margens
                if(drawW < gameAreaW || drawH < H) {
                    ctx.strokeStyle = "rgba(255,220,100,0.35)";
                    ctx.lineWidth = 4;
                    ctx.strokeRect(drawX, drawY, drawW, drawH);
                }


            /* Arenas */ 
                const arenaWidth = drawW * 0.22;
                const arenaHeight = drawH * 0.55;
                const spacing = drawW * 0.07;

                const totalWidth = arenaWidth * 3 + spacing * 2;
                const startX = drawX + (drawW - totalWidth) / 2;

                const topY = drawY + drawH * 0.20;

                arenas = [
                    { x: startX, y: topY, w: arenaWidth, h: arenaHeight },
                    { x: startX + arenaWidth + spacing, y: topY, w: arenaWidth, h: arenaHeight },
                    { x: startX + (arenaWidth + spacing)*2, y: topY, w: arenaWidth, h: arenaHeight }
                ];

            
            /* Botão Snap */
                button.x = drawX + drawW / 2;
                button.y = drawY + drawH * 0.88;
                button.r = drawW * 0.02;

                // if(buttonHover) {
                //     ctx.beginPath();
                //     ctx.arc(button.x, button.y, button.r * 1.2, 0, Math.PI * 2);
                //     ctx.strokeStyle = "rgba(255,220,100,0.35)";
                //     ctx.lineWidth = 8;
                //     ctx.stroke();
                // }


            /* Área do Deck */ 
            ctx.fillStyle = "#160819";
            ctx.fillRect(gameAreaW, 0, W - gameAreaW, H);
            ctx.strokeStyle = "rgba(255,220,100,0.35)";
            ctx.lineWidth = 4;
            ctx.strokeRect(gameAreaW, 0, W - gameAreaW, H);
        }

    /* Eventos de Interação */
        // canvas.addEventListener("mousemove", e => {
        //     const rect = canvas.getBoundingClientRect();
        //     const mx = e.clientX - rect.left;
        //     const my = e.clientY - rect.top;

        //     const dist = Math.hypot(mx - button.x, my - button.y);
        //     buttonHover = dist < button.r;

        //     draw();
        // });

        canvas.addEventListener("click", e => {
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            // clique no botão
            if (Math.hypot(mx - button.x, my - button.y) < button.r) {
                alert("Você clicou no botão!");
            }

            // clique nas arenas
            arenas.forEach((a, i) => {
                if (mx > a.x && mx < a.x + a.w && my > a.y && my < a.y + a.h)
                    alert("Arena " + (i + 1) + " clicada!");
            });
        });

////
/* JOGO */
////




// window.addEventListener("load", () => {
//     const canvas = document.getElementById("arena");

//     if(canvas.getContext) {
//         /* Canvas */
//         // Setup
//         const ctx = canvas.getContext("2d");
        
//         // Fundo
//         const img = new Image();
//         img.addEventListener("load", () => { ctx.drawImage(img, 0, 0); });
//         img.src = "arena.jpeg";




//         //////
//         /* Servidor */ 
//         const socket = io('ws://localhost:8080');

//         socket.on('turno', () => {
            
//         });

//         let deck1 = [];
//         let deck2 = [];

//     } 

//     else console.log("Desculpe, seu navegador não é compatível com <canvas> :(");

// });



