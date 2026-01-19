import { UserStore } from "@/store/user.store";
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <body>
        <UserStore>
          <main className="relative">{children}</main>
        </UserStore>
      </body>
    </>
  );
}
