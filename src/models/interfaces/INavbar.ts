import ICookieOptions from "./ICookieOptions";

export default interface INavbar {
    cookies: {
        token: string;
        userId: string;
    };
    removeCookie: (cookieName: string, options?: ICookieOptions) => void;
}