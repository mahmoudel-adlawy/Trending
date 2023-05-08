import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Movies() {
  let mediaType = 'tv'
  let [tv, settv] = useState([])
  let nums = new Array(10).fill(1).map((ele,index)=>index+1)
  console.log(nums);

  async function getTrinding(page) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=7bf060e50b6279d9f56f5622e2644046&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`)
    settv(data.results)
    console.log(data.results);
  }
  useEffect(() => {
    getTrinding(1)
  }, [])
  return( <>
  {tv[0]? <>

    <div className='row'>
      {tv.map((item, index) =>

        <div key={index} className='col-md-3'>
          <Link className='text-decoration-none text-white' to={`/moviedetails/${item.id}/${mediaType}`}>
            <div className='position-relative'>
              {item.poster_path ? <img src={'https://image.tmdb.org/t/p/w500' + item.poster_path} className='w-100' alt="" /> : <img src={'https://image.tmdb.org/t/p/w500' + item.profile_path} className='w-100' alt="" />}
              <h3 className='h5'>{item.title} {item.name}</h3>
              {item.vote_average ? <div className="vote top-0 end-0 position-absolute p-1">{item.vote_average.toFixed(1)}</div> : ''}

            </div>
          </Link>

        </div>

      )}

    </div>

  
  <nav className='py-5'>
    <ul className='pagination pagination-sm d-flex justify-content-center'>
      {nums.map((page)=>
         <li key={page} onClick={()=>getTrinding(page)} className='page-item p-1'> 
         <Link className='page-link bg-transparent text-white'>{page}</Link>
         
   
         </li>
      )}
   

    </ul>


  </nav>
  

  </>

   : <div className='d-flex justify-content-center align-items-center vh-100'>
        <span class="loader"></span>
    </div>}
  
  
  </>)

}
