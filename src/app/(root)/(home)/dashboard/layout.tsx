import { UserStore } from "@/store/user.store";
import { FeedStore } from "@/store/feed.store";
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserStore>
        <FeedStore>{children}</FeedStore>
      </UserStore>
    </>
  );
}
