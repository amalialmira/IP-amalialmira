'use strict';

const axios = require('axios')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const genre = ["fantasy", "romance", "mystery", "fiction", "scifi", "adventure", "horror"]
    let allBooks = []

    for (let x = 0; x < genre.length; x++) {
      let { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre[x]}&key=AIzaSyBeDzON9q5KGuUaXq3Sj1-VN5HFwdmN6cI&printType=books&maxResults=40`)
      // console.log(data);
      ;
      let perBook = data.items.map(el => {
        if (!el.volumeInfo.imageLinks){
          el.volumeInfo.imageLinks = "https://img.freepik.com/free-photo/education-concept-with-book_23-2149001214.jpg?t=st=1722947119~exp=1722950719~hmac=35d9749aff907cd818477aaf4eaf75caf21cd9944b3944e92f8b95801c65c908&w=900"
        }
        let newBook = {
          title: el.volumeInfo.title,
          author: el.volumeInfo.authors?el.volumeInfo.authors.join(", "):"N/A",
          publisher: el.volumeInfo.publisher?el.volumeInfo.publisher:"N/A",
          description: el.volumeInfo.description,
          category: genre[x],
          imgUrl: el.volumeInfo.imageLinks.thumbnail?el.volumeInfo.imageLinks.thumbnail:el.volumeInfo.imageLinks,
          previewUrl: el.volumeInfo.previewLink,
          createdAt : new Date(),
          updatedAt : new Date()
        }
        // console.log(el.volumeInfo.imageLinks.thumbnail);
        return newBook
      })
      allBooks = allBooks.concat(perBook)
    }
    await queryInterface.bulkInsert('Books', allBooks, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Books', null, {})
  }
};
