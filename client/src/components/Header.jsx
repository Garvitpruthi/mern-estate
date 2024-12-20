//  import { FaSearch } from 'react-icons/fa'
//  import {Link, useNavigate} from 'react-router-dom'
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'

// function Header() {
//     const { currentUser } = useSelector((state)=>state.user)
//     console.log("currentUser: ", currentUser)
//     const [searchTerm, setSearchTerm] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       const urlParams = new URLSearchParams(window.location.search);
//       urlParams.set('searchTerm', searchTerm);
//       const searchQuery =  urlParams.toString();
//       navigate(`/search?${searchQuery}`);
//     }

//     useEffect(()=>{
//       const urlParams = new URLSearchParams(location.search);
//       const searchTermFromUrl = urlParams.get('searchTerm');
//       if(searchTermFromUrl){
//         setSearchTerm(searchTermFromUrl);
//       }
//     }, [location.search])

//   return (
//     <header className='bg-slate-200 shadow-md'>
//         <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
//             <Link to='/'>
//                 <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
//                     <span className='text-slate-500'>Sahand</span>
//                     <span className='text-slate-700'>Estate</span>
//                 </h1>
//             </Link>
//             <form className='bg-slate-100 p-3rounded-lg flex items-center' onSubmit={handleSubmit}> 
//                 <input type="text" placeholder="Search...." 
//                 className='bg-transparent focus:outline-none w-24 sm:w-64' value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}/>
//                 <button>
//                   <FaSearch className='text-slate-600'/>
//                 </button>
                
//             </form>
            
//             <ul className='flex gap-4'>
//                 <Link to='/'>
//                     <li className='hidden sm:inline text-state-700 hover:underline'>Home</li>
//                 </Link>
//                 <Link to='/about'>
//                     <li className='hidden sm:inline text-state-700 hover:underline'>About</li>
//                 </Link>

//                 <Link to='/profile'>
//             {currentUser ? (
//               <img
//                 className='rounded-full h-7 w-7 object-cover'
//                 src={currentUser.avatar}
//                 alt='profile'
//               />
//             ) : (
//               <li className=' text-slate-700 hover:underline'> Sign in</li>
//             )}
//           </Link>
                    
                
//             </ul>
//         </div>
//     </header>
//   )
// }

// export default Header


// import { FaSearch, FaUserCircle } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// function Header() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set('searchTerm', searchTerm);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl);
//     }
//   }, [location.search]);

//   return (
//     <header className='bg-slate-200 shadow-md'>
//       <div className='flex justify-between items-center max-w-6xl mx-auto px-3 py-4'>
//         <Link to='/'>
//           <h1 className='font-bold text-2xl flex flex-wrap'>
//             <span className='text-slate-500'>Woodland</span>
//             <span className='text-slate-700'>Escape</span>
//           </h1>
//         </Link>
//         <div className='flex items-center'>
//           <form
//             className='bg-white rounded-lg flex items-center shadow-md mr-4'
//             onSubmit={handleSubmit}
//           >
//             <input
//               type='text'
//               placeholder='Search...'
//               className='bg-transparent focus:outline-none w-64 px-3 py-2 rounded-l-lg'
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button
//               type='submit'
//               className='bg-slate-700 text-white rounded-r-lg px-4 py-2 hover:bg-slate-600 transition-colors duration-300'
//             >
//               <FaSearch className='text-white' />
//             </button>
//           </form>
//           <nav className='flex items-center'>
//             <ul className='flex gap-4'>
//               <Link to='/'>
//                 <li className='text-slate-700 hover:text-slate-500 transition-colors duration-300'>
//                   Home
//                 </li>
//               </Link>
//               <Link to='/about'>
//                 <li className='text-slate-700 hover:text-slate-500 transition-colors duration-300'>
//                   About
//                 </li>
//               </Link>
//               {/* <Link to='/contact'>
//                 <li className='text-slate-700 hover:text-slate-500 transition-colors duration-300'>
//                   Contact
//                 </li>
//               </Link> */}
//             </ul>
//             <Link to='/profile'>
//               {currentUser ? (
//                 <img
//                   className='rounded-full h-8 w-8 object-cover ml-4'
//                   src={currentUser.avatar}
//                   alt='profile'
//                 />
//               ) : (
//                 <FaUserCircle className='text-slate-700 text-2xl ml-4 hover:text-slate-500 transition-colors duration-300' />
//               )}
//             </Link>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;

