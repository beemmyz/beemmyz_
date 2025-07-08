'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface VideoData {
    id: string;
    title: string;
    description: string;
    type?: 'video' | 'live' | 'short';
    publishedAt: string;

}

interface Props {
    videoData: VideoData[];
    avatar: string;
    title: string;
    subscriberCount: string;
}

export default function VideoList({ videoData, avatar, title, subscriberCount }: Props) {

    const { t } = useTranslation('video')
    
    const [keyword, setKeyword] = useState('');
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

    // ตั้งค่าเริ่มต้นเป็นวิดีโอแรก
    useEffect(() => {
        if (videoData.length > 0 && !selectedVideoId) {
            setSelectedVideoId(videoData[0].id);
        }
    }, [videoData]);

    const filteredVideos = useMemo(() => {
        return videoData.filter((video) =>
            video.title.toLowerCase().includes(keyword.toLowerCase())
        );
    }, [videoData, keyword]);

    return (
        <div className="flex flex-col md:flex-row gap-6 mt-6">

            {/* ซ้าย: วิดีโอหลัก */}
            <div className="flex-1 max-w-full">
                {selectedVideoId && (
                    <>
                        {/* วิดีโอ */}
                        <div className="relative w-full pb-[56.25%]">
                            <iframe
                                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&rel=0`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                            ></iframe>
                        </div>

                        {/* ข้อมูลวิดีโอและ Channel */}
                        {(() => {
                            const selectedVideo = videoData.find(v => v.id === selectedVideoId);
                            if (!selectedVideo) return null;

                            return (
                                <div className="flex flex-col md:flex-row justify-between mt-4 gap-6">
                                    {/* ซ้าย: ข้อมูลวิดีโอ + ช่อง */}
                                    <div className="flex-1">

                                        <h3 className="text-xl font-semibold">{selectedVideo.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{selectedVideo.description}</p>

                                        <div className="flex items-center gap-4 mt-5">
                                            <Image
                                                src={avatar}
                                                height={50}
                                                width={50}
                                                alt="Channel Avatar"
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <h4 className="font-semibold">{title}</h4>
                                                <p className="text-sm text-gray-500">{subscriberCount} {t('SUB')}</p>
                                            </div>
                                        </div>

                                    </div>

                                    {/* ขวา: ปุ่มลิงก์ YouTube */}
                                    <div className="flex items-center">

                                        <Link href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}>
                                            <Button>
                                                {t("WACTH_YT")}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })()}
                    </>
                )}

            </div>


            <div className='flex-col'>
                <Input
                    type="text"
                    placeholder="ค้นหาวิดีโอ..."
                    value={keyword}
                    className="max-w-sm md:max-w-lg w-full"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="w-full md:w-80 lg:w-96 max-h-[750px] overflow-y-auto rounded-md p-3 overflow-x-hidden">
                    <h2 className="text-xl font-semibold mb-4">{t('VIDEOLIST')}</h2>
                    <div className="flex flex-col gap-4">
                        {filteredVideos.map((video) => {
                            const maxResThumbnail = `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`;

                            return (
                                <button
                                    key={video.id}
                                    onClick={() => setSelectedVideoId(video.id)}
                                    className="flex gap-3 items-center hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition text-left"
                                >
                                    <Image
                                        src={maxResThumbnail}
                                        alt={video.title}
                                        width={120}
                                        height={68} // 16:9 ratio thumbnail
                                        className="rounded flex-shrink-0"
                                    />

                                    <div>
                                        <h3 className="font-semibold">{video.title}</h3>
                                        <p className="text-xs line-clamp-2">{video.description}</p>
                                    </div>

                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

        </div >
    );
}
