import { FormEvent, MutableRefObject, SyntheticEvent, useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import { signinUserBase } from "../types/user";
import { signin } from "../api/PSAPI";
import { Token } from "../types/token";

export const Signin = () => {
    const [form, setForm] = useState<signinUserBase>({email: "", password: ""});
    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken] = useState<Token>({access_token: "", token_type: ""});
    const navigate = useNavigate();

    const formRef = useRef() as MutableRefObject<HTMLFormElement>;

    const access_token = localStorage.getItem("access_token");
    const loggedIn: string = access_token ? access_token : 'undefined';

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        setForm({...form, [name]: value});
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        setLoading(true);

        const { email, password } = form;

        signin(email, password, setToken);        
    }

    useEffect(() => {
        setLoading(false);
        
        if ( loggedIn !== 'undefined' && token.token_type === 'bearer' ) {
            navigate("/home");
        }
    }, [token])

    return (
        <section className="bg-[#374151] w-full h-screen sm:pt-20 pt-16">
            <div className="w-full h-full sm:flex items-center justify-center sm:px-24 py-10 px-2">
                <div className="bg-[#293241] sm:w-[35vw] w-full min-h-[50vh] rounded-3xl sm:p-10 p-5">
                    <div className="w-full flex justify-center">
                        <h2 className="text-[40px] text-[#e0fbfc]">Signin</h2>
                    </div>
                    <form
                        encType="x-www-form-urlencoded"
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="flex flex-col mt-10 gap-5"
                    >

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
                                className="bg-[#eefeff] w-auto h-8 rounded-lg p-2 outline-none border-none"
                            />
                        </label>

                        <div className="w-full flex justify-center">
                            <button 
                                type="submit" 
                                className={loading ? 'hidden' : 'bg-[#00ffef] text-[#374151] rounded-lg w-24 h-10 hover:bg-[#77fff7] button-hover'}
                            >
                                Signin
                            </button>
                            {loading ? <ThreeDots height={50} width={50} color="#00ffef" /> : null}
                        </div>
                        
                    </form>
                </div>
            </div>
        </section>
    )
}
