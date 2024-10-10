import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server_url } from "../constants/Constant";


interface Book {
  B_NAME: string;
  B_DESC: string;
  B_PRICE: number;
  B_IMG: string;
}

const Add = () => {
  const [book, setBook] = useState<Book>({
    B_NAME: "",
    B_DESC: "",
    B_PRICE: 0,
    B_IMG: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${server_url}/api/books`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="B_NAME"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        placeholder="Book description"
        name="B_DESC"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="B_PRICE"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="B_IMG"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && <p>Something went wrong!</p>}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Add;
