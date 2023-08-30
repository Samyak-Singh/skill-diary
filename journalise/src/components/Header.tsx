import Image from "next/image";
import React from "next";
import Link from "next/link";
import { Button, ButtonGroup } from "@mui/material";
import { useSession } from "next-auth/react";
import { loginUrl, registerUserUrl, signupUrl } from "@/lib/constants";

export default function Header() {

    const session = useSession();

    let isLoggedIn = session.status === "authenticated";
    let username = session.data?.user?.username || "";
    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-sans-serif text-sm lg:flex">
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                {isLoggedIn ? ("hi " + username.toLowerCase() + ", ") : ""}get started by Journaling your life!
            </p>

            {
                isLoggedIn ? (
                    <span></span>
                ) : (
                        <ButtonGroup>
                            <Button size="large" variant="outlined" href={loginUrl}>
                                Login
                            </Button>
                            <Button size="large" variant="outlined" href={signupUrl}>
                                Sign Up
                            </Button>
                        </ButtonGroup>
                )
            }

            {/* <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                    <p>
                        powered by &nbsp;&nbsp;
                    </p>
                    <Image
                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert "
                        src="/next.svg"
                        alt="Next.js Logo"
                        width={180}
                        height={37}
                        priority
                    />
                </div>
            </div> */}
        </div>
    )
}