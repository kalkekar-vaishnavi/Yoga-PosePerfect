# 📋 API Testing Guide

This guide helps you test the Yoga PosePerfect API endpoints using cURL, Postman, or any HTTP client.

## Base URL
```
http://localhost:8085/api
```

---

## 🔐 Authentication Endpoints

### 1. Register a New User

**Endpoint:** `POST /user/register`

**Request Body:**
```json
{
  "userName": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**cURL:**
```bash
curl -X POST http://localhost:8085/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"userName":"johndoe","email":"john@example.com","password":"password123"}'
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "johndoe"
  }
}
```

---

### 2. Login

**Endpoint:** `POST /user/login`

**Request Body:**
```json
{
  "userName": "johndoe",
  "password": "password123"
}
```

**cURL:**
```bash
curl -X POST http://localhost:8085/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"userName":"johndoe","password":"password123"}'
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "johndoe"
  }
}
```

**Copy the token for authenticated requests!**

---

## 🧘 Yoga Poses Endpoints

### 3. Upload a Yoga Pose (with Image)

**Endpoint:** `POST /yoga-poses/upload`

**Content-Type:** `multipart/form-data`

**Form Data:**
- `name`: "Tree Pose"
- `description`: "A standing balance pose"
- `benefits`: "Improves balance and concentration"
- `difficultyLevel`: "Basic" (or "Intermediate", "Advanced")
- `image`: [file upload]

**cURL:**
```bash
curl -X POST http://localhost:8085/api/yoga-poses/upload \
  -F "name=Tree Pose" \
  -F "description=A standing balance pose" \
  -F "benefits=Improves balance and concentration" \
  -F "difficultyLevel=Basic" \
  -F "image=@/path/to/tree-pose.jpg"
```

---

### 4. Get All Yoga Poses

**Endpoint:** `GET /yoga-poses`

**Optional Query Parameter:** `?difficultyLevel=Basic`

**cURL:**
```bash
curl http://localhost:8085/api/yoga-poses
```

**With Filter:**
```bash
curl http://localhost:8085/api/yoga-poses?difficultyLevel=Basic
```

---

### 5. Get Pose by ID

**Endpoint:** `GET /yoga-poses/{id}`

**cURL:**
```bash
curl http://localhost:8085/api/yoga-poses/1
```

---

### 6. Get Poses by Difficulty Level

**Endpoint:** `GET /yoga-poses/difficulty/{level}`

**cURL:**
```bash
curl http://localhost:8085/api/yoga-poses/difficulty/Intermediate
```

---

### 7. Get Pose Image

**Endpoint:** `GET /yoga-poses/images/{filename}`

**cURL:**
```bash
curl http://localhost:8085/api/yoga-poses/images/abc123_tree-pose.jpg --output pose.jpg
```

---

## 💬 Feedback Endpoints

### 8. Submit Feedback

**Endpoint:** `POST /feedback/add`

**Request Body:**
```json
{
  "name": "John Doe",
  "address": "New York, USA",
  "message": "Great app! Very helpful for my yoga practice.",
  "rate": 5
}
```

**cURL:**
```bash
curl -X POST http://localhost:8085/api/feedback/add \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","address":"New York, USA","message":"Great app!","rate":5}'
```

---

## 🔒 Protected Endpoints (Future)

For endpoints that require authentication, include the JWT token in the Authorization header:

```bash
curl http://localhost:8085/api/protected-endpoint \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 📊 Error Response Format

All errors follow this structure:

```json
{
  "success": false,
  "message": "Error description here"
}
```

### Common HTTP Status Codes

- `200` - Success
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials)
- `404` - Not Found
- `409` - Conflict (duplicate username/email)
- `413` - Payload Too Large (file > 50MB)
- `500` - Internal Server Error

---

## 🧪 Postman Collection

You can import these endpoints into Postman:

1. Create a new collection: "Yoga PosePerfect API"
2. Add the base URL as a collection variable: `{{baseUrl}} = http://localhost:8085/api`
3. Create an environment variable for the token: `{{authToken}}`
4. Copy the token from login response and use `{{authToken}}` in headers

---

## 📖 Interactive API Documentation

For a better testing experience, use the built-in Swagger UI:

**URL:** http://localhost:8085/swagger-ui.html

This provides:
- Interactive API explorer
- Request/response examples
- Built-in testing interface
- Schema documentation

---

## ✅ Validation Rules

### Registration
- Username: 3-30 characters, required
- Email: Valid email format, required
- Password: Min 6 characters, required

### Feedback
- Rate: 1-5 (number)
- Message: Max 1000 characters

### Yoga Pose Upload
- Image: Max 50MB
- Supported formats: JPG, JPEG, PNG

---

**Happy Testing! 🧘‍♀️**
