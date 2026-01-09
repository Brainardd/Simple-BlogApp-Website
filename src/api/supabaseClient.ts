import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nobrlqqyiyvrutsaajyt.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ii6pUkY-Rocu2VK8UTJQNA_LhyPC8Ec';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
