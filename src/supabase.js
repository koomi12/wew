import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project credentials
// You can find these in your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bkwnptvmmzfqwasvjvaa.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrd25wdHZtbXpmcXdhc3ZqdmFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4Mzk2MjMsImV4cCI6MjA4MDQxNTYyM30.Su9OSrStSVIbqV3_f8TnJmRRhF8a4OfCbWs1ojd2K9Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)