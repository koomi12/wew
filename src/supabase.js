import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uuyyzjxxzmrxansomszr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1eXl6anh4em1yeGFuc29tc3pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzkzMzgsImV4cCI6MjA4MDI1NTMzOH0.91PArpHa1OtL7XslcSvx6FQY2rudDTbwQH8fcF6YqZ4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);