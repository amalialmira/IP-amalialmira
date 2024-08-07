const app = require('../app')
const { test, expect, describe, beforeAll, afterAll } = require('@jest/globals');
const request = require('supertest');
const { User, Book, ReadingList } = require('../models');
const { signToken } = require('../helpers/jwt');

let access_token

beforeAll(async () => {

    let books = [
        {
            "title": "Peter Pan",
            "author": "James Matthew Barrie",
            "publisher": "Sterling Publishing Company, Inc.",
            "description": "The adventures of the three darling children in Never-Never Land with Peter Pan, the boy who would not grow up.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=WdM_qxJq8T8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=WdM_qxJq8T8C&printsec=frontcover&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=1&source=gbs_api",
        },
        {
            "title": "The Assassin's Blade",
            "author": "Sarah J. Maas",
            "publisher": "A&C Black",
            "description": "Celaena Sardothien is Adarlan's most feared assassin. As part of the Assassins' Guild, her allegiance is to her master, Arobynn Hamel, yet Celaena listens to no one and trusts only her fellow killer-for-hire, Sam. In these action-packed prequel novellas - together in one edition for the first time - Celaena embarks on five daring missions. They take her from remote islands to hostile deserts, where she fights to liberate slaves and seeks to avenge the tyrannous. But she is acting against Arobynn's orders and could suffer an unimaginable punishment for such treachery ...Explore the dark underworld of this kick-ass heroine and find out how the legend begins in the five page-turning prequel novellas to the New York Times bestselling Throne of Glass series.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=xLacAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=xLacAgAAQBAJ&printsec=frontcover&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=2&source=gbs_api",
        },
        {
            "title": "Ficciones. C Edited and with an Introduction by Anthony Kerrigan",
            "author": "Jorge Luis Borges",
            "publisher": "Grove Press",
            "description": "Seventeen short stories.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=1FrJqcRILaoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=1FrJqcRILaoC&printsec=frontcover&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=3&source=gbs_api",
        },
        {
            "title": "The Wind in the Willows",
            "author": "Kenneth Grahame",
            "publisher": "Wordsworth Editions",
            "description": "The tales of Ratty, Mole, Badger and Toad. When Mole goes boating with the Water Rat instead of spring-cleaning, he discovers a new world. As well as the river and the Wild Wood, there is Toad's craze for fast travel which leads him and his friends on a whirl of trains, barges, gipsy caravans and motor cars and even into battle.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=Mo7D3Je7_DMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=Mo7D3Je7_DMC&printsec=frontcover&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=4&source=gbs_api",
        },
        {
            "title": "The Wizard of Oz",
            "author": "L. Frank Baum",
            "publisher": "Collector's Library",
            "description": "After a cyclone transports her to the land of Oz, Dorothy must seek out the great wizard in order to return to Kansas.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=hRd7dJ-9G1IC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=hRd7dJ-9G1IC&printsec=frontcover&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=5&source=gbs_api",
        },
        {
            "title": "A Game of Thrones",
            "author": "George R. R. Martin",
            "publisher": "Bantam",
            "description": "Fantasy-roman.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=bIZiAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=bIZiAAAAMAAJ&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=6&source=gbs_api",
        },
        {
            "title": "Harry Potter and the Deathly Hallows",
            "author": "J. K. Rowling",
            "publisher": "N/A",
            "description": "\"The final adventure in J.K. Rowling's phenomenal, best-selling Harry Potter book series\"--Provided by publisher.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=GZAoAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=GZAoAQAAIAAJ&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=7&source=gbs_api",
        },
        {
            "title": "Throne of Glass",
            "author": "Sarah J. Maas",
            "publisher": "A&C Black",
            "description": "A hugely commercial, fabulously addictive fantastical romp - from an author with top-notch digital self-publishing pedigree and legions of fans awaiting publication",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=D8GIcKPGNR8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=D8GIcKPGNR8C&printsec=frontcover&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=8&source=gbs_api",
        },
        {
            "title": "Bloodmarked",
            "author": "Tracy Deonn",
            "publisher": "Simon and Schuster",
            "description": "\"When the leaders of the Order reveal that they will do everything in their power to keep the approaching demon war a secret, Bree and her friends go on the run so she can learn how to control her devastating new powers.\"--",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=S9RJEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=S9RJEAAAQBAJ&printsec=frontcover&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=9&source=gbs_api",
        },
        {
            "title": "Peter and Wendy",
            "author": "James Matthew Barrie",
            "publisher": "N/A",
            "description": "The adventures of Peter Pan, the boy who would not grow up.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=OJZFAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=OJZFAAAAMAAJ&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=10&source=gbs_api",
        },
        {
            "title": "Peter Pan",
            "author": "Tania Zamorsky, J. M. Barrie",
            "publisher": "Sterling Publishing Company, Inc.",
            "description": "An abridged retelling of the adventures of the three Darling children in Never-Never Land with Peter Pan, the boy who would not grow up.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=ZrHc4MFrGTYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=ZrHc4MFrGTYC&printsec=frontcover&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=11&source=gbs_api",
        },
        {
            "title": "Bridge to Terabithia",
            "author": "Katherine Paterson",
            "publisher": "Hippo Books",
            "description": "The life of a ten-year-old boy in rural Virginia expands when he becomes friends with a newcomer who subsequently meets an untimely death trying to reach their hideaway, Terabithia, during a storm.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=Hnb-93B3OGAC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=Hnb-93B3OGAC&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=12&source=gbs_api",
        },
        {
            "title": "Keeper of the Lost Cities",
            "author": "Shannon Messenger",
            "publisher": "Simon and Schuster",
            "description": "At age 12, Sophie learns that the remarkable abilities that have always caused her to stand out identify her as an elf. After being brought to Eternalia to hone her skills, she discovers that she has secrets buried in her memory for which some would kill.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=poq0maYov4MC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=poq0maYov4MC&printsec=frontcover&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=13&source=gbs_api",
        },
        {
            "title": "The Wind in the Willows",
            "author": "Kenneth Grahame",
            "publisher": "N/A",
            "description": "Since its publication in 1908, Kenneth Grahame's The Wind in the Willows has enchanted readers, young and old. This new edition, sensitively abridged and exquisitely illustrated by Inga Moore, is sure to win over a new generation of fans. Here readers will meet the amiable Mole, his hearty friend the Water Rat, the genial Badger, and, of course, the irrepressible Mr. Toad, and enjoy some of the most memorable adventures in children's literature. Classic, yet accessible, and full of humor, this beautiful volume is the perfect addition to every family's bookshelf. Book jacket.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=bqhaAAAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=bqhaAAAAMAAJ&printsec=frontcover&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=14&source=gbs_api",
        },
        {
            "title": "The Great Hunt",
            "author": "Robert Jordan",
            "publisher": "Macmillan",
            "description": "The Wheel of Time turns and Ages come and pass. What was, what will be, and what is, may yet fall under the Shadow. For centuries, gleemen have told of The Great Hunt of the Horn. Now the Horn itself is found: the Horn of Valere long thought only legend, the Horn which will raise the dead heroes of the ages. And it is stolen. THE WHEEL OF TIME Book One: The Eye of the World Book Two: The Great Hunt Book Three: The Dragon Reborn Book Four: The Shadow Rising Book Five: The Fires of Heaven Book Six: Lord of Chaos Book Seven: A Crown of Swords Book Eight: The Path of Daggers Book Nine: Winter's Heart Book Ten: Crossroads of Twilight",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=tuspQELrwhIC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=tuspQELrwhIC&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=15&source=gbs_api",
        },
        {
            "title": "The Brothers Lionheart",
            "author": "Astrid Lindgren",
            "publisher": "Puffin",
            "description": "Two brothers share many adventures after their death when they are reunited in Nangiyala, the land where sagas come from.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=NsFaAAAAYAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=NsFaAAAAYAAJ&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=16&source=gbs_api",
        },
        {
            "title": "Crown of Midnight",
            "author": "Sarah J. Maas",
            "publisher": "Bloomsbury Publishing USA",
            "description": "As the royal assassin to an evil king, eighteen-year-old Celaena Sardothien must decide what she will fight for--survival, love, or the future of a kingdom.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=uZEkAAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=uZEkAAAAQBAJ&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=17&source=gbs_api",
        },
        {
            "title": "A Curse for True Love",
            "author": "Stephanie Garber",
            "publisher": "N/A",
            "description": "Two villains, one girl, and a deadly battle for happily ever after. Evangeline Fox ventured to the Magnificent North in search of her happy ending, and it seems as if she has it. She's married to a handsome prince and lives in a legendary castle. But Evangeline has no idea of the devastating price she's paid for this fairytale. She doesn't know what she has lost, and her husband is determined to make sure she never finds out . . . but first he must kill Jacks, the Prince of Hearts. Blood will be shed, hearts will be stolen, and true love will be put to the test in A Curse for True Love, the breathlessly anticipated conclusion to the Once Upon A Broken Heart trilogy.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=KLuiEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=KLuiEAAAQBAJ&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=18&source=gbs_api",
        },
        {
            "title": "Eldest",
            "author": "Christopher Paolini",
            "publisher": "Knopf Books for Young Readers",
            "description": "After successfully evading an Urgals ambush, Eragon is adopted into the Ingeitum clan and sent to finish his training so he can further help the Varden in their struggle against the Empire.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=KuYjyCkM2V4C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=KuYjyCkM2V4C&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=19&source=gbs_api",
        },
        {
            "title": "Crossroads of Twilight",
            "author": "Robert Jordan",
            "publisher": "Macmillan",
            "description": "Sequel to Winter's heart.",
            "category": "fantasy",
            "imgUrl": "http://books.google.com/books/content?id=-RfzDkklkmkC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "previewUrl": "http://books.google.co.id/books?id=-RfzDkklkmkC&dq=subject:fantasy&hl=&as_pt=BOOKS&cd=20&source=gbs_api",
        }
    ]
    for (let x = 0; x < books.length; x++) {
        let createData = books[x];
        await Book.create(createData)
    }

    let user = await User.create({
        username: "john_doe",
        email: "john.doe@example.com",
        password: "1Abcd"
    })

    access_token = signToken({ id: user.id })

    await ReadingList.create({
        UserId: 1,
        BookId: 1
    })

})

