const titleFirstWord = ["The", "One", "A", "The First", "The Last", "The Forgotten", "The Great", "Eternal", "Mystic", "Legendary", "Ancient", "Celestial", "Lost", "Majestic", "Enigmatic", "Fabled", "Epic", "Mythical", "Divine", "Heroic", "Infinite", "Radiant", "Unseen", "Cosmic", "Immortal", "Sacred", "Golden", "Starlit", "Whispering"];
const titleSecondWord = ["Secret", "Oath", "Word", "Tower", "Mist", "Shadow", "Dragon", "Hunt", "Crown", "Fire", "Path", "Memory", "Gathering", "Knife", "Sword", "Crossroads", "Echo", "Whisper", "Echoes", "Fate", "Quest", "Saga", "Chronicle", "Legacy", "Oracle", "Legion", "Dreamer", "Savior", "Sorcerer", "Guardian", "Titan", "Harbinger", "Champion", "Specter", "Phoenix", "MPP"];
const titleThirdWord = ["of", "in", "beneath", "beyond", "across", "through", "within", "amidst", "among", "inside", "surrounding", "beside", "along", "atop", "into", "throughout", "towards", "beneath the", "beyond the", "into the", "within the", "across the", "amidst the", "amidst a", "among the", "along the", "beside the", "towards the", "in the", "within a", "beneath a", "above the"];
const titleFourthWord = ["Chaos", "the World", "the Heart", "the Horn", "Midnight", "Midday", "Summer", "Heaven", "Storm", "Lords", "Magic", "Dreams", "Twilight", "Dawn", "Eternity", "Legends", "Destiny", "Fury", "Mysteries", "Conquest", "Whispers", "Reckoning", "Empire", "Infinity", "Adventures", "Horizon", "Prophecy", "Wisdom", "Legacy", "Fortune", "Ascension", "Illusions", "Whispers", "Glory", "Serenity", "Empyrean", "Infinity", "Crescent", "Pulse", "Luminance", "Harmony", "Enchantment", "Eclipse", "MPP"];


const chaptersFirstWord = ["Dragons", "The Way", "Walking", "Traveling", "The Path", "MPP", "Winds", "Journey", "Adventure", "Discovery", "Pathways", "Steps", "Wanderings", "Expeditions", "Voyage", "Odyssey", "March", "Trek", "Roaming", "Peregrination", "Excursion", "Stroll", "Promenade", "Wanderlust", "Trail", "Track", "Route", "Jaunt", "Ramble", "Sojourn", "Exploration", "Hike", "Saunter", "Navigation", "Meander"];
const chaptersSecondWord = ["and", "of"];
const chaptersThirdWord = ["Kings", "MPP", "Truth", "Legends", "Myth", "History", "Destiny", "Mystery", "Adventure", "Fantasy", "Reality", "Discovery", "Journey", "Voyage", "Quest", "Dreams", "Wonders", "Wandering", "Exploration", "Expedition", "Experience", "Journeying", "Trip", "Travel", "Exploring", "Search", "Pursuit", "Adventure", "Mission", "Conquest", "Excursion", "Trek", "Odyssey", "Voyaging", "Roaming", "Venture", "Passage", "Campaign", "Safari", "Jaunt", "Stroll", "Promenade", "Trail", "Wander", "Saunter", "March", "Hike"];



const cosmerePlanets = [
    
    "Canticle",
    "Elegy",
    "Fifth of the Sun",
    "First of the Sun",
    "Fourth of the Sun",
    "Komashi",
    "Ky",
    "Lumar",
    "Nalthis",
    "Roshar",
    "Scadrial",
    "Sel",
    "Sixth of the Sun",
    "Taldain",
    "Threnody",
    "UTol",
    "Yolen",
];

const cosmereShards = [
    "Devotion",
    "Dominion",
    "Preservation",
    "Ruin",
    "Odium",
    "Cultivation",
    "Honor",
    "Endowment",
    "Autonomy",
    "Ambition",
    "Invention",
    "Mercy",
    "Valor",
    "Whimsy",
    "Virtuosity"
];

const cosmereSystems = [
    "Nalthian System",
    "Rosharan System",
    "Scadrian System",
    "Selish System",
    "Taldain System",
    "Drominad System",
    "Threnodite System",
    "UTol System",
    "Unknown System",
];

const descriptions = [
    "This is a generated book: A gripping tale of political intrigue and magical warfare set on the planet Roshar.",
    "This is a generated book: An epic journey through the mysterious realms of the Cognitive and Spiritual Realms.",
    "This is a generated book: A thrilling adventure across the Shardworlds, where gods vie for power and mortal lives hang in the balance.",
    "This is a generated book: A heart-pounding saga of survival and betrayal in the unforgiving landscapes of Scadrial.",
    "This is a generated book: A captivating narrative of love and sacrifice amidst the turmoil of a world ruled by divine beings.",
    "This is a generated book: A mesmerizing tale of forbidden magic and ancient prophecies on the planet Sel.",
    "This is a generated book: A riveting exploration of the Cosmere's mysteries, from the depths of the Spiritual Realm to the heights of the Cognitive Realm.",
    "This is a generated book: An enchanting adventure through the vibrant streets of Nalthis, where every Breath holds power.",
    "This is a generated book: A spellbinding journey to the heart of the Cosmere, where gods and mortals collide in a battle for existence.",
    "This is a generated book: A captivating odyssey through the shards of shattered worlds, where heroes rise and fall in the face of cosmic forces.",
    "This is a generated book: A breathtaking saga of courage and destiny in a universe governed by the whims of powerful entities.",
    "This is a generated book: An exhilarating expedition to the far reaches of the Cosmere, where secrets lie buried beneath layers of time and space.",
    "This is a generated book: A gripping narrative of hope and despair in a world where the line between gods and men is blurred.",
    "This is a generated book: A mesmerizing tale of magic and mystery, where the boundaries of reality are tested and the fate of worlds hangs in the balance.",
    "This is a generated book: An epic quest to unlock the secrets of the Cosmere, where every revelation brings new dangers and unforeseen consequences."
];
const getRandomElement = (wordList: string[]): string => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
};

export function generateRandomTitle(): string {
    const firstWord = getRandomElement(titleFirstWord);
    const secondWord = getRandomElement(titleSecondWord);
    const thirdWord = getRandomElement(titleThirdWord);
    const fourthWord = getRandomElement(titleFourthWord);
    return `${firstWord} ${secondWord} ${thirdWord} ${fourthWord}`;
}

export function generateRandomChapter(): string {
    const firstWord = getRandomElement(chaptersFirstWord);
    const secondWord = getRandomElement(chaptersSecondWord);
    const thirdWord = getRandomElement(chaptersThirdWord);
    return `${firstWord} ${secondWord} ${thirdWord}`;
}

export function generateRandomDescription(): string {
    const description = getRandomElement(descriptions)
    return `${description}`
}

export function generateRandomPlanet(): string {
    const planet = getRandomElement(cosmerePlanets)
    return `${planet}`
}

export function generateRandomSystem(): string {
    const system = getRandomElement(cosmereSystems)
    return `${system}`
}

export function generateRandomShard(): string {
    const shard = getRandomElement(cosmereShards)
    return `${shard}`
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomDate(): number {
    return getRandomInt(2010, 2023);
}
