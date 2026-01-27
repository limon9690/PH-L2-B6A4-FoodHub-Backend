export type CreateMealRequest = {
    name : string;
    details : string;
    image_url? : string;
    price : number;
    isAvailable : boolean;
    categoryId : string;
}