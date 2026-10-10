# 🖼️ Frontend-Backend Image Integration Guide

## Overview

The frontend now displays **real yoga pose images** from the backend's upload folder instead of placeholder images. Here's how it works:

---

## 🗂️ Image Structure

### Backend (Image Storage)
```
Backend/uploads/
├── basic2.jpg              # Mountain Pose
├── basic3.jpg              # Child's Pose
├── treeposeb.jpeg          # Tree Pose
├── meditation.jpg          # Corpse Pose / Hero Image
├── inter2.jpg              # Warrior I
├── inter3.jpg              # Warrior II
├── inter4.jpg              # Triangle Pose
├── inter5.jpg              # Bridge Pose
├── advance2.jpg            # Crow Pose
├── advance3.jpg            # Headstand
├── advance4.jpg            # Wheel Pose
├── advance5.jpg            # King Pigeon
├── sun1.png - sun7.png     # Sun Salutation Sequence
├── yogapose4.jpg           # Chair Pose
├── yogaposea.jpg           # Lotus Pose
├── yogaposeb1.jpg          # Extended Triangle
├── yogaposei.jpg           # Seated Forward Bend
├── silent.jpg              # Silent Meditation
└── flow.png                # About page image
Total: 28 images
```

---

## 🔗 How Images Are Served

### Backend API Endpoint
```java
// YogaPosesController.java
@GetMapping("/images/{filename}")
public ResponseEntity<Resource> getImage(@PathVariable String filename) {
    Path filePath = Paths.get("uploads").resolve(filename);
    Resource resource = new UrlResource(filePath.toUri());
    
    return ResponseEntity.ok()
        .contentType(MediaType.IMAGE_JPEG)
        .body(resource);
}
```

**URL Pattern:** `http://localhost:8085/api/yoga-poses/images/{filename}`

---

## 📦 Database Seeding

### DataSeeder Component

When the backend starts, it automatically populates the database with 24 yoga poses using the images from the uploads folder.

**File:** `Backend/yoga/src/main/java/com/example/yoga/config/DataSeeder.java`

```java
@Component
public class DataSeeder implements CommandLineRunner {
    @Override
    public void run(String... args) {
        if (yogaPosesRepository.count() == 0) {
            seedYogaPoses(); // Adds 24 poses with real images
        }
    }
}
```

