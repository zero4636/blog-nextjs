'use client'
import SimpleLoginForm from './loginTemplate';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useLayoutEffect } from 'react';

export default function Page() {
  const router = useRouter();
  // storing token in variable token 
  const token = Cookies.get('user');

  // if token is not present then redirect to login page else store the user data in a variable
  useLayoutEffect(() => {
    if (token) {
      router.push('/admin')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
      <SimpleLoginForm>
      </SimpleLoginForm>
    </div>
  );
}