import { Straw } from 'frappe-straw';
import './App.css';
import { Login } from './Login';

export const App = () => {
  return (
    <Straw url={import.meta.env.VITE_FRAPPE_API_URL}>
      <div>Frappe Straw Demo</div>
      <div>
        <Login />
      </div>
    </Straw>
  );
};
