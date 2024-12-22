import css from './SearchBar.module.css';
import { IoIosSearch } from "react-icons/io";
import { Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import React from 'react';

interface SearchBarProps {
  onSubmit: (query: string) => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const initialValues = { query: '' };

  const handleSubmit = (
    values: { query: string }, 
    { resetForm }: { resetForm: () => void }
  ) => {
    if (values.query.trim() === '') {
      toast.error("Please fill in the field");
      return;
    }
    onSubmit(values.query);
    resetForm();
  };

  return (
    <header className={css.header}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <button className={css.buttonSearch} type="submit">
            <IoIosSearch className={css.iconSearch} />
          </button>
          <Field
            name="query"
            className={css.searchInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
