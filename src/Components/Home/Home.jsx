import  axios  from 'axios';
import React, { useEffect, useState } from 'react'
import Mediaitem from '../Mediaitem/Mediaitem';


export default function Home() {

  const [movies,setmovies] =useState([])
  const [tv,settv] = useState([])
  const [people,setpeople] = useState([])

 async function getTrinding(mediaItem,callback){
  let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaItem}/week?api_key=7bf060e50b6279d9f56f5622e2644046`)
  callback(data.results)
  console.log(data.results);

  }
  useEffect(()=>{
    getTrinding('movie', setmovies)
    getTrinding('tv', settv)
    getTrinding('person', setpeople)
  },[])




  return (  <>
   {movies[0]?
   <>
    <div className="row py-3">
      <div className='col-md-4 d-flex align-items-center'>
       <div>
      <div className='brdr w-25 my-3'>  </div>
      <h2 className='h3'>Trending <br />movies <br />To watch now</h2>
      <p className='text-muted'>Most watch Movies by Week</p>
      <div className='brdr w-100 mt-3'>  </div>
      </div>
      </div>
     {movies.slice(0,10).map((item,index)=> <Mediaitem key={index} item={item}></Mediaitem>)}
    </div>
    <div className="row py-3">
      <div className='col-md-4 d-flex align-items-center'>
       <div>
      <div className='brdr w-25 my-3'>  </div>
      <h2 className='h3'>Trending <br />tv <br />To watch now</h2>
      <p className='text-muted'>Most watch tv by Week</p>
      <div className='brdr w-100 mt-3'>  </div>
      </div>
      </div>
     {tv.slice(0,10).map((item,index)=> <Mediaitem key={index} item={item}></Mediaitem>)}
    </div>
    <div className="row py-3">
      <div className='col-md-4 d-flex align-items-center'>
       <div>
      <div className='brdr w-25 my-3'>  </div>
      <h2 className='h3'>Trending <br />people <br />To watch now</h2>
      <p className='text-muted'>Most watch people by Week</p>
      <div className='brdr w-100 mt-3'>  </div>
      </div>
      </div>
     {people.slice(0,10).map((item,index)=> <Mediaitem key={index} item={item}></Mediaitem>)}
    </div>

   
   </>
   
   : <div className='d-flex justify-content-center align-items-center vh-100'>
        <span class="loader"></span>
    </div>}
   
    </>

    )
    
}
