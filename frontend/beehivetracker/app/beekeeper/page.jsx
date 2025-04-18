import React from 'react'
import HiveLogsViewer from '../../Components/HiveLogsViewer'
import Hiveloger from "../../Components/HiveLoggerForm"
import Navbar from "../../Components/Navbar"

function page() {
  return (
    <div>
        <Navbar/>
        <HiveLogsViewer />

    <Hiveloger/>
    
    
    </div>
  )
}

export default page