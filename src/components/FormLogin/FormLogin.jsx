import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import s from './FormLogin.module.css'
import { useContext } from 'react'
import { authContext } from '../Provider/AuthentProvider/AuthentProvider'
const FormLogin = () => {
    const { login } = useContext(authContext);
    const initialValues = {
        userName: '',
        email: '',
        password: '',
        agree: false,
    }
    const onSubmit = (values, actions) => {
        console.log(values.userName);
        login(values.userName)
    actions.resetForm();
    }
    const onlyLetters = /^[A-Za-zA-Яа-яЄєІіЇїҐґ-\s]+$/;
const regularExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required('Name is required!').min(3, 'Too Short!').max(20, 'Too Long!').matches(onlyLetters, 'The name must contain only letters!'),
         email: Yup.string().required('Email is required!').matches(regularExEmail, 'Check your spelling!'),
        password: Yup.string().required('Password is required!'),
       
    });
  return (
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <div className={s.wrapper}>
          <Form className={s.form}>
              <Field type='text' name='userName' placeholder='Create your user name' />
              <Field type='email' name='email' placeholder='Your email' />
              <ErrorMessage name='userName' component='p'/>
              <Field type='password' name='password' placeholder='Create your password' />
              <ErrorMessage name='password' component='p'/>
         <label > 
                      <Field type='checkbox' name='agree' className={s.checkbox} />
                        I accept all terms of use!
              </label>
              <ErrorMessage name='agree' component='p'/>
              <button type='submit'>Login</button>
              </Form>
              </div>
    </Formik>
  )
}

export default FormLogin