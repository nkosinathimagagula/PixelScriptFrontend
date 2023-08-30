import { FormEvent, MutableRefObject, SyntheticEvent, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import { signup } from "../api/PSAPI";
import { signupUserBase } from "../types/user";


export const Signup = () => {
    const [form, setForm] = useState<signupUserBase>({name: "", email: "", password: "", confirmPassword: ""});
    const formRef = useRef() as MutableRefObject<HTMLFormElement>;

    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [counter, setCounter] = useState<number>(5);

    const navigate = useNavigate();


    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        setForm({...form, [name]: value});
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setResponse(null);
        setError(null);

        setLoading(true);

        const { name, email, password, confirmPassword } = form;

        if (!name || !email || !password || !confirmPassword) {
            setError("All fields must me filled. Try again!");
            setLoading(false);
        } else {
            if (password !== confirmPassword) {
                setError("Passwords do not match. Try again!");
                setLoading(false);
            } else {
                signup(name, email, password, setLoading, setResponse, setError);
            }
        }
    }


    useEffect(() => {
        if (response !== null) {
            setTimeout(() => {
                navigate("/signin");
            }, 5000);
        }
    }, [response]);

    useEffect(() => {
        if (!counter) {
            return;
        }

        if (response !== null) {
            setTimeout(() => {
                setCounter(counter - 1);
            }, 1000);
        }
    }, [counter, response]);

    
    return (
        <section className="bg-[#374151] w-full h-screen sm:pt-20 pt-16">
            <div className="w-full h-full sm:flex items-center justify-center sm:px-24 py-10 px-2">
                <div className="bg-[#293241] sm:w-[35vw] w-full min-h-[70vh] rounded-3xl sm:p-10 p-5">
                    <div className="w-full flex justify-center">
                        <h2 className="text-[40px] text-[#e0fbfc]">Signup</h2>
                    </div>

                    {
                        response &&
                        <div className="w-full flex justify-center text-green-700 text-[14px]">
                            {response}
                        </div>
                    }
                    {
                        response &&
                        <div className="w-full flex justify-center text-[#e0fbfc] text-[20px]">
                            {counter}
                        </div>
                    }
                    {
                        error &&
                        <div className="w-full flex justify-center text-red-700 text-[14px]">
                            {error}
                        </div>
                    }

                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="flex flex-col mt-5 gap-5"
                    >
                        <label className="flex flex-col gap-2">
                            <span className="text-white">Name</span>
                            <input 
                                name="name" 
                                type="text" 
                                value={form.name}
                                onChange={handleInputChange}
                                className="bg-[#eefeff] w-auto h-8 rounded-lg p-2 outline-none border-none"
                            />
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className="text-white">Email</span>
                            <input 
                                name="email" 
                                type="email" 
                                value={form.email}
                                onChange={handleInputChange}
                                className="bg-[#eefeff] w-auto h-8 rounded-lg p-2 outline-none border-none"
                            />
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className="text-white">Password</span>
                            <input 
                                name="password" 
                                type="password" 
                                value={form.password}
                                onChange={handleInputChange}
                                className="bg-[#eefeff] w-auto h-8 rounded-lg p-2 outline-none border-none"/>
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className="text-white">Confirm password</span>
                            <input 
                                name="confirmPassword" 
                                type="password" 
                                value={form.confirmPassword}
                                onChange={handleInputChange}
                                className="bg-[#eefeff] w-auto h-8 rounded-lg p-2 outline-none border-none"/>
                        </label>

                        <div className="w-full flex justify-center">
                            <button 
                                type="submit" 
                                className={loading ? 'hidden' : 'bg-[#00ffef] text-[#374151] rounded-lg w-24 h-10 hover:bg-[#77fff7] button-hover'}
                            >
                                Signup
                            </button>
                            {loading ? <ThreeDots height={50} width={50} color="#00ffef" /> : null}
                        </div>
                        
                    </form>
                </div>
            </div>
        </section>
    )
}