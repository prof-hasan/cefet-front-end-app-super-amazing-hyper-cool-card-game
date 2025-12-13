import React from "react";
import GoldenCard from "../components/GoldenCard.react.jsx";

import React from "react";
import GoldenCard from "./GoldenCard.js";

export default function Library() {
  const deck = [
    { id: "louco", name: "O Louco", description: "Início de jornada, liberdade e aventura.", image: "/cards/louco.png" 
    },
    { id: "mago", name: "O Mago", description: "Iniciativa, potencial e ação.", image: "/cards/mago.png" 
    },
    { id: "sacerdotisa", name: "A Sacerdotisa", description: "Sabedoria, intuição e mistério.", image: "/cards/sacerdotisa.png"
    },
    { id: "imperatriz", name: "A Imperatriz", description: "Fertilidade, criação e prosperidade.", image: "/cards/imperatriz.png" 
    },
    { id: "imperador", name: "O Imperador", description: "Autoridade, estrutura e estabilidade.", image: "/cards/imperador.png" 
    },
    { id: "papa", name: "O Papa", description: "Tradição, ensinamento e conhecimento.", image: "/cards/papa.png"
    },
    { id: "enamorados", name: "Os Enamorados", description: "Escolhas, união e relacionamentos.", image: "/cards/enamorados.png"
    },
    { id: "carro", name: "O Carro", description: "Vitória, determinação e avanço.", image: "/cards/carro.png"
    },
    { id: "forca", name: "A Força", description: "Coragem, domínio e energia.", image: "/cards/forca.png" 
    },
    { id: "eremita", name: "O Eremita", description: "Reflexão, busca interior e sabedoria.", image: "/cards/eremita.png" 
    },
    { id: "roda", name: "A Roda da Fortuna", description: "Ciclos, mudanças e destino.", image: "/cards/roda.png" 
    },
    { id: "justica", name: "A Justiça", description: "Equilíbrio, verdade e responsabilidade.", image: "/cards/justica.png" 
    },
    { id: "enforcado", name: "O Enforcado", description: "Renúncia, transformação e nova visão.", image: "/cards/enforcado.png" 
    },
    { id: "morte", name: "A Morte", description: "Fim necessário, libertação e renascimento.", image: "/cards/morte.png" 
    },
    { id: "temperanca", name: "A Temperança", description: "Equilíbrio, paciência e cura.", image: "/cards/temperanca.png" 
    },
    { id: "diabo", name: "O Diabo", description: "Desejo, materialismo e impulsos.", image: "/cards/diabo.png" 
    },
    { id: "torre", name: "A Torre", description: "Desconstrução, revelação e ruptura.", image: "/cards/torre.png" 
    },
    { id: "estrela", name: "A Estrela", description: "Esperança, inspiração e renovação.", image: "/cards/estrela.png" 
    },
    { id: "lua", name: "A Lua", description: "Mistério, medo e ilusões.", image: "/cards/lua.png" 
    },
    { id: "sol", name: "O Sol", description: "Felicidade, sucesso e clareza.", image: "/cards/sol.png" 
    },
    { id: "julgamento", name: "O Julgamento", description: "Despertar, renascimento e nova fase.", image: "/cards/julgamento.png" 
    },
    { id: "mundo", name: "O Mundo", description: "Conclusão, realização e completude.", image: "/cards/mundo.png" 
    },
  ];

  return (
    <div className="library-container grid grid-cols-3 gap-4 p-4">
      {deck.map((card) => (
        <GoldenCard
          key={card.id}
          name={card.name}
          description={card.description}
          image={card.image}
        />
      ))}
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-950 p-8 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 tracking-wider">
        Biblioteca de Cartas
      </h1>

      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        xl:grid-cols-4 
        gap-8
      ">
        {deck.map((card) => (
          <GoldenCard
            key={card.id}
            name={card.name}
            image={card.image}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
