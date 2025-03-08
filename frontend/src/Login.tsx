import { useLogin } from 'frappe-straw';

export const Login = () => {
  const auth = useLogin({
    username: 'Administrator',
    password: 'password',
  });

  return JSON.stringify(auth);
};
