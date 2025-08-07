// Supabase does not export the Json type, so we define it here:
type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

import { supabase } from "@/integrations/supabase/client";

/**
 * Track an analytics event for the current user (basic interface).
 * @param payload - event details
 */
export async function trackAnalyticsEvent(payload: {
  event_name: string;
  event_category: string;
  event_data?: Json;
  page_url?: string;
}) {
  try {
    // Grabs user from supabase auth
    const { data: { session } } = await supabase.auth.getSession();
    const user_id = session?.user?.id;
    
    await supabase.from('analytics_events').insert({
      user_id,
      event_type: `${payload.event_category}:${payload.event_name}`,
      event_data: payload.event_data ?? {},
      user_agent: navigator.userAgent,
    });
  } catch (error) {
    console.warn("Analytics event not tracked:", error);
  }
}