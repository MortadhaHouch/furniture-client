"use client"
import { Footer } from '@/components/main/Footer';
import Header from '@/components/main/Header';
import React, { useEffect } from 'react'
import Lenis from 'lenis'
export default function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Example easing function
            smoothWheel:true,
            autoResize:true,
            gestureOrientation:"both",
        })
        function raf(time:any) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
        return () => {
            lenis.destroy()
        }
    }, [])
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    )
}
