import Thumbs from "./Thumbs";

async function getLatestVideo() {
    const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_API_KEY}&channelId=${process.env.NEXT_PUBLIC_CHANNEL_ID}&part=snippet,id&order=date&maxResults=5`,
        { next: { revalidate: 3600 } } // ISR 1 ชม.
    );
    const data = await res.json();

    // หา videoId ที่ต้องการ เช่น
    const filtered = data.items.find((item: any) =>
        item.id.kind === 'youtube#video' &&
        !item.id.videoId.startsWith('shorts')
    );
    if (!filtered) return null;

    const videoId = filtered.id.videoId;

    const detailRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${process.env.NEXT_PUBLIC_API_KEY}&id=${videoId}&part=liveStreamingDetails,contentDetails,snippet`,
        { next: { revalidate: 3600 } }
    );
    const detailData = await detailRes.json();

    return { filtered, video: detailData.items[0] };
}

export default async function VideoPage() {
    const data = await getLatestVideo();

    if (!data) return <p>No video found</p>;

    return <Thumbs videoData={data} />;
}