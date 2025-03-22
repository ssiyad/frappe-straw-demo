import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Straw } from 'frappe-straw';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { onError } from './error';
import { onMessages } from './messages.tsx';
import { routeTree } from './routeTree.gen.ts';
import './styles/main.css';

// Create router instance.
const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  // Register router object for type safety.
  interface Register {
    router: typeof router;
  }

  // Define route static data.
  interface StaticDataRouteOption {
    crumb?: string;
    description?: string;
  }
}

// Render the app
const root = document.getElementById('root')!;
if (!root.innerHTML) {
  createRoot(root).render(
    <StrictMode>
      <Straw onError={onError} onMessages={onMessages}>
        <RouterProvider router={router} />
      </Straw>
    </StrictMode>,
  );
}
