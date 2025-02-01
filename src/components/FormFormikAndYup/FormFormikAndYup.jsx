import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import s from './FormFormikAndYup.module.css'
const FormFormikAndYup = () => {
    const initialValues = {
        name: '',
        number: '',
        email: '',
        plan: '',
        aboutExperience: '',
        agree: false
    };
    const handleSubmit = (values, actions) => {
        console.log(values);
    actions.resetForm();
    }
    // regular expression for validation
const onlyLetters = /^[A-Za-zA-Яа-яЄєІіЇїҐґ-\s]+$/;
const validTel = /^\d{3}-\d{2}-\d{2}$/;
const regularExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const applyShema = Yup.object().shape({
         name: Yup.string().required('Name is required!').min(3, 'Too Short!').max(20, 'Too Long!').matches(onlyLetters, 'The name must contain only letters!'),
        number: Yup.string().required('Phone number is required!').matches(validTel, 'The number must be in the format XXX-XX-XX!'),
        email: Yup.string().required('Email is required!').matches(regularExEmail, 'Check your spelling!'),
        plan: Yup.string().oneOf(['standard','pro', 'business' ]).required('Plan is required!'),
        aboutExperience: Yup.string().required('This field is required!'),
        // agree: Yup.string().required()
            // .oneOf([true], 'This field is required!')
    })
    return (
        <div className={s.wrapper}>
            <h2>The form with Formik and YUP</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={applyShema}>
          <Form className={s.form}>
                    <Field type='text' name='name' placeholder='Name'/>
                    <ErrorMessage name='name' component='p' className={s.error}/>
                    <Field  type='tel' name='number' placeholder='Number'/>
                    <ErrorMessage name='number' component='p' className={s.error}/>
                    <Field type='email' name='email' placeholder='Email'/>
                    <ErrorMessage name='email' component='p' className={s.error}/>
                  
                    <Field as='select' name='plan' >
                        {/* вместо лейбл можно надпись поместить в опцию но которую нельзя выбрать для отправки формы */}
                        <option disabled value="">Choose your plan</option>
                        <option value="standard">Standard</option>
                        <option value="pro">Pro</option>
                        <option value="business">Business</option>
                    </Field>
                    <ErrorMessage name='plan' component='p' className={s.error}/>
                    
                    <Field as='textarea' name='aboutExperience' placeholder='Tell us about your experience...' className={s.textarea} />
                    <ErrorMessage name='textarea' component='p' className={s.error}/>
                    <label > 
                        <Field type='checkbox' name='agree' />
                        I accept all terms of use!
                    </label>
                    <ErrorMessage name='agree' component='p' className={s.error}/>
            {/* блокируем кнопкук если чекбокс не отмечен disabled={!initialValues.agree} */}
              <button  type='submit'>Submit</button>
          </Form>
     </Formik>
            </div>
  )
}

export default FormFormikAndYup