const tech = {
  html5: {
    description: 'HTML5 - markup language',
    url: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5',
  },
  css: {
    description: 'CSS - style sheet language',
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  },
  tailwind: {
    description: 'Tailwind CSS - CSS framework',
    url: 'https://tailwindcss.com/',
  },
  bulma: {
    description: 'Bulma - CSS framework',
    url: 'https://bulma.io/',
  },
  javascript: {
    description: 'JavaScript - programming language',
    url: 'https://www.javascript.com/',
  },
  python: {
    description: 'Python - high-level programming language',
    url: 'https://www.python.org/',
  },
  django: {
    description: 'Django - high-level Python web framework',
    url: 'https://www.djangoproject.com/',
  },
  bootstrap: {
    description: 'Bootstrap - CSS framework',
    url: 'https://getbootstrap.com/',
  },
  typescript: {
    description: 'TypeScript - strongly typed programming language',
    url: 'https://www.typescriptlang.org/',
  },
  jquery: {
    description: 'jQuery - JavaScript library',
    url: 'https://jquery.com/',
  },
  reactjs: {
    description: 'React.js - user interface library',
    url: 'https://reactjs.org/',
  },
  nextjs: {
    description: 'Next.js - React framework for production',
    url: 'https://nextjs.org/',
  },
  vue: {
    description: 'Vue.js - JavaScript framework for building UIs',
    url: 'https://vuejs.org/',
  },
  nuxt: {
    description: 'Nuxt.js - Vue framework',
    url: 'https://nuxt.com/',
  },
  mongodbatlas: {
    description: 'MongoDB Atlas - Cloud database and data services',
    url: 'https://www.mongodb.com/',
  },
  swr: {
    description: 'SWR - React hooks for data fetching',
    url: 'https://swr.vercel.app/',
  },
  vercel: {
    description: 'Vercel - platform for deploying and hosting',
    url: 'https://vercel.com/',
  },
  nodejs: {
    description: 'Node.js - back-end JavaScript runtime environment',
    url: 'https://nodejs.org/',
  },
  express: {
    description: 'Express.js - back end web application framework for Node.js',
    url: 'https://expressjs.com/',
  },
  postgresql: {
    description: 'PostgreSQL - relational database management system',
    url: 'https://www.postgresql.org/',
  },
  heroku: {
    description: 'Heroku - platform for PostgreSQL database hosting',
    url: 'https://www.heroku.com/',
  },
  prisma: {
    description: 'Prisma - database toolkit for PostgreSQL',
    url: 'https://www.prisma.io/',
  },
  knexjs: {
    description: 'Knex.js - SQL query builder for JavaScript',
    url: 'https://knexjs.org/',
  },
  jwt: {
    description:
      'JSON Web Tokens - method for representing claims securely between two parties',
    url: 'https://jwt.io/',
  },
  restfulapis: {
    description:
      'RESTful APIs - application programming interface that conforms to the constraints of REST',
    url: 'https://restfulapi.net/',
  },
  wordpress: {
    description: 'WordPress - content management system',
    url: 'https://wordpress.com/',
  },
  solidity: {
    description: 'Solidity - implement smart contracts',
    url: 'https://soliditylang.org/',
  },
  hardhat: {
    description: 'Hardhat - deploy to the Ethereum Rinkeby testnet',
    url: 'https://hardhat.org/',
  },
  openzeppelin: {
    description: 'OpenZeppelin - implement the NFT standard',
    url: 'https://www.openzeppelin.com/',
  },
  supabase: {
    description: 'Supabase - open source Firebase alternative',
    url: 'https://supabase.com/',
  },
  planetscale: {
    description: 'PlanetScale - open source database platform',
    url: 'https://planetscale.com/',
  },
  mui: {
    description: 'Material UI - React component library',
    url: 'https://mui.com/',
  },
  openai: {
    description: 'OpenAI API - Access to AI models developed by OpenAI',
    url: 'https://openai.com/',
  },
  stripe: {
    description: "Stripe.js - Stripe’s browser-side JavaScript library",
    url: 'https://stripe.com/',
  },
  framer: {
    description: 'Framer Motion - React motion libary',
    url: 'https://www.framer.com/',
  },
  react3fiber: {
    description: 'React Three Fiber - React renderer for three.js',
    url: 'https://docs.pmnd.rs/react-three-fiber/getting-started/introduction',
  },
}

