import React, { useState, useEffect } from "react";
import "./Card.css";
import {BsFillArrowRightCircleFill} from "react-icons/bs"
import axios from 'axios'

function Card() {
  const data = ['password1', 'password2', 'password3', 'password4'];
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [pList,setPList]= useState([])
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSave = () => {
    axios.post("http://localhost:9000/addpassword",{
      password: password,
      title: title
    })
  };
  useEffect(()=>{
    axios.get("http://localhost:9000/showpassword").then((resp)=>{
        setPList(resp.data)
    })
  },[])

  const decryptPassword = (encryption)=>{
      axios.post("http://localhost:9000/decryptpassword",{
        password: encryption.password,
        iv: encryption.iv
      }).then((resp)=>{
         setPList(
          pList.map((val)=>{
            return val.id === encryption.id ? {
              id: val.id,
              password: val.password,
              title: resp.data,
              iv: val.iv
            } : val
          })
         )
      })
  }
  return (
    <>
    <div className="card">
      <div className="card-image"></div>
      <div className="card-content">
      <h2>Secure your Password</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="card-save-button" onClick={handleSave}>
          Save <BsFillArrowRightCircleFill/>
        </button>
      </div>
    </div>
    <br/>
    <div className="list">
      {pList.map((p, index) => (
        <>
        <div
          key={index}
          className="box"
          style={{
            
            transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(-1)}
        >
          <span className="box-text">{p.title}</span>
          <button className="box-button" onClick={()=>{decryptPassword({password: p.password,iv: p.iv, id: p.id})}}>Show password</button>
          <br/>
        </div>
       
        </>
      ))}
    </div>
    </>
  );
}

export default Card;
