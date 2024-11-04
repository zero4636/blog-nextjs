import React from "react";
import Link from 'next/link'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix
} from "@material-tailwind/react";
import {
  InboxIcon,
  PowerIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentListIcon
} from "@heroicons/react/24/solid";


export default function MultiLevelSidebar() {
  const router = useRouter();
  const handleClick = () => {
    Cookies.remove('user');
    router.push('/admin/login')
  };

  return (
    <Card className="h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl">
      <div className="mb-2 p-4 siderbar-title">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <Link href="/admin">
          <ListItem>
            <ListItemPrefix>
              <UsersIcon className="h-5 w-5" />
            </ListItemPrefix>
            Users
          </ListItem>
        </Link>
        <Link href="/admin/author">
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Authors
          </ListItem>
        </Link>
        <Link href="/admin/category">
          <ListItem>
            <ListItemPrefix>
              <BuildingStorefrontIcon className="h-5 w-5" />
            </ListItemPrefix>
            Category
          </ListItem>
        </Link>
        <Link href="/test">
          <ListItem>
            <ListItemPrefix>
              <ClipboardDocumentListIcon className="h-5 w-5" />
            </ListItemPrefix>
            Posts
          </ListItem>
        </Link>
        <ListItem onClick={() => handleClick()}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};