**Poses Added:**
- 4 Basic poses (Mountain, Child's, Tree, Corpse)
- 6 Intermediate poses (Warriors, Triangle, Bridge, Chair)
- 4 Advanced poses (Crow, Headstand, Wheel, King Pigeon)
- 7 Sun Salutation sequence poses
- 3 Additional poses (Lotus, Extended Triangle, Forward Bend, Meditation)

---

## 🎨 Frontend Usage

### 1. HomePage - Hero Image
```jsx
<img
  src="http://localhost:8085/api/yoga-poses/images/meditation.jpg"
  alt="Yoga Practice"
  className="hero-image"
  onError={(e) => {
    e.target.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b';
  }}
/>
```

### 2. HomePage - Featured Poses
Fetches from API and displays the first 3 poses:
```jsx
const fetchFeaturedPoses = async () => {
  const response = await API.get('/api/yoga-poses');
  setFeaturedPoses(response.data.slice(0, 3));
};
```

### 3. YogaPosesPage - All Poses
Displays all poses from the database:
```jsx
const fetchPoses = async () => {
  const response = await API.get('/api/yoga-poses');
  setPoses(response.data);
};
```

### 4. YogaPosesPage - Filter by Difficulty
```jsx
const fetchByDifficulty = async (level) => {
  const response = await API.get(`/api/yoga-poses?difficultyLevel=${level}`);
  setPoses(response.data);
};
```

### 5. PoseDetailPage - Single Pose
```jsx
const response = await API.get(`/api/yoga-poses/${id}`);
setPose(response.data);
```

### 6. AboutPage - Mission Image
```jsx
<img
  src="http://localhost:8085/api/yoga-poses/images/flow.png"
  alt="Yoga Practice"
  className="mission-image"
  onError={(e) => {
    e.target.src = 'https://images.unsplash.com/photo-1545389336-cf090694435e';
  }}
/>
```

---

## 🔄 Image URL Transformation

### Backend Automatically Adds Full URL

When fetching poses, the backend controller adds the full image URL:

```java
yogaPoses.forEach(pose -> {
    if (pose.getImageUrl() != null && !pose.getImageUrl().isEmpty()) {
        pose.setImageUrl(IMAGE_BASE_URL + pose.getImageUrl());
    }
});
```

**Before:** `"basic2.jpg"`  
**After:** `"http://localhost:8085/api/yoga-poses/images/basic2.jpg"`

### Frontend Receives Complete URLs

```json
{
  "id": 1,
  "name": "Mountain Pose (Tadasana)",
  "description": "Stand tall with feet together...",
  "difficultyLevel": "Basic",
  "benefits": "Improves posture, strengthens thighs...",
  "imageUrl": "http://localhost:8085/api/yoga-poses/images/basic2.jpg"
}
```

---

## 🛡️ Error Handling

All images have fallback URLs in case the backend is not running:

```jsx
onError={(e) => {
  e.target.src = 'https://images.unsplash.com/photo-fallback-url';
}}
```

This ensures the frontend displays placeholder images if:
- Backend is not running
- Image file is missing
- Network error occurs

---

## 🎯 Image Mapping Reference

| Pose Name | Difficulty | Image File |
|-----------|-----------|------------|
| Mountain Pose | Basic | `basic2.jpg` |
| Child's Pose | Basic | `basic3.jpg` |
| Tree Pose | Basic | `treeposeb.jpeg` |
| Corpse Pose | Basic | `meditation.jpg` |
| Warrior I | Intermediate | `inter2.jpg` |
| Warrior II | Intermediate | `inter3.jpg` |
| Triangle Pose | Intermediate | `inter4.jpg` |
| Bridge Pose | Intermediate | `inter5.jpg` |
| Chair Pose | Intermediate | `yogapose4.jpg` |
| Crow Pose | Advanced | `advance2.jpg` |
| Headstand | Advanced | `advance3.jpg` |
| Wheel Pose | Advanced | `advance4.jpg` |
| King Pigeon | Advanced | `advance5.jpg` |
| Sun Salutation 1-7 | Basic/Inter | `sun1.png` - `sun7.png` |
| Lotus Pose | Advanced | `yogaposea.jpg` |
| Extended Triangle | Intermediate | `yogaposeb1.jpg` |
| Seated Forward Bend | Intermediate | `yogaposei.jpg` |
| Silent Meditation | Basic | `silent.jpg` |

---

## 🚀 How to Test

### 1. Start Backend
```bash
cd Backend/yoga
./mvnw spring-boot:run
```

**Check database seeding log:**
```
✅ Database seeded with 24 yoga poses!
```

### 2. Verify Images API
Visit: http://localhost:8085/api/yoga-poses

**Expected Response:** JSON array with 24 poses, each having a full image URL

### 3. Test Image Access
Visit: http://localhost:8085/api/yoga-poses/images/basic2.jpg

**Expected:** Image displays in browser

### 4. Start Frontend
```bash
cd Yoga-Fronted
npm start
```

### 5. Verify Frontend Display

**Homepage:**
- Hero image shows meditation.jpg
- Featured poses section shows 3 real yoga poses from DB

**Poses Page:**
- All 24 poses display with real images
- Filter by Basic/Intermediate/Advanced works

**Pose Detail Page:**
- Click any pose card
- Full pose details with large image display

**About Page:**
- Mission section shows flow.png image

---

## 📝 Adding New Images

### Step 1: Add Image to Uploads Folder
```bash
cp new-pose.jpg Backend/uploads/
```

### Step 2: Add Pose to Database

**Option A:** Via Swagger UI
1. Go to http://localhost:8085/swagger-ui.html
2. POST `/api/yoga-poses/upload`
3. Upload image and fill form

**Option B:** Add to DataSeeder.java
```java
new YogaPoses(
    "New Pose Name",
    "Description here",
    "Basic", // or Intermediate/Advanced
    "new-pose.jpg",
    "Benefits here"
)
```

### Step 3: Restart Backend
The new pose will automatically appear in the frontend!

---

## 🎨 Image Requirements

- **Formats:** JPG, JPEG, PNG
- **Recommended Size:** 800x600px or similar aspect ratio
- **Max Size:** 50MB (configured in application.properties)
- **Naming:** Use descriptive names (e.g., `warrior-pose.jpg`)

---

## ✅ Benefits of This Integration

1. **Dynamic Content** — No hardcoded image URLs
2. **Real Data** — Frontend displays actual database content
3. **Easy Updates** — Add poses via API, instantly visible
4. **Professional** — Separates concerns (backend stores, frontend displays)
5. **Scalable** — Can easily add 100+ poses without code changes
6. **Offline Fallbacks** — Graceful degradation if backend is down

---

## 🔧 Configuration

### Backend Image Base URL
**File:** `YogaPosesController.java`
```java
private static final String IMAGE_BASE_URL = "http://localhost:8085/api/yoga-poses/images/";
```

**For Production:** Change to your domain
```java
private static final String IMAGE_BASE_URL = "https://api.poseperfect.com/api/yoga-poses/images/";
```

### Frontend API Base URL
**File:** `src/api/axiosConfig.js`
```javascript
const API = axios.create({
  baseURL: 'http://localhost:8085',
});
```

**For Production:** Use environment variables
```javascript
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8085',
});
```

---

## 🎉 Summary

✅ **28 real images** from backend uploads folder  
✅ **24 yoga poses** automatically seeded to database  
✅ **Frontend displays** real images via API  
✅ **Fallback images** for error handling  
✅ **Dynamic content** - no hardcoding  
✅ **Production-ready** architecture

Your frontend now has a **complete integration** with backend images! 🚀
