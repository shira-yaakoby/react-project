import React, { FC, useEffect, useState } from 'react';
import './Profile.scss';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import { ProfileModel } from '../../models/ProfileModel';
import Header from '../Header/Header';

interface ProfileProps { }

const Profile: FC<ProfileProps> = () => {
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik<ProfileModel>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      isAdmin: false,
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().min(6, 'Password must be at least 6 characters'),
      isAdmin: yup.boolean().required('Admin status is required'),
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
            isAdmin: values.isAdmin,
          }),
        });

        if (res.ok) {
          setUpdateMessage('Profile updated successfully!');
        } else {
          setUpdateMessage('Failed to update profile.');
        }
      } catch (err) {
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
      <Header />
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
              type="text"
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

            {/* Toggle isAdmin */}
            <label htmlFor="isAdmin">Admin Status</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                checked={formik.values.isAdmin}
                onChange={() => formik.setFieldValue('isAdmin', !formik.values.isAdmin)}
                disabled={!isAdmin}
              />
              <span className="slider round" />
            </label>
            {!isAdmin && (
              <small className="readonly-note">Only admins can change admin status</small>
            )}


            {/* Submit */}
            <button type="submit" className="submit-btn">Save Changes</button>

            {/* Message */}
            {updateMessage && (
              <div
                style={{
                  color: updateMessage.includes('success') ? 'green' : 'darkred',
                  marginTop: '1rem',
                  textAlign: 'center',
                }}
              >
                {updateMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};


export default Profile;
