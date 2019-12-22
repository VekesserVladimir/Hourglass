import { Couchbase } from 'nativescript-couchbase-plugin';

class DatabaseService {
    constructor() {
        this.database = new Couchbase('hourglass');
    }

    addTask(task, scheludeId) {
        return this.database.createDocument({
            type: "task",
            ...task,
            scheludeId
        })
    }

    getTasks(date) {
        let result = this.database.query({
            select: [],
            where: [{ property: "date", comparison: 'equalTo', value: date }]
        })

        console.log(result);
        return result;
    }
}

export default new DatabaseService();