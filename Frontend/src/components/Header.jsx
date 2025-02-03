// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Shield, User } from 'lucide-react';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/slices/authSlice';

// function Header() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isAuthenticated, user } = useSelector((state) => state.auth); // Access user from Redux state
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // Handle logout functionality
//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/'); // Redirect to home page or login page after logout
//   };

//   // Toggle dropdown menu
//   const toggleDropdown = () => {
//     setDropdownOpen((prevState) => !prevState);
//   };

  

//   // Determine dashboard route based on user role or status
//   const getDashboardLink = () => {
//     if (!isAuthenticated) {
//       return '/'; 
//     }
//     if (user?.role === 'Admin') {
//       return '/admin';
//     } else if (user?.role === 'Customer') {
//       return '/customer';
//     } else if (user?.role === 'Insurer') {
//       return '/insurer';
//     }
//     return '/'; 
//     };

//   return (
//     <header className="bg-white shadow-sm py-3">
//       <nav className="container d-flex justify-content-between align-items-center">
//         <div className="d-flex align-items-center">
//           <Shield className="text-primary" style={{ width: '30px', height: '30px' }} />
//           <Link to={getDashboardLink()} className="h4 text-dark text-decoration-none ms-2">
//             Insurance Hub
//           </Link>
//         </div>
//         <div className="d-flex align-items-center">
//           {!isAuthenticated ? (
//             <>
//               <Link to="/login" className="btn btn-outline-primary btn-sm mx-2">
//                 Login
//               </Link>
//               <Link to="/register" className="btn btn-primary btn-sm mx-2">
//                 Register
//               </Link>
//             </>
//           ) : (
//             <div className="position-relative">
//               <button
//                 onClick={toggleDropdown}
//                 className="btn btn-light d-flex align-items-center"
//                 type="button"
//               >
//                 <User className="me-2" style={{ width: '20px', height: '20px' }} />
//                 <span>{user?.username || 'User'}</span>
//               </button>
//               {dropdownOpen && (
//                 <ul className="dropdown-menu dropdown-menu-end show" style={{ position: 'absolute', right: 0, top: '100%' }}>
//                   <li>
//                     <Link className="dropdown-item" to="/profile">
//                       Manage Profile
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/transactions">
//                       My Transactions
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/claims">
//                       View Claims
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/support">
//                       Customer Support
//                     </Link>
//                   </li>
//                   <li>
//                     <hr className="dropdown-divider" />
//                   </li>
//                   <li>
//                     <button className="dropdown-item text-danger" onClick={handleLogout}>
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               )}
//             </div>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;







// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Shield, User } from 'lucide-react';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/slices/authSlice';

// function Header() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isAuthenticated, user } = useSelector((state) => state.auth); // Access user from Redux state
//   const [dropdownOpen, setDropdownOpen] = useState(false); // Initialize dropdown state

//   // Handle logout functionality
//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/'); // Redirect to home page or login page after logout
//     setDropdownOpen(false); // Close dropdown after logout
//   };

//   // Toggle dropdown menu
//   const toggleDropdown = () => {
//     setDropdownOpen((prevState) => !prevState);
//   };

//   // Close dropdown when clicking outside (optional enhancement)
//   const closeDropdown = () => {
//     setDropdownOpen(false);
//   };

//   // Determine dashboard route based on user role or status
//   const getDashboardLink = () => {
//     if (!isAuthenticated) {
//       return '/'; // Redirect to home for unauthenticated users
//     }
//     if (user?.role === 'Admin') {
//       return '/admin/dashboard';
//     } else if (user?.role === 'Customer') {
//       return '/customer/dashboard';
//     } else if (user?.role === 'Insurer') {
//       return '/insurer/dashboard';
//     }
//     return '/dashboard'; // Default dashboard
//   };

//   return (
//     <header className="bg-white shadow-sm py-3">
//       <nav className="container d-flex justify-content-between align-items-center">
//         <div className="d-flex align-items-center">
//           <Shield className="text-primary" style={{ width: '30px', height: '30px' }} />
//           <Link to={getDashboardLink()} className="h4 text-dark text-decoration-none ms-2">
//             Insurance Hub
//           </Link>
//         </div>
//         <div className="d-flex align-items-center">
//           {!isAuthenticated ? (
//             <>
//               <Link to="/login" className="btn btn-outline-primary btn-sm mx-2">
//                 Login
//               </Link>
//               <Link to="/register" className="btn btn-primary btn-sm mx-2">
//                 Register
//               </Link>
//             </>
//           ) : (
//             <div className="position-relative" onBlur={closeDropdown}>
//               <button
//                 onClick={toggleDropdown}
//                 className="btn btn-light d-flex align-items-center"
//                 type="button"
//               >
//                 <User className="me-2" style={{ width: '20px', height: '20px' }} />
//                 <span>{user?.username || 'User'}</span>
//               </button>
//               {dropdownOpen && (
//                 <ul
//                   className={`dropdown-menu dropdown-menu-end ${
//                     dropdownOpen ? 'show' : ''
//                   }`}
//                   style={{ position: 'absolute', right: 0, top: '100%' }}
//                 >
//                   <li>
//                     <Link className="dropdown-item" to="/profile">
//                       Manage Profile
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/transactions">
//                       My Transactions
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/claims">
//                       View Claims
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/support">
//                       Customer Support
//                     </Link>
//                   </li>
//                   <li>
//                     <hr className="dropdown-divider" />
//                   </li>
//                   <li>
//                     <button className="dropdown-item text-danger" onClick={handleLogout}>
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               )}
//             </div>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;


import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const getDashboardLink = () => {
        if (!isAuthenticated) {
          return '/'; // Redirect to home for unauthenticated users
        }
        if (user?.role === 'Admin') {
          return '/admin';
        } else if (user?.role === 'Customer') {
          return '/customer';
        } else if (user?.role === 'Insurer') {
          return '/insurer';
        }
        return '/dashboard'; // Default dashboard
      };

  return (
    <header className="bg-white shadow-sm py-3">
      <nav className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Shield className="text-primary" style={{ width: '30px', height: '30px' }} />
          <Link to={getDashboardLink()} className="h4 text-dark text-decoration-none ms-2">
             Insurance Hub
           </Link>
        </div>
        <div className="d-flex align-items-center">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="btn btn-outline-primary btn-sm mx-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm mx-2">
                Register
              </Link>
            </>
          ) : (
            <div ref={dropdownRef} className="position-relative">
              <button
                onClick={toggleDropdown}
                className="btn btn-light d-flex align-items-center"
                type="button"
              >
                <User className="me-2" style={{ width: '20px', height: '20px' }} />
                <span>{user?.username || 'User'}</span>
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu dropdown-menu-end show" style={{ position: 'absolute', right: 0, top: '100%' }}>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Manage Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/transactions">
                      My Transactions
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/claims">
                      View Claims
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/support">
                      Customer Support
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
