// creating a class for comment
export default class Comment {
    
        constructor(comment, ticket_id, user_id, createdAt, updatedAt) {
            this.comment = comment;
            this.ticket_id = ticket_id;
            this.user_id = user_id;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }
    
        getComment() {
            return this.comment;
        }
    
        getTicketId() {
            return this.ticket_id;
        }
    
        getUserId() {
            return this.user_id;
        }
    
        getCreatedAt() {
            return this.createdAt;
        }
    
        getUpdatedAt() {
            return this.updatedAt;
        }
    }


    