import React, {useState}  from 'react'
import { useStateContext } from '@/context/context'

const LandingPage = () => {
 const { allData } = useStateContext()
 console.log(allData)
 return(
    <div>
<Banner />
        <div>
            <h3>Featured Movies</h3>
            {allData.map((item, key) => (
            <div key={key}>
                    <p>{item.title}</p>
            </div>
        ))
        }
        </div>
      
    </div>
 )
}

export default LandingPage;
