import firebaseAxios from 'axios';

export function createDumbOffers() {
  const ofs = [
    {
      title: 'Junior Frontend Developer',
      description: `Zespół Payments poszukuje JavaScript Developera, który na co dzień będzie zajmował się:
Budowaniem systemu płatności online, który pozwala użytkownikom Booksy w Europie i Stanach Zjednoczonych płacić za usługi za pośrednictwem aplikacji;
Wdrażaniem nowych integracji płatności;
Utrzymaniem i rozwojem obecnych integracji.`,
      stack: [
        { tech: 'JavaScript', lv: 'advanced' },
        { tech: 'Vue', lv: 'advanced' },
        { tech: 'Vuex', lv: 'advanced' },
        { tech: 'Nuxt', lv: 'advanced' }
      ],
      requirments: [
        'Bardzo dobra znajomość JS ;',
        'Bardzo dobra znajomość: Vue 2.x i 3.x, Vuex;',
        'Znajomość narzędzi: Jest i Cypress;',
        'Mile widziana znajomość: Nuxt;',
        'Doświadczenie w pisaniu aplikacji opartych o REST api;',
        'Znajomość zagadnień z zakresu technologii SS;',
        'Znajomość języka angielskiego na poziomie min. B1/B2;',
        'Znajomość narzędzi wspomagających programowanie;',
        'Umiejętność czytania i tworzenia dokumentacji technicznej.'
      ],
      benefits: [
        'prywatna opieka medyczna',
        'karta multisport',
        'ubezpieczenie na życie',
        'system kafereryjny',
        'dofinansowanie do nauki języka angielskiego'
      ],
      company: 'Go0gle',
      salary: { start: 7, end: 10 },
      locations: ['remote', { name: 'Warszawa' }]
    },
    {
      title: 'Junior Backend Developer',
      description: '',
      requirments: [],
      benefits: [],
      company: 'Go0gle',
      salary: { start: 7, end: 10 },
      locations: ['remote', {}]
    },
    {
      title: 'Mid/Senior Node Developer',
      description: `Hello JS Experts! 
Join us remotely or in our Warsaw or Lublin office to deliver innovative digital projects. Exciting international clients and partners in a company focused on creating a meaningful change await you! 

Frontkom empowers businesses and impactful organisations to discover and leverage digital opportunities. We help people adopt technology for growth, innovation and positive world impacts. We’re a team of over 70 specialists - designers, developers and business consultants working in a collaborative, international environment from offices in Lublin, Warsaw, Oslo, Fredrikstad, Funchal and Berlin. We support the free and open web and love to invest in open source projects.`,
      stack: [
        { tech: 'JavaScript', lv: 'advanced' },
        { tech: 'Node.js', lv: 'advanced' },
        { tech: 'ReactJS', lv: 'advanced' }
      ],
      requirments: [
        '3+ years of experience in JavaScript and backend development',
        'relevant real world experience with complex projects on Node and React',
        'great command of English - spoken and written',
        'excellent knowledge of JS fundamentals (ES6+)',
        'experience with modern CSS and frontend tools (Sass, Webpack, etc)',
        'experience developing REST APIs in Node with Express and/or Hapi',
        'experience designing and maintaining SQL and NoSQL databases (MySQL, Postgres, MongoDB, Redis)',
        'experience with Javascript testing tools (unit and integration)',
        'experience in working with Git',
        'experience with state management libraries',
        'familiarity with Node ORM tools (Sequelize, Mongoose)',
        'ability to write SOLID and DRY code'
      ],
      benefits: [],
      company: 'Sii',
      salary: { start: 10, end: 18 },
      locations: ['remote', { name: 'Bagno' }, { name: 'Warszawa' }]
    },
    {
      title: 'Senior Oracle Developer',
      description: `ITFS is a consulting company from the Tri-City area, with a branch in Warsaw. We are primarily engaged in recruiting IT specialists and creating project-based Software houses for our Clients from Poland and Western Europe.`,
      stack: [
        { tech: 'Oracle APEX', lv: 'advanced' },
        { tech: 'SQL', lv: 'advanced' },
        { tech: 'Java', lv: 'regular' }
      ],
      requirments: [
        'minimum 4 years of experience in a similar position',
        'minimum 2 years of experience in Java',
        'very good English skills'
      ],
      benefits: ['private medical care', 'Multisport'],
      company: 'Sii',
      salary: { start: 12, end: 24 },
      locations: [{ name: 'Centrum, Warszawa' }]
    },
    {
      title: 'React Developer',

      description: `Looking for a high-impact developer position in an ambitious software house? Would you like nothing better than building state-of-art solutions for thousands of users worldwide? Please, read on - we’ve got a match for you!

Liki is a place where amazing people (like you) can learn and do their best work. We are growing rapidly and always looking for new tech talents to welcome onboard. Are you the one? Join the crew and become our next Frontend Developer.`,
      stack: [
        { tech: 'JavaScript', lv: 'advanced' },
        { tech: 'Node.js', lv: 'advanced' },
        { tech: 'Expressjs', lv: 'advanced' },
        { tech: 'ReactJS', lv: 'junior' }
      ],
      requirments: [
        'have 3 years of proven experience in Front-end development',
        'are keen on React, Angular or Vue',
        'know how to use repository based on gitflow',
        'API integration is a piece of cake for you',
        'know your way around external libraries and services',
        'are a great communicator, both in English and Polish',
        'have a sharp eye for detail, work proactively and are willing to take the lead'
      ],
      benefits: [
        'possibility to work remotely (fully remote now, hybrid later) or in our comfortable offices ',
        'flexible working hours that will fit your schedule',
        'a personal mentor to support you along the way',
        'yearly budget for training and education',
        'regular internal meeting and learning resources - maybe you’ll be the next speaker on our DevTalks?',
        'equipment depending on your preferences',
        'lots of room for growth! '
      ],
      tasks: [],
      company: 'MasterBorn',
      salary: { start: 6, end: 14 },
      locations: [
        'remote',
        {
          name: 'Wrocław',
          coords: { lat: 51.107883, lng: 17.038538 },
          country: 'PL'
        }
      ]
    },
    {
      title: 'Vue Developer',
      description:
        'Jesteśmy młodym software housem założonym przez doświadczonych specjalistów w dziedzinie IT. W naszej firmie łączymy sprawdzone technologie ze świeżymi koncepcjami. Pracujemy w małych zespołach, co pozwala na częsty kontakt i przepływ wiedzy ze strony bardziej doświadczonych osób. Zapewniamy elastyczność w doborze godzin oraz miejsca pracy – możesz pracować zdalnie i/lub w biurze, w ścisłym centrum Lublina. ',
      stack: [
        { tech: 'JavaScript', lv: 'regular' },
        { tech: 'Vue', lv: 'regular' },
        { tech: 'Vuex', lv: 'regular' },
        { tech: 'Nuxt', lv: 'junior' }
      ],
      requirments: [
        'Rok doświadczenia',
        'Bardzo dobra znajomość HTML 5, CSS 3 (SASS), RWD',
        'Dobra znajomość JavaScript (standard ES6+)',
        'Znajomość Vue.js (Vuex, Vue Router)',
        'Znajomość REST',
        'Doświadczenie w pracy z webpack, NPM/Yarn'
      ],
      tasks: [
        'Tworzyć nowe funkcje do platformy Landingi',
        'Współpracować z jednym z 3 zespołów odpowiedzialnych za wybrany obszar firmy: Leads, Machine Learning, Editor',
        'Brać udział w cały cyklu życia aplikacji w oparciu o podejście Continuous Deployment'
      ],
      benefits: [],
      company: 'AtomStore',
      salary: { start: 6, end: 14 },
      locations: ['remote', { name: 'Rzeszów', coords: { lat: 52, lng: 28 } }]
    }
  ];
  let today = new Date();
  ofs.map(offer => {
    return firebaseAxios.post('/offers.json', {
      ...offer,
      createdAt: new Date(today.setTime(today.getTime() - 1000 * 60 * 60 * 24))
    });
  });

  Promise.all(ofs)
    .then(console.log)
    .catch(console.log);
}
