import IQuizAnswers from "./IQuizAnswers";

export default interface IRecommendedPlant {
    plant:{id:number,botanicalName:string}, 
    quiz:IQuizAnswers,
    open:(e: React.MouseEvent<HTMLDivElement, MouseEvent>, backgroundImage: string|undefined, botanicalName: string)=> void
}