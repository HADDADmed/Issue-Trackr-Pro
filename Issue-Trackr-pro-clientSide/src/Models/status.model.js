// create status model class
class Status {
    // create a constructor for the status class
    constructor(status,descripton) {
        this.status = status;
        this.descripton = descripton;
    }
    // create a method to get the status
    getStatus() {
        return this.status;
    }
    // create a method to get the description
    getDescription() {
        return this.descripton;
    }
    // set the status
    setStatus(status) { 
        this.status = status;
    }
    // set the description
    setDescription(descripton) {
        this.descripton = descripton;

    }

    
}

//export the status Model class
export default Status;
