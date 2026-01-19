import { FeedStore } from "@/store/feed.store";
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <FeedStore>{children}</FeedStore>
    </>
  );
}
