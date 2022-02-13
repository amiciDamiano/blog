import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Categories, Article, NotFound, Category } from './pages';

const Content = () => {

    return (
        <BrowserRouter basename='/blog'>
            <Routes>
                <Route path='/:category' element={<Category />} />
                <Route path='/:category/:id' element={<Article />} />
                <Route path='/' element={<Categories />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Content;