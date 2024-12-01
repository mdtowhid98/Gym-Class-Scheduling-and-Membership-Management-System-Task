## Gym Class Scheduling and Membership Management System (Backend)
### Project Overview
The Gym Class Scheduling and Membership Management System is a backend application designed to efficiently manage gym operations. It supports role-based access for Admins, Trainers, and Trainees, ensuring smooth class scheduling, trainer management, and membership handling.

### Key Features:
Role-based Authentication using JWT for secure access control.
Admin Operations: Manage trainers, create schedules, assign trainers to classes.
Trainer Operations: View assigned schedules.
Trainee Operations: Register, manage profile, and book classes.

### Business Rules:
Max 5 class schedules per day.
Each class has a 2-hour duration.
Max 10 trainees per schedule.
Business Rules and Error Handling:
Unauthorized access returns appropriate error messages.
Validation ensures data correctness (e.g., email format, schedule limits).
Proper responses for booking or scheduling violations.

### Technology Stack
Programming Language: JavaScript (Node.js)
Web Framework: Express.js
Database: MongoDB (using Mongoose ODM)
Authentication: JWT (JSON Web Tokens)
Error Handling: Centralized middleware for consistent responses.

### API Endpoints

### Authentication:
POST /api/auth/login: Login a user and return a JWT.
POST /api/auth/register: Register a trainee user.

### Admin Operations:
GET /api/trainers: Fetch all trainers.
POST /api/trainers: Create a new trainer.
PUT /api/trainers/:id: Update trainer details.
DELETE /api/trainers/:id: Remove a trainer.
POST /api/schedules: Create a new class schedule.

### Trainer Operations:
GET /api/schedules/trainer/:id: Fetch assigned schedules for a trainer.

### Trainee Operations:
POST /api/bookings: Book a class schedule.

## Database Schema
### User Model:
javascript
Copy code
{
  id: ObjectId,
  fullName: String,
  email: String,
  password: String,
  role: { type: String, enum: ["Admin", "Trainer", "Trainee"], required: true },
}
Trainer Model:
javascript
Copy code
{
  id: ObjectId,
  fullName: String,
  email: String,
  specialization: String,
}

### Class Schedule Model:
javascript
Copy code
{
  id: ObjectId,
  date: Date,
  startTime: String,
  endTime: String,
  trainerId: ObjectId,
  maxTrainees: { type: Number, default: 10 },
  enrolledTrainees: [ObjectId],
}



### Running the Project Locally
### Clone the Repository:

bash
Copy code
git clone https://github.com/your-repo-url.git
cd your-repo-folder

### Install Dependencies:

bash
Copy code
npm install
### Configure Environment Variables: Create a .env file with the following:

makefile
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/gym-management
JWT_SECRET=your-secret-key

### Start the Server:

bash
Copy code
node server.js
API is now accessible at: http://localhost:5000

