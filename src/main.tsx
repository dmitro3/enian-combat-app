import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import WebApp from '@twa-dev/sdk';

// import tailwind css
import './styles/index.css';

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
WebApp.ready();
WebApp.expand();
WebApp.isClosingConfirmationEnabled;

console.log('profile', WebApp.initDataUnsafe);

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
   const root = ReactDOM.createRoot(rootElement);
   root.render(<RouterProvider router={router} />);
}
