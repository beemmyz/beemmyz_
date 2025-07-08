import AppBar from "@/components/appbar/Appbar";
import VideoPage from "./components/video-page";
import WacthList from "./components/videoFetch";

export default async function Home() {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${process.env.CHANNEL_ID!}&key=${process.env.API_KEY!}`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    throw new Error("Channel not found");
  }

  const item = data.items[0];
  const snippet = item.snippet;
  const statistics = item.statistics;

  const profile = {
    avatar: snippet.thumbnails.high.url,
    title: snippet.title,
    description: snippet.description,
    customUrl: snippet.customUrl,
    subscriberCount: statistics.subscriberCount,
  };

  return (
    <>
      <AppBar
        title={profile.title}
        avatar={profile.avatar}
        description={profile.description}
        subscriberCount={profile.subscriberCount}
        customUrl={profile.customUrl}
      />
      <VideoPage />
      <div className="container mx-auto px-4 py-8">

        <WacthList />

      </div>
    </>
  );
}
