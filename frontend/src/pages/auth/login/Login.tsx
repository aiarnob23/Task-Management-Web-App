import { Link } from "react-router";
import "./Login.scss";
import { useForm, type SubmitHandler } from "react-hook-form";

type LoginInputs = {
  email: string;
  password: string;
};

const Login = () => {
  // handle login
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    console.log(data);
  };

  return (
    <div className="login-container">
      {/*------- left div-------- */}
      <div className="iamge-div">
        <img
          className="image-div-svg"
          src="/svg/auth/login/roadmap-design.svg"
          alt=""
        />
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
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            {/* password field */}
            <div className="input-field">
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
            {/* remember me field */}
            <div className="remember-me-field">
                <div className="checkbox-container">
                    <input type="checkbox" placeholder="Remember me"/>
                    <span>Remember me</span>
                </div>
                <button>Forgot passwsord ?</button>
            </div>
            {/* submit button */}
            <button className="login-btn" type="submit" disabled={isSubmitting}>
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
