export default interface IAddPlant{
    close: () => void;
    token: string;
    userId: number;
    plantId: number;
    name: string;
    rooms: string;
}