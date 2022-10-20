import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from './contexts';
import { Categories, Article, NotFound, Category, Profile } from './pages';

const Content = () => {
    
    const { state: { user } } = useContext(AuthContext);

    return (
        <Routes>
            {
                user && (
                    <Route path='/profile' element={<Profile />} />
                )
            }
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