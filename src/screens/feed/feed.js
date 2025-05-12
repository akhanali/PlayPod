import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./feed.css"
import { useNavigate } from "react-router-dom";



export default function Feed() {

  const navigate = useNavigate();


  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    async function fetchTopAlbums() {
      try {
        const res = await axios.get("http://localhost:5000/api/top-albums");
        setAlbums(res.data);
      } catch (err) {
        console.error("Error fetching top albums", err);
      }
    }

    fetchTopAlbums();
  }, []);
  return (
    <div className="screen-container">
      <h2>Top Albums</h2>
      <div className="album-row">
        {albums.length === 0 ? (
          <p>No albums found.</p>
        ) : (
          <div className="album-row">
            {albums.map((album) => (
              <div
                key={album.id}
                className="album-card"
                onClick={() => navigate(`/album/${album.id}`)}
              >
                <img src={album.image} alt={album.albumName} />
                <p className="album-title">{album.albumName}</p>
                <p className="album-artist">{album.artist}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
