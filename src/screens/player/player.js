import React from 'react'
import { usePlayer } from "../../context/playerContext";
import "./player.css";

export default function Player() {
  const { track } = usePlayer();

  if (!track) {
    return <div className='screen-container'> <p className="no-track" >No track selected</p>;</div>
   
  }

  return (
    <div className='screen-container'>
      <div className='player-page'>
        <img src={track.artworkUrl100} alt={track.trackName} className="player-art" />
        <h2>{track.trackName}</h2>
        <p>{track.artistName}</p>
        <audio controls autoPlay src={track.previewUrl}></audio>
      </div>
    </div>
  )
}
