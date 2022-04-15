/* eslint-disable no-shadow */
import moment from 'moment';
import { useEffect, useState } from 'react';

export const validate = (validations, values) => {
    const errors = validations
        .map((validation) => validation(values))
        .filter((validation) => typeof validation === 'object');
    return {
        isValid: errors.length === 0,
        errors: errors.reduce((errs, error) => ({ ...errs, ...error }), {}),
    };
};

export const isDateGreater = (date, checkDate) =>
    moment(date, moment.HTML5_FMT.DATE).diff(moment(checkDate, moment.HTML5_FMT.DATE)) <= 0;
export const isRequired = (value) =>
    value !== null && value !== undefined && String(value).trim().length > 0;

export const isSame = (value1, value2) => value1 === value2;

export const isEmail = (value) => {
    if (value) {
        // eslint-disable-next-line no-useless-escape
        return /[A-z0-9\.\+_-]+@[A-z0-9\._-]+\.[A-z]{2,6}/.test(value);
    }
    return true;
};
const useForm = (initialState = {}, validations = [], onSubmit = () => {}) => {
    const { isValid: initialIsValid, errors: initialErrors } = validate(validations, initialState);
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);
    const [isValid, setValid] = useState(initialIsValid);
    const [touched, setTouched] = useState({});

    const changeHandler = (name, value) => {
        const newValues = { ...values, [name]: value };
        const { isValid, errors } = validate(validations, newValues);
        setValues(newValues);
        setValid(isValid);
        setErrors(errors);
        setTouched({ ...touched, [name]: true });
    };

    useEffect(() => {
        const { isValid, errors } = validate(validations, values);
        setValid(isValid);
        setErrors(errors);
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();
        onSubmit(values);
    };

    const reset = () => {
        const { isValid: initialIsValid, errors: initialErrors } = validate(
            validations,
            initialState
        );
        setTouched({});
        setValues(initialState);
        setErrors(initialErrors);
        setValid(initialIsValid);
    };

    return { values, changeHandler, isValid, errors, touched, submitHandler, setValues, reset };
};

export default useForm;
