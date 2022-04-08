'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('category', [
      {
        name: 'NodeJs',
        logo: 'http://localhost:3000/api/upload/LangageLogo/NodeJS.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Serveur',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Serveur.jpg',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Backend',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Backend.jpg',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Frontend',
        UserId: 1 ,
        logo: 'http://localhost:3000/api/upload/LangageLogo/Frontend.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'JavaScript',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Javascript.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'HTML',
        logo: 'http://localhost:3000/api/upload/LangageLogo/HTML5.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'CSS',
        logo: 'http://localhost:3000/api/upload/LangageLogo/CSS.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bases de données',
        logo: 'http://localhost:3000/api/upload/LangageLogo/BDD.jpg',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'CMS',
        logo: 'http://localhost:3000/api/upload/LangageLogo/CMS.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Prestashop',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Prestashop.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Wordpress',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Wordpress.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Divers',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Divers.jpg',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Excel',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Excel.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Word',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Word.jpg',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Access',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Access.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vue.js',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Vuejs.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vue-router',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Vue-Router.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vuex',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Vuex.svg',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Logiciels',
        logo: 'http://localhost:3000/api/upload/LangageLogo/logiciels.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Utilitaires',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Utilitaires.jpg',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Développement',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Developpement.jpg',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Formations',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Formation.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Entreprise',
        logo: 'http://localhost:3000/api/upload/LangageLogo/AutoEntrepreneurs.jpg',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Analyses',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Analyses.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Reseaux sociaux',
        logo: 'http://localhost:3000/api/upload/LangageLogo/ReseauxScoiaux.jpg',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Logiciels Adobe',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Adobe.webp',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Windows',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Windows.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'API',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Api.jpg',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Framework',
        logo: 'http://localhost:3000/api/upload/LangageLogo/Framework.png',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Expressions libres',
        logo: 'http://localhost:3000/api/upload/LangageLogo/ExpressionLibre.jpg',
        UserId: 1 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ]);
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('category', {}, null);
  }
};

