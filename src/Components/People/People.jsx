import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Movies() {
  let mediaType = 'person'
  let [people, setpeople] = useState([])
  let nums = new Array(10).fill(1).map((ele, index) => index + 1)
  console.log(nums);

  async function getTrinding(page) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=7bf060e50b6279d9f56f5622e2644046&language=en-US&page=${page}`)
    setpeople(data.results)
    console.log(data.results);
  }
  useEffect(() => {
    getTrinding(1)
  }, [])
  return <>
  {people[0]? 
  <>
  <div className='row'>
      {people.map((item, index) =>

        <div key={index} className='col-md-3'>
          <Link className='text-decoration-none text-white' to={`/moviedetails/${item.id}/${mediaType}`}>
            <div className='position-relative'>
              <img src={'https://image.tmdb.org/t/p/w500' + item.profile_path} className='w-100' alt="" />
              <h3 className='h5'> {item.name}</h3>

            </div>
          </Link>

        </div>

      )}

    </div>


    <nav className='py-5'>
      <ul className='pagination pagination-sm d-flex justify-content-center'>
        {nums.map((page) =>
          <li key={page} onClick={() => getTrinding(page)} className='page-item p-1'>
            <Link className='page-link bg-transparent text-white'>{page}</Link>


          </li>
        )}


      </ul>


    </nav>
  </>
  
  : <div className='d-flex justify-content-center align-items-center vh-100'>
       <span class="loader"></span>
   </div>}
    



  </>

}
