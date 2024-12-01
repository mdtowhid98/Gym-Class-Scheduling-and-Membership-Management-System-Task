export class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
    }
}

export class ScheduleConflictError extends CustomError {
    constructor(message: string) {
        super(message, 409);
        this.name = 'ScheduleConflictError';
    }
}

export class BookingLimitError extends CustomError {
    constructor(message: string) {
        super(message, 400);
        this.name = 'BookingLimitError';
    }
}

export class ValidationError extends CustomError {
    constructor(message: string) {
        super(message, 400);
        this.name = 'ValidationError';
    }
}