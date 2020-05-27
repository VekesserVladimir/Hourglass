import Friend from "./Friend";

export default interface vkResponseModel {
    response: {
        count: number,
        items: Friend[]
    }
}