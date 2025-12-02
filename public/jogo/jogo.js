window.addEventListener("load", () => {
    const canvas = document.getElementById("arena");

    if(canvas.getContext) {
        /* Canvas */
        // Setup
        const ctx = canvas.getContext("2d");
        
        // Fundo
        const img = new Image();
        img.addEventListener("load", () => { ctx.drawImage(img, 0, 0); });
        img.src = "arena.jpeg";




        //////
        /* Servidor */ 
        const socket = io('ws://localhost:8080');

        socket.on('turno', () => {
            
        });

        let deck1 = [];
        let deck2 = [];

    } 

    else console.log("Desculpe, seu navegador não é compatível com <canvas> :(");

});
