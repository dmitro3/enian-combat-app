export type Profile = {
   auth_date: string;
   hash: string;
   query_id: string;
   user: {
      allows_write_to_pm: boolean;
      first_name: string;
      last_name: string;
      id: number;
      language_code: string;
      photo_url: string;
      username: string;
   };
};
