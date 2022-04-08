'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Tutorial',[
      {
        UserId: 1,
        CategoryId: 1,
        LangageId: 1,
        title: 'Tutoriel sur NodeJS',
        content: 'Contenu du tutoriel sur catégorie-1 NodeJS',
        imageUrl: 'http://localhost:3000/api/upload/Disposition image-CSS1648417738072.png',
        videoUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 1,
        CategoryId: 3,
        LangageId: 22,
        title: 'Tutoriel sur catégorie Backend',
        content: 'Contenu du tutoriel sur catégorie-3 Backend',
        imageUrl: 'http://localhost:3000/api/upload/Disposition image-CSS1648417738072.png',
        videoUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 1,
        CategoryId: 4,
        LangageId: 8,
        title: 'Tutoriel sur catégorie Frontend',
        content: 'Contenu du tutoriel sur catégorie-4 FrontEnd',
        imageUrl: 'http://localhost:3000/api/upload/Disposition image-CSS1648417738072.png',
        videoUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()       
      },
      {
        UserId: 1,
        CategoryId: 4,
        LangageId: 8,
        title: 'Deuxième Tutoriel sur catégorie Frontend',
        content: 'Contenu du deuxième tutoriel sur catégorie-4 Frontend',
        imageUrl: 'http://localhost:3000/api/upload/Disposition image-CSS1648417738072.png',
        videoUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()       
      },
      {
        UserId: 1,
        CategoryId: 3,
        LangageId: 1,
        title: 'Deuxième Tutoriel sur catégorie Backend',
        content: 'Contenu du deuxième tutoriel sur catégorie-3 Backend',
        imageUrl: 'http://localhost:3000/api/upload/Disposition image-CSS1648417738072.png',
        videoUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()      
      },
      {
        UserId: 1,
        CategoryId: 2,
        LangageId: 4,
        title: 'Tutoriel sur catégorie Serveur',
        content: 'Contenu du tutoriel sur catégorie-2 Serveur',
        imageUrl: 'http://localhost:3000/api/upload/Disposition image-CSS1648417738072.png',
        videoUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()      
      },
      {
        UserId: 1,
        CategoryId: 9,
        LangageId: 22,
        title: 'Tutoriel sur Prestashop 1.7',
        content: 'Contenu du tutoriel sur catégorie-9 CMS Prestashop 1.7',
        imageUrl: 'http://localhost:3000/api/upload/Disposition image-CSS1648417738072.png',
        videoUrl: '',
        createdAt: new Date(),
        updatedAt: new Date()      
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Tutorial', {}, null);
  }
};