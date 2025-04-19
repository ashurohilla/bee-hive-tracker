import React from 'react'
import HiveLogsViewer from '../../Components/HiveLogsViewer'
import Hiveloger from "../../Components/HiveLoggerForm"
import Navbar from "../../Components/Navbar"
import Nearbycrops from "../../Components/Nearbycrop"
function page() {
  return (
    <div>
        <Navbar/>
        <HiveLogsViewer />

    <Hiveloger/>
    <Nearbycrops/>
    
    
    </div>
  )
}

export default page