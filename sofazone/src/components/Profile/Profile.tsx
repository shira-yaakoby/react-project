import React, { FC, useEffect, useState } from 'react';
import './Profile.scss';
import '../../scss/form-style.scss';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { UserModel } from '../../models/UserModel';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../store/MessageSlice';
import { loginUser } from '../../store/UserSlice';

interface ProfileProps { }

const Profile: FC<ProfileProps> = () => {
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const dispatch = useDispatch();
  const formik = useFormik<UserModel>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      isAdmin: false,
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup
        .string()
        .min(8)
        .max(20)
    }),

    onSubmit: async (values) => {
      try {
        const res = await fetch(`http://localhost:3001/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...user,
            name: values.name,
            email: values.email,
            password: values.password || user.password,
          }),
        });
        dispatch(loginUser({ ...user, name: values.name, email: values.email, password: values.password || user.password }));
        localStorage.setItem('loggedUser', JSON.stringify({ ...user, name: values.name, email: values.email, password: values.password || user.password }));
        if (res.ok) {
          dispatch(setMessage({ type: 'success', text: 'Profile updated successfully.' }));
          setUpdateMessage('Profile updated successfully!');
        } else {
          dispatch(setMessage({ type: 'error', text: 'Failed to update profile.' }));
          setUpdateMessage('Failed to update profile.');
        }
      } catch (err) {
        dispatch(setMessage({ type: 'error', text: 'Server error. Try again later.' }));
        console.error(err);
        setUpdateMessage('Server error. Try again later.');
      }
    },
  });

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

    if (!localUser?.id) {
      setUpdateMessage('User not logged in.');
      return;
    }

    setUser(localUser);
    setIsAdmin(Boolean(localUser.isAdmin));

    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/users/${localUser.id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        formik.setValues({
          name: data.name || '',
          email: data.email || '',
          password: '',
          isAdmin: data.isAdmin || false,
        });
      } catch (err) {
        console.error(err);
        setUpdateMessage('Error loading user data.');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="Profile">
      <div className="enter">
        <div className="enter-box">
          <h2>Edit Profile</h2>
          <p className="subtitle">Update your personal details</p>

          <form onSubmit={formik.handleSubmit} className="login">
            {/* Name */}
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="name"
              className="input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="Your full name"
            />
            {formik.errors.name && formik.touched.name && (
              <small className="text-danger">{formik.errors.name}</small>
            )}

            {/* Email */}
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="your@email.com"
              disabled={!isAdmin}
            />
            {formik.errors.email && formik.touched.email && (
              <small className="text-danger">{formik.errors.email}</small>
            )}
            {!isAdmin && (
              <small className="readonly-note">Only admins can change email</small>
            )}

            {/* Password */}
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter new password"
            />
            {formik.errors.password && formik.touched.password && (
              <small className="text-danger">{formik.errors.password}</small>
            )}

            {/* Submit */}
            <button type="submit" className="submit-btn">Save Changes</button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;