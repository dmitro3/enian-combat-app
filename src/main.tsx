import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

// import tailwind css
import './styles/index.css';

// Mock the environment in case, we are outside Telegram.
import './mockEnv.ts';
import { init } from './init';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { EnvUnsupported } from './components/EnvUnsupported';
import { RootProvider } from './providers/RootProvider';
// import WebApp from '@twa-dev/sdk';

// Set up a Router instance
const router = createRouter({
   routeTree,
   defaultPreload: 'intent',
});

// Register things for typesafety
declare module '@tanstack/react-router' {
   interface Register {
      router: typeof router;
   }
}

// load TELEGRAM MINI APP
// WebApp.ready();
// WebApp.expand();
// WebApp.isClosingConfirmationEnabled;

// console.log('profile', WebApp.initDataUnsafe);

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
   const root = ReactDOM.createRoot(rootElement);

   try {
      // Configure all application dependencies.
      init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV);

      root.render(
         <RootProvider>
            <RouterProvider router={router} />
         </RootProvider>
      );
   } catch (e) {
      root.render(<EnvUnsupported />);
   }
}
