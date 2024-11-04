import UserList from "./users/components/userListServer";
import UserLayout from "./users/components/userLayout";


export const dynamic = 'force-dynamic';
export default function Page() {
  return (
    <UserLayout>
      <UserList />
    </UserLayout>
  );
}