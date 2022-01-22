import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Article, NotFound } from './pages';

const Content = () => {

    return (
        <BrowserRouter basename='/blog'>
            <Routes>
                <Route path='/articles' element={<Article />} />
                <Route path='/' element={<Article />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Content;