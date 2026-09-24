const SUPABASE_URL = "https://cohmyikaflqtrwlazejw.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_3qW75UiXRFxSyAL65DqkJQ_7E1dPpZ5";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
