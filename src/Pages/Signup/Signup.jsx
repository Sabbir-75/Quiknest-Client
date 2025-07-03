import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import GoogleLogin from '../../Components/GoogleLogin/GoogleLogin';
import { useForm } from 'react-hook-form';
import profilePic from "../../../src/assets/image-upload-icon.png"
import { useAuth } from '../../Hooks/UseAuth/UseAuth';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';
import UseAxiosImagBB from '../../Hooks/UseAxiosImagBB/UseAxiosImagBB';



const Signup = () => {

    const { createAccount, profileUpdateNamePhoto } = useAuth()
    const useUserSecure = UseAxiosImagBB()
    const [namePlaceholder, setNamePlaceholder] = useState("Enter your Name")
    const [emailPlaceholder, setEmailPlaceholder] = useState("Enter your email address")
    const [passwordPlaceholder, setPasswordPlaceholder] = useState("password")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [image, setImage] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const fileHandler = async (e) => {
        const files = e.target.files[0]
        const form = new FormData()
        form.append("image", files)
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB}`, form)
        const publicImage = res.data.data.url
        setImage(publicImage)
    }

    const signupHandler = (data, e) => {

        const { email, password } = data

        createAccount(email, password)
            .then(async (result) => {
                console.log(result.user);

                const name = data.name

                const userInfo = {
                    email: data.email,
                    role: "user",
                    photo: image,
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString()
                }

                const res = await useUserSecure.post("/users", userInfo)
                console.log(res.data);

                const updateProfile = {
                    displayName: name,
                    photoURL: image
                }

                profileUpdateNamePhoto(updateProfile)
                    .then(() => {
                        toast.success(' Profile create Successfully', {
                            position: "top-right",
                            autoClose: 1000,
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
                        console.log(error);
                    })


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
                <title>Quiknest || Signup</title>
            </Helmet>
            <div className="bg-base-100 w-full border-base-300 shadow-sm max-w-[460px] shrink-0">
                <div className="card-body">

                    <h1 className="text-4xl md:text-4xl lg:text-5xl font-extrabold mb-1">Create an Account</h1>
                    <h1 className="text-lg font-medium">Register with Quiknest</h1>
                    <div className='w-13 h-13 rounded-full my-5'>
                        {
                            image ? <img className='w-full rounded-full h-full' src={image} alt={image} /> : <img className='w-full' src={profilePic} alt={profilePic} />
                        }

                    </div>
                    <GoogleLogin></GoogleLogin>

                    <div className="flex items-center w-full my-4">
                        <hr className="w-full text-base-content" />
                        <p className="px-3 text-base-content">OR</p>
                        <hr className="w-full text-base-content" />
                    </div>
                    <form onSubmit={handleSubmit(signupHandler)} className="fieldset">
                        <label className="label">Your Name</label>
                        <input type="text" {...register("name", { required: true, pattern: /^[A-Za-z]+$/ })} onFocus={() => setNamePlaceholder("")}
                            onBlur={() => setNamePlaceholder("Enter your Name")} className="input w-full" placeholder={namePlaceholder} />
                        {
                            (errors.name?.type === 'required') && <p className='text-red-600 text-sm font-medium'>Name is required</p>
                        }
                        {
                            (errors.name?.type === 'pattern') && <p className='text-red-600 text-sm font-medium'>Name must be capital or small letter</p>
                        }

                        <label className="label">Your photo</label>
                        <input type="file" onChange={fileHandler} className="input w-full" placeholder="choose your photo" />

                        <label className="label">Email address</label>
                        <input type="email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} onFocus={() => setEmailPlaceholder("")}
                            onBlur={() => setEmailPlaceholder("Enter your email address")} className="input w-full" placeholder={emailPlaceholder} />
                        {
                            (errors.email?.type === 'required') && <p className='text-red-600 text-sm font-medium'>Email is required</p>
                        }
                        {
                            (errors.email?.type === 'pattern') && <p className='text-red-600 text-sm font-medium'>Name must be @ and .</p>
                        }

                        <label className="label">Password </label>
                        <input type="password" {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/ })} onFocus={() => setPasswordPlaceholder("")}
                            onBlur={() => setPasswordPlaceholder("password")} className="input w-full" placeholder={passwordPlaceholder} />
                        {
                            (errors.password?.type === 'required') && <p className='text-red-600 text-sm font-medium'>Password is required</p>
                        }
                        {
                            (errors.password?.type === 'pattern') && <p className='text-red-600 text-sm font-medium'>Password must be capital, small letter with 6 characters</p>
                        }

                        <button type='submit' className="btn text-base font-bold text-primary-content bg-primary mt-4">Signup</button>
                        <p className="text-sm text-center dark:text-gray-400">Already have an account ?
                            <Link to={"/login"} rel="noopener noreferrer" className="text-blue-600 focus:underline hover:underline"> Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;