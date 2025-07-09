'use client';

import { useState } from 'react';
import { ChevronDown, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { FaTv, FaVideo } from 'react-icons/fa6';
import { FaRegUserCircle } from 'react-icons/fa';

type NavItemProps = {
    title: string;
    icon?: React.ReactNode;
};

type CollapsibleNavProps = {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
};

type SubNavItemProps = {
    title: string;
};

type Props = {
    title: string;
    avatar: string;
    description: string;
    subscriberCount: number;
    customUrl: string; // URL ที่ใช้สำหรับ Subscribe
};

export default function Sidebar({customUrl}: Props) {

    const { t } = useTranslation('components')

    return (
        <aside className="h-screen overflow-hidden">
            <div className="space-y-4">
                <Link href={'/'}>
                    <NavItem title={t('NAV_HOME')} icon={<Home size={20} />} />
                </Link>

                <Link href={'/video'}>
                    <NavItem title={t('NAV_VIDEOS')} icon={<FaVideo size={20} />} />

                </Link>
                <Link href={`https://www.youtube.com/${customUrl}`}>
                    <NavItem title={t('NAV_CH')} icon={<FaTv size={20} />} />

                </Link>
                <Link href={'/about'}>
                    <NavItem title={t('NAV_ABOUT')} icon={<FaRegUserCircle size={20} />} />

                </Link>
                {/* <CollapsibleNav title="Content" icon={<IoGrid size={20} />}>
                    <SubNavItem title="Vidoes" />
                    <SubNavItem title="Shorts" />
                    <SubNavItem title="Streaming" />
                </CollapsibleNav> */}
                {/* <CollapsibleNav title="About" icon={<IoDocuments size={20} />}>
                    <SubNavItem title="Profile" />
                    <SubNavItem title="Security" />
                </CollapsibleNav> */}
            </div>
        </aside>
    );
}

function NavItem({ title, icon }: NavItemProps) {
    return (
        <div className={`flex items-center gap-2 p-2 rounded-md cursor-pointer`}>
            {icon}
            <span className="">{title}</span>
        </div>
    );
}

function CollapsibleNav({ title, icon, children }: CollapsibleNavProps) {
    const [open, setOpen] = useState(false);
    return (
        <Collapsible open={open} onOpenChange={setOpen} className="mb-2">
            <CollapsibleTrigger asChild>
                <Button
                    variant="ghost"
                    className={`flex w-full justify-between items-center p-2`}
                >
                    <div className="flex items-center gap-2">{icon}<span>{title}</span></div>
                    <motion.div animate={{ rotate: open ? 180 : 0 }}>
                        <ChevronDown size={18} />
                    </motion.div>
                </Button>
            </CollapsibleTrigger>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pl-6"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </Collapsible>
    );
}

function SubNavItem({ title }: SubNavItemProps) {
    return (
        <div className="p-2 cursor-pointer">
            {title}
        </div>
    );
}