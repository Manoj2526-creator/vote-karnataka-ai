-- Fix security warnings by properly updating functions with search_path

-- Drop the trigger first, then the function
DROP TRIGGER IF EXISTS update_vote_count_trigger ON public.votes;
DROP FUNCTION IF EXISTS public.update_candidate_vote_count() CASCADE;

-- Recreate the function with proper security
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

-- Recreate the trigger
CREATE TRIGGER update_vote_count_trigger
  AFTER INSERT OR DELETE ON public.votes
  FOR EACH ROW EXECUTE FUNCTION public.update_candidate_vote_count();

-- Drop triggers that use update_updated_at_column, then the function
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS update_elections_updated_at ON public.elections;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

-- Recreate the function with proper security
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

-- Recreate the triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_elections_updated_at
  BEFORE UPDATE ON public.elections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

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