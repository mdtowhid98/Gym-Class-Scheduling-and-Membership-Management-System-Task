class ScheduleConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ScheduleConflictError';
        this.statusCode = 409;
    }
}

class BookingLimitError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BookingLimitError';
        this.statusCode = 400;
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
    }
}

module.exports = {
    ScheduleConflictError,
    BookingLimitError,
    ValidationError
};