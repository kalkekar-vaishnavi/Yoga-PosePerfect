# 🚀 Setup Guide — PosePerfect

Complete setup instructions to get your AI-powered yoga assistant running locally.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- ✅ **Java 17 or higher** — [Download OpenJDK](https://adoptium.net/)
- ✅ **Node.js 18+ and npm** — [Download](https://nodejs.org/)
- ✅ **MySQL 8.0+** — [Download](https://dev.mysql.com/downloads/)
- ✅ **Maven 3.9+** (or use the included `mvnw` wrapper)
- ✅ **Git** — [Download](https://git-scm.com/)

---

## 🗄️ Step 1: Database Setup

### 1.1 Start MySQL Server

Make sure your MySQL server is running.

### 1.2 Create Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE yoga_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 1.3 Create MySQL User (Optional but Recommended)

For production, create a dedicated user:

```sql
CREATE USER 'yoga_app'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON yoga_db.* TO 'yoga_app'@'localhost';
FLUSH PRIVILEGES;
```

---

## 🔧 Step 2: Backend Configuration

### 2.1 Navigate to Backend Directory

```bash
cd Backend/yoga
```

### 2.2 Configure Database Connection

Edit `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/yoga_db?useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

# JWT Configuration (CHANGE THIS IN PRODUCTION!)
jwt.secret=your-very-secure-secret-key-change-this-in-production-min-256-bits
jwt.expiration=86400000
```

⚠️ **Important Security Notes:**
- Change `jwt.secret` to a strong random string (at least 32 characters)
- Use environment variables for production: `${JWT_SECRET:default-value}`
- Never commit sensitive credentials to version control

### 2.3 Build the Backend

```bash
# Windows
mvnw.cmd clean install

# Mac/Linux
./mvnw clean install
```

### 2.4 Run the Backend

```bash
# Windows
mvnw.cmd spring-boot:run

# Mac/Linux
./mvnw spring-boot:run
```

The backend server will start at **http://localhost:8085**

✅ **Verify Backend is Running:**
- API Health: http://localhost:8085/api/yoga-poses
- Swagger UI: http://localhost:8085/swagger-ui.html

---

## 🎨 Step 3: Frontend Setup

### 3.1 Navigate to Frontend Directory

Open a **new terminal** and run:

```bash
cd Yoga-Fronted
```

### 3.2 Install Dependencies

```bash
npm install
```

This will install:
- React 19
- TensorFlow.js & MediaPipe
- React Router, Bootstrap, Framer Motion
- Axios and other dependencies

### 3.3 Start the Development Server

```bash
npm start
```

The app will automatically open in your browser at **http://localhost:3000**

---

## 🧪 Step 4: Test the Application

### 4.1 Register a New User

1. Navigate to **http://localhost:3000/register**
2. Fill in the registration form
3. Submit and verify you're redirected to login

### 4.2 Login

1. Go to **http://localhost:3000/login**
2. Enter your credentials
3. You should be redirected to the poses catalog

### 4.3 Test Pose Detection

1. Navigate to **Detect** page
2. Allow camera access
3. Click "Start Detection"
4. Strike a yoga pose and watch the AI detect it!

### 4.4 Browse Poses

1. Go to **Poses** page
2. Filter by difficulty level
3. Click on a pose to view details

---

## 📝 Quick Start Commands

### Terminal 1 (Backend)
```bash
cd Backend/yoga
./mvnw spring-boot:run
```

### Terminal 2 (Frontend)
```bash
cd Yoga-Fronted
npm start
```

---

## 🔑 Default API Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/user/register` | POST | Register new user | ❌ |
| `/api/user/login` | POST | Login and get JWT token | ❌ |
| `/api/yoga-poses` | GET | Get all poses | ❌ |
| `/api/yoga-poses/{id}` | GET | Get pose by ID | ❌ |
| `/api/yoga-poses/difficulty/{level}` | GET | Filter by difficulty | ❌ |
| `/api/yoga-poses/upload` | POST | Upload new pose | ✅ |
| `/api/feedback/add` | POST | Submit feedback | ❌ |

---

## 🐛 Troubleshooting

### Backend Issues

**Port 8085 already in use:**
```bash
# Find and kill the process using port 8085
# Windows
netstat -ano | findstr :8085
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8085 | xargs kill -9
```

**Database connection failed:**
- Verify MySQL is running
- Check credentials in `application.properties`
- Ensure `yoga_db` database exists

**Maven build errors:**
```bash
# Clean and rebuild
./mvnw clean install -U
```

### Frontend Issues

**Port 3000 already in use:**
- React will prompt you to use a different port (usually 3001)
- Or kill the process: `lsof -ti:3000 | xargs kill -9`

**Dependencies installation fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Camera not working in Pose Detection:**
- Ensure you've granted camera permissions in your browser
- Use Chrome or Edge (best TensorFlow.js support)
- Try HTTPS (camera APIs require secure context)

---

## 🎯 Next Steps

Once everything is running:

1. **Populate Poses** — Use Swagger UI to upload yoga poses via `/api/yoga-poses/upload`
2. **Test Authentication** — Verify JWT tokens in browser DevTools
3. **Customize Branding** — Update colors in `src/index.css`
4. **Deploy** — Follow deployment guide for production

---

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [TensorFlow.js Guide](https://www.tensorflow.org/js)
- [MediaPipe Pose](https://google.github.io/mediapipe/solutions/pose.html)

---

## 💡 Tips

- Use **Chrome DevTools** to debug API calls (Network tab)
- Check browser console for frontend errors
- Backend logs appear in the terminal where you ran `mvnw spring-boot:run`
- The JWT token is stored in `localStorage` under key `token`

---

Need help? Check the main README.md or create an issue in the repository.
