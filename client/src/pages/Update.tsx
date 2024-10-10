import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { server_url } from "../constants/Constant";

interface Book {
  B_NAME: string;
  B_DESC: string;
  B_PRICE: number | null;
  B_IMG: string;
}

const Update = () => {
  const [book, setBook] = useState<Book>({
    B_NAME: "",
    B_DESC: "",
    B_PRICE: null,
    B_IMG: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

 
  const bookId = location.pathname.split("/")[2];


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBook((prevBook) => ({
      ...prevBook,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await axios.put(`${server_url}/api/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="B_NAME"
        value={book.B_NAME}
        onChange={handleChange}
      />
      <textarea
        rows={5}
        placeholder="Book description"
        name="B_DESC"
        value={book.B_DESC}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="B_PRICE"
        value={book.B_PRICE ?? ""}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="B_IMG"
        value={book.B_IMG}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && <p>Something went wrong!</p>}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Update;
