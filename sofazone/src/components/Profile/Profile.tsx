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
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      // כאן תחליף לכתובת API אמיתית שמחזירה פרטי משתמש
      const res = await fetch('http://localhost:3001/users/123');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      formik.setValues({
        name: data.name || '',
        email: data.email || '',
        password: data.phone || '',
      });
    } catch (err) {
      console.error(err);
      setUpdateMessage('Error loading user data.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const updateUser = async (values: ProfileModel) => {
    try {
      // כאן ה-API לעדכון פרטים
      const res = await fetch('http://localhost:3001/users/123', {
        method: 'PUT', // או PATCH לפי API שלך
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setUpdateMessage('Profile updated successfully!');
        // אם רוצים, מפנים לדף אחר אחרי עדכון
        // navigate('/homePage');
      } else {
        setUpdateMessage('Failed to update profile.');
      }
    } catch (err) {
      console.error(err);
      setUpdateMessage('Server error. Try again later.');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
      phone: yup.string().matches(/^\+?[0-9\s\-]{7,15}$/, 'Invalid phone number').nullable(),
    }),
    onSubmit: updateUser,
  });
  return <div className="Profile">
    <Header />
    <div className="enter">
      <div className="enter-box">
        <h2>Edit Profile</h2>
        <p className="subtitle">Update your personal details</p>

        <form onSubmit={formik.handleSubmit} className="login">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={(e) => { formik.handleChange(e); if (updateMessage) setUpdateMessage(null); }}
            value={formik.values.name}
            placeholder="Your full name"
            required
          />
          {formik.errors.name && formik.touched.name ? (
            <small className="text-danger">{formik.errors.name}</small>
          ) : null}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={(e) => { formik.handleChange(e); if (updateMessage) setUpdateMessage(null); }}
            value={formik.values.email}
            placeholder="your@email.com"
            required
          />
          {formik.errors.email && formik.touched.email ? (
            <small className="text-danger">{formik.errors.email}</small>
          ) : null}

          <button type="submit" className="submit-btn">
            Save Changes
          </button>

          {updateMessage && (
            <div style={{ color: updateMessage.includes('successfully') ? 'green' : 'darkred', marginTop: '1rem', textAlign: 'center' }}>
              {updateMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  </div>
}


export default Profile;
