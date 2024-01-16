import IUserPlant from "./IUserPlant";

export default interface IEditPlant{
    close: () => void;
    plant: IUserPlant;
    token: string;
    rooms: string[];
    getUserPlants: () => Promise<void>;
    getUserRooms: () => void;
}