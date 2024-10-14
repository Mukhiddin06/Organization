import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CapitalUsers, Organization, RegionUsers} from '../pages'

function CustomRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Organization/>} />
        <Route path='/capital-users' element={<CapitalUsers/>} />
        <Route path='/region-users' element={<RegionUsers/>} />
    </Routes>
  )
}

export default CustomRoutes