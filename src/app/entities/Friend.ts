export default class Friend {
    constructor(public id: number, public first_name: string, public last_name: string, public bdate: string, public online: number, public track_code: string, public photo_50: string, public deactivated?: string) {
    }
}