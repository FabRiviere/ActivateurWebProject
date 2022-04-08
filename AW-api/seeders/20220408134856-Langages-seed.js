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
   return queryInterface.bulkInsert('Langage', [
     {
       langageName: 'JavaScript',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Javascript.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'Python',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Python.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'Java',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Java.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'PHP',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Php.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'C#',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Cdiese.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'C++',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Cpp.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'CSS',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/CSS.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'HTML',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/HTML5.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'TypeScript',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Typescript.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'Ruby',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Ruby.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'C',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/C.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'Swit',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Swit.webp',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'R',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/R.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'Objective-C',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Objective-C-.jpg',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'Shell',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Shell.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'Scala',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Scala.webp',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'Go',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Go.jpeg',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'PowerShell',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/PowerShell.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'Kotlin',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Kotlin.jpg',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'Rust',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Rust.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
       langageName: 'Perl',
       langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Perl.png',
       UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      langageName: 'Divers',
      langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Divers.jpg',
      UserId: 1 ,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      langageName: 'Windows',
      langageLogo: 'http://localhost:3000/api/upload/LangageLogo/Windows.png',
      UserId: 1 ,
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
    return queryInterface.bulkDelete('Langage', null,  {})
  }
};

