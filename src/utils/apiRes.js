//for streamline response


class ApiResponce{
    constructor(success, message, data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponce;