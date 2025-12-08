// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Replace with your actual project URL and public key from Supabase Settings -> API
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

export const supabase = createClient(supabaseUrl, supabasePublishableKey)