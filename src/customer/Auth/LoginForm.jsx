import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../State/Auth/Action";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        const userData = {
            email: data.get("email"),
            password: data.get("password"),
        };
        

        // Log only email for debugging, password is hidden for security
        console.log("Login attempt for:", userData.email);
        dispatch(login(userData));
    };

    return (
        <div className="flex justify-center mt-6">
            <div className="w-[450px] rounded-lg bg-white p-6 shadow-md">
                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Email */}
                    <input
                        type="email"
                        name='email'
                        placeholder="Email *"
                        className="w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        name='password'
                        placeholder="Password *"
                        className="w-full rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                    />

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full rounded bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
                <div className='flex justify-center flex-col items-center'>
                    <div className='py-3 flex items-center'>
                        <p>If you don't have an account ?</p>
                        <button onClick={() => navigate("/register")} className='ml-2 font-bold cursor-pointer' size='small'>Register</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LoginForm;