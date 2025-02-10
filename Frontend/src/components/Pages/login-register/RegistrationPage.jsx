// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useForm } from 'react-hook-form';
// import { setUser } from '../../redux/actions/userAction';
// import { loginUser } from '../../redux/actions/userAction';
// import { Link, useNavigate } from 'react-router-dom';
// import { Shield } from 'lucide-react';

// export default function RegistrationPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await fetch('http://localhost:5000/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         dispatch(setUser(userData));
//         console.log('Registration successful:', userData);
//         navigate('/login'); // Redirect to login after successful registration
//       } else {
//         const errorText = await response.json();
//         console.error('Error:', errorText.message || 'Registration failed.');
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//     }
//   };

//   return (
//     <div className="min-vh-100 bg-light py-5">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             <div className="bg-white rounded shadow-lg p-5">
//               <div className="text-center mb-4">
//                 <Shield className="text-primary mb-3" size={48} />
//                 <h2 className="h4">User Registration</h2>
//                 <p className="text-muted">Join our insurance platform</p>
//               </div>

//               <form onSubmit={handleSubmit(onSubmit)}>
//                 {/* Username Field */}
//                 <div className="mb-3">
//                   <label htmlFor="uname" className="form-label">Username</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="uname"
//                     {...register('uname', { required: 'Username is required', minLength: { value: 2, message: 'Username must have at least 2 characters' } })}
//                   />
//                   {errors.uname && <p className="text-danger">{errors.uname.message}</p>}
//                 </div>

//                 {/* Email Field */}
//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">Email Address</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     {...register('email', {
//                       required: 'Email is required',
//                       pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: 'Invalid email address' },
//                     })}
//                   />
//                   {errors.email && <p className="text-danger">{errors.email.message}</p>}
//                 </div>

//                 {/* Password Field */}
//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label">Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     {...register('password', {
//                       required: 'Password is required',
//                       pattern: { value: /^[A-Za-z0-9*%$_@.-]{8,12}$/, message: 'Password must be 8-12 characters and include valid symbols' },
//                     })}
//                   />
//                   {errors.password && <p className="text-danger">{errors.password.message}</p>}
//                 </div>

//                 {/* Address Field */}
//                 <div className="mb-3">
//                   <label htmlFor="address" className="form-label">Address</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="address"
//                     {...register('address', { required: 'Address is required' })}
//                   />
//                   {errors.address && <p className="text-danger">{errors.address.message}</p>}
//                 </div>

//                 {/* Role Field */}
//                 <div className="mb-3">
//                   <label htmlFor="role" className="form-label">Role</label>
//                   <select
//                     className="form-control"
//                     id="role"
//                     {...register('role', { required: 'Role is required' })}
//                   >
//                     <option value="Customer">Customer</option>
//                     <option value="Insurer">Insurer</option>
//                   </select>
//                   {errors.role && <p className="text-danger">{errors.role.message}</p>}
//                 </div>

//                 {/* Submit Button */}
//                 <button type="submit" className="btn btn-primary w-100">
//                   Register
//                 </button>
//               </form>

//               <div className="mt-3 text-center">
//                 <p>
//                   Already have an account?{' '}
//                   <Link to="/login" className="text-primary">Sign in</Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginSuccess } from '../../../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function RegistrationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [registrationmessage, setregistrationmessage] = useState("");

  const onSubmit = async (data) => {
    // Ensure the data matches the required format

    console.log(data);
    const payload = {
      username: data.uname,
      password: data.password,
      email: data.email,
      role: {
        roleName: "Customer"

      }
    };

    try {
      const response = await fetch('http://localhost:8251/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const userData = await response.json();
        
        // Dispatch the loginSuccess action if you want to automatically log the user in after registration
        // dispatch(loginSuccess(userData)); // Assuming userData contains the necessary user info (e.g., role, name)
        
        console.log('Registration successful:', userData);
        setregistrationmessage(" Registration successful! You will be navigated to the login page. Please sign in.")
    
    
        setTimeout(() => navigate("/login"), 3000);
        
        // Redirect to login after successful registration
      } else {
        // Handle error (such as a conflict 409 error)
        const errorText = await response.json(); // Parse the error message returned from backend
        console.log('Error:', errorText.message);
        setErrorMessage(errorText.message);
      
      }
    } catch (err) {
      console.error('Registration error:', err);
      setErrorMessage('An unexpected error occurred during registration.');
    }
  };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="bg-white rounded shadow-lg p-5">
              <div className="text-center mb-4">
                <Shield className="text-primary mb-3" size={48} />
                <h2 className="h4">User Registration</h2>
                <p className="text-muted">Join our insurance platform</p>
              </div>
             <div>
              {registrationmessage && (
            <div className="alert alert-success text-center" role="alert">
 <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", textAlign: 'center', padding: '15px', borderRadius: '5px' }}>
      {registrationmessage}
    </div>
              </div>
              ) 
            }   </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Username Field */}
                {errorMessage && 
                <div className="alert alert-danger">{errorMessage}</div>}
                <div className="mb-3">
                  <label htmlFor="uname" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="uname"
                    {...register('uname', { required: 'Username is required', minLength: { value: 2, message: 'Username must have at least 2 characters' } })}
                  />
                  {errors.uname && <p className="text-danger">{errors.uname.message}</p>}
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: 'Invalid email address' },
                    })}
                  />
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register('password', {
                      required: 'Password is required',
                      pattern: { value: /^[A-Za-z0-9*%$_@.-]{8,12}$/, message: 'Password must be 8-12 characters and include valid symbols' },
                    })}
                  />
                  {errors.password && <p className="text-danger">{errors.password.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>

              <div className="mt-3 text-center">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary">Sign in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
