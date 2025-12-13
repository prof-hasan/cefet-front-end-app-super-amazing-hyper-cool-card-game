// ----- Dados iniciais de cartas (exemplo) -----
const CARD_POOL = [
  { id: "MA01", name: "O Louco", cost: 0, power: 1, desc: "Começa tudo. Energia livre para jogar.", image: "../cartas/images/louco.png" },
  { id: "MA02", name: "O Mago", cost: 1, power: 2, desc: "Ao jogar, +1 poder temporário neste local.", image: "../cartas/images/mago.png" },
  { id: "MA03", name: "A Sacerdotisa", cost: 1, power: 1, desc: "+1 carta no próximo turno.", image: "../cartas/images/sacerdotisa.png" },
  { id: "MA04", name: "A Imperatriz", cost: 2, power: 2, desc: "Fortalece outra carta no mesmo local.", image: "../cartas/images/Wands06.png" },
  { id: "MA05", name: "O Imperador", cost: 3, power: 3, desc: "+2 poder se for o único no local.", image: "../cartas/images/imperador.png" },
  { id: "MA06", name: "O Hierofante", cost: 2, power: 2, desc: "Duplica o efeito da próxima carta.", image: "../cartas/images/papa.png" },
  { id: "MA07", name: "Os Enamorados", cost: 2, power: 3, desc: "+2 poder se houver ao menos 2 cartas no local.", image: "../cartas/images/enamorados.png" },
  { id: "MA08", name: "O Carro", cost: 2, power: 3, desc: "+1 poder todo turno que permanecer em campo.", image: "../cartas/images/carro.png" },
  { id: "MA09", name: "A Justiça", cost: 2, power: 2, desc: "Equilibra os valores do local.", image: "../cartas/images/justica.png" },
  { id: "MA10", name: "O Eremita", cost: 1, power: 2, desc: "+1 poder se estiver sozinho no local.", image: "../cartas/images/eremita.png" },
  { id: "MA11", name: "Roda da Fortuna", cost: 3, power: 4, desc: "Efeito aleatório ao ser jogada.", image: "../cartas/images/roda.png" },
  { id: "MA12", name: "A Força", cost: 3, power: 4, desc: "+1 poder permanente por turno.", image: "../cartas/images/forca.png" },
  { id: "MA13", name: "O Enforcado", cost: 1, power: 0, desc: "Redireciona efeitos inimigos.", image: "../cartas/images/enforcado.png" },
  { id: "MA14", name: "A Morte", cost: 3, power: 4, desc: "Remove 1 carta adversária (demo).", image: "../cartas/images/morte.png" },
  { id: "MA15", name: "A Temperança", cost: 2, power: 2, desc: "Equaliza o poder das cartas no local.", image: "../cartas/images/temperanca.png" },
  { id: "MA16", name: "O Diabo", cost: 3, power: 5, desc: "Cartas no local não podem sair.", image: "../cartas/images/diabo.png" },
  { id: "MA17", name: "A Torre", cost: 2, power: 2, desc: "Reduz o poder das cartas inimigas.", image: "../cartas/images/torre.png" },
  { id: "MA18", name: "A Estrela", cost: 2, power: 2, desc: "Compra uma carta ao final do turno.", image: "../cartas/images/estrela.png" },
  { id: "MA19", name: "A Lua", cost: 2, power: 2, desc: "Efeitos podem se repetir.", image: "../cartas/images/lua.png" },
  { id: "MA20", name: "O Sol", cost: 2, power: 3, desc: "+2 poder ao final do turno.", image: "../cartas/images/sol.png" },
  { id: "MA21", name: "O Julgamento", cost: 2, power: 3, desc: "Ativa novamente um efeito de carta.", image: "../cartas/images/julgamento.png" },
  { id: "MA22", name: "O Mundo", cost: 4, power: 6, desc: "Dobra os bônus do local.", image: "../cartas/images/mundo.png" }
];

// ----- Estado -----
const state = {
    deck: [],
    hand: [],
    discard: [],
    locations: [
        { cards: [], total: 0 },
        { cards: [], total: 0 },
        { cards: [], total: 0 }
    ],
    energy: 6,
    maxEnergy: 6,
    turn: 1
};

// DOM 
const handEl = document.getElementById('hand');
const deckCountEl = document.getElementById('deckCount');
const discardCountEl = document.getElementById('discardCount');
const energyDisplay = document.getElementById('energyDisplay');
const turnNumberEl = document.getElementById('turnNumber');

