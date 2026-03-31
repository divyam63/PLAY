//to handle error in standard way for all controllers

class ApiError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }       
}