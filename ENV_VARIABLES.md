# Environment Variables Guide

This document lists all environment variables needed for deployment on Render.

## 🔵 MongoDB Service (`ministock-mongodb`)

These are automatically set by `render.yaml`, but you need to manually set the password:

| Variable | Value | Notes |
|----------|-------|-------|
| `MONGO_INITDB_ROOT_USERNAME` | `admin` | ✅ Auto-set in render.yaml |
| `MONGO_INITDB_ROOT_PASSWORD` | `your-secure-password` | ⚠️ **YOU MUST SET THIS** - Use a strong password |
| `MONGO_INITDB_DATABASE` | `ministock` | ✅ Auto-set in render.yaml |

---

## 🟢 Backend Service (`ministock-backend`)

### Automatically Set (from render.yaml):
- ✅ `NODE_ENV` = `production`
- ✅ `PORT` = `3001`
- ✅ `MONGODB_HOST` = (auto-populated from MongoDB service)
- ✅ `MONGO_INITDB_ROOT_USERNAME` = `admin`
- ✅ `MONGO_INITDB_DATABASE` = `ministock`
- ✅ `FRONTEND_URL` = (auto-populated from frontend service)

### ⚠️ **YOU MUST SET THESE MANUALLY:**

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB password | **Must match** the password set in MongoDB service | `your-secure-password` |
| `JWT_SECRET` | Secret key for JWT token signing | Use a long, random string | `your-super-secret-jwt-key-change-this-in-production` |

**How to generate a secure JWT_SECRET:**
```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 64
```

---

## 🟡 Frontend Service (`ministock-frontend`)

### Automatically Set (from render.yaml):
- ✅ `NODE_ENV` = `production`
- ✅ `NEXT_PUBLIC_API_URL` = (auto-populated from backend service URL + `/api`)

### ⚠️ **No manual variables needed!**
The frontend automatically gets the backend API URL from the backend service.

---

## 📋 Quick Setup Checklist

After deploying with `render.yaml`, you need to:

1. **MongoDB Service:**
   - [ ] Set `MONGO_INITDB_ROOT_PASSWORD` to a secure password

2. **Backend Service:**
   - [ ] Set `MONGO_INITDB_ROOT_PASSWORD` (must match MongoDB service password)
   - [ ] Set `JWT_SECRET` to a secure random string

3. **Frontend Service:**
   - [ ] Nothing needed! ✅

---

## 🔐 Security Best Practices

1. **Never commit secrets to Git** - All sensitive variables are marked `sync: false` in render.yaml
2. **Use strong passwords** - MongoDB password should be at least 16 characters
3. **Use random JWT secrets** - Generate using crypto tools, not dictionary words
4. **Rotate secrets regularly** - Especially if exposed or compromised

---

## 🧪 Testing Locally

For local development, you can create a `.env` file in the `backend` directory:

```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://admin:admin123@localhost:27017/ministock?authSource=admin
JWT_SECRET=your-local-dev-secret
FRONTEND_URL=http://localhost:3000
```

And in the `frontend` directory:

```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## 📝 Summary

**Total variables you need to set manually: 2**
- `MONGO_INITDB_ROOT_PASSWORD` (in MongoDB service)
- `MONGO_INITDB_ROOT_PASSWORD` (in Backend service - same value)
- `JWT_SECRET` (in Backend service)

Everything else is automatically configured by `render.yaml`! 🎉

