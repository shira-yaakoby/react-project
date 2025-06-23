import React, { FC, useState } from 'react';
import '../../scss/form-style.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { SignupModel } from '../../models/SignupModel';
import { useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';

interface SignupProps { }

const Signup: FC<SignupProps> = () => {
  const loginNavigation = useNavigate();
  const [signupMessage, setSignupMessage] = useState<string | null>(null);

  const signupUser = async (values: SignupModel) => {
    try {
      const check = await axios.get(`http://localhost:3001/users?email=${values.email}`);

      if (check.data.length > 0) {
        alert('אימייל זה כבר רשום במערכת');
        return;
      }

      const response = await axios.post('http://localhost:3001/users', values);
      setSignupMessage('User added successfully. Please log in.');
      console.log('המשתמש נוסף:', response.data);
    } catch (error) {
      console.error('שגיאה בהרשמה:', error);
      alert('שגיאה בהרשמה. נסי שוב.');
    }
  };


  const myForm = useFormik({
    initialValues: new SignupModel,
    onSubmit: signupUser,
    validationSchema: yup.object().shape({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup
        .string()
        .min(8)
        .max(20)
        .required()
        .test((value) => {
          if (!value) return false;
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
          return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
        }),
    }),
  });

  return (
    <div className="enter">
      <div className="enter-box">
        <div className="icon-wrapper">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2>Create Your Account</h2>
        <p className="subtitle">Register to access the site</p>

        <form onSubmit={myForm.handleSubmit} className="signup">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" onChange={myForm.handleChange} type="name" placeholder="Your full name" required />
          {myForm.errors.name && <small className="text-danger">{myForm.errors.name}</small>}

          <label htmlFor="email">Email</label>
          <input id="email" name="email" onChange={myForm.handleChange} type="email" placeholder="your@email.com" required />
          {myForm.errors.email && <small className="text-danger">{myForm.errors.email}</small>}

          <label htmlFor="password">Password</label>
          <input id="password" name="password" onChange={myForm.handleChange} type="password" placeholder="••••••••" required />
          {myForm.errors.password && <small className="text-danger">{myForm.errors.password}</small>}
          <button type="submit" className="submit-btn" >Sign Up</button>
          {signupMessage && (
            <div style={{ color: 'green', marginTop: '1rem', textAlign: 'center' }}>
              {signupMessage}
            </div>
          )}
        </form>

        <div className="or-divider">or continue with</div>

        <button className="social-btn">
          <img src="https://img.icons8.com/color/20/000000/google-logo.png" alt="Google" />
          Google
        </button>
        <button className="social-btn">
          <img src="https://img.icons8.com/color/20/000000/facebook-new.png" alt="Facebook" />
          Facebook
        </button>

        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#718096' }}>
          Already have an account? <button className="submit-btn" onClick={() => { loginNavigation('/login') }}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
