import { type ServerMessage } from 'frappe-straw/types';
import { toast } from 'sonner';

export const onMessages = (messages: ServerMessage[]) => {
  messages.forEach((message) => {
    toast.info(
      <div
        dangerouslySetInnerHTML={{
          __html: message.message,
        }}
      />,
    );
  });
};
