# Quick Start Guide - PosePerfect

## 🚀 Getting Started in 5 Minutes

### Step 1: Database Setup (1 minute)

Open MySQL and create the database:
```sql
CREATE DATABASE yoga_db;
```

### Step 2: Configure Backend (30 seconds)

Edit `Backend/yoga/src/main/resources/application.properties`:
```properties
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Step 3: Start Backend (1 minute)

```bash
cd Backend/yoga
./mvnw spring-boot:run
```

Wait for: `Started YogaApplication in X seconds`

### Step 4: Install Frontend Dependencies (2 minutes)

```bash
cd Yoga-Fronted
npm install
```

### Step 5: Start Frontend (30 seconds)

```bash
npm start
```

Browser opens automatically at `http://localhost:3000`

## ✅ Verify Everything Works

1. **Home Page** - Should see hero section with gradient background
2. **Register** - Create a new account
3. **Login** - Login with your credentials
4. **Poses** - Browse yoga poses (may be empty initially)
5. **Detect** - Try AI pose detection (allow camera access)
6. **Feedback** - Submit feedback with star rating

## 📝 Add Sample Yoga Poses

Use Postman or curl to add poses:

```bash
curl -X POST http://localhost:8085/api/yoga-poses/upload \
  -F "name=Mountain Pose" \
  -F "description=Stand tall with feet together, arms at sides" \
  -F "benefits=Improves posture, strengthens thighs" \
  -F "difficultyLevel=Basic" \
  -F "image=@/path/to/image.jpg"
```

## 🎯 Key URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:8085
- API Docs: http://localhost:8085/swagger-ui.html (after backend updates)

## 🐛 Troubleshooting

**Backend won't start:**
- Check MySQL is running
- Verify database credentials
- Ensure port 8085 is free

**Frontend errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear browser cache

**Camera not working:**
- Allow camera permissions
- Use HTTPS in production
- Try different browser (Chrome recommended)

## 📱 Test on Mobile

1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Update frontend API URL to use your IP instead of localhost
3. Access from mobile: `http://YOUR_IP:3000`

## 🎨 Customization

**Change Colors:** Edit `src/index.css` CSS variables
**Add Poses:** Use the upload endpoint
**Modify Layout:** Edit component files in `src/pages/`

## 📚 Next Steps

1. Add more yoga poses via API
2. Customize branding and colors
3. Deploy to production (Vercel + Railway/Heroku)
4. Add more AI pose detection models
5. Implement workout routines

---

**Need Help?** Check the full README.md for detailed documentation.
