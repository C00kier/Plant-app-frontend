export default interface IAddPlant{
    close: () => void;
    token: string;
    userId: string;
    plantId: number|undefined;
    name: string|undefined;
}