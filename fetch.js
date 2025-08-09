// fetch.js
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Use dotenv for non-Vite projects
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchComments() {
  const { data, error } = await supabase
    .from('portfolio_comments')
    .select('*')
    .eq('is_pinned', true);

  if (error) {
    console.error("❌ Error fetching pinned comments:", error);
  } else {
    console.log("📌 Pinned Comments:");
    data.forEach(comment => {
      console.log(`- ${comment.user_name}: ${comment.content}`);
    });
  }
}

fetchComments();
