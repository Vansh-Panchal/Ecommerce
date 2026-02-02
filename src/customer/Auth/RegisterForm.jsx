import React, { useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, register } from '../../State/Auth/Action';

function RegisterForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {auth} = useSelector(store => store)

    useEffect(() =>{
        if(jwt){
            dispatch(getUser())

        }
    },[jwt])

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const userData = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        }
        dispatch(register(userData))
        console.log("userData", userData);

    }
    return (
        <div className="flex justify-center mt-6">
            <div className="w-[450px] rounded-lg bg-white p-6 shadow-md">
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* First & Last Name */}
                    <div className="flex gap-4">
                        <input
                            type="text"
                            name='firstName'
                            placeholder="First Name *"
                            className="w-1/2 rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />

                        <input
                            type="text"
                            name='lastName'
                            placeholder="Last Name *"
                            className="w-1/2 rounded border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

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

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full rounded bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
                    >
                        REGISTER
                    </button>
                </form>
                <div className='flex justify-center flex-col items-center'>
                    <div className='py-3 flex items-center'>
                        <p>If you already have an account ?</p>
                        <button onClick={() => navigate("/login")} className='ml-2 font-bold cursor-pointer' size='small'>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;