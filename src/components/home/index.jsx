import React from 'react'
import { useAuth } from '../../contexts/authContext'
// import {VideoCall} from '../../src/videocall';

const Home = () => {
    const { currentUser } = useAuth()
    return (
        <div className='text-2xl font-bold pt-14'>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.
        
        {/* <VideoCall /> */}
        </div>
        
             
        // </div>
    )
}

export default Home

