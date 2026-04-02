// ─────────────────────────────────────────────────────────────────────────────
// api.ts — All communication with the SEDS Finance backend lives here.
//
// HOW IT WORKS:
//   Every function in this file makes one API call and returns either:
//     - The data you asked for, or
//     - Throws an Error with a human-readable message
//
//   Components never write fetch() themselves — they just call these functions.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = 'http://localhost:8000';

// ─── Types ───────────────────────────────────────────────────────────────────
// These describe the shape of data coming back from the backend.

export interface User {
  name: string;
  nuid: string;
  email: string;
  permissions: string[];
  token: string;
}

export interface Request {
  id: number;
  description: string;
  status: string;
  requestee: string;
  project_name: string;
  subteam_name: string;
  account_code: string;
  budget_index: string;
  request_cost: string;
  final_cost: string;
  tax: string;
  link: string;
  reciept_link: string;
  sabo_link: string;
  approver: string;
  approval_date: string;
  admin_approver: string;
  admin_approval_date: string;
  request_date: string;
  submission_date: string;
  notes: string;
}

export interface Options {
  projects: string[];
  subteams: Record<string, string[]>;
  account_codes: string[];
  budget_indices: string[];
}

// ─── Helper ───────────────────────────────────────────────────────────────────
// This is a private helper that all our functions use.
// It makes the fetch call and handles errors in one place.

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  // If the server returned an error status (400, 401, 404, 500, etc.)
  // parse the error message and throw it so the component can catch it.
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody.error || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

/**
 * Sign in with a NUID and password.
 * Returns the user object (which includes the token) on success.
 * Throws an Error on failure (wrong password, missing fields, etc.)
 */
export async function signIn(nuid: string, password: string): Promise<User> {
  return apiFetch<User>(`/auth?nuid=${encodeURIComponent(nuid)}&password=${encodeURIComponent(password)}`);
}

// ─── User ─────────────────────────────────────────────────────────────────────

/**
 * Get the current user's info using their token.
 */
export async function getUserInfo(token: string): Promise<User> {
  return apiFetch<User>(`/user?token=${encodeURIComponent(token)}`);
}

// ─── Requests ─────────────────────────────────────────────────────────────────

/**
 * Get all requests visible to the current user.
 */
export async function getRequests(token: string): Promise<Request[]> {
  return apiFetch<Request[]>(`/requests?token=${encodeURIComponent(token)}`);
}

/**
 * Get a single request by ID.
 */
export async function getRequest(token: string, id: number): Promise<Request> {
  return apiFetch<Request>(`/requests/${id}?token=${encodeURIComponent(token)}`);
}

/**
 * Submit a new request.
 * The token goes in the query string; the request data goes in the body.
 */
export async function submitRequest(
  token: string,
  data: Partial<Request>
): Promise<{ id: number }> {
  return apiFetch<{ id: number }>(
    `/request?token=${encodeURIComponent(token)}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
}

/**
 * Approve or deny a request.
 */
export async function submitApproval(
  token: string,
  requestId: number,
  approval: { approved: boolean; note?: string }
): Promise<{ status: string }> {
  return apiFetch<{ status: string }>(
    `/requests/${requestId}/approval?token=${encodeURIComponent(token)}`,
    {
      method: 'POST',
      body: JSON.stringify(approval),
    }
  );
}

// ─── Options ──────────────────────────────────────────────────────────────────

/**
 * Get dropdown options (projects, subteams, account codes, etc.)
 * This one needs no token — it's public.
 */
export async function getOptions(): Promise<Options> {
  return apiFetch<Options>('/options');
}
