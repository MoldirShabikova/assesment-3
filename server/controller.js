const books = require("./db.json");
let globalId = 3;

module.exports = {


    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) =>{
        const fortunes = ["All will go well with your new project!", "A pleasant surprise is waiting for you!", "A lifetime of happiness lies ahead of you", "A truly rich life contains love and art in abundance", "One can never fill another’s shoes, rather he must outgrow the old shoes!", "You are almost there!"];

        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex]

        res.status(200).send(randomFortune)
    },
    getAllBooks: (req, res)=> {
        res.status(200).send(books)
    },
    createBook: (req, res)=> {
        const {title, author,bookCoverImg, bookQuote} = req.body;
            let newBook = {
                id: globalId,
                title,
                author,
                bookCoverImg,
                bookQuote
            }
            books.push(newBook)
            res.status(200).send(books)
            globalId++
    },
    deleteBook: (req, res)=> {
        let {id} = req.params;
        let index = books.findIndex((book)=> book.id===+id)
        books.splice(index, 1);
        res.status(200).send(books)
    },
    updateBook: (req, res)=> {
        let {id} = req.params;
        let {type} = req.body;
        let index= books.findIndex((book)=> book.id===+id)
        if(type==='minus'){
            +books[index].price--
            res.status(200).send(books)
        } else if (type==='plus'){
            +books[index].price++
            res.status(200).send(books)
        } else {
            res.sendStatus(400)
        }
    }
}