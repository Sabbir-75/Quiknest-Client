import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import GoogleLogin from '../../Components/GoogleLogin/GoogleLogin';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Hooks/UseAuth/UseAuth';
import { Bounce, toast } from 'react-toastify';

const Login = () => {
    const { loginAccount } = useAuth()
    const [emailPlaceholder, setEmailPlaceholder] = useState("Enter your email address")
    const [passwordPlaceholder, setPasswordPlaceholder] = useState("password")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const location = useLocation()

    const loginHandler = (data,e) => {
        e.preventDefault()
        const { email, password } = data

        loginAccount(email, password)
            .then(() => {
                toast.success('Login Successfully', {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce
                });
                navigate(location.state || "/")
                 e.target.reset()
            })
            .catch((error) => {
                toast.error(`${error.code}`, {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce
                });
            })
    }


    return (
        <div className="flex justify-center">
            <Helmet>
                <title>Quiknest || Login</title>
            </Helmet>
            <div className="bg-base-100 w-full border-base-300 shadow-sm max-w-[460px] shrink-0">
                <div className="card-body">
                    <h1 className="text-5xl font-extrabold mb-1">Welcome Back</h1>
                    <h1 className="text-lg font-medium mb-5">Login with Quiknest</h1>
                    <GoogleLogin></GoogleLogin>
                    <div className="flex items-center w-full my-4">
                        <hr className="w-full text-base-content" />
                        <p className="px-3 text-base-content">OR</p>
                        <hr className="w-full text-base-content" />
                    </div>
                    <form onSubmit={handleSubmit(loginHandler)} className="fieldset">


                        <label className="label">Email address</label>
                        <input type="email"
                            {...register("email", { required: true })}
                            className="input w-full"
                            placeholder={emailPlaceholder}
                            onFocus={() => setEmailPlaceholder("")}
                            onBlur={() => setEmailPlaceholder("Enter your email address")}
                        />
                        {
                            (errors.email?.type === 'required') && <p className='text-red-600 text-sm font-medium'>Email is required</p>
                        }

                        <label className="label">Password</label>
                        <input type="password" {...register("password", { required: true })} onFocus={() => setPasswordPlaceholder("")}
                            onBlur={() => setPasswordPlaceholder("password")} className="input w-full" placeholder={passwordPlaceholder} />
                        {
                            (errors.password?.type === 'required') && <p className='text-red-600 text-sm font-medium'>password is required</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn text-base font-bold text-primary-content bg-primary mt-4">Login</button>
                        <p className="text-sm text-center text-gray-400">Don't have account ?
                            <Link to={"/signup"} rel="noopener noreferrer" className="text-blue-600 focus:underline hover:underline"> Sign up here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;