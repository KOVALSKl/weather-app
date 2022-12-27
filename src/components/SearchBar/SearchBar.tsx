import { Field, Formik, Form, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import './SearchBar.scss';
import * as Yup from 'yup';

type SearchBarProps = {
    setSearch: (search: string) => void;
    classNames?: string[],
}

function SearchBar({ setSearch, classNames = [] }: SearchBarProps) {

    const formik = useFormik({
        initialValues: {
            place: ''
        },
        validateOnChange: true,
        validationSchema: Yup.object().shape({
            place: Yup.string()
                .min(2, 'Must be 2 characters or more')
                .required('Required')
        }),
        onSubmit: (values) => {
            setSearch(values.place);
            values.place = '';
        }
    });

    return (
        <form
            className={["search-bar", ...classNames].join(' ')}
            onSubmit={formik.handleSubmit}>
            <button
                type='submit'
                className='search-bar__search-button'>
                <img
                    src={require('../../images/search.svg').default}
                    className='search-bar__icon'
                />
            </button>
            <input
                className='search-bar__input'
                placeholder='Search'
                name='place'
                value={formik.values.place}
                onChange={formik.handleChange}
            />
            {formik.touched.place && formik.errors.place ? (
                <div className='errors'>
                    {formik.errors.place}
                </div>
            ) : null}
        </form>
    );
}

export default SearchBar;