/* eslint-disable import/no-anonymous-default-export */
import React, { useReducer } from 'react';
import propTypes from 'prop-types';

export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        const boundActions = {};

        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>;
    };

    Provider.propTypes = {
        children: propTypes.node,
    };

    return { Context, Provider };
};
