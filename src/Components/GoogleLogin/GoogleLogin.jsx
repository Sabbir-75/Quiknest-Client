import React from 'react';
import googlepic from "../../../src/assets/Google__G__Logo 1.png"
import { useAuth } from '../../Hooks/UseAuth/UseAuth';
import { Bounce, toast } from 'react-toastify';

const GoogleLogin = () => {

    const { googleLogin } = useAuth()
    // const navigate = useNavigate()
    // const location = useLocation()

    const googleHandler = () => {
        googleLogin()
            .then(() => {
                toast.success('Google Login Successfully', {
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
                // navigate(location.state || "/")


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
        <button onClick={googleHandler} className="btn bg-base-200 text-base-content font-semibold text-lg space-x-2.5 border-gray-300">
            <img src={googlepic} alt={googlepic} />
            <h1>Login with Google</h1>
        </button>
    );
};

export default GoogleLogin;