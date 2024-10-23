import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

const createSessionStore = () => {
    const { subscribe, set } = writable(null);

    return {
        subscribe,
        init: () => {
            if (browser) {
                let sessionId = localStorage.getItem('sessionId');
                if (!sessionId) {
                    sessionId = uuidv4();
                    localStorage.setItem('sessionId', sessionId);
                }
                set(sessionId);
            }
        }
    };
};

export const sessionId = createSessionStore();
