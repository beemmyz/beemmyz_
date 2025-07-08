'use client';

import { useState } from 'react';
import { ChevronDown, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { AnimatePresence, motion } from 'framer-motion';
import { IoGrid } from 'react-icons/io5';

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

export default function Sidebar() {

    return (
        <aside className="h-screen overflow-hidden">
            <div className="space-y-4">
                <NavItem title="Home" icon={<Home size={20} />} />
                <CollapsibleNav title="Content" icon={<IoGrid size={20} />}>
                    <SubNavItem title="Vidoes" />
                    <SubNavItem title="Shorts" />
                    <SubNavItem title="Streaming" />
                </CollapsibleNav>
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