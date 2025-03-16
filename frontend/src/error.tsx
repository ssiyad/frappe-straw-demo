import { type StrawError } from 'frappe-straw/types';
import { toast } from 'sonner';

export const onError = (error: StrawError) => {
  toast.error(
    <div
      dangerouslySetInnerHTML={{
        __html: error.message,
      }}
    />,
  );
};
