import { FlightModel } from "./flight.model"

export interface UserModel {
    email: string
    name: string
    password: string,
    booked: BookedModel[]
}

export interface BookedModel {
    id: number,
    flight: null | FlightModel
    review: ReviewModel
}

export enum ReviewModel {
    NONE = 0,
    LIKED = 1,
    DISLIKED = 2
}