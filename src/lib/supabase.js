import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fulxakovoujbpgxytoxf.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1bHhha292b3VqYnBneHl0b3hmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4MDg5NDgsImV4cCI6MjEwNTM4NDk0OH0.R6nfvhHSXzOwtG7hvnp3G47Jv-zXeSEcX1UrU_miAAY';

export const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
