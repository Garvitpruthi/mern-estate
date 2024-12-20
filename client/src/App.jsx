import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import VerifyOtp from './pages/VerifyOtp'
import About from './pages/About'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import { UpdateListing } from './pages/UpdateListing'
import Listing from './pages/Listing.jsx'
import Search from './pages/Search.jsx'
import SavedHomesPage from './pages/SavedHomes.jsx'
import ListingReport from './pages/Listings-report.jsx'


function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/verify-otp' element={<VerifyOtp />}/>
      
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/update-listing/:listingId' element={<UpdateListing />} />
          <Route path = '/saved-homes' element={<SavedHomesPage />} />
          <Route path = 'listings-report' element={<ListingReport/>}></Route>
        </Route>
      </Routes> 
    </BrowserRouter>
  )
}

export default App