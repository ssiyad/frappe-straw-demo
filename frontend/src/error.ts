import { type StrawError } from 'frappe-straw/types';
import { toast } from 'sonner';

export const onError = (error: StrawError) => {
  toast.error(error.message);
};
