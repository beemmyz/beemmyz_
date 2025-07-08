// VideoPage.tsx

import VideoList from "./videoList";

interface Props {
    avatar: string;
    title: string;
    subscriberCount: string;
}

async function getVideos() {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.API_KEY}&channelId=${process.env.CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`,
        { next: { revalidate: 3600 } }
    );
    const data = await res.json();

    const filteredVideos = data.items.filter(
        (item: any) =>
            item.id.kind === "youtube#video" &&
            item.snippet.liveBroadcastContent === "none" && // ตัด live ออก
            !item.snippet.title.toLowerCase().includes("short") // ตัด shorts ออก
    );

    const videos = filteredVideos.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
    }));

    return videos;
}

export default async function VideoPage({ avatar, title, subscriberCount }: Props) {
    const videos = await getVideos();

    if (videos.length === 0) return <p>No videos found.</p>;

    return (
        <VideoList
            videoData={videos}
            avatar={avatar}
            title={title}
            subscriberCount={subscriberCount}
        />
    );
}
