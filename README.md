# Workshop Management System

This is a backend system designed to manage skill workshops, with features for real-time enrollment management, notifications, and integration with third-party tools like Google Calendar.

---

## Features

1. **Workshop Management**:
   - Create, update, and delete workshops.
   - Add activities to workshops.
   - Enroll learners in workshops.

2. **Real-Time Notifications**:
   - Notify mentors when learners enroll in their workshops.
   - Notify learners when their enrollment is confirmed.

3. **Google Calendar Integration**:
   - Automatically create calendar events for workshop activities.
   - Allow learners to add activities to their own Google Calendar.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: WebSocket (socket.io)
- **Authentication**: Google OAuth2
- **Frontend**: HTML, JavaScript

---

## Setup Instructions

### Prerequisites

1. **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).
2. **MongoDB**: Install MongoDB from [mongodb.com](https://www.mongodb.com/).
3. **Google Cloud Console**: Set up a project and enable the Google Calendar API.

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/workshop-management.git
cd workshop-management
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
MONGO_URI=mongodb://localhost:27017/workshop_management
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback
```

Replace `your_google_client_id` and `your_google_client_secret` with your actual Google OAuth2 credentials.

### Step 4: Start the Backend Server

```bash
node server.js
```

The server will start on `http://localhost:5000`.

---

## API Endpoints

### Workshop Endpoints

1. **Create a Workshop**:
   - **Method**: `POST`
   - **URL**: `/api/workshops`
   - **Body**:
     ```json
     {
       "title": "Node.js Workshop",
       "description": "Learn Node.js from scratch",
       "mentorId": "mentor_id_here"
     }
     ```

2. **Add an Activity to a Workshop**:
   - **Method**: `POST`
   - **URL**: `/api/workshops/:workshopId/activities`
   - **Body**:
     ```json
     {
       "title": "Introduction to Node.js",
       "description": "Basics of Node.js",
       "startTime": "2023-10-15T10:00:00Z",
       "endTime": "2023-10-15T12:00:00Z",
       "location": "Online"
     }
     ```

3. **Enroll a Learner in a Workshop**:
   - **Method**: `POST`
   - **URL**: `/api/workshops/:workshopId/enroll`
   - **Body**:
     ```json
     {
       "learnerId": "learner_id_here"
     }
     ```

4. **Get All Workshops**:
   - **Method**: `GET`
   - **URL**: `/api/workshops`

5. **Get a Specific Workshop by ID**:
   - **Method**: `GET`
   - **URL**: `/api/workshops/:workshopId`

---

### Google Calendar Integration

1. **Create a Google Calendar Event**:
   - **Method**: `POST`
   - **URL**: `/api/workshops/:workshopId/calendar-event`
   - **Body**:
     ```json
     {
       "summary": "Node.js Workshop",
       "description": "Learn Node.js from scratch",
       "startTime": "2023-10-15T10:00:00Z",
       "endTime": "2023-10-15T12:00:00Z",
       "location": "Online"
     }
     ```

2. **Add Event to Learner's Google Calendar**:
   - Click the **Add Event to My Google Calendar** button in the frontend.

---

## Frontend Usage

1. Open the `index.html` file in a browser.
2. Use the forms to:
   - Create workshops.
   - Add activities to workshops.
   - Enroll learners in workshops.
   - Create Google Calendar events.
   - Add events to learners' Google Calendars.

---

## Testing

### Using Postman

1. Import the Postman collection provided in the `postman` folder.
2. Test the API endpoints using the collection.

### Using the Frontend

1. Open the `index.html` file in a browser.
2. Use the forms to interact with the backend.

---

## Troubleshooting

1. **Environment Variables Not Loaded**:
   - Ensure the `.env` file is correctly formatted and located in the root directory.
   - Add `require('dotenv').config();` at the top of your entry file.

2. **Google OAuth2 Errors**:
   - Ensure the `redirect_uri` in the Google Cloud Console matches the one in your `.env` file.
   - Verify the `client_id` and `client_secret` are correct.

3. **MongoDB Connection Issues**:
   - Ensure MongoDB is running and the `MONGO_URI` is correct.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, please contact:

- **Name**: Khadija
- **Email**: khadijakhan8991@gmail.com
- **GitHub**: (https://github.com/khadijakhan803)
