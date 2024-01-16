export default interface IAddPlant{
    close: () => void;
    token: string;
    userId: number;
    plantId: number|undefined;
    name: string|undefined;
}