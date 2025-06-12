import React, { FC } from 'react';
import './Login.scss';
import { useFormik } from 'formik';
import { log } from 'node:console';
import * as yup from 'yup';
import { LoginModel } from "../../models/LoginModel";

const Login: FC = () => {
 const loginUser = async (value: LoginModel) => {
  try {
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();

    const user = users.find(
      (u: any) => u.email === value.email && u.password === value.password
    );

    if (user) {
      console.log('משתמש קיים:', user);
       localStorage.setItem('loggedUser', JSON.stringify(user));
      // window.location.href = '/home';
    } else {
      alert('המשתמש לא קיים. נעבור לעמוד הרשמה.');
      // window.location.href = '/signup';
    }
  } catch (err) {
    console.error('שגיאה בכניסה:', err);
    alert('הייתה שגיאה בשרת, נסי שוב מאוחר יותר.');
  }
};

  const myForm = useFormik({
    initialValues: new LoginModel(),
    onSubmit: loginUser,
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(8).max(20).required().test((value) => {
        if (!value) return false;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
      })
    })
  })

  return <div className="Login">
    <div className="login-box">
      <div className="icon-wrapper">
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h2>Sign In to Your Account</h2>
      <p className="subtitle">Access your account to continue</p>

      <form onSubmit={myForm.handleSubmit} className="login">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" onChange={myForm.handleChange} type="email" placeholder="your@email.com" required />
        {myForm.errors.email ? <small className='text-danger'>{myForm.errors.email}</small> : ''}
        <label htmlFor="password">Password</label>
        <input id="password" name='password' onChange={myForm.handleChange} type="password" placeholder="••••••••" required />
        {myForm.errors.password ? <small className='text-danger'>{myForm.errors.password}</small> : ''}

        {/* <div className="checkbox-container">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div> */}

        <button type="submit" className="submit-btn" >Sign In</button>
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
        Don't have an account? <a href="#" style={{ color: '#3b82f6', fontWeight: '600' }}>Sign Up</a>
      </p>
    </div>
  </div>
}


export default Login;