// import { FaSearch, FaUserCircle, FaHome } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// function Header() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set('searchTerm', searchTerm);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl);
//     }
//   }, [location.search]);

//   return (
//     <header className='bg-slate-200 shadow-md'>
//       <div className='flex justify-between items-center max-w-6xl mx-auto px-3 py-4'>
//         <Link to='/'>
//           <h1 className='font-bold text-2xl flex flex-wrap'>
//             <span className='text-slate-500'>Woodland</span>
//             <span className='text-slate-700'>Escape</span>
//           </h1>
//         </Link>
//         <div className='flex items-center'>
//           <form
//             className='bg-white rounded-lg flex items-center shadow-md mr-4'
//             onSubmit={handleSubmit}
//           >
//             <input
//               type='text'
//               placeholder='Search...'
//               className='bg-transparent focus:outline-none w-64 px-3 py-2 rounded-l-lg'
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button
//               type='submit'
//               className='bg-slate-700 text-white rounded-r-lg px-4 py-2 hover:bg-slate-600 transition-colors duration-300'
//             >
//               <FaSearch className='text-white' />
//             </button>
//           </form>
//           <nav className='flex items-center'>
//             <ul className='flex gap-4'>
//               <Link to='/'>
//                 <li className='text-slate-700 hover:text-slate-500 transition-colors duration-300'>
//                   Home
//                 </li>
//               </Link>
//               <Link to='/about'>
//                 <li className='text-slate-700 hover:text-slate-500 transition-colors duration-300'>
//                   About
//                 </li>
//               </Link>
//               <Link to='/saved-homes'>
//                 <li className='text-slate-700 hover:text-slate-500 transition-colors duration-300 flex items-center'>
//                   <FaHome className='mr-1 text-slate-700' /> Saved Homes
//                 </li>
//               </Link>
//             </ul>
//             <Link to='/profile'>
//               {currentUser ? (
//                 <img
//                   className='rounded-full h-8 w-8 object-cover ml-4'
//                   src={currentUser.avatar}
//                   alt='profile'
//                 />
//               ) : (
//                 <FaUserCircle className='text-slate-700 text-2xl ml-4 hover:text-slate-500 transition-colors duration-300' />
//               )}
//             </Link>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;


import { FaSearch, FaUserCircle, FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto px-3 py-4'>
        <Link to='/'>
          <h1 className='font-bold text-2xl flex flex-wrap'>
            <span className='text-slate-500'>Woodland</span>
            <span className='text-slate-700'>Escape</span>
          </h1>
        </Link>
        <div className='flex items-center'>
          <form
            className='bg-white rounded-lg flex items-center shadow-md mr-4'
            onSubmit={handleSubmit}
          >
            <input
              type='text'
              placeholder='Search...'
              className='bg-transparent focus:outline-none w-64 px-3 py-2 rounded-l-lg'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type='submit'
              className='bg-slate-700 text-white rounded-r-lg px-4 py-2 hover:bg-slate-600 transition-colors duration-300'
            >
              <FaSearch className='text-white' />
            </button>
          </form>
          <nav className='flex items-center'>
            <ul className='flex gap-4'>
              <Link to='/'>
                <li className='text-slate-700 hover:text-slate-500 transition-colors duration-300'>
                  Home
                </li>
              </Link>
              <Link to='/about'>
                <li className='text-slate-700 hover:text-slate-500 transition-colors duration-300'>
                  About
                </li>
              </Link>
              <Link to='/saved-homes'>
                <li className='text-slate-700 hover:text-slate-500 transition-colors duration-300 flex items-center'>
                  <FaHome className='mr-1 text-slate-700' /> Saved Homes
                </li>
              </Link>
              {/* Add Listings Report link here */}
              <Link to='/listings-report'>
                <li className='text-slate-700 hover:text-slate-500 transition-colors duration-300'>
                  Listings Report
                </li>
              </Link>
            </ul>
            <Link to='/profile'>
              {currentUser ? (
                <img
                  className='rounded-full h-8 w-8 object-cover ml-4'
                  src={currentUser.avatar}
                  alt='profile'
                />
              ) : (
                <FaUserCircle className='text-slate-700 text-2xl ml-4 hover:text-slate-500 transition-colors duration-300' />
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
