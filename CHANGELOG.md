# 📝 Changelog

All notable changes to the Yoga PosePerfect project are documented here.

---

## [1.0.0] - Professional Grade Upgrade

### 🎉 Major Backend Refactoring

#### Added
- **JWT Authentication**: Secure token-based authentication system
  - `JwtUtil` class for token generation and validation
  - `JwtAuthenticationFilter` for request interception
  - 24-hour token expiration (configurable)
  
- **Security Enhancements**
  - BCrypt password hashing for user credentials
  - Stateless session management
  - CORS configuration for frontend integration
  
- **API Documentation**
  - Swagger/OpenAPI integration
  - Interactive API explorer at `/swagger-ui.html`
  - Comprehensive endpoint descriptions
  
- **Data Validation**
  - Spring Validation with Jakarta annotations
  - `RegisterRequest` DTO with field validation
  - `LoginRequest` DTO with required field checks
  
- **Error Handling**
  - Global exception handler with `@RestControllerAdvice`
  - Consistent error response format
  - Specific handlers for validation, authentication, and file upload errors
  
- **Response Standardization**
  - `ApiResponse<T>` generic wrapper for all endpoints
  - `AuthResponse` DTO for authentication responses
  - Consistent success/error message structure

- **Code Quality Improvements**
  - Constructor-based dependency injection throughout
  - Lombok annotations to reduce boilerplate
  - Proper separation of concerns (Controller → Service → Repository)

#### Changed
- **pom.xml**: Removed duplicate dependencies, added JWT and Swagger libraries
- **SecurityConfig**: Migrated from form-based to JWT-based authentication
- **YogaUserService**: Added password hashing on registration and authentication
- **YogaUserRepository**: Changed query methods to support BCrypt validation
- **YogaUserController**: Now returns JWT tokens with proper DTOs
- **Controllers**: Added OpenAPI annotations and improved response handling
- **application.properties**: Added JWT configuration and improved organization

#### Fixed
- Removed duplicate `spring-boot-starter-web` dependency
- Removed duplicate `lombok` dependency
- Removed duplicate `spring-boot-starter-test` dependency
- Fixed deprecated Hibernate dialect warning
- Cleaned up `UserFeedBackModel` (removed manual getters when using Lombok)
- Fixed image URL resolution in `YogaPosesController`

#### Security
- Passwords now hashed with BCrypt (10 rounds)
- JWT secret configurable via properties
- Protected endpoints require valid JWT token
- CORS restricted to localhost patterns
- ⚠️ **Important**: Change `jwt.secret` in production!

---

## [0.1.0] - Initial College Project

### Backend
- Spring Boot application with MySQL database
- Basic user registration and login
- Yoga poses CRUD operations
- Image upload functionality
- User feedback system

### Frontend (Package Setup)
- React with TensorFlow.js and MediaPipe dependencies
- Bootstrap for UI components
- Framer Motion and GSAP for animations

---

## 🚀 Future Enhancements

### Planned Features
- [ ] Real-time pose detection frontend implementation
- [ ] User profile management
- [ ] Progress tracking and analytics
- [ ] Social features (share poses, follow users)
- [ ] Video tutorials for each pose
- [ ] AI-powered pose correction feedback
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] OAuth2 social login (Google, Facebook)
- [ ] Pose recommendation engine
- [ ] Multi-language support
- [ ] Dark mode

### Technical Improvements
- [ ] Unit and integration tests
- [ ] CI/CD pipeline setup
- [ ] Docker containerization
- [ ] Kubernetes deployment configuration
- [ ] Redis caching layer
- [ ] Rate limiting
- [ ] API versioning
- [ ] Health check endpoints
- [ ] Prometheus metrics
- [ ] ELK stack for logging

---

**Version Format:** [Major.Minor.Patch]
- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes and minor improvements
