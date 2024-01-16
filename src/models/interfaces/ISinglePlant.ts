import IUserPlant from "./IUserPlant";

export default interface ISinglePlant{
    className: string;
    plant: IUserPlant;
    rooms: string[];
    token: string;
    getUserPlants: () => Promise<void>;
    getUserRooms: () => void;
}