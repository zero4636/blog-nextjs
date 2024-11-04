import { getUser } from "@/services/admin"
import { cookies } from 'next/headers'
import AvaCustomize from '../../../../../components/admin/avatar'

async function getData() {
  try {
    const cookie = JSON.parse(cookies().get('user').value);
    const data = await getUser(cookie) || [];

    if (data.status === 200) {
      return data.data; // Return the user data if the status is 200
    } else {
      return null; // Return null if the status is not 200 (error case)
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null; // Return null in case of an error
  }
}


export default async function UserList() {
  const tableRowsData = await getData();
  return (
    <>
      {tableRowsData.map(({ username }, index) => {
        const isLast = index === tableRowsData.length - 1;
        const classes = isLast
          ? "p-4"
          : "p-4 border-b border-blue-gray-50";

        return (
          <tr key={index}>
            <td className={classes}>
              <div className="flex flex-col">
                {index + 1}
              </div>
            </td>
            <td className={classes}>
              <div className="flex items-center gap-3 justify-center">
                <AvaCustomize title={username} />
              </div>
            </td>
            <td className={classes}>
              <div className="flex flex-col">
                {username}
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}