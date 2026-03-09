const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'questions.json');

// Middleware
app.use(cors());
app.use(express.json());

// Load data
function loadData() {
  if (fs.existsSync(DB_FILE)) {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  }
  return [];
}

// Save data
function saveData(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Routes
app.get('/questions', (req, res) => {
  const questions = loadData();
  res.json(questions);
});

app.get('/questions/:id', (req, res) => {
  const questions = loadData();
  const question = questions.find(q => q.id === req.params.id);
  if (question) {
    res.json(question);
  } else {
    res.status(404).json({ error: 'Question not found' });
  }
});

app.post('/questions', (req, res) => {
  const questions = loadData();
  const newQuestion = { id: uuidv4(), ...req.body };
  questions.push(newQuestion);
  saveData(questions);
  res.json(newQuestion);
});

// Seed some data
function seedData() {
  const questions = loadData();
  if (questions.length === 0) {
    const initialData = [
      {
        id: '1',
        category: 'histoire',
        question: 'Quelles sont les dates clés de la Révolution française ?',
        explanation: 'La Révolution française a commencé en 1789 avec la prise de la Bastille.',
        type: 'qcm',
        options: ['1789', '1792', '1799', '1804'],
        correct_answers: ['1789', '1792', '1799'],
        difficulty: 'medium',
        tags: ['révolution', 'france']
      },
      {
        id: '2',
        category: 'geographie',
        question: 'Quels sont les pays frontaliers de la France ?',
        explanation: 'La France partage des frontières avec plusieurs pays européens.',
        type: 'qcm',
        options: ['Espagne', 'Italie', 'Allemagne', 'Belgique', 'Suisse'],
        correct_answers: ['Espagne', 'Italie', 'Allemagne', 'Belgique', 'Suisse'],
        difficulty: 'easy',
        tags: ['frontières', 'europe']
      },
      {
        id: '3',
        category: 'culture',
        question: 'Quels sont les mouvements artistiques majeurs du 20ème siècle ?',
        explanation: 'Le surréalisme et le cubisme ont marqué l\'art moderne.',
        type: 'qcm',
        options: ['Surréalisme', 'Cubisme', 'Impressionnisme', 'Renaissance'],
        correct_answers: ['Surréalisme', 'Cubisme'],
        difficulty: 'medium',
        tags: ['art', 'moderne']
      },
      {
        id: '4',
        category: 'politique',
        question: 'Quels sont les pouvoirs du Président de la République française ?',
        explanation: 'Le Président nomme le Premier ministre et dissout l\'Assemblée.',
        type: 'qcm',
        options: ['Nommer le Premier ministre', 'Dissoudre l\'Assemblée nationale', 'Voter les lois', 'Gérer le budget'],
        correct_answers: ['Nommer le Premier ministre', 'Dissoudre l\'Assemblée nationale'],
        difficulty: 'hard',
        tags: ['président', 'pouvoirs']
      },
      {
        id: '5',
        category: 'institutions',
        question: 'Quelles institutions composent les pouvoirs exécutif en France ?',
        explanation: 'Le pouvoir exécutif comprend le Président et le Gouvernement.',
        type: 'qcm',
        options: ['Président de la République', 'Assemblée nationale', 'Sénat', 'Gouvernement'],
        correct_answers: ['Président de la République', 'Gouvernement'],
        difficulty: 'medium',
        tags: ['exécutif', 'institutions']
      },
      {
        id: '6',
        category: 'europe',
        question: 'Quels pays font partie des membres fondateurs de l\'UE ?',
        explanation: 'L\'UE a été fondée par 6 pays en 1957.',
        type: 'qcm',
        options: ['France', 'Allemagne', 'Italie', 'Belgique', 'Pays-Bas', 'Luxembourg', 'Espagne'],
        correct_answers: ['France', 'Allemagne', 'Italie', 'Belgique', 'Pays-Bas', 'Luxembourg'],
        difficulty: 'medium',
        tags: ['ue', 'fondateurs']
      },
      {
        id: '7',
        category: 'monuments',
        question: 'Quels monuments sont situés à Paris ?',
        explanation: 'La Tour Eiffel et Notre-Dame sont des symboles de Paris.',
        type: 'qcm',
        options: ['Tour Eiffel', 'Notre-Dame', 'Colisée', 'Big Ben'],
        correct_answers: ['Tour Eiffel', 'Notre-Dame'],
        difficulty: 'easy',
        tags: ['paris', 'monuments']
      },
      {
        id: '8',
        category: 'femmes',
        question: 'Quelles femmes ont marqué l\'histoire de France ?',
        explanation: 'Jeanne d\'Arc et Marie Curie sont des figures emblématiques.',
        type: 'qcm',
        options: ['Jeanne d\'Arc', 'Marie Curie', 'Cléopâtre', 'Marie-Antoinette'],
        correct_answers: ['Jeanne d\'Arc', 'Marie Curie', 'Marie-Antoinette'],
        difficulty: 'medium',
        tags: ['femmes', 'histoire']
      },
      {
        id: '9',
        category: 'devoirs',
        question: 'Quels sont les devoirs du citoyen français ?',
        explanation: 'Le citoyen doit respecter les lois et participer à la vie démocratique.',
        type: 'qcm',
        options: ['Respecter les lois', 'Payer les impôts', 'Faire son service militaire', 'Voter aux élections'],
        correct_answers: ['Respecter les lois', 'Payer les impôts', 'Voter aux élections'],
        difficulty: 'easy',
        tags: ['citoyen', 'devoirs']
      },
      {
        id: '10',
        category: 'personnel',
        question: 'Quelles informations sont nécessaires pour s\'inscrire sur les listes électorales ?',
        explanation: 'Pour voter, il faut être majeur et fournir une pièce d\'identité.',
        type: 'qcm',
        options: ['Être majeur', 'Avoir une pièce d\'identité', 'Être propriétaire', 'Avoir un diplôme'],
        correct_answers: ['Être majeur', 'Avoir une pièce d\'identité'],
        difficulty: 'easy',
        tags: ['électorales', 'inscription']
      },
      {
        id: '11',
        category: 'integration',
        question: 'Quels principes fondent la République française ?',
        explanation: 'Liberté, égalité, fraternité sont les valeurs républicaines.',
        type: 'qcm',
        options: ['Liberté', 'Égalité', 'Fraternité', 'Justice sociale'],
        correct_answers: ['Liberté', 'Égalité', 'Fraternité'],
        difficulty: 'easy',
        tags: ['république', 'valeurs']
      },
      {
        id: '12',
        category: 'histoire',
        question: 'Quels événements ont marqué la Seconde Guerre mondiale ?',
        explanation: 'Le Débarquement et la Libération sont des moments clés.',
        type: 'qcm',
        options: ['Débarquement en Normandie', 'Libération de Paris', 'Chute du mur de Berlin', 'Révolution russe'],
        correct_answers: ['Débarquement en Normandie', 'Libération de Paris'],
        difficulty: 'medium',
        tags: ['ww2', 'événements']
      },
      {
        id: '13',
        category: 'geographie',
        question: 'Quelles régions françaises sont frontalières avec l\'Espagne ?',
        explanation: 'Les Pyrénées-Orientales et les Hautes-Pyrénées bordent l\'Espagne.',
        type: 'qcm',
        options: ['Pyrénées-Orientales', 'Hautes-Pyrénées', 'Alpes-Maritimes', 'Var'],
        correct_answers: ['Pyrénées-Orientales', 'Hautes-Pyrénées'],
        difficulty: 'hard',
        tags: ['espagne', 'régions']
      },
      {
        id: '14',
        category: 'culture',
        question: 'Quels écrivains français ont remporté le prix Nobel ?',
        explanation: 'Camus et Sartre sont des lauréats célèbres.',
        type: 'qcm',
        options: ['Albert Camus', 'Jean-Paul Sartre', 'Victor Hugo', 'Gustave Flaubert'],
        correct_answers: ['Albert Camus', 'Jean-Paul Sartre'],
        difficulty: 'medium',
        tags: ['nobel', 'littérature']
      },
      {
        id: '15',
        category: 'politique',
        question: 'Quels sont les rôles du Parlement français ?',
        explanation: 'Le Parlement vote les lois et contrôle le gouvernement.',
        type: 'qcm',
        options: ['Voter les lois', 'Contrôler le gouvernement', 'Nommer le Président', 'Gérer la diplomatie'],
        correct_answers: ['Voter les lois', 'Contrôler le gouvernement'],
        difficulty: 'medium',
        tags: ['parlement', 'rôles']
      },
      {
        id: '16',
        category: 'institutions',
        question: 'Quelles cours constituent la Cour de cassation ?',
        explanation: 'La Cour de cassation comprend plusieurs chambres spécialisées.',
        type: 'qcm',
        options: ['Chambre civile', 'Chambre criminelle', 'Chambre sociale', 'Chambre commerciale'],
        correct_answers: ['Chambre civile', 'Chambre criminelle', 'Chambre sociale', 'Chambre commerciale'],
        difficulty: 'hard',
        tags: ['cassation', 'cours']
      },
      {
        id: '17',
        category: 'europe',
        question: 'Quels traités ont fondé l\'Union européenne ?',
        explanation: 'Les traités de Rome et de Maastricht sont fondateurs.',
        type: 'qcm',
        options: ['Traité de Rome', 'Traité de Maastricht', 'Traité de Versailles', 'Traité de Lisbonne'],
        correct_answers: ['Traité de Rome', 'Traité de Maastricht'],
        difficulty: 'hard',
        tags: ['traités', 'ue']
      },
      {
        id: '18',
        category: 'monuments',
        question: 'Quels châteaux sont classés au patrimoine mondial ?',
        explanation: 'Versailles et Chambord sont inscrits à l\'UNESCO.',
        type: 'qcm',
        options: ['Château de Versailles', 'Château de Chambord', 'Château de Chenonceau', 'Château de Blois'],
        correct_answers: ['Château de Versailles', 'Château de Chambord'],
        difficulty: 'medium',
        tags: ['châteaux', 'patrimoine']
      },
      {
        id: '19',
        category: 'femmes',
        question: 'Quelles femmes ont été présidentes du Conseil constitutionnel ?',
        explanation: 'Valérie Giscard d\'Estaing et Jacqueline Gourault ont occupé ce poste.',
        type: 'qcm',
        options: ['Valérie Giscard d\'Estaing', 'Jacqueline Gourault', 'Simone Veil', 'Édith Cresson'],
        correct_answers: ['Valérie Giscard d\'Estaing', 'Jacqueline Gourault'],
        difficulty: 'hard',
        tags: ['constitutionnel', 'femmes']
      },
      {
        id: '20',
        category: 'devoirs',
        question: 'Quels droits accompagnent les devoirs du citoyen ?',
        explanation: 'Le droit de vote et la liberté d\'expression sont fondamentaux.',
        type: 'qcm',
        options: ['Droit de vote', 'Liberté d\'expression', 'Droit à la propriété', 'Droit au travail'],
        correct_answers: ['Droit de vote', 'Liberté d\'expression'],
        difficulty: 'easy',
        tags: ['droits', 'citoyen']
      }
    ];
    saveData(initialData);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  seedData();
});