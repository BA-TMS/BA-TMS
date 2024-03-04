// types to be used with supabase
// will probably need updated

export interface SupabaseUserSession {
  user: {
    id: string; // User ID
    email: string; // User email
    // Add other user-related properties as needed
  };
  expires_at: string; // Expiration timestamp for the session
  access_token: string; // Access token for the session
  refresh_token?: string; // Refresh token (optional)
  // Add other session-related properties as needed
}
