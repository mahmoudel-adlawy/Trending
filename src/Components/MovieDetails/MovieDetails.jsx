import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {

  let { id, mediaType } = useParams()

  const [detalies, setdetails] = useState({})
  async function getTrinding(id, mediaType) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=7bf060e50b6279d9f56f5622e2644046&language=en-US`)
    setdetails(data)
    console.log(data);
  }

  useEffect(() => {
    getTrinding(id, mediaType)
  }, [])
  return (
    <>
    {detalies?
    <>
     <div className='row'>
        <div className='col-md-3'>
          {detalies.poster_path ? <img src={'https://image.tmdb.org/t/p/w500' + detalies.poster_path} className='w-100' alt="" /> : <img src={'https://image.tmdb.org/t/p/w500' + detalies.profile_path} className='w-100' alt="" />}
        </div>

        <div className='col-md-6 d-flex align-items-center'>
          <div className=''>
            
      <h3 className='h5'>{detalies.title} {detalies.name}</h3>
      <p className='text-muted'>{detalies.overview} {detalies.biography}</p>
      {detalies.vote_average? <h4>voteaverage :  {detalies.vote_average}</h4>:''}
      {detalies.vote_count? <h4>vote_count :  {detalies.vote_count}</h4>:''}



          </div>
        </div>



      </div>
    </> 
   : <div className='d-flex justify-content-center align-items-center vh-100'>
        <span class="loader"></span>
    </div>}
     
    </>
  )
}
