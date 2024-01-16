export default interface IAddRoom{
    setIsAddRoomVisible: (bool : boolean) => void;
    setRooms: (array: (string | null)[]) => void;
    rooms: string[];
}