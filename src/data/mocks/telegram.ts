export const mockTgUser = {
   id: 99281932,
   first_name: 'John',
   last_name: 'Doe',
   username: 'johndoe',
   language_code: 'en',
   is_premium: true,
   allows_write_to_pm: true,
};

export const mockTgInitDataRaw = new URLSearchParams([
   ['user', JSON.stringify(mockTgUser)],
   ['auth_date', '1716922846'],
   ['start_param', 'debug'],
   ['chat_type', 'sender'],
   ['chat_instance', '8428209589180549439'],
]);
