export default interface IUserPlant {
    userPlantId: number;
    user: {
        userId: number;
    };
    plant: {
        plantId: number;
        botanicalName: string;
        fertilizer: number;
        repotting: number;
        water: number;
    },
    alias: string | null;
    room: string | null;
    lastWatered: Date;
    lastFertilized: Date;
    lastRepotted: Date;
}