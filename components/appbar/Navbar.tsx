'use client';

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface ListItemProps extends React.ComponentPropsWithoutRef<'a'> {
  title: string
  href: string
  children: React.ReactNode
}

type Props = {
  title: string;
  avatar: string;
  description: string;
  subscriberCount: number;
  customUrl: string; // URL ที่ใช้สำหรับ Subscribe
};

export function Navbar({ customUrl }: Props) {

  const { t } = useTranslation('components')

  return (
    <NavigationMenu>
      <NavigationMenuList>

        <NavigationMenuItem>
          <Button variant="ghost" asChild>
            <Link href="/">{t('NAV_HOME')}</Link>
          </Button>

        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/video" passHref>
            <Button variant="ghost">{t('NAV_VIDEOS')}</Button>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href={`https://www.youtube.com/${customUrl}`} passHref>
            <Button variant="ghost">{t('NAV_CH')}</Button>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/about" passHref>
            <Button variant="ghost">{t('NAV_ABOUT')}</Button>
          </Link>
        </NavigationMenuItem>


      </NavigationMenuList>
    </NavigationMenu>
  )
}
const ListItem = React.forwardRef<React.ElementRef<'a'>, ListItemProps>(
  ({ className, title, href, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"
