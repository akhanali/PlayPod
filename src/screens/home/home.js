import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Favorites from "../favorites/favorites"
import Feed from "../feed/feed"
import Player from "../player/player"
import AlbumPage from "../album/album";
import Search from "../search/search";



import "./home.css"
import Sidebar from '../../components/sidebar/sidebar'

export default function Home() {
  return (
    <Router>
        <div className='main-body'>
          <Sidebar/>
            <Routes>
                <Route path='/feed' element = {<Feed />} />
                <Route path='/player' element = {<Player />} />
                <Route path='/favorites' element = {<Favorites />} />
                <Route path='/album/:id' element={<AlbumPage />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </div>
    </Router>
  )
}
