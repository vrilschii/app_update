class ProfilesError extends Error {
    constructor(statusCode, error, message) {
        super(message === undefined ? 'Unknown error' : message);
        this.statusCode = statusCode;
        this.error = error;
    }
}

class UnauthorizedError extends ProfilesError {
    constructor(message) {
        super(401, 'Unauthorized', message);
    }
}

class NotFoundError extends ProfilesError {
    constructor(message) {
        super(404, 'NotFound', message);
    }
}

class InternalServerError extends ProfilesError {
    constructor() {
        super(500, 'Internal Server Error', 'An internal server error occurred');
    }
}

module.exports = {
    ProfilesError, 
    UnauthorizedError, 
    InternalServerError,
    NotFoundError
};