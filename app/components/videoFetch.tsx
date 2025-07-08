// VideoPage.tsx
import NewVideo from './newVideo';

async function getVideos() {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_API_KEY}&channelId=${process.env.NEXT_PUBLIC_CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`,
        { next: { revalidate: 3600 } }
    );
    const data = await res.json();

    // กรองเฉพาะ video เท่านั้น (live ก็จะอยู่ในนี้ด้วย)
    const filteredVideos = data.items.filter(
        (item: any) =>
            item.id.kind === 'youtube#video' &&
            !item.snippet.title.toLowerCase().includes('shorts')
    );

    const videos = filteredVideos.slice(1, 6).map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
    }));

    return videos;
}

export default async function VideoPage() {
    const videos = await getVideos();

    if (videos.length === 0) return <p>No videos found.</p>;

    return <NewVideo videoData={videos} />;
}
