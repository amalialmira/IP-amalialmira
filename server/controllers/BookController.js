const geminiAi = require("../helpers/gemini-ai")
const { Book } = require("../models")
const { Op } = require("sequelize")


class BookController {
    static async getAllBooks(req, res, next){
        try {
            const { search, filter, page } = req.query

            const paramsQuery = {}

            if(search){
                paramsQuery.where = {
                    title: {
                        [ Op.iLike ]: `%${search}%`
                    }
                }
            }

            if (filter){
                paramsQuery.where = {
                    category: filter
                }
            }

            if( filter && search){
                paramsQuery.where = {
                    title: {
                        [ Op.iLike ]: `%${search}%`
                    },
                    category: filter
                }
            }
            
            let limit = 20
            let pageNumber = 1

            if (page){
                if(page.size){
                    limit = page.size
                    paramsQuery.limit = limit
                }

                if(page.number){
                    pageNumber = page.number
                    paramsQuery.offset = limit *  (pageNumber - 1)
                }
            } else {
                paramsQuery.limit = limit
                paramsQuery.offset = limit *  (pageNumber - 1)
            }

            const { count, rows } = await Book.findAndCountAll(paramsQuery)

            res.status(200).json({
                page: +pageNumber,
                data: rows,
                totalData: count,
                totalPage: Math.ceil(count/limit),
                dataPerPage: +limit
            })

        } catch (error) {
            // next(error)
            console.log(error);
        }
    }

    static async getRec(req, res, next){
        try {
            console.log("<<<<<<");
            const {genre, mood} = req.body

            let books = await Book.findAll()
            books = books.map(el => {
                return {
                    id: el.id,
                    title: el.title,
                    category: el.category,
                    description: el.description,
                    imgUrl: el.imgUrl
                }
            })

            let data = await geminiAi(genre, mood, JSON.stringify(books))

            res.status(200).json(data)

        } catch (error) {
            next(error)
        }
    }
}

module.exports = BookController