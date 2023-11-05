import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from './contexts';
import { Categories, Article, NotFound, Category, Profile, CreateArticle } from './pages';

const Content = () => {
    
    const { state: { user } } = useContext(AuthContext);

    return (
        <Routes>
            {
                user && (
                    <React.Fragment>
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/profile/article' element={<CreateArticle />} />
                    </React.Fragment>
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