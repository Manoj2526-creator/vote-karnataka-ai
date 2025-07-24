-- Fix security warnings by setting search_path for functions

-- Update the function to update vote counts with proper security
DROP FUNCTION IF EXISTS public.update_candidate_vote_count();
CREATE OR REPLACE FUNCTION public.update_candidate_vote_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.candidates 
    SET vote_count = vote_count + 1 
    WHERE id = NEW.candidate_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.candidates 
    SET vote_count = vote_count - 1 
    WHERE id = OLD.candidate_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Update the function to update timestamps with proper security
DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Update the has_role function with proper security  
DROP FUNCTION IF EXISTS public.has_role(UUID, app_role);
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;