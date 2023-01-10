export type NotificationType =
  | {
      type: 'console';
      message: string;
      when?: string | Date;
    }
  | {
      type: 'email';
    };
