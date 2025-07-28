import "./SignUp.scss";
import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";

type SignUpInputs = {
  name: string;
  email: string;
  password: string;
  confirmedPassword: string;
};

const SignUp = () => {
  // handle sign up
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputs>();

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    console.log(data);
  };

  return (
    <div className="signup-container">
      {/*------- left div-------- */}
      <div className="iamge-div">
        <img
          className="image-div-svg"
          src="/svg/auth/signup/banner.svg"
          alt=""
        />
        <div className="circle1">
          <img src="/svg/background/circle1.svg" alt="" />
        </div>
        <div className="circle2">
          <img src="/svg/background/circle2.svg" alt="" />
        </div>
        <div className="circle3">
          <img src="/svg/background/circle3.svg" alt="" />
        </div>
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
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            {/* email field */}
            <div className="input-field mb-[32px]">
              <label htmlFor="email">Email Address</label>
              <input
                placeholder="Enter your email address"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
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
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
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
              {errors.confirmedPassword && (
                <p className="text-red-500">{errors.confirmedPassword.message}</p>
              )}
            </div>

            {/* sign up button */}
            <button
              className="signup-btn"
              type="submit"
              disabled={isSubmitting}
            >
              Sign Up
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
            Already have an account?{" "}
            <span className="sign-up-text">
              <Link to="/auth/login">Log In</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
