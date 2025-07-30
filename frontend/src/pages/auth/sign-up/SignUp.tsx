import "./SignUp.scss";
import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSignUp } from "../../../hooks/useSignUp";

type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  confirmedPassword: string;
};

const SignUp = () => {
  const [signUpError, setSignUpError] = useState<any>(null);
  const { signUp, loading, error, success } = useSignUp();
  // handle sign up
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpInputs>();

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    setSignUpError(null);
    if (data.password != data.confirmedPassword) {
      setSignUpError("Password must be the same");
      return;
    }
    await signUp(data);
  };

  useEffect(() => {
    if (success) {
      window.location.href="/dashboard";
    }
    if (error) {
      setSignUpError(error);
    }
  }, [success, error]);

  return (
    <div className="signup-container">
      {/*------- left div-------- */}
      <div className="iamge-div">
        
      </div>
      {/* -------right div-------- */}
      <div className="signup-content-div">
        {/* heading */}
        <h2>Sign Up</h2>
        <p>To Create Account, Please Fill in the From Below.</p>
        {/* form */}

        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* full name field */}
            <div className="input-field mb-[32px]">
              <label htmlFor="name">Full Name</label>
              <input
                placeholder="Enter your full name"
                {...register("name", { required: true })}
              />
            </div>
            {/* email field */}
            <div className="input-field mb-[32px]">
              <label htmlFor="email">Email Address</label>
              <input
                placeholder="Enter your email address"
                {...register("email", { required: true })}
              />
            </div>
            {/* password field */}
            <div className="input-field mb-[32px]">
              <label htmlFor="password">Password</label>
              <input
                placeholder="*****************"
                {...register("password", {
                  required: true,
                })}
              />
            </div>
            {/*confirm password field */}
            <div className="input-field">
              <label htmlFor="confirmedPassword">Confirm Password</label>
              <input
                placeholder="Retype password"
                {...register("confirmedPassword", {
                  required: true,
                })}
              />
            </div>
            {/* error div */}
            {signUpError && <p className="error-message">{signUpError}</p>}

            {/* sign up button */}
            <button
              className="signup-btn"
              type="submit"
              aria-disabled={loading}
              disabled={isSubmitting}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="login-navigate">
          <div className="or-text-div">
            <div className="stroke"></div>
            <span>Or</span>
            <div className="stroke"></div>
          </div>
          <div className="login-navigate-btn">
            Already have an account?{" "}
            <span className="login-text">
              <Link to="/auth/login">Log In</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
