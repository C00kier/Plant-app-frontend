import IUserPlant from "./IUserPlant";

export default interface IActionSort{
    Today: IUserPlant[],
    Tommorow: IUserPlant[],
    Week: IUserPlant[]
}