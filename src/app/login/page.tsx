"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { FormEvent, useContext, useState } from "react";
import LoginImage from "../../../public/assets/icons/login.svg";
import { AuthErrorType, emailRegex, LoadingProps } from "../../../utils/types";
import { CiLogin } from "react-icons/ci";
import Link from "next/link";
import { motion } from "framer-motion";
import fetchData from "../../../utils/fetchData";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import Loader from "@/components/main/Loader";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [, setCookie] = useCookies(["auth_token"]);
    const [error, setError] = useState<AuthErrorType | null>(null);
    const { setIsLoggedIn } = useContext(AuthContext);
    const router = useRouter();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const request = await fetchData(
                "/user/login",
                "POST",
                { email: email.trim(), password: password.trim() },
                setIsLoading,
                ""
            );

            setError(null);

            if (request.isVerified) {
                const { email, firstName, lastName } = jwtDecode<{ email: string; firstName: string; lastName: string }>(request.token);

                setCookie("auth_token", request.token, {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7,
                    expires: new Date(Date.now() + 60 * 60 * 24 * 7),
                    // sameSite:"strict",
                    // secure:true,
                    // httpOnly: true,
                });

                setIsLoggedIn(true);
                localStorage.setItem("email", email);
                localStorage.setItem("firstName", firstName);
                localStorage.setItem("lastName", lastName);
                localStorage.setItem("isLoggedIn", "true");

                router.push("/dashboard");
            } else if (request.user_message) {
                setError(AuthErrorType.USER_ERROR);
            } else if (request.cred_message) {
                setError(AuthErrorType.CRED_ERROR);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    return (
        <main className="w-full min-h-screen flex flex-row justify-center items-center flex-wrap pt-28">
            <motion.div
                initial={{ opacity: 0, x: -70 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, type: "tween", ease: "easeInOut" }}
                className="w-[clamp(300px,40%,450px)]"
            >
                <Image src={LoginImage} alt="Login" width={300} height={300} className="w-full aspect-square" priority />
            </motion.div>

            <motion.form
                onSubmit={handleSubmit}
                className="w-[clamp(300px,40%,450px)] flex flex-col justify-center items-center gap-2 border shadow-md p-4 rounded-md"
                initial={{ opacity: 0, x: 70 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, type: "tween", ease: "easeInOut" }}
            >
                <h2 className="w-full text-center text-xl md:text-2xl lg:text-3xl">Login</h2>

                {/* Email Field */}
                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label htmlFor="email">Email:</label>
                    <Input
                        required
                        type="email"
                        value={email}
                        minLength={10}
                        maxLength={30}
                        className={`border ${email.trim().length > 0 && !emailRegex.test(email.trim()) ? "border-red-500" : ""}`}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className={`text-red-600 ${email.trim().length > 0 && !emailRegex.test(email.trim()) ? "block" : "hidden"}`}>
                        Invalid email
                    </p>
                </div>

                {/* Password Field */}
                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label htmlFor="password">Password:</label>
                    <Input required type="password" value={password} minLength={8} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {/* Error Messages */}
                {error === AuthErrorType.USER_ERROR && <p className="text-red-600">User not found</p>}
                {error === AuthErrorType.CRED_ERROR && <p className="text-red-600">Invalid credentials</p>}

                {/* Login Button */}
                <Button
                    className="w-full flex flex-row justify-center items-center gap-1"
                    disabled={email.length === 0 || !email.trim().match(emailRegex) || password.length === 0}
                >
                    <CiLogin />
                    <span>Login</span>
                </Button>

                {/* Signup Link */}
                <p className="w-full">Don&apos;t have an account?</p>
                <Button className="w-full" type="button">
                    <Link href="/signup">Create an account</Link>
                </Button>
            </motion.form>

            {/* Loader */}
            {isLoading && <Loader type={LoadingProps.LOADING} />}
        </main>
    );
}
