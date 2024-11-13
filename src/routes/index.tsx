import * as React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import Image from '@/lib/Image';
import {
   sleep,
} from '@/lib/utils';
import Counting from '@/components/pages/onboarding/Counting';
import { Toaster } from '@/components/ui/sonner';
import { initData, useSignal } from '@telegram-apps/sdk-react';
import { API_ROUTES } from '@/constant/api-route';
import axiosInstance from '@/api/axiosInstance';
import { setAccessToken } from '@/api/authHelper';
import { useUserStore } from '@/stores/user.store';

export const Route = createFileRoute('/')({
   component: Loading,
});

function Loading() {
   const [loadingWidth, setLoadingWidth] = React.useState(0);
   const navigate = useNavigate({ from: '/' });
   const initDataRaw = useSignal(initData.raw);
   const { user, setUser } = useUserStore();

   React.useEffect(() => {
      const initLoading = async () => {
         await sleep(2000);
         setLoadingWidth(20);
         await doLogin();
      };
      initLoading();
   }, []);

   const doLogin = async () => {
      try {
         // login
         const responseLogin = await axiosInstance.post(API_ROUTES.AUTH.LOGIN, {
            initData: initDataRaw,
         });
         if (responseLogin.status !== 200) throw new Error('Response status invalid');
         setAccessToken(responseLogin.data.data.accessToken);
         setLoadingWidth(50);

         // get user data
         const responseUserData = await axiosInstance.get(API_ROUTES.USER.ME);
         if (responseUserData.status !== 200) throw new Error('Response status invalid');
         setUser(responseUserData.data.data)
         setLoadingWidth(70);

         await sleep(2000);
         setLoadingWidth(100);
      } catch (error) {
         console.error(error);
      }
   }

   const handleLoadingFinish = () => {
      if (user.finishOnboarding) {
         navigate({
            to: '/main'
         })
      } else {
         navigate({
            to: '/onboarding'
         })
      }
   }

   return (
      <div className="flex flex-1 flex-col">
         <main className="flex-1 overflow-y-auto">
            <section className="w-limit bg-splash relative flex flex-1 flex-col gap-3">
               <div className="flex items-center justify-center">
                  <Image
                     src="/assets/logo.png"
                     alt="logo enian combat"
                     className="w-3/4"
                  />
               </div>
               <div className="flex flex-1 flex-col items-center justify-end">
                  <Counting
                     loadingWidth={loadingWidth}
                     onEnd={() => handleLoadingFinish()}
                  />
               </div>
            </section>
         </main>
         <Toaster position="top-center" richColors visibleToasts={1} />
      </div>
   );
}
