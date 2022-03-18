import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Categories, Article, NotFound, Category } from './pages';

const Content = () => {

    return (
        <Routes>
            <Route path='*/404' element={<NotFound />} />
            <Route path='/404/*' element={<NotFound />} />
            <Route path='*/404/*' element={<NotFound />} />
            <Route path='/:category' element={<Category />} />
            <Route path='/:category/:id' element={<Article />} />
            <Route path='/' element={<Categories />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default Content;