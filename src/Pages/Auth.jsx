import React,{useState,useContext} from 'react'
import {useForm} from 'react-hook-form';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [mode, setMode] = useState('signup');
  const [error,setError] = useState(null);
  const {signup,user,logout,login} = useContext(AuthContext);

  const navigate = useNavigate();

  const {register,handleSubmit,formState:{errors},} = useForm();


  const onSubmit = (data) =>{
    setError(null);
    let result;
    // alert("User is signup  successfully.");
    //  alert(` User is ${mode === 'signup' ? 'Signed Up' : 'Logged In'} and Form submitted in ${mode} mode`);
    if(mode === 'signup'){
     result = signup(data.email,data.password);
    } else {
     result = login(data.email,data.password);
    }
    
   if(result.success){
    alert("User successfully logged in");
    navigate("/");
   }else{
    setError(result.error);
   }

    console.log(result);
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user && <p>User Logged In: {user.email}</p>}
          <button onClick={()=>logout()}>Logout</button>
        <h1 className="page-title">{mode === 'signup'?"Sign Up":"Login"}</h1>
           <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
              <label htmlFor="email" htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" {...register("email", {required:"Email is required",  
              // pattern:{value:/^\S+@\S+$/i, message:"Invalid email address"}
              })} />
              {errors.email && <div className="form-error">{errors.email.message}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="password" htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" {...register("password",{required:"Password is required", minLength:{value:6, message:"Password must be at least 6 characters long"},maxLength:{value:12, message:"Password must be at most 12 characters long"}})} />
              {errors.password && <p className="form-error">{errors.password.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary btn-large">{mode === 'signup' ? "Sign Up" : "Login"}</button>
          </form>
          <div className="auth-switch">

            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <span className="auth-link" onClick={() => setMode("login")}>
                  Login
                </span>
              </p>
            ) : (
              <p>
                {" "}
                Don't have an account?{" "}
                <span className="auth-link" onClick={() => setMode("signup")}>
                  Sign Up
                </span>
              </p>
            )}
{/* 
          {mode === 'signup'? <p>Already have an account? <span className="auth-link" onClick={() => setMode('login')}> Login</span></p> 
          :<p>Don't have an account? <span className="auth-link" onClick={() => setMode('signup')}> Sign Up</span></p>} */}
          
          </div>
        </div>
      </div>
    </div>
  )
}


export default Auth;