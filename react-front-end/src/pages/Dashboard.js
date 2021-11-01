
import React from 'react'
import Friendlist from '../components/Friendship/Friendlist'


const Dashboard = () => {
  return (
    <div className="container-dashboard">
      {/* <h1 className="text-center" style={{ paddingTop: "30%" }}>
        
      </h1> */}
      <div className="container">
      <Friendlist/>
      </div>
    </div>
  )
}
export default Dashboard;
