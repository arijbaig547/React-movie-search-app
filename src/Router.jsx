import React from 'react'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/movie/:id' element={<MovieDetail/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router