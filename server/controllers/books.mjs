import { validationResult } from "express-validator";
import Book from "../models/book.mjs";

const getAllBooks = async (req, res) => {
  const books = await Book.find().sort({ updatedAt: -1 });
  res.json(books);
};

const getBookById = async (req, res) => {
  const fetchTargetId = req.params.id;
  const book = await Book.findById(fetchTargetId);
  if (book === null) return res.status(404).json({msg: 'Page Not Found'})
  res.json(book);
};

const deleteBook = async (req, res) => {
  const deleteTargetId = req.params.id;
  console.log(deleteTargetId)
  const { deletedCount } = await Book.deleteOne({ _id: deleteTargetId });
  return deletedCount === 0 ? res.status(404).json({ msg: 'TargetBook Not Found'}) : res.json({ msg: "delete succeed" });
};

const registBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }
  const postedBook = new Book(req.body);
  const newBook = await postedBook.save();
  res.status(201).json(newBook);
};

const updateBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }
  const { title, description, comment, rating } = req.body;
  const patchTargetId = req.params.id;
  const patchTargetBook = await Book.findById(patchTargetId);
  if (title !== undefined) patchTargetBook.title = title;
  if (description !== undefined) patchTargetBook.description = description;
  if (comment !== undefined) patchTargetBook.comment = comment;
  if (rating !== undefined) patchTargetBook.rating = rating;
  await patchTargetBook.save();
  res.json(patchTargetBook);
};
export { registBook, updateBook, getAllBooks, getBookById, deleteBook };
