import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function Register() {
  const navigate = useNavigate()
 let [errors , seterror] = useState()
 let [loading,setloading] = useState(false)


 let validate = Yup.object({
  name : Yup.string().required('name is req').min(3,'min is 3').max(15,'max is 15'),
  email : Yup.string().required('email is req').email('email.invalid'),
  password : Yup.string().required('pass is req').matches(/^[A-Z][a-z0-9]{5,15}$/,'pass must statr with capital litter'),
  rePassword : Yup.string().required('repass is req').oneOf([Yup.ref('password')],'repass is incorect'),
  phone : Yup.string().required('phone is req').matches(/^01[0125][0-9]{8}$/,'phone in valied')

 })

  let formik = useFormik({
    initialValues :{
      name : "" ,
      email : '' ,
      password : '' ,
      rePassword : ''  ,
      phone : ' ',
    },
    validationSchema : validate
    ,
    onSubmit: sendregisterdata
  });
 async function sendregisterdata(values){

  try {
    setloading(true);

    
  let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',values)
  if(data.message == 'success')
  navigate('/login')
  setloading(false)
  console.log(data);
    
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

        <label htmlFor="name">Name</label>
        <input type="text" name='name' id='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} className='form-control my-2' />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : ''}

        <label htmlFor="email">Email</label>
        <input type="email" name='email' id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className='form-control my-2' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ''}

        <label htmlFor="password">password</label>
        <input type="password" name='password' id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className='form-control my-2' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ''}

        <label htmlFor="rePassword">repass</label>
        <input type="password" name='rePassword' id='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} className='form-control my-2' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ''}

        <label htmlFor="phone">phone</label>
        <input type="tel" name='phone' id='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className='form-control my-2' />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ''}


       <button type='submit' className='btn btn-info my-2'>{loading?<i className="fas fa-spinner fa-spin"></i> : "Register"}</button>
      </form>

    </div>
    </>
  )
}
