-- Create a system user for sample data
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'authenticated',
  'authenticated',
  'admin@voting.system',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "admin"}'
);

-- Add admin role for the system user
INSERT INTO public.user_roles (user_id, role) 
VALUES ('00000000-0000-0000-0000-000000000001'::uuid, 'admin');

-- Insert sample election data
INSERT INTO public.elections (title, description, start_date, end_date, status, created_by) 
VALUES 
  ('Karnataka State Assembly Elections 2024', 'Choose your representatives for the Karnataka Legislative Assembly', 
   '2024-12-01 09:00:00+00', '2024-12-01 17:00:00+00', 'active', 
   '00000000-0000-0000-0000-000000000001'::uuid);

-- Insert sample candidates  
INSERT INTO public.candidates (election_id, name, party, description) 
VALUES 
  ((SELECT id FROM public.elections WHERE title LIKE '%Karnataka%' LIMIT 1), 
   'Rajesh Kumar', 'Indian National Congress', 'Fighting for farmers and education reforms'),
  ((SELECT id FROM public.elections WHERE title LIKE '%Karnataka%' LIMIT 1), 
   'Priya Sharma', 'Bharatiya Janata Party', 'Focused on infrastructure development and job creation'),
  ((SELECT id FROM public.elections WHERE title LIKE '%Karnataka%' LIMIT 1), 
   'Arjun Patel', 'Janata Dal (Secular)', 'Championing rural development and water conservation');