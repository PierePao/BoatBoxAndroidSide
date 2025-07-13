declare module 'react-native-get-sms-android' {
  interface SmsOptions {
    box?: 'inbox' | 'sent' | 'draft';
    indexFrom?: number;
    maxCount?: number;
    address?: string;
    body?: string;
    read?: 0 | 1;
    _id?: string;
    thread_id?: string;
  }

  interface SmsModule {
    list(
      options: string,
      failCallback: (error: string) => void,
      successCallback: (result: string) => void
    ): void;

    delete(
      messageId: string,
      failCallback: (error: string) => void,
      successCallback: (result: string) => void
    ): void;

    send(
      phoneNumber: string,
      message: string,
      failCallback: (error: string) => void,
      successCallback: (result: string) => void
    ): void;
  }

  const SmsAndroid: SmsModule;
  export default SmsAndroid;
}
