const fs = require('fs');

const q = [
    {
        "question": "En quelle année l'ETML a été créée?",
        "answers": [
            { "text": "1960", "correct": false },
            { "text": "1916", "correct": true },
            { "text": "1922", "correct": false },
            { "text": "1912", "correct": false }
        ]
    },
    {
        "question": "2 + 2 * 2 = ?",
        "answers": [
            { "text": "8", "correct": false },
            { "text": "4", "correct": false },
            { "text": "6", "correct": true },
            { "text": "10", "correct": false }
        ]
    },
    {
        "question": "Quelle est la capitale de la Suisse?",
        "answers": [
            { "text": "Berne", "correct": true },
            { "text": "Zurich", "correct": false },
            { "text": "Geneve", "correct": false },
            { "text": "Lausanne", "correct": false }
        ]
    },
    {
        "question": "Quel est le langage de programmation le plus utilisé?",
        "answers": [
            { "text": "Python", "correct": true },
            { "text": "JavaScript", "correct": false },
            { "text": "HTML", "correct": false },
            { "text": "C#", "correct": false }
        ]
    },
    {
        "question": "Citez le nom de la série de livres la plus vendue du 21e siècle",
        "answers": [
            { "text": "Le Seigneur des Anneaux", "correct": false },
            { "text": "Harry Potter", "correct": true },
            { "text": "Twilight", "correct": false },
            { "text": "Le Trône de Fer", "correct": false }
        ]
    },
    {
        "question": "Quelle est la planète la plus proche du soleil?",
        "answers": [
            { "text": "Vénus", "correct": false },
            { "text": "Terre", "correct": false },
            { "text": "Mars", "correct": false },
            { "text": "Mercure", "correct": true }
        ]
    },
    {
        "question": "Qui a peint la Joconde?",
        "answers": [
            { "text": "Leonardo da Vinci", "correct": true },
            { "text": "Pablo Picasso", "correct": false },
            { "text": "Vincent van Gogh", "correct": false },
            { "text": "Michelangelo", "correct": false }
        ]
    },
    {
        "question": "Quelle est la langue la plus parlée dans le monde?",
        "answers": [
            { "text": "Anglais", "correct": false },
            { "text": "Mandarin", "correct": true },
            { "text": "Espagnol", "correct": false },
            { "text": "Hindi", "correct": false }
        ]
    },
    {
        "question": "Quel est l'élément chimique avec le symbole 'O'?",
        "answers": [
            { "text": "Or", "correct": false },
            { "text": "Osmium", "correct": false },
            { "text": "Oxygène", "correct": true },
            { "text": "Oganesson", "correct": false }
        ]
    },
    {
        "question": "Combien y-a-t il de métiers dans ETML?",
        "answers": [
            { "text": "7", "correct": true },
            { "text": "5", "correct": false },
            { "text": "8", "correct": false },
            { "text": "4", "correct": false }
        ]
    },
    {
        "question": "Quel est le plus grand océan du monde ?",
        "answers": [
            { "text": "Océan Indien", "correct": false },
            { "text": "Océan Arctique", "correct": false },
            { "text": "Océan Atlantique", "correct": false },
            { "text": "Océan Pacifique", "correct": true }
        ]
    },
    {
        "question": "Qui a écrit 'Roméo et Juliette'?",
        "answers": [
            { "text": "William Shakespeare", "correct": true },
            { "text": "Mark Twain", "correct": false },
            { "text": "Jane Austen", "correct": false },
            { "text": "Charles Dickens", "correct": false }
        ]
    },
    {
        "question": "Dans quel sport peut-on marquer un touchdown ?",
        "answers": [
            { "text": "Rugby", "correct": false },
            { "text": "Basketball", "correct": false },
            { "text": "Football Américain", "correct": true },
            { "text": "Hockey", "correct": false }
        ]
    },
    {
        "question": "Quel numéro d'urgence est valable dans toute l'Europe ?",
        "answers": [
            { "text": "911", "correct": false },
            { "text": "112", "correct": true },
            { "text": "999", "correct": false },
            { "text": "110", "correct": false }
        ]
    },
    {
        "question": "Quel est l’organe principal du système nerveux ?",
        "answers": [
            { "text": "Le cœur", "correct": false },
            { "text": "Le foie", "correct": false },
            { "text": "Les poumons", "correct": false },
            { "text": "Le cerveau", "correct": true }
        ]
    },
    {
        "question": "Combien de couleurs trouve-t-on dans un sachet normal de M&Ms ?",
        "answers": [
            { "text": "6", "correct": true },
            { "text": "4", "correct": false },
            { "text": "8", "correct": false },
            { "text": "7", "correct": false }
        ]
    },
    {
        "question": "Quel animal figure sur le logo de Porsche ?",
        "answers": [
            { "text": "Le lion", "correct": false },
            { "text": "Le tigre", "correct": false },
            { "text": "Le cheval", "correct": true },
            { "text": "Le taureau", "correct": false }
        ]
    },
    {
        "question": "Combien d'os les requins ont-ils?",
        "answers": [
            { "text": "0", "correct": true },
            { "text": "268", "correct": false },
            { "text": "68", "correct": false },
            { "text": "100", "correct": false }
        ]
    },
    {
        "question": "Quelle grande ville a mis en service la première ligne urbaine de tramway en 1832 ?",
        "answers": [
            { "text": "New-York", "correct": true },
            { "text": "Berlin", "correct": false },
            { "text": "Londres", "correct": false },
            { "text": "Vienne", "correct": false }
        ]
    },
    {
        "question": "Quelle ville a accueilli les Jeux olympiques d'hiver de 2014 ?",
        "answers": [
            { "text": "Pékin, Chine", "correct": false },
            { "text": "Paris, France", "correct": false },
            { "text": "Sotchi, Russie", "correct": true },
            { "text": "Tokyo, Japon", "correct": false }
        ]
    },
    {
        "question": "Quelle planète gazeuse est la plus volumineuse de notre Système solaire ?",
        "answers": [
            { "text": "Jupiter", "correct": true },
            { "text": "Neptune", "correct": false },
            { "text": "Uranus", "correct": false },
            { "text": "Saturne", "correct": false }
        ]
    },
    {
        "question": "Quel animal peut vivre plusieurs jours sans tête ?",
        "answers": [
            { "text": "Le canard", "correct": false },
            { "text": "La poule", "correct": false },
            { "text": "Le cafard", "correct": true },
            { "text": "La fourmi", "correct": false }
        ]
    },
    {
        "question": "Quel est l'animal le plus mortel au monde ?",
        "answers": [
            { "text": "Le serpent", "correct": false },
            { "text": "L'éléphant", "correct": false },
            { "text": "Le tigre", "correct": false },
            { "text": "Le moustique", "correct": true }
        ]
    },
    {
        "question": "Quel est l’animal national de l’Australie ?",
        "answers": [
            { "text": "Le tigre", "correct": false },
            { "text": "Le chat", "correct": false },
            { "text": "Le lion", "correct": false },
            { "text": "Le kangourou", "correct": true }
        ]
    }
];

