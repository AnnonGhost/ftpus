# Future Plus - Vercel Deployment Setup Guide

## 🚀 Important Notes for Vercel Deployment

### Database Limitations
⚠️ **Important**: Vercel uses a read-only filesystem, which means SQLite databases won't work properly in production. This setup provides a temporary solution, but for production use, you should consider:

1. **External Database**: Use a cloud database service like:
   - PostgreSQL (Supabase, Neon, PlanetScale)
   - MySQL (PlanetScale, Amazon RDS)
   - MongoDB (MongoDB Atlas)

2. **Vercel Postgres**: Vercel's managed PostgreSQL service

### Current Setup
The current implementation uses a modified approach to handle Vercel's limitations:
- Uses `db-vercel.ts` for database connections
- Includes error handling for database unavailability
- Provides database initialization endpoint

## 🔧 Environment Variables for Vercel

Add these environment variables in your Vercel project settings:

### Required Variables
```bash
# Database
DATABASE_URL=file:./dev.db

# Database Initialization Secret (choose a secure random string)
INIT_DB_SECRET=your-super-secret-key-here

# Application Configuration
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=https://your-app.vercel.app

# Admin Configuration
ADMIN_EMAIL=admin@futureplus.in
ADMIN_PASSWORD=admin123
ADMIN_KEY=FUTUREPLUS_ADMIN_KEY_2024

# Contact Information
SUPPORT_EMAIL=support@futureplus.in
SUPPORT_PHONE=+91 9728854984
UPI_ID=mr.saharan1992-3@okhdfcbank
```

## 🗄️ Database Initialization

After deploying to Vercel, you need to initialize the database:

### Method 1: Using the API Endpoint

1. **Set the INIT_DB_SECRET environment variable** in Vercel
2. **Call the initialization endpoint**:
   ```bash
   # Replace with your actual Vercel URL and secret
   curl "https://your-app.vercel.app/api/init-db?secret=your-super-secret-key-here"
   ```

### Method 2: Using Postman

1. **Send a POST request** to `https://your-app.vercel.app/api/init-db`
2. **Include JSON body**:
   ```json
   {
     "secret": "your-super-secret-key-here"
   }
   ```

## 📋 Post-Deployment Checklist

### 1. Verify Environment Variables
- Go to your Vercel project → Settings → Environment Variables
- Ensure all required variables are set correctly
- Redeploy after adding/changing variables

### 2. Initialize Database
- Call the `/api/init-db` endpoint with your secret
- Verify the response shows successful initialization

### 3. Test Core Functionality
- **Login**: Try logging in with admin credentials
- **Registration**: Test user registration
- **Plans**: Verify investment plans are available
- **Wallet**: Test wallet functionality

### 4. Admin Panel Access
- URL: `/admin`
- Email: `admin@futureplus.in`
- Password: `admin123`
- Admin Key: `FUTUREPLUS_ADMIN_KEY_2024`

## 🔍 Troubleshooting

### Common Issues

#### 1. "Database service unavailable"
- **Cause**: Database not initialized or connection issues
- **Solution**: Call the `/api/init-db` endpoint

#### 2. "Internal server error" on login/register
- **Cause**: Prisma client not generated or database issues
- **Solution**: 
  - Ensure build command includes `prisma generate`
  - Check environment variables
  - Initialize database

#### 3. Build fails on Vercel
- **Cause**: Missing dependencies or incorrect build command
- **Solution**: 
  - Verify `package.json` build command is `prisma generate && next build`
  - Check `vercel.json` configuration

### Error Messages and Solutions

| Error Message | Possible Cause | Solution |
|---------------|----------------|----------|
| "PrismaClientInitializationError" | Database connection failed | Check DATABASE_URL, initialize database |
| "Database service unavailable" | Database not initialized | Call `/api/init-db` endpoint |
| "Internal server error" | Various issues | Check logs, verify environment variables |

## 🚀 Production Recommendations

### For Long-term Production Use

1. **Migrate to External Database**:
   ```bash
   # Example for PostgreSQL
   DATABASE_URL="postgresql://username:password@host:port/database"
   ```

2. **Update Prisma Schema**:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. **Run Migration**:
   ```bash
   prisma migrate dev
   ```

4. **Update Environment Variables** in Vercel with the new database URL

### Security Considerations

1. **Change Default Credentials**:
   - Update admin email and password
   - Generate a new admin key
   - Use strong, unique secrets

2. **Environment Variables**:
   - Never commit secrets to version control
   - Use Vercel's environment variable encryption
   - Rotate secrets periodically

3. **Database Security**:
   - Use connection pooling
   - Enable SSL/TLS for database connections
   - Regular backups

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables
3. Ensure database is initialized
4. Test API endpoints individually

For additional help, contact support at `support@futureplus.in` or call `+91 9728854984`.