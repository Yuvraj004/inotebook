import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteConnect";

const Cipher = (props) => {
  const context = useContext(noteContext);
  const { cipherNotes } = context;
  const [data, setData] = useState({
    title: "",
    description: "",
    data: ""
  });

  const handleClick = (e) => {
    e.preventDefault();
    cipherNotes(data);
    props.showAlert("ciphered successfully", "success");
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-4">
        <h1>Add a note</h1>
        <form className="my-3" action="">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Kanishk Upadhyay"
              onChange={onChange}
              value={data.title}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              value={data.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="data" className="form-label">
              DATA
            </label>
            <input
              type="text"
              className="form-control"
              id="data"
              name="data"
              onChange={onChange}
              value={data.data}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit" onClick={handleClick}>
              Cipher
            </button>
          </div>
        </form>
        <div>
          {JSON.stringify(data)}
        </div>
      </div>
    </div>
  );
};

export default Cipher;
