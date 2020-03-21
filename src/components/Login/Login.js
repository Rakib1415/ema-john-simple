import React from 'react';
import Auth from './UseAuth'

const Login = () => {

    const auth = Auth();
    // console.log(auth);
    const handleSignIn =()=>{
        auth.signInWithGoogle()
        .then(res =>{
            window.location.pathname ='/review';
        })
    }
    const handleSignOut =()=>{
        auth.signOut()
        .then(res =>{
            window.location.pathname ='/';
        })
    }
    return (
        <div>
            <h1>This is a login Area</h1>
            {
                auth.user ? <button onClick={handleSignOut}>sign Out</button> : <button onClick={handleSignIn}>Sign in with Google</button>
            }
        </div>
    );
};

export default Login;