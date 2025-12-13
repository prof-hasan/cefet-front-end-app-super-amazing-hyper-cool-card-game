// Dados da biblioteca
const deck = [
  { id: "sacerdotisa", 
    name: "A Sacerdotisa", 
    description: "Representa sabedoria, intuição e mistério.",  
    image: "images/sacerdotisa.png"
  },
  { id: "mago",       
    name: "O Mago",       
    description: "Iniciativa, potencial e ação.",                 
    image: "images/mago.png" 
  },
  { id: "louco",      
    name: "O Louco",      
    description: "Início de jornada, liberdade e aventura.",      
    image: "images/louco.png" 
  },
  { id: "imperador",  
    name: "O Imperador",  
    description: "Autoridade, ordem e estrutura.",                
    image: "images/imperador.png" 
  },
  { id: "Morte",  
    name: "A Morte",  
    description: "Ela nunca espera, mais cedo ou mais tarde.",            
    image: "images/morte.png" 
  },
  { id: "A Justiça",  
    name: "A Justiça",  
    description: "A Justiça sempre chega.",                         
    image: "images/justica.png" 
  },
  {
    id: "imperatriz",
    name: "A Imperatriz",
    description: "Fertilidade, crescimento, prosperidade.",
    image: "images/Wands06.png"
  },
  {
    id: "papa",
    name: "O Papa",
    description: "Tradição, ensinamento, conhecimento formal.",
    image: "images/papa.png"
  },
  {
    id: "enamorados",
    name: "Os Enamorados",
    description: "Escolhas, união, relacionamentos.",
    image: "images/enamorados.png"
  },
  {
    id: "carro",
    name: "O Carro",
    description: "Vitória, avanço, determinação.",
    image: "images/carro.png"
  },
  {
    id: "forca",
    name: "A Força",
    description: "Coragem, domínio interno, energia.",
    image: "images/forca.png"
  },
  {
    id: "eremita",
    name: "O Eremita",
    description: "Sabedoria, busca interior, reflexão.",
    image: "images/eremita.png"
  },
  {
    id: "roda",
    name: "A Roda da Fortuna",
    description: "Ciclos, destino, mudanças inevitáveis.",
    image: "images/roda.png"
  },
  {
    id: "enforcado",
    name: "O Enforcado",
    description: "Renúncia, transformação, nova visão.",
    image: "images/enforcado.png"
  },

  {
    id: "temperanca",
    name: "A Temperança",
    description: "Equilíbrio, paciência, cura.",
    image: "images/temperanca.png"
  },
  {
    id: "diabo",
    name: "O Diabo",
    description: "Desejo, materialismo, impulsos.",
    image: "images/diabo.png"
  },
  {
    id: "torre",
    name: "A Torre",
    description: "Desconstrução, revelação, ruptura.",
    image: "images/torre.png"
  },
  {
    id: "estrela",
    name: "A Estrela",
    description: "Esperança, renovação, inspiração.",
    image: "images/estrela.png"
  },
  {
    id: "lua",
    name: "A Lua",
    description: "Medo, mistério, ilusões.",
    image: "images/lua.png"
  },
  {
    id: "sol",
    name: "O Sol",
    description: "Felicidade, clareza, sucesso.",
    image: "images/sol.png"
  },
  {
    id: "julgamento",
    name: "O Julgamento",
    description: "Despertar, renascimento, nova fase.",
    image: "images/julgamento.png"
  },
  {
    id: "mundo",
    name: "O Mundo",
    description: "Conclusão, completude, realização.",
    image: "images/mundo.png"
  }
];

const grid = document.getElementById('grid');

function createCard(card) {
  const outer = document.createElement('div');
  outer.className = "card-outer";

  const wrapper = document.createElement('article');
  wrapper.className = "golden-card";

  const frame = document.createElement('div');
  frame.className = "golden-frame";
  wrapper.appendChild(frame);

  const title = document.createElement('div');
  title.className = "golden-title text-lg text-center";
  title.textContent = card.name;
  wrapper.appendChild(title);

  const imgWrap = document.createElement('div');
  imgWrap.className = "mt-2 aspect-[3/4] w-full overflow-hidden";
  
  const img = document.createElement('img');
  img.className = "w-full h-full object-cover card-image";
  img.src = card.image;
  img.alt = card.name;

  img.onerror = function () {
    this.src = "https://via.placeholder.com/400x560?text=Sem+imagem";
  };

  imgWrap.appendChild(img);
  wrapper.appendChild(imgWrap);

  // descrição
  if (card.description) {
    const desc = document.createElement('p');
    desc.className = "text-sm text-yellow-200 mt-2 text-center";
    desc.textContent = card.description;
    wrapper.appendChild(desc);
  }

  const footer = document.createElement('div');
  footer.className = "card-footer flex items-center justify-center gap-2";
  
  const btn = document.createElement('button');
  btn.className = `
    px-3 py-1 rounded
    bg-yellow-600/20
    border border-yellow-700
    text-yellow-100 text-sm
    hover:bg-yellow-600/30
    transition
  `;
  btn.textContent = "Ver detalhes";
  btn.onclick = () => alert(`${card.name}\n\n${card.description || "Sem descrição"}`);

  footer.appendChild(btn);
  wrapper.appendChild(footer);

  outer.appendChild(wrapper);
  return outer;
}

function renderDeck(list) {
  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center text-gray-400">
        Nenhuma carta encontrada.
      </div>
    `;
    return;
  }

  list.forEach(card => grid.appendChild(createCard(card)));
}

const search = document.getElementById('search');
search.addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  const filtered = deck.filter(c =>
    c.name.toLowerCase().includes(q) ||
    (c.description && c.description.toLowerCase().includes(q))
  );
  renderDeck(filtered);
});

renderDeck(deck);