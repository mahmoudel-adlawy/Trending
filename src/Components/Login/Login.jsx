import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function Login({savecurntuser}) {
  const navigate = useNavigate()
  
 let [errors , seterror] = useState()
 let [loading,setloading] = useState(false)


 let validate = Yup.object({
  email : Yup.string().required('email is req').email('email.invalid'),
  password : Yup.string().required('pass is req').matches(/^[A-Z][a-z0-9]{5,15}$/,'pass must statr with capital litter'),

 })

  let formik = useFormik({
    initialValues :{
      email : '' ,
      password : '' ,
    },
    validationSchema : validate
    ,
    onSubmit: logindata
  });
 async function logindata(values){

  try {
    setloading(true);

    
  let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',values)
  if(data.message == 'success'){
    localStorage.setItem('usertoken', data.token)
    savecurntuser()
    
  navigate('/')
  setloading(false)
  console.log(data);
    

  }
  
  } catch (error) {
    seterror(error.response.data.message)
    setloading(false)

    console.log(error.response.data.message)

    
  }
    
  }


  return (

    <>
    <div className='w-75 mx-auto'>
      <form onSubmit={formik.handleSubmit}>

        {errors? <div className='alert alert-danger'>{errors}</div> : ''}

        <label htmlFor="email">Email</label>
        <input type="email" name='email' id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className='form-control my-2' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}

        <label htmlFor="password">password</label>
        <input type="password" name='password' id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className='form-control my-2' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}

       


       <button type='submit' className='btn btn-info my-2'>{loading?<i className="fas fa-spinner fa-spin"></i> : "login"}</button>
      </form>

    </div>
    </>
  )
}