// Embaralhar 
function uidFor(card) {
    return card.id + '-' + Math.random().toString(36).slice(2, 8);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Renderizar informacao
function renderDeckInfo() {
    deckCountEl.textContent = state.deck.length;
    discardCountEl.textContent = state.discard.length;
    energyDisplay.textContent = `Energia: ${state.energy} / ${state.maxEnergy}`;
    turnNumberEl.textContent = state.turn;
}

// Inicializar Deck  
function initDeck() {
    state.deck = [];
    for (let i = 0; i < 6; i++) {
        CARD_POOL.forEach(c => state.deck.push({ ...c, uid: uidFor(c) }));
    }
    shuffle(state.deck);
    renderDeckInfo();
}

// Desenhar
function drawCard() {
    if (state.deck.length === 0) {
        alert('Deck vazio (demo).');
        return;
    }
    const card = state.deck.pop();
    state.hand.push(card);
    renderHand();
    renderDeckInfo();
}

// Criar carta no DOM 
function createCardElement(card) {
    const el = document.createElement('div');
    el.className = 'ts-card';
    el.style.backgroundImage = `url(` + card.image + `)`;
    el.draggable = true;
    el.dataset.uid = card.uid;

    // ART placeholder: if you add images later, set <img src="..."> inside .ts-card-art
    const art = document.createElement('div');
    // art.innerHTML = "<img src=" + card.image + "></img>";
    art.className = 'ts-card-art';
    // art.style.backgroundImage = `linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))`;

    const power = document.createElement('div');
    power.className = 'ts-card-power';
    power.textContent = card.power;

    const name = document.createElement('div');
    name.className = 'ts-card-name';
    name.textContent = card.name;

    const desc = document.createElement('div');
    desc.className = 'ts-card-desc';
    desc.textContent = card.desc;

    const frame = document.createElement('div');
    frame.className = 'ts-card-frame';

    el.appendChild(art);
    el.appendChild(power);
    el.appendChild(name);
    el.appendChild(desc);
    el.appendChild(frame);

    // Drag events
    el.addEventListener('dragstart', (ev) => {
        ev.dataTransfer.setData('text/plain', card.uid);
        el.classList.add('dragging');
        // small visual
        setTimeout(() => el.style.opacity = '0.6', 0);
    });
    el.addEventListener('dragend', () => {
        el.classList.remove('dragging');
        el.style.opacity = '1';
        clearDropHints();
    });

    // Double click shortcut to play to first location
    el.addEventListener('dblclick', () => {
        playCardToLocation(card.uid, 0);
    });

    return el;
}

// Render hand
function renderHand() {
    handEl.innerHTML = '';
    state.hand.forEach(card => {
        const cEl = createCardElement(card);
        // ensure hand-cards are smaller visually (they already have same class; keep sizes with CSS)
        handEl.appendChild(cEl);
    });
}

// Play card logic
function playCardToLocation(uid, locIndex) {
    const cardIndex = state.hand.findIndex(c => c.uid === uid);
    if (cardIndex === -1) return;
    const card = state.hand[cardIndex];

    if (card.cost > state.energy) {
        alert('Energia insuficiente para jogar ' + card.name);
        return;
    }

    // pay cost
    state.energy -= card.cost;

    // remove from hand and add to location
    state.hand.splice(cardIndex, 1);
    state.locations[locIndex].cards.push(card);

    // location-specific immediate effects
    if (locIndex === 2 && state.deck.length > 0) {
        // Círculo do Destino: compra 1 carta ao jogar aqui
        drawCard();
    }

    recalcTotals();
    renderHand();
    renderLocations();
    renderDeckInfo();
}

// Recalc totals
function recalcTotals() {
    state.locations.forEach((loc) => {
        let total = 0;
        loc.cards.forEach(c => total += c.power);
        loc.total = total;
    });
}

// Render locations
function renderLocations() {
    state.locations.forEach((loc, i) => {
        const container = document.getElementById('loc-' + i);
        container.innerHTML = '';
        loc.cards.forEach(card => {
            const el = createCardElement(card);
            // shrink for location visually
            el.style.width = '140px';
            el.style.height = '190px';
            el.draggable = false; // once in location, not draggable (for now)
            container.appendChild(el);
        });
        document.getElementById('total-' + i).textContent = loc.total;
    });
}

// Drag & Drop zones for .location elements
function setupDropZones() {
    const locationEls = document.querySelectorAll('.location');
    locationEls.forEach(el => {
        el.addEventListener('dragover', ev => {
            ev.preventDefault();
            el.classList.add('drop-over');
        });
        el.addEventListener('dragleave', () => el.classList.remove('drop-over'));
        el.addEventListener('drop', ev => {
            ev.preventDefault();
            el.classList.remove('drop-over');
            const uid = ev.dataTransfer.getData('text/plain');
            const locIndex = Number(el.dataset.loc);
            playCardToLocation(uid, locIndex);
        });
    });
}

function clearDropHints() {
    document.querySelectorAll('.location').forEach(el => el.classList.remove('drop-over'));
}

// Buttons
document.getElementById('drawBtn').addEventListener('click', () => drawCard());
document.getElementById('endTurnBtn').addEventListener('click', () => endTurn());

function endTurn() {
    // Casa de Marte (loc 0) effect: +1 power to each card in that location
    state.locations[0].cards.forEach(c => c.power += 1);

    // restore energy and advance turn
    state.turn += 1;
    state.energy = state.maxEnergy;

    recalcTotals();
    renderLocations();
    renderDeckInfo();
}

// Initialization
(function init() {
    initDeck();
    // initial draw
    for (let i = 0; i < 5; i++) drawCard();
    recalcTotals();
    renderLocations();
    renderHand();
    renderDeckInfo();
    setupDropZones();
})();

