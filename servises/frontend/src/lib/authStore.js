import { writable } from 'svelte/store';

/** @typedef {{ id: number, username: string, email?: string }} User */

/** @type {{ access: string|null, refresh: string|null, user: User|null }} */
const initial = {
  access: /** @type {string|null} */ (null),
  refresh: /** @type {string|null} */ (null),
  user: /** @type {User|null} */ (null)
};

export const auth = writable(initial);

/**
 * Сохранить новые токены в store.
 * @param {string} access
 * @param {string} refresh
 */
export function setTokens(access, refresh) {
  auth.update(state => ({ ...state, access, refresh }));
}

/**
 * Сохранить данные пользователя (можно вызвать после получения профиля).
 * @param {User} user
 */
export function setUser(user) {
  auth.update(state => ({ ...state, user }));
}

/** Очистить всё – используется при logout. */
export function logout() {
  auth.set({ access: null, refresh: null, user: null });
}
