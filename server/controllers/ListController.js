const { where } = require('sequelize')
const { Book, User, ReadingList } = require('../models')
const book = require('../models/book')

class ListController {
    static async showReadingList (req, res, next){
        try {
            let books = await ReadingList.findAll({
                where: {
                    UserId: req.user.id
                },
                include: Book
            })
            res.status(200).json(books)
        } catch (error) {
            next(error)
            // console.log(error);
        }
    }
    static async addToReadingList (req, res, next){
        try {
            const {UserId = req.user.id, BookId} = req.body
            let find = await ReadingList.findOne({
                where: {UserId},
                include: {
                    model: Book,
                    where:{
                        id: BookId
                    }
                }
            })

            if (find){
                throw {name: 'added-already'}
            }

            let newList = await ReadingList.create({UserId, BookId})
            let newFind = await ReadingList.findByPk(newList.id, {
                include: Book
            })

            res.status(201).json({message: `succesfully adding ${newFind.Book.title} to your Reading List!`})
        } catch (error) {
            next(error)
            // console.log(error);
        }
    }
    static async deleteReadingList(req, res, next){
        try {
         
            const {id} = req.params
            let deleted = await Book.findByPk(id)
            // console.log(deleted);

            await ReadingList.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({message: `succesfully deleting ${deleted.title} from your Reading List!`})
        } catch (error) {
            next(error)
        }
    }
    static async editReadingList(req, res, next){
        try {
            // console.log("DISINI");
            const {id} = req.params
            const { notes, status } = req.body
            // console.log(id, notes, status, "!!!!!");

            await ReadingList.update({notes, status},{
                where: {
                    id
                }
            })
            res.status(200).end()
        } catch (error) {
            console.log(error);
            // next(error)
        }
    }
    static async getListById (req, res,next){
        try {
            const {id} = req.params
            let toEdit = await ReadingList.findByPk(id, {
                include: Book
            })
            res.status(200).json(toEdit)

        } catch (error) {
            next(error)
        }
    }

}

module.exports = ListController