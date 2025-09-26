// src/lib/api.js
/**
 * @typedef {{ id: number, username: string, email?: string }} User
 * @typedef {{ access: string|null, refresh: string|null, user?: User|null }} AuthStorage
 */

/**
 * Безопасный парсинг JSON ответа.
 * @param {Response} response
 * @returns {Promise<any>}
 */
async function safeParseJson(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

/**
 * Выполнить fetch-запрос с опциональной авторизацией и логикой обновления access токена при 401.
 * @param {string} endpoint
 * @param {{ method?: string, body?: any, auth?: boolean }} [options]
 * @returns {Promise<any>}
 */
async function request(endpoint, {
  method = 'GET',
  body = null,
  auth = false
} = {}) {
  /** @type {{ [k: string]: string }} */
  const baseHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  const storedRaw = localStorage.getItem('auth');
  /** @type {AuthStorage|null} */
  const stored = storedRaw ? JSON.parse(storedRaw) : null;
  const headers = stored && auth && stored.access
    ? { ...baseHeaders, Authorization: `Bearer ${stored.access}` }
    : baseHeaders;

 /** @typedef {{ [k: string]: string }} HeadersMap */
/** @typedef {{ method: string, headers: HeadersMap, body: string|null }} FetchOptions */

const doFetch = 
  /**
   * @param {HeadersMap} hdrs
   * @returns {Promise<Response>}
   */
  async (hdrs) => fetch(endpoint, {
    method,
    headers: hdrs,
    body: body ? JSON.stringify(body) : null
  });


  let resp = await doFetch(headers);

  // Попытка обновления токена при 401
  if (resp.status === 401 && auth) {
    const refreshed = await refreshAccess();
    if (refreshed) {
      const newStoredRaw = localStorage.getItem('auth');
      const newStored = newStoredRaw ? JSON.parse(newStoredRaw) : null;
      const retryHeaders = (newStored && newStored.access)
        ? { ...baseHeaders, Authorization: `Bearer ${newStored.access}` }
        : baseHeaders;

      const retry = await doFetch(retryHeaders);
      if (!retry.ok) {
        const err = await safeParseJson(retry);
        throw new Error(err.detail || `Error ${retry.status}`);
      }
      return safeParseJson(retry);
    }

    logout();
    throw new Error('Unauthenticated');
  }

  if (!resp.ok) {
    const err = await safeParseJson(resp);
    throw new Error(err.detail || `Error ${resp.status}`);
  }

  return safeParseJson(resp);
}

/* -------------------------------------------------
   Авторизация
   ------------------------------------------------- */

/**
 * Зарегистрировать пользователя.
 * @param {{ username: string, email: string, password: string }} param0
 * @returns {Promise<any>}
 */
export async function register({ username, email, password }) {
  return request('/api/register/', {
    method: 'POST',
    body: { username, email, password }
  });
}

/**
 * Войти — сохраняет access и refresh в localStorage.
 * @param {{ username: string, password: string }} param0
 * @returns {Promise<any>}
 */
export async function login({ username, password }) {
  const data = await request('/api/token/', {
    method: 'POST',
    body: { username, password }
  });

  // Сохраняем только токены
  localStorage.setItem('auth', JSON.stringify({
    access: data.access,
    refresh: data.refresh
  }));

  return data;
}

/**
 * Попытаться обновить access по refresh токену.
 * @returns {Promise<boolean>}
 */
export async function refreshAccess() {
  const storedRaw = localStorage.getItem('auth');
  const stored = storedRaw ? JSON.parse(storedRaw) : null;
  if (!stored || !stored.refresh) return false;

  try {
    const data = await request('/api/token/refresh/', {
      method: 'POST',
      body: { refresh: stored.refresh }
    });
    const newStored = { ...stored, access: data.access };
    localStorage.setItem('auth', JSON.stringify(newStored));
    return true;
  } catch {
    return false;
  }
}

/**
 * Разлогинить — удалить из localStorage.
 */
export function logout() {
  localStorage.removeItem('auth');
}

/* -------------------------------------------------
   Примеры использования
   ------------------------------------------------- */

/**
 * Пример защищённого запроса.
 * @returns {Promise<any>}
 */
export async function getProtected() {
  return request('/api/protected/', { auth: true });
}

/**
 * Пинг (не требует авторизации).
 * @returns {Promise<any>}
 */
export async function ping() {
  return request('/api/ping/');
}
