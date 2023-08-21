
// creating a model for the ticket
export default class Ticket {

    constructor(title, description, categori_id, status, user_id, createdAt, updatedAt) {
        this.title = title;
        this.description = description;
        this.categori_id = categori_id;
        this.status = status;
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


    getType() {
        return this.type;
    }

    getPriority() {
        return this.priority;
    }

    getStatus() {
        return this.status;
    }

    getAssignedTo() {
        return this.assignedTo;
    }

}



