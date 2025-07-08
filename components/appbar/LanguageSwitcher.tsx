'use client';

import i18n from '@/i18n'
import Cookies from 'js-cookie'

import ReactCountryFlag from "react-country-flag"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoCheckmark } from 'react-icons/io5'

const langToCountryMap: Record<string, string> = {
    th: 'th',
    en: 'us',
    jp: 'jp',
}

export default function LanguageSwitcher() {

    const { t } = useTranslation('lang')

    const [flags, setFlags] = useState('🇺🇸')
    const [LanguageSelect, setLanguageSelect] = useState(false)

    const [lang, setLang] = useState('en')  // เก็บภาษาปัจจุบัน

    useEffect(() => {
        const cookieLang = Cookies.get('i18n') || 'en'
        setLang(cookieLang)
        setFlags(langToCountryMap[cookieLang] ?? 'US')
    }, [])

    const changeLang = async (newLang: string) => {
        await i18n.changeLanguage(newLang)

        // ✅ บันทึกภาษาลง cookie ด้วยชื่อ 'i18n'
        Cookies.set('i18n', newLang, {
            path: '/',
            sameSite: 'Lax',
            expires: 365, // 1 ปี
        })

        setLang(newLang)  // อัปเดต state ภาษา
        setFlags(langToCountryMap[newLang] ?? 'US')  // อัปเดตธง
    }

    const langOption = [
        {
            "Flag": "th",
            "title": "ภาษาไทย",
            "Language": "th"
        },
        {
            "Flag": "us",
            "title": "English",
            "Language": "en"
        },
    ]

    return (
        <Dialog open={LanguageSelect} onOpenChange={setLanguageSelect}>
            <DialogTrigger asChild>
                <Button
                    variant="link"
                    className="p-0 w-10 h-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                    <ReactCountryFlag
                        countryCode={flags}
                        svg
                        style={{
                            width: '2rem',
                            height: 'auto',
                            borderRadius: '5px',
                            objectFit: 'cover',
                            userSelect: 'none',       // ❌ ป้องกันการ select
                            pointerEvents: 'auto',    // ✅ ยังให้คลิกได้
                        }}
                        draggable={false}           // ❌ ป้องกันการลาก
                        onContextMenu={(e) => e.preventDefault()} // ❌ ปิดคลิกขวา
                    />

                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md md:max-w-lg">
                <DialogHeader>
                    <DialogTitle>{t('LANG_TITLE')}</DialogTitle>
                    <DialogDescription>{t('LANG_DESC')}</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 py-4">
                    {langOption.map(({ Flag, title, Language }) => (
                        <Button
                            key={Language}
                            variant={lang === Language ? 'secondary' : 'ghost'}
                            onClick={() => {
                                changeLang(Language)
                                setLanguageSelect(false)
                            }}
                            className='flex justify-start item-start'
                        >
                            <div className='flex items-center justify-between w-full'>
                                <div className='flex flex-row item-center'>
                                    <ReactCountryFlag
                                        countryCode={Flag}
                                        svg
                                        style={{
                                            width: '2rem',
                                            height: 'auto',
                                            borderRadius: '5px',
                                            objectFit: 'cover',
                                            userSelect: 'none',
                                            pointerEvents: 'auto',
                                        }}
                                        draggable={false}
                                        onContextMenu={(e) => e.preventDefault()}
                                    />
                                    <div className='px-5'>
                                        {title}
                                    </div>
                                </div>
                                <span className="ml-2 flex items-center gap-1">

                                    {lang === Language ? <IoCheckmark /> : ""}
                                </span>
                            </div>
                        </Button>
                    ))}
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">{t('LANG_CLOSE')}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
