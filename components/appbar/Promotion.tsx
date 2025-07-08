'use client';

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Promotion = () => {
    const [isVisible, setIsVisible] = useState(true);

    const { t } = useTranslation('components')

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <div
            className={`${isVisible ? 'max-h-7' : 'max-h-0'
                } bg-gradient-to-r from-purple-500 to-blue-500 text-white w-full flex justify-between items-center overflow-hidden transition-all duration-500 ease-out`}
        >
            <div className="flex-1 flex justify-center items-center h-full">
                {/* ข้อความสำหรับหน้าจอใหญ่ */}
                <p className="hidden sm:block text-sm p-2 truncate">
                    {t('Promo_MD')}
                </p>
                {/* ข้อความสำหรับหน้าจอเล็ก */}
                <p className="sm:hidden text-xs p-2 truncate">
                    {t('Promo_SM')}
                </p>
            </div>
            <button
                onClick={handleClose}
                className="text-white font-bold text-xl bg-transparent border-0 hover:bg-opacity-50 rounded-lg px-2"
            >
                &times;
            </button>
        </div>
    );
};

export default Promotion;