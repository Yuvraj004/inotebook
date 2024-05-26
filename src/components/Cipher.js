import React, { useState } from "react";

const Cipher = (props) => {
  const [cipherData,setCipherData] = useState("")
  const [data, setData] = useState({
    title: "",
    description: "",
    data: ""
  });
  const cipherNotes = async (data)=>{
    const host = "http://localhost:5000";

    const res =await fetch(`${host}/`,{
      method:'GET',
      headers:{
          'Content-Type':'application/json',
      }
    })
    const chec = await res.json();
    console.log(chec);
    
      const response = await fetch(`${host}/vernamC/ciphering`,{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
          },
          body:JSON.stringify(data),
      });
      const json = await response.json();
      console.log(json);
      setCipherData(json);
  }

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
          <p></p>
          {JSON.stringify(cipherData)}
        </div>
      </div>
    </div>
  );
};

export default Cipher;
