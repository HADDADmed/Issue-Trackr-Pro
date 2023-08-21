// creating a class for notification 
export default class Notification {

    constructor(title, description, user_id, createdAt, updatedAt) {
        this.title = title;
        this.description = description;
        this.user_id = user_id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }


   
}