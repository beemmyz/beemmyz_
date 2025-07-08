'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Badge } from '@/components/ui/badge';
import { PiBroadcastBold } from "react-icons/pi";
import { FaCalendarAlt, FaPhotoVideo } from "react-icons/fa";

dayjs.extend(duration);

type VideoType = 'video' | 'live' | 'upcoming';

interface Props {
    videoData: {
        filtered: any;
        video: any;
    }
}

export default function Thumbs({ videoData }: Props) {
    const { filtered, video } = videoData;
    const videoId = filtered.id.videoId;
    const title = filtered.snippet.title;
    const description = filtered.snippet.description;

    // หาภาพ thumbnail
    const maxResUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

    // แทนที่จะ fetch image ตรวจสอบขนาดอีกที client side เลยใส่ fallback ไว้
    const thumbnailUrl = maxResUrl || filtered.snippet.thumbnails.high.url;

    // Live tag
    let tag = '';
    const liveType: VideoType = video.snippet.liveBroadcastContent;
    const videoType = liveType;

    if (liveType === 'live') {
        tag = 'Livestreaming (On Air)';
    } else if (liveType === 'upcoming') {
        const startTime = video.liveStreamingDetails?.scheduledStartTime;
        const readableTime = startTime ? dayjs(startTime).format('DD MMM YYYY HH:mm') : '';
        tag = `Upcoming (Starts at ${readableTime})`;
    } else {
        const rawDuration = video.contentDetails?.duration;
        const d = dayjs.duration(rawDuration);
        const formatted = d.asHours() >= 1 ? d.format('H:mm:ss') : d.format('mm:ss');
        tag = `Video (${formatted})`;
    }

    return (
        <>
            <div className="relative w-full h-[400px] md:h-[700px] overflow-hidden">
                <Image
                    src={thumbnailUrl}
                    alt="Banner"
                    fill
                    quality={100}
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute bottom-0 left-0 right-0 h-40 md:h-60 bg-gradient-to-t from-white via-white/25 to-transparent dark:from-[#09090B] dark:via-[#09090B]/25 dark:to-transparent pointer-events-none" />
            </div>

            <div className="absolute inset-0 w-full h-[400px] md:h-[700px] bg-white/50 dark:bg-black/25 flex flex-col items-center justify-start px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start mt-30 md:mt-50">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
                        <p className="mt-2 text-sm md:text-base">{description}</p>
                        <span className="mt-2 inline-block py-1 rounded-md text-xs md:text-sm font-medium">
                            <Badge
                                className='h-7 text-sm'
                                variant={
                                    videoType === 'live'
                                        ? 'destructive'
                                        : videoType === 'upcoming'
                                            ? 'default'
                                            : 'default'
                                }
                            >

                                {
                                    videoType === 'live'
                                        ? <PiBroadcastBold />
                                        : videoType === 'upcoming'
                                            ? <FaCalendarAlt />
                                            : <FaPhotoVideo />
                                }

                                {tag}
                            </Badge>

                        </span>

                        <div className=" mt-5 ">
                            <Link href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
                                <Button className="mt-2 cursor-pointer">Watch now</Button>
                            </Link>
                        </div>
                    </div>

                    <div className="aspect-video w-full mt-6 md:mt-0">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-lg shadow-md"
                        ></iframe>
                    </div>
                </div>
            </div>
        </>

    );
}
