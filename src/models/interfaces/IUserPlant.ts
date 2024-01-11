export default interface IUserPlant {
    user: {
        userId: number,
    },
    plant: {
        plantId: number,
    },
    alias: string | null,
    lastWater: Date | null,
    lastFertilizer: Date | null,
    lastRepotted: Date | null,
}