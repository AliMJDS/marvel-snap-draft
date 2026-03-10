const UNTAPPED_API = 'https://snapjson.untapped.gg/v2/latest/en/cards.json';

const UNTAPPED_ART_BASE = 'https://snapjson.untapped.gg/art/render/framebreak/common/256/';

function normalizeUntappedCard(card) {
  const cardDefId = card.cardDefId || card.cid || '';
  const artUrl = cardDefId
    ? `${UNTAPPED_ART_BASE}${cardDefId}.webp`
    : card.variants?.[0]?.art || card.art || card.displayImageUrl || '';
  return {
    id: cardDefId || card.name,
    name: card.displayName || card.name,
    cost: card.cost ?? 0,
    power: card.power ?? 0,
    ability: card.description || card.ability || card.text || '',
    image: artUrl,
  };
}

let cachedCards = null;

export async function fetchAllCards() {
  if (cachedCards) return cachedCards;

  try {
    const res = await fetch(UNTAPPED_API);
    if (res.ok) {
      const data = await res.json();
      const cards = Array.isArray(data) ? data : data.results || data.cards || Object.values(data);
      const normalized = cards.map(normalizeUntappedCard).filter(c => c.name && c.cost >= 0 && c.cost <= 6);
      if (normalized.length > 0) {
        cachedCards = normalized;
        return cachedCards;
      }
    }
  } catch (e) {
    console.warn('Untapped API failed, using built-in cards...', e);
  }

  cachedCards = getBuiltInCards();
  return cachedCards;
}

