import { number } from "yup"

export class ReviewModel {
    userId: string;
    productId: number;
    comment: string;
    rating: number;

    constructor(userId: string, productId: number, comment: string, rating: number) {
        this.userId = userId;
        this.productId = productId;
        this.comment = comment;
        this.rating = rating;
    }
}