import { writable, readable } from "svelte/store";

export const serverURL = readable("http://localhost:3000");

export const session = writable(null);

export const serverEndpoints = writable({
    authentication: {
        login: "/auth/login",
        logout: "/auth/logout",
        signup: "/auth/signup",
        updateaccount: "/auth/update-account",
        changepassword: "/auth/changepassword",
        resetpassword: "/auth/reset-password",
        deleteaccount: "/auth/delete-account",
        validatepassword: "/auth/validatepassword",
    },
    mailer: {
        contact: "/mail/contact",
        forgotpassword: "/mail/forgot-password",
    },
});