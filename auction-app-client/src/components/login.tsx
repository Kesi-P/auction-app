import React, { useState } from 'react';

const Login= () => {
    const [username, setUsername] = useState('');

    const handleLogin = () => {
        // Handle login logic here
        console.log('Username:', username);
    };

    return (
        <form >
            <h2>Login</h2>
            <div className="input-group mb-3">
            <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control" 
                placeholder="Username" 
                aria-label="Username" 
                aria-describedby="basic-addon1" />
            </div>
            <button type="button" onClick={handleLogin}>
                    Login
            </button>
        </form>
    );
};

export default Login;