function getBuiltInCards() {
  const cards = [
    { name: "Misty Knight", cost: 1, power: 2, ability: "" },
    { name: "Nightcrawler", cost: 1, power: 2, ability: "You can move this once." },
    { name: "Elektra", cost: 1, power: 2, ability: "On Reveal: Destroy a random enemy 1-Cost card at this location." },
    { name: "Iceman", cost: 1, power: 2, ability: "On Reveal: Give a random card in your opponent's hand +1 Cost." },
    { name: "Korg", cost: 1, power: 2, ability: "On Reveal: Shuffle a Rock into your opponent's deck." },
    { name: "Ant Man", cost: 1, power: 1, ability: "Ongoing: If you have 3 other cards here, +3 Power." },
    { name: "Squirrel Girl", cost: 1, power: 1, ability: "On Reveal: Add a 1-Power Squirrel to each other location." },
    { name: "Nova", cost: 1, power: 1, ability: "When this is destroyed, give your cards +1 Power." },
    { name: "Yondu", cost: 1, power: 2, ability: "On Reveal: Remove the top card of your opponent's deck." },
    { name: "Blade", cost: 1, power: 3, ability: "On Reveal: Discard a card from your hand." },
    { name: "Human Torch", cost: 1, power: 2, ability: "When this moves, double its Power." },
    { name: "Iron Fist", cost: 1, power: 2, ability: "On Reveal: Move the next card you play one location to the left." },
    { name: "Angela", cost: 2, power: 1, ability: "When you play a card here, +2 Power." },
    { name: "Armor", cost: 2, power: 3, ability: "Ongoing: Cards at this location can't be destroyed." },
    { name: "Lizard", cost: 2, power: 5, ability: "Ongoing: -3 Power if your opponent has 4 cards here." },
    { name: "Star-Lord", cost: 2, power: 2, ability: "On Reveal: If your opponent played a card here this turn, +3 Power." },
    { name: "Scarlet Witch", cost: 2, power: 3, ability: "On Reveal: Replace this location with a random new one." },
    { name: "Medusa", cost: 2, power: 2, ability: "On Reveal: If this is at the middle location, +3 Power." },
    { name: "Sentinel", cost: 2, power: 3, ability: "On Reveal: Add another Sentinel to your hand." },
    { name: "Wolverine", cost: 2, power: 2, ability: "When this is discarded or destroyed, regenerate at a random location." },
    { name: "Colossus", cost: 2, power: 3, ability: "Ongoing: Can't be destroyed, moved, or have its Power reduced." },
    { name: "Okoye", cost: 2, power: 2, ability: "On Reveal: Give every card in your deck +1 Power." },
    { name: "Mysterio", cost: 2, power: 4, ability: "As you play this, play Illusions to the other locations." },
    { name: "Killmonger", cost: 3, power: 3, ability: "On Reveal: Destroy ALL 1-Cost cards." },
    { name: "Bishop", cost: 3, power: 1, ability: "After you play a card, this gains +1 Power." },
    { name: "Mister Fantastic", cost: 3, power: 2, ability: "Ongoing: Adjacent locations have +2 Power." },
    { name: "Captain America", cost: 3, power: 3, ability: "Ongoing: Your other cards at this location have +1 Power." },
    { name: "Wolfsbane", cost: 3, power: 1, ability: "On Reveal: +2 Power for each other card you have here." },
    { name: "Ironheart", cost: 3, power: 0, ability: "On Reveal: Give 3 other friendly cards +2 Power." },
    { name: "Punisher", cost: 3, power: 2, ability: "Ongoing: +1 Power for each enemy card at this location." },
    { name: "Cosmo", cost: 3, power: 3, ability: "Ongoing: On Reveal abilities won't happen at this location." },
    { name: "Rocket Raccoon", cost: 1, power: 2, ability: "On Reveal: If your opponent played a card here this turn, +2 Power." },
    { name: "Groot", cost: 3, power: 3, ability: "On Reveal: If your opponent played a card here this turn, +3 Power." },
    { name: "Green Goblin", cost: 3, power: -3, ability: "On Reveal: Switch sides." },
    { name: "Cyclops", cost: 3, power: 4, ability: "" },
    { name: "Ka-Zar", cost: 4, power: 4, ability: "Ongoing: Your 1-Cost cards have +1 Power." },
    { name: "Jessica Jones", cost: 4, power: 5, ability: "On Reveal: If you don't play a card here next turn, +4 Power." },
    { name: "Enchantress", cost: 4, power: 4, ability: "On Reveal: Remove the abilities from all Ongoing cards at this location." },
    { name: "Namor", cost: 4, power: 5, ability: "Ongoing: +5 Power if this is your only card here." },
    { name: "White Tiger", cost: 5, power: 1, ability: "On Reveal: Add a 8-Power Tiger to another location." },
    { name: "Iron Man", cost: 5, power: 0, ability: "Ongoing: Your total Power is doubled at this location." },
    { name: "Blue Marvel", cost: 5, power: 3, ability: "Ongoing: Your other cards have +1 Power." },
    { name: "Gamora", cost: 5, power: 7, ability: "On Reveal: If your opponent played a card here this turn, +5 Power." },
    { name: "Hobgoblin", cost: 5, power: -8, ability: "On Reveal: Switch sides." },
    { name: "Devil Dinosaur", cost: 5, power: 3, ability: "Ongoing: +2 Power for each card in your hand." },
    { name: "Klaw", cost: 5, power: 4, ability: "Ongoing: The location to the right has +6 Power." },
    { name: "Spider-Woman", cost: 5, power: 7, ability: "On Reveal: Afflict all enemy cards here with -1 Power." },
    { name: "Hulk", cost: 6, power: 12, ability: "" },
    { name: "Onslaught", cost: 6, power: 7, ability: "Ongoing: Double your other Ongoing effects at this location." },
    { name: "Spectrum", cost: 6, power: 7, ability: "On Reveal: Give your Ongoing cards +2 Power." },
    { name: "Odin", cost: 6, power: 8, ability: "On Reveal: Activate the On Reveal abilities of your other cards at this location." },
    { name: "America Chavez", cost: 6, power: 9, ability: "You always draw this on turn 6." },
    { name: "Heimdall", cost: 6, power: 8, ability: "On Reveal: Move your other cards one location to the left." },
    { name: "Apocalypse", cost: 6, power: 8, ability: "When you discard this from your hand, put it back with +4 Power." },
    { name: "Doctor Doom", cost: 6, power: 5, ability: "On Reveal: Add a 5-Power DoomBot to each other location." },
    { name: "Magneto", cost: 6, power: 12, ability: "On Reveal: Move all opposing 3 and 4-Cost cards to this location." },
    { name: "Moon Girl", cost: 4, power: 4, ability: "On Reveal: Duplicate your hand." },
    { name: "Miles Morales", cost: 4, power: 5, ability: "If a card moved last turn, this costs 1." },
    { name: "Shang-Chi", cost: 4, power: 3, ability: "On Reveal: Destroy all enemy cards at this location that have 9 or more Power." },
    { name: "Absorbing Man", cost: 4, power: 3, ability: "On Reveal: If the last card you played has an On Reveal, copy its ability." },
  ];
  return cards.map((c, i) => ({
    id: `builtin-${i}`,
    name: c.name,
    cost: c.cost,
    power: c.power,
    ability: c.ability,
    image: `${UNTAPPED_ART_BASE}${c.name.replace(/[\s-]/g, '')}.webp`,
  }));
}

export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateSharedPool(allCards, poolSize = 30) {
  const shuffled = shuffleArray(allCards);
  const pool = [];
  const countMap = {};

  for (const card of shuffled) {
    const count = countMap[card.name] || 0;
    if (count < 2) {
      pool.push({ ...card, poolId: `${card.id}-pool-${pool.length}` });
      countMap[card.name] = count + 1;
    }
    if (pool.length >= poolSize) break;
  }

  // If we need more cards, reshuffle and add (allowing up to 2 dupes)
  if (pool.length < poolSize) {
    const secondPass = shuffleArray(allCards);
    for (const card of secondPass) {
      const count = countMap[card.name] || 0;
      if (count < 2) {
        pool.push({ ...card, poolId: `${card.id}-pool-${pool.length}` });
        countMap[card.name] = count + 1;
      }
      if (pool.length >= poolSize) break;
    }
  }

  return shuffleArray(pool);
}

export function generateDraftChoices(allCards, count = 3) {
  const shuffled = shuffleArray(allCards);
  return shuffled.slice(0, count);
}
