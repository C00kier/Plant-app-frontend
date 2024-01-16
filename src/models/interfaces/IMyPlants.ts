import IUserPlant from "./IUserPlant"

export default interface IMyPlants {
    userPlants: IUserPlant[];
    rooms: string[];
    setRooms: (array: (string | null)[]) => void;
    token: string;
    getUserPlants: () => Promise<void>;
    getUserRooms: () => void;
}