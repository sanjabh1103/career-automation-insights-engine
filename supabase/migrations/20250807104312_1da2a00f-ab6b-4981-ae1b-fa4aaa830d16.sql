-- Phase 1B: Create role security functions and security audit logging
-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role::TEXT INTO user_role 
    FROM public.user_roles 
    WHERE user_id = user_uuid 
    AND is_active = TRUE 
    AND (expires_at IS NULL OR expires_at > NOW())
    ORDER BY 
        CASE role 
            WHEN 'admin' THEN 1 
            WHEN 'moderator' THEN 2 
            WHEN 'user' THEN 3 
        END
    LIMIT 1;
    
    RETURN COALESCE(user_role, 'user');
END;
$$;

-- Create helper function to check if user has specific role
CREATE OR REPLACE FUNCTION public.has_role(user_uuid UUID, required_role app_role)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.user_roles 
        WHERE user_id = user_uuid 
        AND role = required_role 
        AND is_active = TRUE 
        AND (expires_at IS NULL OR expires_at > NOW())
    );
END;
$$;

-- Create helper function to check if user has role or higher
CREATE OR REPLACE FUNCTION public.has_role_or_higher(user_uuid UUID, required_role app_role)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    user_role_level INTEGER;
    required_role_level INTEGER;
BEGIN
    -- Get user's highest role level
    SELECT 
        CASE role 
            WHEN 'admin' THEN 3
            WHEN 'moderator' THEN 2 
            WHEN 'user' THEN 1
            ELSE 0
        END INTO user_role_level
    FROM public.user_roles 
    WHERE user_id = user_uuid 
    AND is_active = TRUE 
    AND (expires_at IS NULL OR expires_at > NOW())
    ORDER BY 
        CASE role 
            WHEN 'admin' THEN 3
            WHEN 'moderator' THEN 2
            WHEN 'user' THEN 1
        END DESC
    LIMIT 1;
    
    -- Get required role level
    required_role_level := 
        CASE required_role 
            WHEN 'admin' THEN 3
            WHEN 'moderator' THEN 2
            WHEN 'user' THEN 1
            ELSE 0
        END;
    
    RETURN COALESCE(user_role_level, 1) >= required_role_level;
END;
$$;