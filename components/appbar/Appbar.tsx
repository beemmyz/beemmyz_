'use client';

import { FaArrowRight, FaBars, FaYoutube } from "react-icons/fa6";
import Promotion from "./Promotion";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "./Navbar";
import { motion, AnimatePresence } from "framer-motion"; // เพิ่ม AnimatePresence
import { IoClose } from "react-icons/io5";
import Sidebar from "./Sidebar";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Image from 'next/image'

import CountUp from 'react-countup';

type Props = {
    title: string;
    avatar: string;
    description: string;
    subscriberCount: number;
    customUrl: string; // URL ที่ใช้สำหรับ Subscribe
};

const AppBar = ({ title, avatar, description, subscriberCount, customUrl }: Props) => {

    const { t } = useTranslation('components')

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    // Variants สำหรับ animation ของ Drawer
    const drawerVariants = {
        open: { x: 0 },
        closed: { x: "-100%" },
    };

    // Variants สำหรับ overlay
    const overlayVariants = {
        open: { opacity: 1 },
        closed: { opacity: 0 },
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/10 shadow-md flex flex-col z-50">
                <Promotion />
                <div className="container mx-auto p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 grid grid-cols-3 gap-4 justify-between items-center">
                            {/* ส่วนของโลโก้ */}
                            <div className="flex items-center text-xl font-bold">
                                <Image
                                    src={avatar}
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="pointer-events-none select-none rounded-full"
                                    style={{ width: "auto", height: "40px" }}
                                    draggable="false"
                                />
                                <div className="hidden md:block">
                                    <p className="ml-2 text-sm">{title}</p>
                                    <p
                                        style={{
                                            fontSize: '12px', display: 'inline-block', fontFamily: 'Prompt', marginLeft: '10px'

                                        }}>
                                        {t('SUB')}

                                        <CountUp
                                            style={{ fontSize: '12px', display: 'inline-block', fontFamily: 'Prompt', margin: '5px' }}
                                            end={subscriberCount}
                                        />

                                        {t('PEO')}
                                    </p>

                                </div>
                            </div>

                            {/* ส่วนของ Navbar */}
                            <div className="justify-center">
                                <div className="hidden md:flex justify-center">
                                    <Navbar title={title} avatar={avatar} description={description} subscriberCount={subscriberCount} customUrl={customUrl} />
                                </div>
                            </div>

                            {/* ปุ่ม Get Started และ Burger Menu */}
                            <div className="flex items-center justify-end gap-4">
                                <Link href={`https://www.youtube.com/${customUrl}?sub_confirmation=1`}>
                                    <Button className="w-full">
                                        {t('SUB_BTN')} <FaYoutube className="ml-2" />
                                    </Button>
                                </Link>

                                <LanguageSwitcher />

                                {/* Burger Menu สำหรับ mobile */}
                                <button
                                    className="md:hidden text-2xl"
                                    onClick={toggleDrawer}
                                >
                                    <FaBars />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Drawer Overlay ใช้ AnimatePresence เพื่อจัดการ animation ขณะปิด */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <div className="fixed inset-0 z-50 flex">
                        {/* Overlay background กับ fade animation */}
                        <motion.div
                            className="fixed inset-0 bg-black/25 backdrop-blur-sm"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={overlayVariants}
                            transition={{ duration: 0.3 }}
                            onClick={toggleDrawer}
                        />

                        {/* Drawer content กับ slide animation */}
                        <motion.div
                            className="relative w-64 bg-white/80 dark:bg-black/80 h-full shadow-lg"
                            initial="closed"
                            animate="open"
                            exit="closed" // เพิ่ม exit animation
                            variants={drawerVariants}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div className="p-4">
                                {/* ปุ่มปิด Drawer */}
                                <button
                                    className="absolute top-4 right-4 text-2xl"
                                    onClick={toggleDrawer}
                                >
                                    <IoClose />
                                </button>

                                {/* เนื้อหาใน Drawer */}
                                <div className="mt-8">
                                    <div className="flex items-center text-xl font-bold">
                                        <Image
                                            src={avatar}
                                            alt=""
                                            width={40}
                                            height={40}
                                            className="pointer-events-none select-none rounded-full"
                                            style={{ width: "auto", height: "40px" }}
                                            draggable="false"
                                        />
                                        <div>
                                            <p className="ml-2 text-sm">{title}</p>
                                            <p
                                                style={{
                                                    fontSize: '12px', display: 'inline-block', fontFamily: 'Prompt', marginLeft: '10px'

                                                }}>
                                                {t('SUB')}

                                                <CountUp
                                                    style={{ fontSize: '12px', display: 'inline-block', fontFamily: 'Prompt', margin: '5px' }}
                                                    end={subscriberCount}
                                                />

                                                {t('PEO')}
                                            </p>
                                        </div>
                                    </div>
                                    {/* <Navbar /> */}
                                    <Link href={`https://www.youtube.com/${customUrl}?sub_confirmation=1`}>
                                        <Button className="my-10 w-full">
                                            {t('SUB_BTN')}<FaArrowRight className="ml-2" />
                                        </Button>
                                    </Link>

                                </div>

                                <div>
                                    <Sidebar title={title} avatar={avatar} description={description} subscriberCount={subscriberCount} customUrl={customUrl} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </>
    );
};

export default AppBar;
