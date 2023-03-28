import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SongDetails({id}){

    const baseUrl = 'http://localhost:3030/jsonstore/songs/'

    const navigate = useNavigate();

    const [song, setSong] = useState({});

    useEffect(()=>{
      fetch(baseUrl+id)
      .then(res=>res.json())
      .then(data=>setSong(data));
    }, [])
    
   async  function onDeleteClick(e){
     const res = await fetch(baseUrl+id, {
        method: "DELETE"
      })
      const data = await res.json();

      console.log(data);

      navigate('/catalog');
    }

    return (
        <div className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1 className="about_taital">
                <img src="/images/icon-1.png" /> <span>{song.name}</span>
              </h1>
              <p className="about_text_2">
                Artist: {song.singer}
              </p>
              <p className="about_text_2">
                Genre: {song.genre}
              </p>
              <p className="about_text_2">
                Description: {song.description}
              </p>
              <div className="read_bt">
                <Link to={'/catalog'}>Back</Link>
              </div>
              <div className="read_bt">
                <Link to={`/edit/${id}`}>Edit</Link>
              </div>
              <div className="read_bt">
                <Link onClick={onDeleteClick}>Delete</Link>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <img src={`${song.imageUrl}`} className="image_1" />
              </div>
            </div>
          </div>
        </div>
      </div>);
}