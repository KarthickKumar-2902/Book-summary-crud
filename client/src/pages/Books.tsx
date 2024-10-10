import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { server_url } from "../constants/Constant";

interface Book {
  B_ID: number;
  B_NAME: string;
  B_DESC: string;
  B_IMG: string;
  B_PRICE: number;
  B_DATE: string;
}
const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(`${server_url}/api/books`);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(books);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${server_url}/api/books/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Book Store</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.B_ID} className="book">
            <img src={book.B_IMG} alt="" />
            <h2>{book.B_NAME}</h2>
            <p>{book.B_DESC}</p>
            <span>${book.B_PRICE}</span>
            <button className="delete" onClick={() => handleDelete(book.B_ID)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${book.B_ID}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;