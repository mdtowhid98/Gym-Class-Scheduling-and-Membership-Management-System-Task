# Backend Project Overview for Gym Class Scheduling and Membership Management System
The Gym Class Scheduling and Membership Management System is designed to manage gym operations effectively by handling users of different roles (Admin, Trainer, Trainee) and enforcing key business rules for scheduling classes and managing trainer information. The backend is responsible for providing robust API endpoints, handling authentication, and ensuring data integrity, using technologies such as TypeScript, Express.js, Prisma (ORM for PostgreSQL or MongoDB), and JWT for authentication.

Relational Diagram (for Database)
The backend system uses a relational database (PostgreSQL) to store all relevant data for the system. The following relational diagram illustrates the key entities and their relationships:

User:

Fields: id, email, password, fullName, role (admin, trainer, trainee)
Relationships: One-to-many relationship with ClassBooking and Trainer.
Trainer:

Fields: id, userId (linked to the User table), specialization
Relationships: One-to-many relationship with ClassSchedule.
ClassSchedule:

Fields: id, trainerId (linked to Trainer), classDate, startTime, endTime, maxTrainees, currentTrainees.
Relationships: One-to-many relationship with ClassBooking.
ClassBooking:

Fields: id, traineeId (linked to User), scheduleId (linked to ClassSchedule).
Relationships: Many-to-one relationship with ClassSchedule and User.
Technology Stack
Backend Programming Language: TypeScript
Web Framework: Express.js
ORM: Prisma (for database management)
Database: PostgreSQL
Authentication: JWT (JSON Web Tokens) for securing API endpoints and validating users.
Middleware: For error handling, logging, authentication, and validation.
API Endpoints
The backend exposes various API endpoints to support the business logic. These endpoints handle operations like creating and managing trainers, class schedules, and bookings. The basic structure of the API includes:

Authentication:

POST /api/auth/login: Handles user login with email and password. Returns a JWT token.
POST /api/auth/register: Registers a new trainee user with email, password, and full name.
Admin Endpoints:

POST /api/admin/create-trainer: Allows the admin to add a new trainer.
GET /api/admin/trainers: Fetches a list of all trainers.
DELETE /api/admin/trainer/:id: Deletes a trainer by ID.
POST /api/admin/create-schedule: Creates a class schedule, enforcing the maximum class limit and class duration.
GET /api/admin/schedules: Fetches a list of all schedules for the day.
Trainer Endpoints:

GET /api/trainer/schedules: Retrieves the trainer's assigned class schedules.
GET /api/trainer/schedule/:id: Fetches details of a specific class schedule assigned to the trainer.
Trainee Endpoints:

POST /api/trainee/book-class: Allows a trainee to book a class (enforces max class size and available slots).
GET /api/trainee/schedules: Fetches available classes for booking by trainees.
GET /api/trainee/bookings: Fetches the trainee's existing class bookings.
Database Schema
The following schema represents the data models for the application:

User Model:

ts
Copy code
model User {
  id: Int      @id @default(autoincrement())
  email: String @unique
  password: String
  fullName: String
  role: String
  createdAt: DateTime @default(now())
  updatedAt: DateTime @updatedAt
  classBookings: ClassBooking[]
  trainer: Trainer?   @relation(fields: [trainerId], references: [id])
}
Trainer Model:

ts
Copy code
model Trainer {
  id: Int     @id @default(autoincrement())
  userId: Int @unique
  specialization: String
  user: User  @relation(fields: [userId], references: [id])
  schedules: ClassSchedule[]
}
ClassSchedule Model:

ts
Copy code
model ClassSchedule {
  id: Int       @id @default(autoincrement())
  trainerId: Int
  trainer: Trainer
  classDate: DateTime
  startTime: DateTime
  endTime: DateTime
  maxTrainees: Int
  currentTrainees: Int
  classBookings: ClassBooking[]
}
ClassBooking Model:

ts
Copy code
model ClassBooking {
  id: Int      @id @default(autoincrement())
  traineeId: Int
  scheduleId: Int
  trainee: User @relation(fields: [traineeId], references: [id])
  schedule: ClassSchedule @relation(fields: [scheduleId], references: [id])
}
Error Handling
A global error handler middleware is used to manage errors in the application. Common error responses include:

Validation Errors: If a user enters invalid input (e.g., wrong email format), the backend will return a 400 Bad Request with details of the validation error.
Unauthorized Access: If a user attempts to access a restricted endpoint without valid authentication, the backend will return a 401 Unauthorized response.
Booking Limit Exceeded: If a trainee tries to book a full class, the backend will return a 400 Bad Request with an error message indicating that the class schedule is full.
Schedule Limit Exceeded: If an admin attempts to create more than 5 schedules per day, the backend will return a 400 Bad Request with an error message indicating the class limit has been reached.
Admin Credentials for Testing
Admin Login:
Email: admin@gym.com
Password: admin123
Instructions to Run Locally
To run this backend locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/your-repo/gym-class-scheduler.git
cd gym-class-scheduler
Install dependencies:

bash
Copy code
npm install
Set up your environment variables:

Create a .env file in the root directory.
Add your PostgreSQL database connection URL and JWT secret:
makefile
Copy code
DATABASE_URL=your_database_connection_url
JWT_SECRET=your_jwt_secret
Migrate the database:

bash
Copy code
npx prisma migrate dev
Start the server:

bash
Copy code
npm run dev
Live Hosting Link
Once deployed, you can provide the live link here for testing purposes. This should be a link to the hosted backend (e.g., on Heroku or Vercel).
Conclusion
This backend setup will provide a fully functional Gym Class Scheduling and Membership Management System, ensuring efficient management of classes, trainers, and trainees, while adhering to the business rules specified in the assignment.




