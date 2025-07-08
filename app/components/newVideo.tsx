'use client';

import React from 'react';
import Image from 'next/image';

interface VideoData {
    id: string;
    title: string;
    description: string;
}

interface Props {
    videoData: VideoData[];
}

export default function NewVideo({ videoData }: Props) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Videos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {videoData.map((video) => {
                    const maxResThumbnail = `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`;

                    return (
                        <a
                            key={video.id}
                            href={`https://www.youtube.com/watch?v=${video.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border rounded p-3 hover:shadow-lg transition"
                        >
                            <Image
                                src={maxResThumbnail}
                                alt={video.title}
                                className="w-full h-auto rounded"
                                width={480}
                                height={270} // 16:9
                            />
                            <h2 className="mt-2 font-semibold">{video.title}</h2>
                            <p className="text-sm line-clamp-2">{video.description}</p>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
