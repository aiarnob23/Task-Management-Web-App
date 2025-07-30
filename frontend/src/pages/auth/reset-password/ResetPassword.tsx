import { useState } from "react";
import "./ResetPassword.scss";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

type ResetPassword = {
  email: string;
  password: string;
  confirmedPassword: string;
};
const ResetPassword = () => {
  const [error, setError] = useState<any>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
    //handle toggle password view
  const handleShowPassToggle = () =>{
    setShowPassword(!showPassword);
  }
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ResetPassword>();

  const onSubmit: SubmitHandler<ResetPassword> = async (data) => {
    setError(null);
    if (data.password != data.confirmedPassword) {
      setError("Passwords must be the same");
      return;
    }
    window.location.href = "/auth/sign-up";
  };
  return (
    <div className="reset-pass-container">
      <div className="header-bg"></div>
      <div className="reset-pass-contents">
        <div className="header">
          <div className="icon">
            <img className="timer-img" src="/icons/timer.svg" alt="" />
          </div>
          <h3>Reset Your Password</h3>
          <p>
            Strong passwords include numbers, letters, and punctuation marks.{" "}
          </p>
        </div>
        <div className="form-content">
          <form
            className="form-div"
            action=""
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* email field */}
            <div className="input-field ">
              <label htmlFor="email">Email Address</label>
              <input
                placeholder="m3222@gmail.com"
                {...register("email", { required: true })}
              />
            </div>
            {/* password field */}
            <div className="input-field  password-input-field">
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
            {/*confirm password field */}
            <div className="input-field password-input-field">
              <label htmlFor="confirmedPassword">Confirm Password</label>
              <input
              type={showPassword ? 'text' : 'password'}
                placeholder="Retype password"
                {...register("confirmedPassword", {
                  required: true,
                })}
              />
               <div onClick={handleShowPassToggle} className="eye-toggle">
                {
                  showPassword ? (<EyeOff/>):(<Eye/>)
                }
              </div>
            </div>
            {/* error div */}
            {error && <p className="error-message">{error}</p>}

            {/* sign up button */}
            <button
              className="reset-pass-btn"
              type="submit"
              disabled={isSubmitting}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
