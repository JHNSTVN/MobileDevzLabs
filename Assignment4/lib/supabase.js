import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bknjtwefwsqiieupjcqr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrbmp0d2Vmd3NxaWlldXBqY3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1OTk3MzIsImV4cCI6MjA2ODE3NTczMn0.6z6qV2ReeI_j7CCr1WbTYhxenbKnKyqvI2oHmhlb9WY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