afterAll(async () => {
    await ReadingList.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
    await Book.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
    await User.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true
    });
})

describe('GET /myreadlist', () => {
    test('GET /myreadlist success should return list of users reading list', async () => {
        let response = await request(app).get('/myreadlist')
            .set('Authorization', `Bearer ${access_token}`)

        // console.log(response.body, "<<<<<<<<");
        expect(response.status).toBe(200)
        expect(response.body[0]).toBeInstanceOf(Object)
        expect(response.body[0]).toHaveProperty('id', expect.any(Number));
        expect(response.body[0]).toHaveProperty('UserId', expect.any(Number));
        expect(response.body[0]).toHaveProperty('BookId', expect.any(Number));
        expect(response.body[0]).toHaveProperty('status', 'to read');
        expect(response.body[0]).toHaveProperty('notes', expect.any(String))
        expect(response.body[0]).toHaveProperty('Book', expect.any(Object))
    })

})

describe('POST /myreadlist/add/:id', () => {
    test('POST /myreadlist/add/:id success creating new readinglist', async () => {
        let response = await request(app).post('/myreadlist/add/2')
            .set('Authorization', `Bearer ${access_token}`)

        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', expect.any(String));
    })
})

describe('DELETE /myreadlist/delete/:id', () => {
    test('DELETE /myreadlist/delete/:id success deleting a readinglist', async () => {
        let response = await request(app).delete('/myreadlist/delete/2')
            .set('Authorization', `Bearer ${access_token}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', expect.any(String));
    })
})

describe('PUT /myreadlist/edit/:id', () => {
    test('PUT /myreadlist/edit/:id success editing a readinglist', async () => {
        console.log("SEBELUUUUM");

        let response = await request(app).put('/myreadlist/edit/1')
            .set('Authorization', `Bearer ${access_token}`)
            .send({
                notes: "fun to read",
                status: "reading"
            })

        expect(response.status).toBe(200)
    })
})