export const projects = [
  {
    name: 'OpnHaus',
    slug: 'opnhaus',
    url: 'https://opn.haus/',
    imgsrc: '/images/project_opnhaus.jpg',
    github: 'https://github.com/gavinmgrant/opnhaus',
    description:
      'An app for real estate agents to create beautiful landing pages for their open houses where the data lives in the URL.',
    bullets: [
      'Users input information about an open house into a form and the web app creates a custom URL to share.',
      'Key user data is saved in localStorage, so it persists on reload making a better UX as they create multiple open house landing pages.',
      'Cheerio is used to scrape real estate agent and listing data to auto fill portions of the form to reduce user input time',
      'A data object storing the open house state is converted to a base 64 string that the app uses as a query parameter, eliminating the need to save data to a database.',
      'Since the base 64 string is so long, an API service is provided to stores a short, unique id that can be used in a shorter, shareable URL.',
      'Using an Add to Calendar Button library, users can add open house times that prospects can click on to easily add the open house to their calendar.',
      'Utilized Tailwind CSS, a utility-first CSS framework, to efficiently style the UI of the app.',
      'Deployed the app to Vercel from a GitHub repo.',
    ],
    technologies: [
      tech.vue,
      tech.nuxt,
      tech.typescript,
      tech.tailwind,
      tech.mongodbatlas,
      tech.vercel,
    ],
  },
  {
    name: 'Listingify',
    slug: 'listingify',
    url: 'https://listingify.com/',
    imgsrc: '/images/project_listingify.jpg',
    github: null,
    description:
      'This full-stack app sells tokens that allow real estate agent users generate descriptions for their listings using the OpenAI API.',
    bullets: [
      'Accessed the OpenAI API GPT-3.5 model to understand and generate natural language via an API call.',
      'Leveraged Supabase for the backend to manage tables in the database, authentication, and creates API endpoints.',
      'Bootstrapped the React codebase using DivJoy codebase generator to build the foundation of the app.',
      'Utilized Material UI for the user interface elements.',
      'Leveraged Stripe.js to manage tokens to generate descriptions and for checkout flow.',
      'Animated text and icons on scroll with Framer Motion.',
      'Deployed the app to Vercel from a GitHub repo.',
    ],
    technologies: [
      tech.reactjs,
      tech.nextjs,
      tech.mui,
      tech.openai,
      tech.stripe,
      tech.postgresql,
      tech.supabase,
      tech.framer,
      tech.vercel,
    ],
  },
  {
    name: 'ModHomes',
    slug: 'modhomes',
    url: 'https://modhomes.vercel.app/',
    imgsrc: '/images/project_modhomes.jpg',
    github: 'https://github.com/gavinmgrant/modhomes',
    description:
      'This app renders 3d models of modular homes based on various configurations of 8 foot X 40 foot modules.',
    bullets: [
      'Utilized React Three Fiber to implement Three.js in a React project.',
      'Created a canvas object to set the environment to hold the 3d models, camera, and lighting.',
      'Built reusable, self-contained components for the home modules to create each home design.',
      'Animated text and images with Framer Motion and numbers using react-spring.',
      'Implemented unit test for components using React Testing Library.',
      'Deployed the app to Vercel from a GitHub repo.',
    ],
    technologies: [
      tech.typescript,
      tech.reactjs,
      tech.nextjs,
      tech.mui,
      tech.react3fiber,
      tech.framer,
      tech.vercel,
    ],
  },
  {
    name: 'Realest System',
    slug: 'realest-system',
    url: 'https://realestsystem.com/',
    imgsrc: '/images/project_realest-system.jpg',
    github: 'https://github.com/gavinmgrant/realest-system',
    description:
      'This full-stack app is a SaaS product that helps real estate investors quickly calculate their return on investment for residential income properties.',
    bullets: [
      'Leveraged Supabase for the backend to manage tables in the database, authentication, and creates API endpoints.',
      'Bootstrapped the React codebase using the DivJoy codebase generator to build the foundation of the app.',
      'Utilized the Bulma open-source CSS framework.',
      'Leveraged Next.js for server-side rendering to reduce page loading times, file-system routing, image optimization, and more.',
      'Deployed the app to Vercel from a GitHub repo.',
    ],
    technologies: [
      tech.reactjs,
      tech.nextjs,
      tech.bulma,
      tech.stripe,
      tech.postgresql,
      tech.supabase,
      tech.vercel,
    ],
  },
  {
    name: 'OmitPlastic',
    slug: 'omitplastic',
    url: 'https://omitplastic.com/',
    imgsrc: '/images/project_omitplastic.jpg',
    github: 'https://github.com/gavinmgrant/omitplastic',
    description:
      'This full-stack app is designed to help people reduce plastic consumption by purchasing products with less plastic content.',
    bullets: [
      'Connected the application to a MySQL database of product data using Prisma ORM (Object Relational Mapper).',
      'Hosted the product data in the cloud using PlanetScale.',
      'Created a database schema with a model definition of the product objects using Prisma Client, a query builder.',
      'Utilized Tailwind CSS, a utility-first CSS framework, to efficiently style the UI of the app.',
      'Animated content with react-spring, which is a physics based animation library.',
      'Leveraged Next.js as the React library and for API routes for server-side API routes as the backend.',
      'Deployed the app to Vercel from a GitHub repo.',
    ],
    technologies: [
      tech.typescript,
      tech.reactjs,
      tech.nextjs,
      tech.tailwind,
      tech.planetscale,
      tech.prisma,
      tech.swr,
      tech.vercel,
    ],
  },
  {
    name: 'Anti-Inflammatory Foods',
    slug: 'anti-inflammatory-foods',
    url: 'https://gavinmgrant.pythonanywhere.com/',
    imgsrc: '/images/project_anti-inflammatory-foods.jpg',
    github: 'https://github.com/gavinmgrant/anti_inflammation',
    description:
      'This full-stack web app allows users to browse foods with anti-inflammatory properties and add them to their own shopping lists.',
    bullets: [
      'Utilizes Django on the back-end and JavaScript on the front-end.',
      "Completed as the capstone project for HarvardX CS50's Web Programming with Python and JavaScript course.",
      'Leverages Bootstrap, an open-source front-end toolkit, to style the Django templates and HTML elements for a mobile-responsive design.',
      'Data in the list persists via the database, while localStorage is used to have the crossed out state persist on the front-end even across browser sessions.',
      'Hosted and deployed on the cloud via PythonAnywhere.',
    ],
    technologies: [tech.python, tech.django, tech.javascript, tech.bootstrap],
  },
  {
    name: 'SoundlyInvest',
    slug: 'soundlyinvest',
    url: 'https://soundlyinvest-client.vercel.app/',
    imgsrc: '/images/project_soundlyinvest.jpg',
    github: 'https://github.com/gavinmgrant/soundlyinvest-client',
    description:
      'This full-stack web application is a rental property calculator that allows users to save, update, and delete property investment reports.',
    bullets: [
      'Implemented a responsive client using JavaScript and React.js library that passes data to components via context and state.',
      'Architected RESTful API endpoints using Node.js/Express routers to perform CRUD operations POST, GET, PATCH, AND DELETE.',
      'Engineered a PostgreSQL database to save reports and user data while seamlessly integrating with the Express application.',
      'Integrated Google Maps Places API with the client to autocomplete property address inputs.',
    ],
    technologies: [
      tech.html5,
      tech.css,
      tech.javascript,
      tech.reactjs,
      tech.nodejs,
      tech.express,
      tech.postgresql,
      tech.heroku,
      tech.knexjs,
      tech.jwt,
      tech.restfulapis,
    ],
  },
  {
    name: 'Permitful',
    slug: 'permitful',
    url: 'https://permitful.com/',
    imgsrc: '/images/project_permitful.jpg',
    github: 'https://github.com/gavinmgrant/permitful-client',
    description:
      'This full-stack web application allows users to visualize where all of the most recently updated building permits in a specific jurisdiction are located and save their favorites.',
    bullets: [
      'Implemented a responsive client using JavaScript and React.js library that passes data to components via context and state.',
      'Architected RESTful API endpoints using Node.js/Express routers to perform CRUD operations POST, GET, PATCH, AND DELETE.',
      'Engineered a PostgreSQL database to save reports and user data while seamlessly integrating with the Express application.',
      'Integrated Google Maps Places API with the client to autocomplete property address inputs.',
    ],
    technologies: [
      tech.html5,
      tech.css,
      tech.javascript,
      tech.reactjs,
      tech.nodejs,
      tech.express,
      tech.postgresql,
      tech.heroku,
      tech.knexjs,
      tech.jwt,
      tech.restfulapis,
    ],
  },
  {
    name: '3D Tic-Tac-Toe',
    slug: '3dttt',
    url: 'https://3dttt.vercel.app/',
    imgsrc: '/images/project_3dttt.jpg',
    github: 'https://github.com/gavinmgrant/tic-tac-toe',
    description:
      'This front end tic-tac-toe game is built with React and uses Spline 3d models for the circle and cross pieces.',
    bullets: [
      'Leverages the useState React hook to update the state of an array that tracks the pieces in each cell.',
      'Implemented CSS hover and active states to animate interactions with the cells and start over button.',
      'Handled edge cases like a tie game, so that confetti only displays when a player wins.',
      'Embedded 3D models of the circle and crosses that were modeled in Spline.',
      'Deployed the app to Vercel from a GitHub repo.',
    ],
    technologies: [
      tech.html5,
      tech.css,
      tech.javascript,
      tech.reactjs,
      tech.vercel,
    ],
  },
  {
    name: 'ArchitectNFT',
    slug: 'architectnft',
    url: 'https://architectnft-client.vercel.app/',
    imgsrc: '/images/project_architectnft.jpg',
    github: 'https://github.com/gavinmgrant/architectnft-client',
    description:
      'This is a Web3 App that lets users connect their Ethereum wallet and mint an NFT to their wallet. The NFT is a random three word statement using the last name of famous architects.',
    bullets: [
      'Utilized Hardhat to quickly compile smart contracts and test them locally.',
      'Implemented the NFT standard using OpenZeppelin.',
      'Wrote smart contracts using Solidity.',
      'Used MetaMask to connect wallet to the Ethereum network.',
      'Deployed the app to Vercel from a GitHub repo.',
      'Project was a developed as part of a buildspace project.',
    ],
    technologies: [
      tech.solidity,
      tech.hardhat,
      tech.openzeppelin,
      tech.javascript,
      tech.reactjs,
      tech.nextjs,
      tech.vercel,
    ],
  },
  {
    name: 'Cadre General Contractors',
    slug: 'cadre',
    url: 'https://cadregeneralcontractors.com/',
    imgsrc: '/images/project_cadre.jpg',
    github: null,
    description:
      'This is website was designed for Seattle-based general contractor Cadre General Contractors to showcase their work and services.',
    bullets: [
      'Integrated the website into the WordPress content management system.',
      'Leveraged the Salient WordPress theme to create a responsive user experience.',
      'Designed with Search Engine Optimization best practices to increase visibility in search engines',
      "Created a dynamic portfolio page to showcase the client's projects and expertise.",
    ],
    technologies: [tech.wordpress],
  },
  {
    name: 'Name This City',
    slug: 'name-this-city',
    url: 'https://gavinmgrant.github.io/quiz-app/',
    imgsrc: '/images/project_name-this-city.jpg',
    github: 'https://github.com/gavinmgrant/quiz-app',
    description:
      'This is an urban geography quiz app that tests your knowledge of cities across the globe.',
    bullets: [
      'Developed single-purpose template generation and event handler functions in JavaScript.',
      'Utilized semantic HTML, along with CSS and the jQuery JavaScript library.',
      'Follows a11y best practices and allows full usability via the keyboard.',
      'Implemented a render() function, that conditionally regenerates the view each time the store is updated.',
    ],
    technologies: [tech.html5, tech.css, tech.javascript, tech.jquery],
  },
  {
    name: 'Happy Hour Helper',
    slug: 'happy-hour-helper',
    url: 'https://gavinmgrant.github.io/happy-hour-helper/',
    imgsrc: '/images/project_happy-hour-helper.jpg',
    github: 'https://github.com/gavinmgrant/happy-hour-helper',
    description:
      'This app recommends food and cocktail recipes for users planning a happy hour.',
    bullets: [
      'Built a responsive front-end application using JavaScript and the jQuery library.',
      'Utilized JS code separated into single-purpose, reusable, clearly named functions while returning an accessible DOM tree.',
      'Integrated the app with two external APIs that use search parameters and callbacks to retrieve pertinent data.',
      'Designed with accessibility in mind by using a11y best practices in semantic HTML.',
    ],
    technologies: [
      tech.html5,
      tech.css,
      tech.javascript,
      tech.jquery,
      tech.restfulapis,
    ],
  },
]
