import { Link } from "react-router";
import "./Login.scss";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLogin } from "../../../hooks/useLogin";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

type LoginInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {signIn, loading, error, success} = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  //handle toggle password view
  const handleShowPassToggle = () =>{
    setShowPassword(!showPassword);
  }
  // handle login
  const {
    register,
    handleSubmit,
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setLoginError(null);
    await signIn(data.email as string, data.password as string);
  };

   useEffect(() => {
    if (success) {
      window.location.href="/dashboard";
    }
    if (error) {
      setLoginError(error);
    }
  }, [success, error]);


  return (
    <div className="login-container">
      {/*------- left div-------- */}
      <div className="iamge-div">
      </div>
      {/* -------right div-------- */}
      <div className="login-content-div">
        {/* heading */}
        <h2>Login</h2>
        <p>WelcomeBack,Please Enter your Details to Log In.</p>
        {/* form */}

        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* email field */}
            <div className="input-field mb-[32px]">
              <label htmlFor="email">Email Address</label>
              <input
                placeholder="m3220@gmail.com"
                {...register("email", { required: true })}
              />
            </div>
            {/* password field */}
            <div className="input-field password-input-field">
              <label htmlFor="password">Password</label>
              <input
              type={showPassword ? 'text' : 'password'}
                placeholder="*****************"
                {...register("password", {
                  required: true,
                })}
              />
              <div onClick={handleShowPassToggle} className="eye-toggle">
                {
                  showPassword ? (<EyeOff/>):(<Eye/>)
                }
              </div>
            </div>
            {/* remember me field */}
            <div className="remember-me-field">
                <div className="checkbox-container">
                    <input type="checkbox" placeholder="Remember me"/>
                    <span>Remember me</span>
                </div>
                <button className="cursor-pointer"><Link to='/auth/reset-password'>Forgot passwsord ?</Link></button>
            </div>
            {/* error div */}
            {
              loginError && <p className="error-text">{loginError}</p>
            }
            {/* submit button */}
            <button aria-disabled={loading} className="login-btn cursor-pointer" type="submit" disabled={loading}>
              Login
            </button>
          </form>
        </div>
        <div className="sign-up-navigate">
            <div className="or-text-div">
                <div className="stroke"></div>
                <span>Or</span>
                <div className="stroke"></div>
            </div>
            <div className="sign-up-navigate-btn">
                Don’t have an account? <span className="sign-up-text"><Link to='/auth/sign-up'>Sign Up</Link></span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
