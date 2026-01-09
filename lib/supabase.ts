import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aeqnqruwkylpwdzjuurc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlcW5xcnV3a3lscHdkemp1dXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NTMzNzIsImV4cCI6MjA4MzEyOTM3Mn0.wkEvy0YHztCHqRr98Cf9aibtcdhoVWEW2YLltrFq48g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
