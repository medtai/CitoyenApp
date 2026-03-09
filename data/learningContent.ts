import { Category } from './questions';

export interface KeyFact {
  label: string;
  value: string;
}

export interface SchemaItem {
  title: string;
  items: string[];
}

export interface ContentSection {
  title: string;
  body: string;
}

export interface LearningTopic {
  category: Category;
  title: string;
  icon: string;
  introduction: string;
  sections: ContentSection[];
  keyFacts: KeyFact[];
  schema: SchemaItem[];
  example: string;
  summary: string;
}

export const learningContent: LearningTopic[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. GEOGRAPHIE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    category: 'geographie',
    title: 'Geographie de la France',
    icon: '🗺️',
    introduction:
      'La France est le plus grand pays de l\'Union europeenne par sa superficie. Situee a l\'ouest de l\'Europe, elle possede aussi des territoires outre-mer sur tous les continents. Connaitre la geographie de la France est essentiel pour comprendre son organisation et sa diversite.',

    sections: [
      {
        title: 'Le territoire francais',
        body: 'La France metropolitaine couvre environ 551 000 km² et a la forme d\'un hexagone, c\'est pourquoi on l\'appelle souvent « l\'Hexagone ». Elle est bordee par la mer du Nord, la Manche, l\'ocean Atlantique et la mer Mediterranee. Avec ses territoires d\'outre-mer, la France est presente sur tous les continents et possede le deuxieme plus grand domaine maritime au monde.',
      },
      {
        title: 'Les frontieres',
        body: 'La France metropolitaine partage ses frontieres terrestres avec 8 pays : la Belgique et le Luxembourg au nord, l\'Allemagne et la Suisse a l\'est, l\'Italie et Monaco au sud-est, l\'Espagne et Andorre au sud-ouest. Cette position centrale en Europe a fait de la France un carrefour historique entre le nord et le sud du continent.',
      },
      {
        title: 'Les grandes villes',
        body: 'Paris, la capitale, est la plus grande ville avec environ 2,1 millions d\'habitants (12 millions en Ile-de-France). Marseille est la deuxieme ville (870 000 hab.), suivie de Lyon (530 000 hab.), Toulouse, Nice et Nantes. Chaque grande ville a une identite culturelle et economique propre.',
      },
      {
        title: 'Le relief et les fleuves',
        body: 'Le relief francais est varie : des plaines au nord (Bassin parisien), des montagnes au sud et a l\'est (Alpes, Pyrenees, Massif central, Vosges, Jura). Le point culminant est le Mont Blanc (4 808 m) dans les Alpes. Les cinq grands fleuves sont : la Loire (le plus long, 1 006 km), la Seine (qui traverse Paris), le Rhone, la Garonne et le Rhin (frontiere avec l\'Allemagne).',
      },
      {
        title: 'L\'organisation administrative',
        body: 'La France est organisee en trois niveaux de collectivites territoriales : les communes (environ 35 000, la plus petite division), les departements (101 au total, dont 96 en metropole et 5 outre-mer) et les regions (18, dont 13 en metropole depuis la reforme de 2016). Chaque niveau a ses competences propres.',
      },
      {
        title: 'L\'outre-mer',
        body: 'La France possede 12 territoires d\'outre-mer repartis sur tous les oceans. Les 5 departements et regions d\'outre-mer (DROM) sont : la Guadeloupe, la Martinique, la Guyane, La Reunion et Mayotte. Il existe aussi des collectivites d\'outre-mer (COM) comme la Polynesie francaise, la Nouvelle-Caledonie et Saint-Martin. Ces territoires donnent a la France une presence mondiale.',
      },
    ],

    keyFacts: [
      { label: 'Superficie metropole', value: '551 000 km²' },
      { label: 'Capitale', value: 'Paris' },
      { label: 'Nombre de regions metropolitaines', value: '13 (depuis 2016)' },
      { label: 'Nombre de departements (total)', value: '101 (96 metropole + 5 outre-mer)' },
      { label: 'Nombre de communes', value: 'Environ 35 000' },
      { label: 'Point culminant', value: 'Mont Blanc (4 808 m)' },
      { label: 'Plus long fleuve', value: 'La Loire (1 006 km)' },
      { label: 'Pays frontaliers', value: '8 pays' },
    ],

    schema: [
      {
        title: 'Les 3 niveaux de collectivites territoriales',
        items: [
          'Communes (~35 000) — administrees par le maire et le conseil municipal',
          'Departements (101) — diriges par le conseil departemental',
          'Regions (18) — dirigees par le conseil regional',
        ],
      },
      {
        title: 'Les 5 grands fleuves',
        items: [
          'La Loire (1 006 km) — se jette dans l\'Atlantique',
          'La Seine (775 km) — traverse Paris, se jette dans la Manche',
          'Le Rhone (812 km en France) — se jette dans la Mediterranee',
          'La Garonne (575 km) — se jette dans l\'Atlantique a Bordeaux',
          'Le Rhin (190 km en France) — frontiere avec l\'Allemagne',
        ],
      },
      {
        title: 'Les 8 pays frontaliers',
        items: [
          'Nord : Belgique, Luxembourg',
          'Est : Allemagne, Suisse',
          'Sud-Est : Italie, Monaco',
          'Sud-Ouest : Espagne, Andorre',
        ],
      },
    ],

    example:
      'Quand vous vous rendez dans une mairie pour une demarche administrative, vous etes dans une commune. Votre commune appartient a un departement (par exemple Paris = departement 75), qui fait lui-meme partie d\'une region (Ile-de-France). Cette organisation en trois niveaux permet de gerer les affaires locales au plus pres des citoyens.',

    summary:
      'La France est un grand pays europeen organise en communes, departements et regions. Elle partage ses frontieres avec 8 pays, possede des territoires sur tous les continents et presente un relief varie, des plaines du nord aux montagnes des Alpes et des Pyrenees.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. HISTOIRE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    category: 'histoire',
    title: 'Histoire de France',
    icon: '📜',
    introduction:
      'L\'histoire de France est riche et s\'etend sur plus de deux millenaires. Des rois aux revolutions, chaque epoque a contribue a construire les valeurs et les institutions de la France d\'aujourd\'hui. Comprendre cette histoire aide a saisir les fondements de la Republique.',

    sections: [
      {
        title: 'La monarchie et les grands rois',
        body: 'La France a ete gouvernee par des rois pendant des siecles. Parmi les plus importants : Charlemagne (roi des Francs, couronne empereur en 800), Henri IV (qui mit fin aux guerres de religion avec l\'Edit de Nantes en 1598) et Louis XIV, le « Roi-Soleil » (1638-1715), qui regna 72 ans — le plus long regne de l\'histoire de France. Il fit construire le chateau de Versailles et incarna la monarchie absolue.',
      },
      {
        title: 'La Revolution francaise (1789)',
        body: 'La Revolution francaise est l\'evenement fondateur de la Republique. Elle debute le 5 mai 1789 avec la convocation des Etats generaux et culmine avec la prise de la Bastille le 14 juillet 1789. Le 26 aout 1789, la Declaration des Droits de l\'Homme et du Citoyen est adoptee, proclamant la liberte, l\'egalite et la souverainete du peuple. Le roi Louis XVI est guillotine le 21 janvier 1793. La Revolution se termine le 9 novembre 1799 avec le coup d\'Etat de Napoleon Bonaparte.',
      },
      {
        title: 'Napoleon et le XIXe siecle',
        body: 'Napoleon Bonaparte (1769-1821) devint empereur en 1804 et promulgua le Code civil (Code Napoleon), qui unifia les lois francaises et reste la base du droit francais actuel. En 1848, l\'esclavage fut definitivement aboli a l\'initiative de Victor Schoelcher. Le XIXe siecle vit alterner empires, monarchies et republiques jusqu\'a l\'installation durable de la IIIe Republique en 1870.',
      },
      {
        title: 'Les guerres mondiales',
        body: 'La Premiere Guerre mondiale (1914-1918) opposa la France et ses allies aux empires centraux. L\'Armistice fut signe le 11 novembre 1918. La Seconde Guerre mondiale (1939-1945) vit la France occupee par l\'Allemagne nazie a partir de 1940. Le general de Gaulle lanca l\'Appel du 18 juin 1940 depuis Londres pour appeler a la resistance. Jean Moulin unifia les mouvements de resistance. Le debarquement en Normandie le 6 juin 1944 (Jour J) marqua le debut de la liberation. La guerre se termina le 8 mai 1945 en Europe.',
      },
      {
        title: 'La Ve Republique',
        body: 'Le general Charles de Gaulle fonda la Ve Republique le 4 octobre 1958. La nouvelle Constitution instaura un regime semi-presidentiel avec un president aux pouvoirs renforces. De Gaulle en fut le premier president. Ce regime est toujours en vigueur aujourd\'hui. La France a connu 5 Republiques : Ire (1792), IIe (1848), IIIe (1870), IVe (1946) et Ve (1958).',
      },
      {
        title: 'Les grandes lois de la Republique',
        body: 'Plusieurs lois ont marque l\'histoire republicaine : la loi Jules Ferry rendant l\'ecole obligatoire, gratuite et laique (1881-1882), la loi de separation des Eglises et de l\'Etat du 9 decembre 1905 (fondement de la laicite), l\'ordonnance du 21 avril 1944 accordant le droit de vote aux femmes, et la loi Simone Veil legalisant l\'IVG en 1975.',
      },
    ],

    keyFacts: [
      { label: 'Prise de la Bastille', value: '14 juillet 1789' },
      { label: 'Declaration des Droits de l\'Homme', value: '26 aout 1789' },
      { label: 'Code civil (Napoleon)', value: '1804' },
      { label: 'Abolition de l\'esclavage', value: '27 avril 1848' },
      { label: 'Ecole obligatoire (Jules Ferry)', value: '28 mars 1882' },
      { label: 'Separation Eglise/Etat', value: '9 decembre 1905' },
      { label: 'Fin de la 1ere Guerre mondiale', value: '11 novembre 1918' },
      { label: 'Droit de vote des femmes', value: '21 avril 1944' },
      { label: 'Debarquement en Normandie', value: '6 juin 1944' },
      { label: 'Fin de la 2nde Guerre mondiale (Europe)', value: '8 mai 1945' },
      { label: 'Fondation de la Ve Republique', value: '4 octobre 1958' },
    ],

    schema: [
      {
        title: 'Les 5 Republiques francaises',
        items: [
          'Ire Republique (1792-1804) — apres la Revolution',
          'IIe Republique (1848-1852) — abolition de l\'esclavage',
          'IIIe Republique (1870-1940) — la plus longue (70 ans)',
          'IVe Republique (1946-1958) — apres la Liberation',
          'Ve Republique (1958-aujourd\'hui) — fondee par de Gaulle',
        ],
      },
      {
        title: 'Les grandes periodes',
        items: [
          'Monarchie — des Francs a 1789',
          'Revolution francaise — 1789 a 1799',
          'Consulat et Empire (Napoleon) — 1799 a 1815',
          'XIXe siecle instable — alternance monarchies/republiques',
          'IIIe Republique — 1870 a 1940',
          'Guerres mondiales — 1914-1918 et 1939-1945',
          'Ve Republique — depuis 1958',
        ],
      },
    ],

    example:
      'Chaque 14 juillet, les Francais celebrent la Fete nationale en souvenir de la prise de la Bastille en 1789. Un grand defile militaire a lieu sur les Champs-Elysees a Paris, et des feux d\'artifice sont tires dans toutes les villes de France. Le 11 novembre et le 8 mai sont aussi des jours feries qui commemorent la fin des deux guerres mondiales.',

    summary:
      'L\'histoire de France va de la monarchie a la Republique. Les evenements cles sont la Revolution de 1789, le Code Napoleon (1804), les deux guerres mondiales et la fondation de la Ve Republique en 1958. Ces etapes ont forge les valeurs republicaines : liberte, egalite, fraternite.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. CULTURE GENERALE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    category: 'culture',
    title: 'Culture generale',
    icon: '🎨',
    introduction:
      'La culture francaise est reconnue dans le monde entier pour sa richesse litteraire, artistique et gastronomique. Connaitre les grands reperes culturels de la France fait partie de l\'integration dans la societe francaise.',

    sections: [
      {
        title: 'La langue francaise',
        body: 'Le francais est la langue officielle de la France (article 2 de la Constitution). Il est parle par environ 300 millions de personnes dans le monde, dans plus de 70 pays sur les 5 continents. C\'est la 5e langue la plus parlee au monde. La francophonie designe l\'ensemble des pays et communautes qui partagent l\'usage du francais.',
      },
      {
        title: 'Les Lumieres et la litterature',
        body: 'Le mouvement des Lumieres (XVIIIe siecle) a profondement influence la France et le monde. Voltaire defendit la tolerance et la liberte d\'expression. Montesquieu theorisa la separation des pouvoirs. Rousseau developpa l\'idee du contrat social. Diderot crea l\'Encyclopedie. Ces idees ont inspire directement la Revolution francaise et la Declaration des Droits de l\'Homme. Parmi les grands ecrivains : Victor Hugo, Alexandre Dumas, Moliere, Emile Zola.',
      },
      {
        title: 'La gastronomie',
        body: 'La gastronomie francaise est inscrite au patrimoine immateriel de l\'UNESCO depuis 2010. Chaque region a ses specialites : le boeuf bourguignon (Bourgogne), la bouillabaisse (Marseille), la quiche lorraine (Lorraine), la galette bretonne (Bretagne), le cassoulet (Toulouse). Le repas gastronomique francais est un rituel social important qui rassemble famille et amis.',
      },
      {
        title: 'L\'education et l\'ecole',
        body: 'L\'ecole est obligatoire en France pour les enfants de 3 a 16 ans. L\'ecole publique est gratuite et laique. Jules Ferry rendit l\'ecole obligatoire et gratuite en 1881-1882. Le systeme educatif comprend : l\'ecole maternelle (3-6 ans), l\'ecole elementaire (6-11 ans), le college (11-15 ans), le lycee (15-18 ans) et l\'enseignement superieur (universites, grandes ecoles).',
      },
      {
        title: 'La fete nationale et les jours feries',
        body: 'La fete nationale est le 14 juillet (prise de la Bastille). La France compte 11 jours feries : 1er janvier (Jour de l\'An), lundi de Paques, 1er mai (Fete du Travail), 8 mai (Victoire 1945), Ascension, lundi de Pentecote, 14 juillet (Fete nationale), 15 aout (Assomption), 1er novembre (Toussaint), 11 novembre (Armistice 1918), 25 decembre (Noel).',
      },
      {
        title: 'Le droit de vote des femmes',
        body: 'Les femmes ont obtenu le droit de vote le 21 avril 1944, par ordonnance du Gouvernement provisoire du General de Gaulle. Elles ont vote pour la premiere fois aux elections municipales en avril-mai 1945. Ce droit a marque une avancee majeure vers l\'egalite entre les femmes et les hommes en France.',
      },
    ],

    keyFacts: [
      { label: 'Langue officielle', value: 'Le francais' },
      { label: 'Locuteurs dans le monde', value: 'Environ 300 millions' },
      { label: 'Ecole obligatoire', value: 'De 3 a 16 ans' },
      { label: 'Ecole gratuite et obligatoire depuis', value: '1882 (loi Jules Ferry)' },
      { label: 'Fete nationale', value: '14 juillet' },
      { label: 'Droit de vote des femmes', value: '21 avril 1944' },
      { label: 'Gastronomie UNESCO', value: 'Inscrite depuis 2010' },
    ],

    schema: [
      {
        title: 'Les philosophes des Lumieres',
        items: [
          'Voltaire — tolerance, liberte d\'expression',
          'Montesquieu — separation des pouvoirs',
          'Rousseau — contrat social',
          'Diderot — Encyclopedie',
        ],
      },
      {
        title: 'Le systeme scolaire francais',
        items: [
          'Ecole maternelle : 3-6 ans',
          'Ecole elementaire : 6-11 ans',
          'College : 11-15 ans',
          'Lycee : 15-18 ans',
          'Enseignement superieur : universites, grandes ecoles',
        ],
      },
    ],

    example:
      'Quand vous inscrivez votre enfant a l\'ecole publique en France, l\'inscription est gratuite car l\'ecole est un service public finance par l\'impot. La laicite s\'applique : aucun signe religieux ostentatoire n\'est autorise dans les ecoles publiques (loi du 15 mars 2004). C\'est l\'heritage direct de Jules Ferry et de la loi de 1905.',

    summary:
      'La culture francaise repose sur la langue, les Lumieres, la gastronomie et un systeme educatif gratuit et laique. Les philosophes des Lumieres ont inspire les valeurs republicaines. L\'ecole est obligatoire de 3 a 16 ans, et le francais est parle par 300 millions de personnes dans le monde.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. MONUMENTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    category: 'monuments',
    title: 'Monuments de France',
    icon: '🏛️',
    introduction:
      'La France possede un patrimoine architectural exceptionnel, temoin de son histoire millenaire. Des chateaux royaux aux monuments republicains, chaque edifice raconte une page de l\'histoire francaise.',

    sections: [
      {
        title: 'La Tour Eiffel',
        body: 'La Tour Eiffel est le symbole le plus celebre de la France. Elle fut construite par l\'ingenieur Gustave Eiffel pour l\'Exposition Universelle de Paris de 1889, qui commemorait le centenaire de la Revolution francaise. Haute de 330 metres, elle devait etre temporaire mais est devenue le monument le plus visite au monde (environ 7 millions de visiteurs par an). Initialement critiquee par les artistes, elle est aujourd\'hui le symbole mondial de Paris.',
      },
      {
        title: 'Le Chateau de Versailles',
        body: 'Le Chateau de Versailles fut construit sur ordre de Louis XIV, qui en fit la residence officielle de la cour royale a partir de 1682. Les architectes Le Vau et Hardouin-Mansart et le jardinier Le Notre lui donnerent sa magnificence. La galerie des Glaces est la piece la plus celebre. Versailles symbolise la puissance de la monarchie absolue. Il est classe au patrimoine mondial de l\'UNESCO.',
      },
      {
        title: 'L\'Arc de Triomphe',
        body: 'L\'Arc de Triomphe fut commande par Napoleon Ier en 1806 pour celebrer ses victoires militaires. Situe en haut de l\'avenue des Champs-Elysees a Paris, il fut inaugure en 1836. Depuis 1920, il abrite la tombe du Soldat Inconnu, dont la flamme est ravivee chaque soir en hommage aux soldats morts pour la France.',
      },
      {
        title: 'Le Pantheon',
        body: 'Le Pantheon, situe dans le Quartier latin a Paris, est un monument dedie aux grands personnages de la nation. Y reposent Victor Hugo, Emile Zola, Jean Moulin, Marie Curie, Simone Veil et d\'autres figures qui ont marque l\'histoire de France. L\'inscription sur le fronton dit : « Aux grands hommes, la patrie reconnaissante ».',
      },
      {
        title: 'Les cathedrales et lieux religieux',
        body: 'La France possede de nombreuses cathedrales remarquables. Notre-Dame de Paris (commencee en 1163) est un chef-d\'oeuvre de l\'architecture gothique. Le Mont-Saint-Michel en Normandie est l\'un des sites les plus visites de France. La cathedrale de Reims etait le lieu de sacre des rois de France. Ces monuments temoignent de l\'heritage religieux et architectural du pays.',
      },
      {
        title: 'Les lieux de la Republique',
        body: 'Certains batiments sont directement lies aux institutions republicaines : le Palais de l\'Elysee (residence du President), le Palais Bourbon (Assemblee nationale), le Palais du Luxembourg (Senat) et l\'Hotel Matignon (bureaux du Premier ministre). Ces lieux symbolisent le pouvoir democratique de la France.',
      },
    ],

    keyFacts: [
      { label: 'Tour Eiffel', value: '1889 — Gustave Eiffel — 330 m' },
      { label: 'Chateau de Versailles', value: 'Louis XIV — 1682' },
      { label: 'Arc de Triomphe', value: 'Napoleon Ier — 1806' },
      { label: 'Pantheon', value: 'Grands personnages de la nation' },
      { label: 'Notre-Dame de Paris', value: 'Cathedrale gothique — 1163' },
      { label: 'Palais de l\'Elysee', value: 'Residence du President' },
      { label: 'Palais Bourbon', value: 'Assemblee nationale' },
      { label: 'Hotel Matignon', value: 'Bureaux du Premier ministre' },
    ],

    schema: [
      {
        title: 'Monuments et leurs commanditaires',
        items: [
          'Chateau de Versailles — Louis XIV (le Roi-Soleil)',
          'Arc de Triomphe — Napoleon Ier (victoires militaires)',
          'Tour Eiffel — Gustave Eiffel (Exposition 1889)',
        ],
      },
      {
        title: 'Les batiments du pouvoir',
        items: [
          'Palais de l\'Elysee — President de la Republique',
          'Hotel Matignon — Premier ministre',
          'Palais Bourbon — Assemblee nationale',
          'Palais du Luxembourg — Senat',
        ],
      },
    ],

    example:
      'Lorsque vous visitez le Pantheon a Paris, vous pouvez voir les tombeaux de grandes figures francaises comme Simone Veil (entree en 2018), qui fit voter la loi sur l\'IVG en 1975, ou Marie Curie, premiere femme a recevoir un prix Nobel, et double laureate. Ces personnalites incarnent les valeurs d\'engagement et de merite qui fondent la Republique.',

    summary:
      'La France possede des monuments emblematiques : la Tour Eiffel (1889), le Chateau de Versailles (Louis XIV), l\'Arc de Triomphe (Napoleon) et le Pantheon. Les batiments du pouvoir — Elysee, Matignon, Palais Bourbon, Luxembourg — abritent les institutions de la Republique.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. ORGANISATION POLITIQUE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    category: 'politique',
    title: 'Organisation politique',
    icon: '🏛️',
    introduction:
      'La France est une Republique democratique fondee sur des valeurs, des symboles et des principes inscrits dans la Constitution. Comprendre l\'organisation politique est essentiel pour tout futur citoyen francais.',

    sections: [
      {
        title: 'La devise et les valeurs',
        body: 'La devise de la Republique francaise est « Liberte, Egalite, Fraternite ». Ces trois valeurs sont inscrites dans la Constitution et figurent sur les frontons de tous les batiments publics. La Liberte permet a chacun de faire ce qui ne nuit pas a autrui. L\'Egalite signifie que la loi est la meme pour tous. La Fraternite appelle a la solidarite entre citoyens.',
      },
      {
        title: 'Les symboles de la Republique',
        body: 'La France possede plusieurs symboles officiels : le drapeau tricolore bleu, blanc, rouge (adopte pendant la Revolution) ; la Marseillaise (hymne national, ecrit par Rouget de Lisle en 1792) ; Marianne (figure feminine coiffee d\'un bonnet phrygien, symbole de la Republique, presente dans toutes les mairies) ; la devise « Liberte, Egalite, Fraternite » ; et le 14 juillet, jour de la Fete nationale.',
      },
      {
        title: 'La laicite',
        body: 'La laicite est un principe fondamental de la Republique, fonde sur la loi du 9 decembre 1905. Elle signifie la separation de l\'Etat et des religions : l\'Etat ne reconnait, ne salarie ni ne subventionne aucun culte. Elle garantit la liberte de croire ou de ne pas croire. En 2004, une loi a interdit le port de signes religieux ostentatoires dans les ecoles publiques. L\'article 1er de la Constitution definit la France comme « une Republique indivisible, laique, democratique et sociale ».',
      },
      {
        title: 'Le President de la Republique',
        body: 'Le President de la Republique est le chef de l\'Etat. Il est elu au suffrage universel direct pour 5 ans (quinquennat), renouvelable une fois. Il reside au Palais de l\'Elysee. Ses roles : garant de la Constitution, chef des armees, representant de la France a l\'international. Il nomme le Premier ministre et peut dissoudre l\'Assemblee nationale. En cas de crise grave, l\'article 16 lui confere des pouvoirs exceptionnels temporaires.',
      },
      {
        title: 'Le Premier ministre et le gouvernement',
        body: 'Le Premier ministre est nomme par le President de la Republique. Il dirige l\'action du gouvernement depuis l\'Hotel Matignon. Il coordonne le travail des ministres et est responsable devant l\'Assemblee nationale, qui peut le renverser par une motion de censure. Le gouvernement applique les lois et conduit la politique de la nation.',
      },
      {
        title: 'L\'egalite entre les femmes et les hommes',
        body: 'L\'egalite entre les femmes et les hommes est une valeur fondamentale de la Republique. Elle est inscrite dans la Constitution. Le respect de ce principe est une condition pour obtenir la nationalite francaise. La France a progressivement renforce cette egalite : droit de vote des femmes (1944), egalite dans le mariage, lois sur la parite en politique, lutte contre les discriminations.',
      },
    ],

    keyFacts: [
      { label: 'Devise', value: 'Liberte, Egalite, Fraternite' },
      { label: 'Hymne', value: 'La Marseillaise (1792)' },
      { label: 'Symbole feminin', value: 'Marianne' },
      { label: 'Drapeau', value: 'Bleu, blanc, rouge (3 bandes verticales)' },
      { label: 'Fete nationale', value: '14 juillet' },
      { label: 'Regime politique', value: 'Republique semi-presidentielle' },
      { label: 'Mandat presidentiel', value: '5 ans (quinquennat)' },
      { label: 'Loi de laicite', value: '9 decembre 1905' },
      { label: 'Residence du President', value: 'Palais de l\'Elysee' },
    ],

    schema: [
      {
        title: 'Les symboles officiels de la Republique',
        items: [
          'Drapeau tricolore : bleu, blanc, rouge',
          'Hymne : La Marseillaise',
          'Figure feminine : Marianne',
          'Devise : Liberte, Egalite, Fraternite',
          'Fete nationale : 14 juillet',
        ],
      },
      {
        title: 'Le pouvoir executif',
        items: [
          'President de la Republique — chef de l\'Etat, elu pour 5 ans',
          'Premier ministre — dirige le gouvernement, nomme par le President',
          'Ministres — chacun gere un domaine (education, justice, sante...)',
        ],
      },
    ],

    example:
      'Lors de l\'entretien de naturalisation, on vous demandera probablement la devise de la France et ce que represente la laicite. Savoir que la laicite ne signifie pas l\'interdiction de la religion, mais la neutralite de l\'Etat, est un point essentiel. Chacun est libre de pratiquer sa religion en prive, mais l\'Etat ne favorise aucun culte.',

    summary:
      'La France est une Republique fondee sur les valeurs de Liberte, Egalite, Fraternite. Ses symboles sont le drapeau tricolore, la Marseillaise et Marianne. La laicite garantit la separation de l\'Etat et des religions. Le President est elu pour 5 ans et nomme le Premier ministre.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. INSTITUTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    category: 'institutions',
    title: 'Les institutions francaises',
    icon: '⚖️',
    introduction:
      'Les institutions de la France reposent sur le principe de la separation des pouvoirs, theorise par Montesquieu. Le pouvoir executif, le pouvoir legislatif et le pouvoir judiciaire fonctionnent de maniere independante pour garantir la democratie.',

    sections: [
      {
        title: 'La separation des pouvoirs',
        body: 'La separation des pouvoirs est un principe fondamental de la Republique, inspire par le philosophe Montesquieu. Elle distingue trois pouvoirs : le pouvoir executif (President et gouvernement — appliquent les lois), le pouvoir legislatif (Parlement — vote les lois) et le pouvoir judiciaire (tribunaux et cours — font respecter les lois). Cette separation empeche la concentration du pouvoir et protege les libertes des citoyens.',
      },
      {
        title: 'Le Parlement',
        body: 'Le Parlement francais est bicameral : il est compose de deux chambres. L\'Assemblee nationale compte 577 deputes, elus au suffrage universel direct pour 5 ans. Elle siege au Palais Bourbon a Paris. Le Senat compte 348 senateurs, elus au suffrage universel indirect (par les grands electeurs) pour 6 ans. Il siege au Palais du Luxembourg. Le Parlement vote les lois et controle l\'action du gouvernement.',
      },
      {
        title: 'L\'Assemblee nationale',
        body: 'L\'Assemblee nationale est la chambre la plus puissante. Les 577 deputes representent le peuple. Ils votent les lois, le budget de l\'Etat et peuvent renverser le gouvernement par une motion de censure. En cas de desaccord avec le Senat, c\'est l\'Assemblee nationale qui a le dernier mot. Le President de la Republique peut dissoudre l\'Assemblee nationale.',
      },
      {
        title: 'Le Senat',
        body: 'Le Senat represente les collectivites territoriales (communes, departements, regions). Ses 348 senateurs sont elus au suffrage universel indirect par un college de grands electeurs (elus locaux). Le Senat examine les lois votees par l\'Assemblee, propose des amendements et veille aux interets des territoires. Il ne peut pas etre dissous.',
      },
      {
        title: 'Le Conseil constitutionnel',
        body: 'Le Conseil constitutionnel verifie que les lois sont conformes a la Constitution avant leur promulgation. Il est compose de 9 membres nommes pour 9 ans (3 par le President, 3 par le president de l\'Assemblee nationale, 3 par le president du Senat). Les anciens presidents de la Republique en sont membres de droit. Il veille aussi a la regularite des elections presidentielles et des referendums.',
      },
      {
        title: 'Les collectivites territoriales',
        body: 'Les collectivites territoriales gerent les affaires locales. La commune est administree par le maire et le conseil municipal (elus pour 6 ans). Le departement est dirige par le conseil departemental. La region est dirigee par le conseil regional. Chaque collectivite a des competences propres : les communes gerent les ecoles primaires, les departements les colleges et l\'aide sociale, les regions les lycees et les transports regionaux.',
      },
    ],

    keyFacts: [
      { label: 'Pouvoir executif', value: 'President + Gouvernement' },
      { label: 'Pouvoir legislatif', value: 'Parlement (Assemblee + Senat)' },
      { label: 'Pouvoir judiciaire', value: 'Tribunaux et cours de justice' },
      { label: 'Deputes', value: '577 (elus pour 5 ans)' },
      { label: 'Senateurs', value: '348 (elus pour 6 ans)' },
      { label: 'Assemblee nationale', value: 'Palais Bourbon' },
      { label: 'Senat', value: 'Palais du Luxembourg' },
      { label: 'Conseil constitutionnel', value: '9 membres, mandat de 9 ans' },
    ],

    schema: [
      {
        title: 'La separation des 3 pouvoirs',
        items: [
          'Executif : President + Gouvernement — appliquent les lois',
          'Legislatif : Assemblee nationale + Senat — votent les lois',
          'Judiciaire : Tribunaux — font respecter les lois',
        ],
      },
      {
        title: 'Le parcours d\'une loi',
        items: [
          '1. Proposition de loi (depute/senateur) ou projet de loi (gouvernement)',
          '2. Examen en commission parlementaire',
          '3. Debat et vote a l\'Assemblee nationale',
          '4. Examen et vote au Senat',
          '5. En cas de desaccord : l\'Assemblee a le dernier mot',
          '6. Controle du Conseil constitutionnel (si saisi)',
          '7. Promulgation par le President de la Republique',
        ],
      },
      {
        title: 'Competences des collectivites',
        items: [
          'Communes — ecoles primaires, etat civil, urbanisme',
          'Departements — colleges, aide sociale, routes departementales',
          'Regions — lycees, transports regionaux, developpement economique',
        ],
      },
    ],

    example:
      'Quand un depute propose une loi, elle est d\'abord examinee en commission, puis debattue et votee a l\'Assemblee nationale. Le texte est ensuite transmis au Senat pour examen. Si les deux chambres ne sont pas d\'accord, une commission mixte paritaire tente de trouver un compromis. Si l\'accord echoue, l\'Assemblee nationale a le dernier mot.',

    summary:
      'Les institutions francaises reposent sur la separation des pouvoirs : l\'executif (President et gouvernement), le legislatif (Assemblee nationale et Senat) et le judiciaire (tribunaux). Le Parlement vote les lois. Le Conseil constitutionnel verifie leur conformite. Les collectivites territoriales gerent les affaires locales.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. FRANCE ET EUROPE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    category: 'europe',
    title: 'La France et l\'Europe',
    icon: '🇪🇺',
    introduction:
      'La France est l\'un des membres fondateurs de l\'Union europeenne. Son engagement europeen est un element essentiel de sa politique etrangere. Comprendre la construction europeenne et le role de la France dans le monde est important pour l\'entretien de naturalisation.',

    sections: [
      {
        title: 'La construction europeenne',
        body: 'L\'Union europeenne est nee de la volonte de maintenir la paix apres les deux guerres mondiales. En 1957, le Traite de Rome fonda la Communaute economique europeenne (CEE) avec 6 pays : France, Allemagne, Italie, Belgique, Pays-Bas et Luxembourg. Depuis, l\'UE s\'est elargie progressivement et compte aujourd\'hui 27 Etats membres (depuis le Brexit du Royaume-Uni en 2020).',
      },
      {
        title: 'Les symboles de l\'Union europeenne',
        body: 'L\'UE possede ses propres symboles : un drapeau (12 etoiles dorees en cercle sur fond bleu — le nombre 12 symbolise la perfection et l\'unite, pas le nombre d\'Etats), un hymne (l\'Ode a la Joie de Beethoven), une devise (« Unis dans la diversite »), une monnaie commune (l\'euro) et une journee de l\'Europe (9 mai). La France a adopte l\'euro le 1er janvier 2002, en remplacement du franc.',
      },
      {
        title: 'L\'euro et la monnaie',
        body: 'L\'euro est la monnaie commune de 20 pays de la zone euro. La France l\'a adopte le 1er janvier 1999 (pour les transactions electroniques) et le 1er janvier 2002 pour les pieces et billets, en remplacement du franc francais. L\'euro facilite les echanges commerciaux et les deplacements entre les pays membres.',
      },
      {
        title: 'Les institutions europeennes',
        body: 'L\'UE fonctionne avec plusieurs institutions : le Parlement europeen (elus au suffrage universel direct, siege a Strasbourg), la Commission europeenne (propose les lois, siege a Bruxelles), le Conseil de l\'UE (representants des gouvernements) et la Cour de justice de l\'UE (Luxembourg). La France joue un role central dans toutes ces institutions.',
      },
      {
        title: 'La France dans le monde',
        body: 'La France est la 6e puissance economique mondiale. Elle est membre permanent du Conseil de securite des Nations Unies (ONU), avec un droit de veto, aux cotes des Etats-Unis, de la Russie, de la Chine et du Royaume-Uni. Elle est aussi membre de l\'OTAN et du G7. Grace a ses territoires d\'outre-mer, elle est presente sur tous les continents et possede le 2e domaine maritime mondial.',
      },
      {
        title: 'La francophonie',
        body: 'La France est au coeur de la francophonie, qui reunit les pays et communautes partageant le francais. L\'Organisation internationale de la Francophonie (OIF) compte 88 Etats et gouvernements membres. Le francais est langue officielle de nombreuses organisations internationales : ONU, UE, Croix-Rouge, Cour internationale de justice.',
      },
    ],

    keyFacts: [
      { label: 'Traite de Rome', value: '1957 — 6 pays fondateurs' },
      { label: 'Membres de l\'UE', value: '27 Etats (depuis 2020)' },
      { label: 'Devise de l\'UE', value: '« Unis dans la diversite »' },
      { label: 'Drapeau UE', value: '12 etoiles dorees sur fond bleu' },
      { label: 'Monnaie', value: 'L\'euro (depuis 2002 en France)' },
      { label: 'France — rang economique', value: '6e puissance mondiale' },
      { label: 'ONU', value: 'Membre permanent du Conseil de securite' },
      { label: 'Francophonie', value: '88 Etats et gouvernements membres' },
    ],

    schema: [
      {
        title: 'Les 6 pays fondateurs de l\'UE (1957)',
        items: [
          'France',
          'Allemagne',
          'Italie',
          'Belgique',
          'Pays-Bas',
          'Luxembourg',
        ],
      },
      {
        title: 'Les symboles de l\'UE',
        items: [
          'Drapeau : 12 etoiles dorees sur fond bleu',
          'Hymne : L\'Ode a la Joie (Beethoven)',
          'Devise : « Unis dans la diversite »',
          'Monnaie : L\'euro',
          'Journee de l\'Europe : 9 mai',
        ],
      },
      {
        title: 'La France dans les organisations internationales',
        items: [
          'ONU — membre permanent du Conseil de securite (droit de veto)',
          'Union europeenne — membre fondateur',
          'OTAN — membre depuis 1949',
          'G7 — membre',
          'Francophonie (OIF) — pays moteur',
        ],
      },
    ],

    example:
      'Quand vous utilisez des euros pour payer en France, en Allemagne ou en Espagne, c\'est grace a l\'integration europeenne. L\'euro, adopte en France en 2002, a remplace le franc et permet de voyager et de commercer facilement dans 20 pays de la zone euro sans changer de monnaie.',

    summary:
      'La France est membre fondateur de l\'UE (1957, Traite de Rome). L\'UE compte 27 membres et a pour devise « Unis dans la diversite ». La France utilise l\'euro depuis 2002. Elle est la 6e puissance economique mondiale et membre permanent du Conseil de securite de l\'ONU.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 8. FIGURES FEMININES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    category: 'femmes',
    title: 'Figures feminines de l\'histoire de France',
    icon: '👩',
    introduction:
      'De nombreuses femmes ont marque l\'histoire de France par leur courage, leur engagement et leurs accomplissements. Connaitre ces figures est important car elles incarnent des valeurs essentielles de la Republique : le merite, le courage et l\'egalite.',

    sections: [
      {
        title: 'Jeanne d\'Arc (1412-1431)',
        body: 'Jeanne d\'Arc est l\'une des figures les plus celebres de l\'histoire de France. Jeune fille de Lorraine, elle affirma entendre des « voix » divines la poussant a sauver la France pendant la guerre de Cent Ans. Elle convainquit le roi Charles VII de lui confier une armee et libera la ville d\'Orleans en 1429. Capturee par les Bourguignons, elle fut vendue aux Anglais, jugee pour heresie et brulee vive a Rouen en 1431. Elle fut canonisee en 1920.',
      },
      {
        title: 'Marie Curie (1867-1934)',
        body: 'Nee Maria Sklodowska en Pologne, Marie Curie est venue en France pour etudier et a obtenu la nationalite francaise par son mariage avec Pierre Curie. Elle est la premiere femme a avoir recu un prix Nobel (physique, 1903) et la seule personne a en avoir recu deux dans des domaines differents (physique et chimie, 1911). Ses travaux sur la radioactivite ont revolutionne la science. Elle repose au Pantheon depuis 1995.',
      },
      {
        title: 'Simone Veil (1927-2017)',
        body: 'Simone Veil est l\'une des femmes les plus admirees de France. Rescapee des camps de concentration nazis (Auschwitz), elle devint magistrate puis ministre de la Sante. Elle fit adopter la loi legalisant l\'IVG (Interruption Volontaire de Grossesse) le 17 janvier 1975, malgre une opposition tres forte. Elle fut aussi la premiere presidente elue du Parlement europeen (1979). Elle est entree au Pantheon en 2018.',
      },
      {
        title: 'Marie-Antoinette (1755-1793)',
        body: 'Marie-Antoinette, princesse autrichienne, devint reine de France en epousant Louis XVI. Elle fut la derniere reine de France. Impopulaire en raison de son train de vie fastueux, elle fut emprisonnee pendant la Revolution et guillotinee le 16 octobre 1793, neuf mois apres son epoux.',
      },
      {
        title: 'Olympe de Gouges (1748-1793)',
        body: 'Olympe de Gouges est consideree comme une pionniere du feminisme. En 1791, elle redigea la « Declaration des droits de la femme et de la citoyenne », reclamant l\'egalite juridique et politique des femmes. Elle fut guillotinee en 1793 pour ses opinions politiques. Son combat precurseur est aujourd\'hui reconnu comme fondateur de la lutte pour les droits des femmes.',
      },
    ],

    keyFacts: [
      { label: 'Jeanne d\'Arc', value: 'Liberation d\'Orleans (1429) — guerre de Cent Ans' },
      { label: 'Marie Curie', value: '2 prix Nobel — Pantheon (1995)' },
      { label: 'Simone Veil', value: 'Loi IVG (1975) — Pantheon (2018)' },
      { label: 'Olympe de Gouges', value: 'Droits de la femme et de la citoyenne (1791)' },
      { label: 'Droit de vote des femmes', value: '21 avril 1944' },
    ],

    schema: [
      {
        title: 'Chronologie des droits des femmes en France',
        items: [
          '1791 — Olympe de Gouges : Declaration des droits de la femme',
          '1944 — Droit de vote des femmes',
          '1965 — Les femmes peuvent ouvrir un compte bancaire sans l\'accord du mari',
          '1975 — Loi Veil : legalisation de l\'IVG',
          '2000 — Loi sur la parite en politique',
        ],
      },
      {
        title: 'Femmes au Pantheon',
        items: [
          'Marie Curie (1995) — scientifique, 2 prix Nobel',
          'Simone Veil (2018) — loi IVG, presidente du Parlement europeen',
          'Germaine Tillion (2015) — resistante, ethnologue',
          'Genevieve de Gaulle-Anthonioz (2015) — resistante, militante',
          'Josephine Baker (2021) — artiste, resistante',
        ],
      },
    ],

    example:
      'Marie Curie est un exemple remarquable d\'integration par le merite. Nee en Pologne, elle est venue en France pour etudier, a obtenu la nationalite francaise et est devenue la premiere femme professeure a la Sorbonne. Son parcours illustre comment la France accueille et reconnait les talents venus d\'ailleurs.',

    summary:
      'De Jeanne d\'Arc a Simone Veil, les femmes ont joue un role essentiel dans l\'histoire de France. Marie Curie illustre la reussite par le merite, Simone Veil le combat pour les droits. L\'egalite femmes-hommes est aujourd\'hui une valeur fondamentale de la Republique, condition de la naturalisation.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 9. DEVOIRS DU CITOYEN
  // ═══════════════════════════════════════════════════════════════════════════
  {
    category: 'devoirs',
    title: 'Droits et devoirs du citoyen',
    icon: '📋',
    introduction:
      'Etre citoyen francais, c\'est beneficier de droits mais aussi assumer des devoirs. La citoyennete repose sur un equilibre entre les libertes individuelles et les responsabilites envers la collectivite. Lors de l\'entretien de naturalisation, ces notions sont essentielles.',

    sections: [
      {
        title: 'Les droits fondamentaux',
        body: 'Tout citoyen francais beneficie de droits fondamentaux, garantis par la Constitution et la Declaration des Droits de l\'Homme et du Citoyen de 1789 : la liberte d\'expression, la liberte de conscience (croire ou ne pas croire), la liberte de circulation, le droit de vote, le droit a l\'education, le droit de propriete, le droit a un proces equitable, et la resistance a l\'oppression.',
      },
      {
        title: 'Les devoirs du citoyen',
        body: 'En contrepartie de ces droits, le citoyen a des devoirs : respecter les lois de la Republique, payer ses impots et taxes (article 13 de la DDHC : la contribution est « indispensable »), participer aux elections (devoir civique, meme si le vote n\'est pas obligatoire), defendre le pays si necessaire, respecter les autres citoyens et leurs droits, et contribuer au « vivre ensemble ».',
      },
      {
        title: 'Le droit de vote',
        body: 'Le droit de vote est accorde a tout citoyen francais age de 18 ans et plus, inscrit sur les listes electorales. Il s\'exerce lors des elections presidentielles, legislatives, municipales, departementales, regionales et europeennes. Bien que le vote ne soit pas obligatoire en France, il est considere comme un devoir civique essentiel pour la democratie.',
      },
      {
        title: 'L\'obligation fiscale',
        body: 'Payer ses impots est une obligation legale pour tout resident fiscal en France. L\'impot sur le revenu, la TVA, les taxes locales financent les services publics : ecole gratuite, hopitaux, police, justice, infrastructure. Ne pas payer ses impots constitue une fraude fiscale passible de sanctions penales. L\'article 13 de la Declaration de 1789 affirme que cette contribution doit etre « egalement repartie entre tous les citoyens ».',
      },
      {
        title: 'La Securite sociale et la solidarite',
        body: 'La Securite sociale, creee en 1945 apres la Liberation, est un systeme de solidarite nationale. Elle protege contre les risques de la vie : maladie (remboursement des soins), retraite (assurance vieillesse), accidents du travail et allocations familiales. Elle est financee par les cotisations sociales des travailleurs et des employeurs. Ce systeme incarne le principe de fraternite.',
      },
      {
        title: 'La Journee defense et citoyennete (JDC)',
        body: 'Tout jeune Francais doit se faire recenser a la mairie de son domicile a 16 ans, puis participer a la Journee defense et citoyennete (JDC). Cette journee d\'information porte sur la defense nationale et les droits et devoirs du citoyen. Elle a remplace le service militaire obligatoire, supprime en 1997. L\'attestation de JDC est necessaire pour passer certains examens et concours.',
      },
    ],

    keyFacts: [
      { label: 'Age minimum pour voter', value: '18 ans' },
      { label: 'Recensement obligatoire', value: 'A 16 ans' },
      { label: 'Securite sociale', value: 'Creee en 1945' },
      { label: 'Impots', value: 'Obligation legale pour tous les residents' },
      { label: 'Vote', value: 'Devoir civique (non obligatoire)' },
      { label: 'Libertes fondamentales', value: 'Expression, conscience, circulation, vote' },
      { label: 'Discriminations interdites', value: 'Plus de 25 criteres (origine, sexe, age, handicap...)' },
    ],

    schema: [
      {
        title: 'Droits du citoyen',
        items: [
          'Liberte d\'expression — s\'exprimer librement (dans les limites de la loi)',
          'Liberte de conscience — croire ou ne pas croire',
          'Droit de vote — participer aux elections',
          'Droit a l\'education — ecole gratuite et obligatoire',
          'Egalite devant la loi — la loi est la meme pour tous',
          'Droit de propriete — posseder des biens',
        ],
      },
      {
        title: 'Devoirs du citoyen',
        items: [
          'Respecter les lois de la Republique',
          'Payer ses impots et taxes',
          'Participer aux elections (devoir civique)',
          'Defendre le pays si necessaire',
          'Respecter les droits d\'autrui',
          'Se faire recenser a 16 ans (JDC)',
        ],
      },
      {
        title: 'Les limites de la liberte d\'expression',
        items: [
          'L\'injure et la diffamation sont interdites',
          'L\'incitation a la haine raciale ou religieuse est punie',
          'L\'apologie du terrorisme est un delit',
          'Le negationnisme est puni par la loi',
        ],
      },
    ],

    example:
      'Quand vous payez vos impots en France, vous contribuez au fonctionnement des services publics : vos enfants beneficient d\'une ecole gratuite, vous avez acces a des soins rembourses par la Securite sociale, et les routes, les parcs et la securite sont finances collectivement. C\'est le principe de solidarite nationale.',

    summary:
      'Etre citoyen francais, c\'est avoir des droits (vote, expression, education, egalite) et des devoirs (respecter la loi, payer ses impots, defendre le pays). La Securite sociale (1945) incarne la solidarite. Le droit de vote s\'exerce a partir de 18 ans. L\'equilibre droits/devoirs est au coeur de la citoyennete.',
  },
];

export const getLearningContent = (category: Category): LearningTopic | undefined =>
  learningContent.find((c) => c.category === category);