const p = [
    { "name": "iPhone 15", "price": "999 CHF", "image": "iphone15.jpg" },
    { "name": "PS5", "price": "499 CHF", "image": "ps5.jpg" },
    { "name": "MacBook Air", "price": "1100 CHF", "image": "macbook.jpg" },
    { "name": "AirPods Pro", "price": "250 CHF", "image": "airpods.jpg" }
];

const b64Q = Buffer.from(JSON.stringify(q)).toString('base64');
const b64P = Buffer.from(JSON.stringify(p)).toString('base64');

const content = `/**
 * Liste des questions encodée par defaut (masquée).
 */
const encryptedDefaultQuestions = "${b64Q}";

// Initialisation vide des produits par defaut
const encryptedDefaultProducts = "${b64P}";

/**
 * Fonction pour encoder en base64 (UTF-8 safe)
 */
function encryptJSON(data) {
  const json = JSON.stringify(data);
  const encoder = new TextEncoder();
  const bytes = encoder.encode(json);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Fonction pour décoder du base64 (UTF-8 safe)
 */
function decryptJSON(cipher) {
  if (!cipher) return [];
  // Nettoyage des espaces et retours à la ligne
  const cleanCipher = cipher.replace(/\\s/g, '');
  if (!cleanCipher) return [];

  try {
    const binary = atob(cleanCipher);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(bytes));
  } catch (e) {
    console.error("Erreur de décryptage des données", e);
    return [];
  }
}

/**
 * Fonction pour charger les questions.
 * @returns {Array} Liste des questions
 */
function loadQuestions() {
  const storedQuestions = localStorage.getItem("quizQuestions");

  if (storedQuestions) {
    if (storedQuestions.trim().startsWith('[')) {
      try {
        const parsed = JSON.parse(storedQuestions);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) { }
    }

    const decoded = decryptJSON(storedQuestions);
    if (decoded && Array.isArray(decoded) && decoded.length > 0) return decoded;
  }

  return decryptJSON(encryptedDefaultQuestions);
}

/**
 * Fonction pour sauvegarder les questions.
 * @param {Array} questions Liste des questions à sauvegarder
 */
function saveQuestions(questions) {
  const encrypted = encryptJSON(questions);
  localStorage.setItem("quizQuestions", encrypted);
}

/**
 * Fonction pour charger les produits.
 * @returns {Array} Liste des produits
 */
function loadProducts() {
  const storedProducts = localStorage.getItem("quizProducts");

  if (storedProducts) {
    const decoded = decryptJSON(storedProducts);
    if (decoded && Array.isArray(decoded) && decoded.length > 0) return decoded;
  }

  return decryptJSON(encryptedDefaultProducts);
}

/**
 * Fonction pour sauvegarder les produits.
 * @param {Array} products Liste des produits à sauvegarder
 */
function saveProducts(products) {
  const encrypted = encryptJSON(products);
  localStorage.setItem("quizProducts", encrypted);
}
`;

fs.writeFileSync('c:/Users/herbilokone/Desktop/ob/assets/js/data.js', content);
console.log('DONE');
