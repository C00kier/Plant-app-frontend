import ICookieOptions from "./ICookieOptions"

export default interface ISettings {
    setFunctionalityElement: (value:number) => void;
    userId: number;
    token: string;
    removeCookie:(cookieName: string, options?: ICookieOptions)=> void;
}