const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
let books = [];
let id = 1;
app.get("/books", function (req, res) {
  res.json(books);
});

app.post("/books", function (req, res) {
  const { title, author } = req.body;
  if (!title || !author)
    return res.status(400).json({ message: "Title and Author are required" });
  const newBook = { id: id++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});
app.put("/books/:id", (req, res) => {
  //   const bookId = parseInt(req.params.id);// Without Destructuring
  //With Destructuring
  const { id } = req.params;
  const bookId = parseInt(id); //ParseInt is used to covert string to integer
  const { title, author } = req.body;
  const book = books.find((b) => b.id === bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });
  if (title) book.title = title;
  if (author) book.author = author;
  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === bookId);
  if (bookIndex === -1)
    return res.status(404).json({ message: "Book not found" });
  books.splice(bookIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
