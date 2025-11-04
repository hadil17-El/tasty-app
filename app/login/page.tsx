"use client";

import { useState } from "react";
import "./login.css";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
export default function LoginPage() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const router = useRouter();
const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login", email,password);
    router.push("/sign")
}
return(
    <div className="login-container">
        <div className="w-full flex justify-end px-4 pt-4">
 <button onClick={() => router.push("/welcome")} className="back-btn">
            <ArrowLeft size={24} />
        </button>
        </div>
       
       <h2 className="login-title">Create account</h2> 
          
        <p className="login-subtitle">create your account.It takes less than a minute.Enter your email address and password.</p>
        <form onSubmit={handleLogin} className="login-form">
        <input type="email"
        placeholder="Email"
        className="input-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        />
        <input type="password"
        placeholder="Password (6 digits)"
        className="input-password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button
            type="submit"
            className="btn1">
                Create an Account
            </button>
            </form>
            <span className="or">OR</span>
    <div className="continue">
        <button className="google">
            Continue with Google
            </button>
                    <button className="facebook">
            Continue with Facebook
            </button>
        <button className="phone">
            Continue with Phone number
            </button>            
            </div>    
    </div>
)
}
