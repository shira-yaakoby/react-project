import React from 'react';
import './NotFound.scss';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const notFoundNavigate = useNavigate();

    return (
        <div className="NotFound">
            <div className="notfound-content">
                <h1>404</h1>
                <p>Looks like you've taken a wrong turn...</p>
                <p>Maybe you'd rather be relaxing on a new sofa?</p>
                <img
                    src="/images/404.png"
                    alt="Couch not found"
                />
                <br />
                <button onClick={() => notFoundNavigate('/Header/HomePage')}>Back to Home</button>
            </div>
        </div>
    );
};

export default NotFound;
