# PosePerfect - AI-Powered Yoga Assistant 🧘‍♀️

A modern, professional yoga pose detection and guidance platform built with React, Spring Boot, and TensorFlow.js. This application provides real-time pose detection, personalized feedback, and a comprehensive yoga pose library.

## 🚀 Features

### Frontend (React 19)
- **Modern Landing Page** - Stunning hero section with animations
- **User Authentication** - Secure login/registration with JWT
- **Yoga Poses Library** - Browse, search, and filter poses by difficulty
- **AI Pose Detection** - Real-time pose detection using TensorFlow.js and MediaPipe
- **Feedback System** - Submit ratings and reviews
- **Responsive Design** - Mobile-first approach with Bootstrap 5
- **Smooth Animations** - Framer Motion animations throughout

### Backend (Spring Boot 3.4.1)
- **RESTful API** - Clean API design with proper HTTP methods
- **JWT Authentication** - Secure token-based authentication
- **BCrypt Password Hashing** - Industry-standard password security
- **MySQL Database** - Persistent data storage
- **Image Upload** - Handle yoga pose images
- **CORS Enabled** - Cross-origin resource sharing configured

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM 7
- Bootstrap 5 & React-Bootstrap
- Framer Motion (animations)
- TensorFlow.js & MediaPipe (pose detection)
- Axios (HTTP client)
- React Icons
- React Webcam

### Backend
- Java 17
- Spring Boot 3.4.1
- Spring Security (JWT)
- Spring Data JPA
- MySQL 8
- Lombok
- Maven

## 📋 Prerequisites

- **Node.js** 16+ and npm
- **Java** 17+
- **MySQL** 8+
- **Maven** 3.6+

## 🔧 Installation & Setup

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd Backend/yoga
```

2. **Configure MySQL database:**
Create a database named `yoga_db`:
```sql
CREATE DATABASE yoga_db;
```

3. **Update `application.properties`:**
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

4. **Run the backend:**
```bash
./mvnw spring-boot:run
```

The backend will start at `http://localhost:8085`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd Yoga-Fronted
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

The frontend will start at `http://localhost:3000`

## 📁 Project Structure

```
Yoga-PosePerfect/
├── Backend/
│   └── yoga/
│       ├── src/
│       │   └── main/
│       │       ├── java/com/example/yoga/
│       │       │   ├── config/
│       │       │   ├── controller/
│       │       │   ├── dto/
│       │       │   ├── model/
│       │       │   ├── repository/
│       │       │   ├── security/
│       │       │   └── service/
│       │       └── resources/
│       └── pom.xml
└── Yoga-Fronted/
    ├── public/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── pages/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 🔑 API Endpoints

### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - Login user (returns JWT token)

### Yoga Poses
- `GET /api/yoga-poses` - Get all poses
- `GET /api/yoga-poses/{id}` - Get pose by ID
- `GET /api/yoga-poses?difficultyLevel={level}` - Filter by difficulty
- `POST /api/yoga-poses/upload` - Upload new pose (multipart/form-data)
- `GET /api/yoga-poses/images/{filename}` - Serve pose images

### Feedback
- `POST /api/feedback/add` - Submit user feedback

## 🎨 Features Breakdown

### 1. Home Page
- Hero section with gradient background
- "How It Works" section
- Featured poses carousel
- Statistics counters
- User testimonials
- Call-to-action sections

### 2. Authentication Pages
- Login with username/password
- Registration with validation
- Password strength indicator
- Remember me functionality
- JWT token storage

### 3. Yoga Poses Page
- Browse all poses
- Search functionality
- Filter by difficulty (Basic, Intermediate, Advanced)
- Beautiful card-based layout
- Smooth hover animations

### 4. Pose Detail Page
- Large pose image
- Detailed description
- Benefits list
- Related poses section
- "Try This Pose" CTA

### 5. AI Pose Detection
- Real-time webcam access
- TensorFlow.js MoveNet model
- Skeleton visualization
- Confidence meter
- Pose classification
- Instructions panel

### 6. Feedback Page
- Star rating system
- Form validation
- Success animations
- Existing testimonials display

### 7. About Page
- Mission statement
- Technology stack showcase
- Team member cards
- Contact information

## 🔐 Security Features

- JWT-based authentication
- BCrypt password hashing
- CORS configuration
- Secure HTTP headers
- Protected routes (frontend)
- Spring Security (backend)

## 🎯 Key Improvements (Professional Grade)

1. **Security**: JWT authentication, password hashing, input validation
2. **Code Quality**: Clean architecture, separation of concerns, reusable components
3. **User Experience**: Smooth animations, loading states, error handling
4. **Design**: Modern UI with consistent color scheme and typography
5. **Performance**: Optimized images, lazy loading, efficient rendering
6. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
7. **Responsive**: Mobile-first design, works on all screen sizes

## 🚀 Future Enhancements

- [ ] Add more AI models for better pose detection
- [ ] Implement workout routines and sessions
- [ ] Add progress tracking and analytics
- [ ] Social features (share poses, follow friends)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Pose comparison feature
- [ ] Video tutorials
- [ ] Mobile app (React Native)

## 📝 License

This project was created as a college project and is available for educational purposes.

## 👨‍💻 Author

Created with ❤️ for yoga enthusiasts worldwide.

## 🙏 Acknowledgments

- TensorFlow.js team for pose detection models
- MediaPipe for pose estimation
- React and Spring Boot communities
- All open-source contributors

---

**Note**: Make sure to update the MySQL credentials in `application.properties` before running the backend.
