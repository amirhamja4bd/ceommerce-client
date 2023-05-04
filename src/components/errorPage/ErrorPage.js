import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError()
    return (
        <div className='text-center mt-5'>
            <h1>Ops! An Error</h1>
            {error && (
                <div className='text-danger fs-3'>
                    <p>{error.statusText || error.message}</p>
                    <p>{error.status}</p>
                </div>
            )}
            <br/>
        </div>
    );
};

export default ErrorPage;