"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./sign.css"

export default function signPage() {
    //credenziali di default
const DEFAULT_EMAIL="test@tasty.com";
const DEFAULT_PASSWORD="123456";
const router = useRouter();
const [email, setEmail] = useState(DEFAULT_EMAIL);
const [password, setPassword] = useState(DEFAULT_PASSWORD);
const [error, setError] = useState("");




const handleSignIn= (e: React.FormEvent) => {
    e.preventDefault();

    if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {

        setError("");
        router.push("/home")
    } else {
        setError("Email o password non corretti");
    }
}

    return(
        <div className="flex flex-col justify-center items-center h-screen bg-[#0f1114] text-[#f4b860]">
           <h1 className="sign-title">Welcome Back!</h1>
           <h2 className="sign-subtitle">We Are Happy To See You Again</h2>
           <form onSubmit={handleSignIn} className="sign-form flex flex-col gap-4 w-80 bg-[#1a1c1f] p-6 rounded-2xl shadow-md">
            <input type="email"
                    placeholder="Email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            <input type="password" 
                    placeholder="Password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

            <button 
                type="submit"
                className="btn-sign">
                Sign In
            </button>
            {error &&
                    (
                        <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
                    )}
           </form>
        </div>
    )

}