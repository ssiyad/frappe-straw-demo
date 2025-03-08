import { createRouter, RouterProvider } from '@tanstack/react-router';
import { Straw } from 'frappe-straw';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import { routeTree } from './routeTree.gen.ts';

// Create router instance.
const router = createRouter({ routeTree });

// Register router object for type safety.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const root = document.getElementById('root')!;
if (!root.innerHTML) {
  createRoot(root).render(
    <StrictMode>
      <Straw url={import.meta.env.VITE_FRAPPE_API_URL}>
        <RouterProvider router={router} />
      </Straw>
    </StrictMode>,
  );
}
