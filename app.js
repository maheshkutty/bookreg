const express = require('express');
const app = express();
const parser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended:true}))

app.use(express.static(__dirname + "/public"));

let books = [];
let port = 3000;

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/src/new-book.html");
})

app.post("/book", (req,res) => {
    console.log(req.body);
    books.push(req.body);
    res.send("Book Added Successfully");
});


app.post("/books", (req,res) => {
    res.json(books);
});

app.get("/booklist", (req,res) => {
    res.sendFile(__dirname + "/src/book-list.html");
});

app.listen(port, () => {
    console.log(`Listen on port ${port}`)
});

app.delete("/books/:isbn", (req,res) => {
  const isbn = req.params.isbn;
  books = books.filter((i) => {
      if(i.isbn == isbn)
        return false;
    return true;
  });
  res.json({
      status:"success"
  })  
});
