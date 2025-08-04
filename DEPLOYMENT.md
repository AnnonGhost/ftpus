# 🚀 Future Plus Deployment Guide

This guide will help you deploy the Future Plus platform to production using Vercel.

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- GitHub account
- Vercel account
- Domain name (optional)

## 🎯 Deployment Steps

### 1. 📁 Project Setup

```bash
# Clone or download your project
# Navigate to project directory
cd futureplus

# Install dependencies
npm install

# Run the deployment script
./deploy.sh
```

### 2. 📤 GitHub Setup

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial Future Plus deployment"

# Create main branch
git branch -M main

# Add GitHub remote
git remote add origin https://github.com/yourusername/futureplus.git

# Push to GitHub
git push -u origin main
```

### 3. 🌐 Vercel Deployment

1. **Sign in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select your Future Plus repository
   - Click "Import"

3. **Configure Environment Variables**
   
   In Vercel dashboard, go to Project Settings → Environment Variables and add:

   ```env
   # Database
   DATABASE_URL=file:./dev.db

   # Admin (CHANGE THESE VALUES!)
   ADMIN_EMAIL=admin@futureplus.in
   ADMIN_PASSWORD=your_secure_password
   ADMIN_KEY=your_secure_admin_key

   # JWT
   JWT_SECRET=your_super_secure_jwt_secret

   # Application
   NODE_ENV=production
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your_nextauth_secret

   # Contact
   CONTACT_PHONE=+91 9728854984
   CONTACT_EMAIL=support@futureplus.in
   UPI_ID=mr.saharan1992-3@okhdfcbank
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be available at `https://your-project-name.vercel.app`

### 4. 🔐 Post-Deployment Security

**IMMEDIATELY AFTER DEPLOYMENT:**

1. **Change Admin Credentials**
   - Access `/admin` with default credentials
   - Create a new admin account with secure credentials
   - Delete or disable the default admin account

2. **Update Environment Variables**
   - Generate new secure secrets:
     ```bash
     # Generate JWT secret
     openssl rand -base64 32
     
     # Generate session secret
     openssl rand -base64 32
     ```
   - Update all environment variables in Vercel

3. **Set Up Custom Domain**
   - In Vercel dashboard, go to Domain Settings
   - Add your custom domain
   - Configure DNS settings
   - Wait for SSL certificate issuance

## 🗄️ Database Setup

### Production Database

For production, consider using a more robust database:

1. **Setup PlanetScale (MySQL)**
   ```bash
   # Install PlanetScale CLI
   npm install -g prisma

   # Create database
   pscale database create futureplus

   # Get connection string
   pscale service-token create
   ```

2. **Update DATABASE_URL**
   ```env
   DATABASE_URL="mysql://user:password@host/futureplus"
   ```

3. **Run migrations**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

## 💳 Payment Gateway Integration

### Razorpay Integration

1. **Create Razorpay Account**
   - Sign up at [Razorpay](https://razorpay.com)
   - Get API keys

2. **Add Environment Variables**
   ```env
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   ```

3. **Update Payment Flow**
   - Modify wallet recharge to use Razorpay
   - Set up webhook for payment confirmation
   - Test payment flow in sandbox mode

## 📧 Email Configuration

### Setup Email Notifications

1. **Configure SMTP**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

2. **Email Templates**
   - Welcome email
   - Payment confirmation
   - Withdrawal notification
   - Admin alerts

## 📊 Analytics & Monitoring

### Google Analytics

1. **Setup Google Analytics**
   ```env
   GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

2. **Add Tracking Script**
   - Update layout.tsx to include GA
   - Track key events (signups, payments, etc.)

### Error Monitoring

1. **Setup Sentry**
   ```bash
   npm install @sentry/nextjs
   ```
   
2. **Configure Sentry**
   ```env
   SENTRY_DSN=your_sentry_dsn
   ```

## 🔍 Testing Checklist

Before going live, test:

### User Flow
- [ ] User registration
- [ ] User login
- [ ] Wallet recharge
- [ ] Wallet withdrawal
- [ ] Plan activation
- [ ] Referral system
- [ ] Gift participation

### Admin Flow
- [ ] Admin login
- [ ] User management
- [ ] Plan management
- [ ] Gift management
- [ ] Transaction monitoring

### Security
- [ ] Password strength
- [ ] Input validation
- [ ] SQL injection protection
- [ ] XSS protection
- [ ] Rate limiting

### Performance
- [ ] Page load speed
- [ ] Mobile responsiveness
- [ ] Database queries
- [ ] API response times

## 🚀 Going Live

### Final Checklist

1. **Security**
   - [ ] Changed all default credentials
   - [ ] Updated all environment variables
   - [ ] Enabled SSL
   - [ ] Set up rate limiting

2. **Functionality**
   - [ ] All features working
   - [ ] Payment processing tested
   - [ ] Email notifications working
   - [ ] Admin panel functional

3. **Legal**
   - [ ] Privacy policy page
   - [ ] Terms of service page
   - [ ] Contact information updated
   - [ ] GST compliance ready

4. **Monitoring**
   - [ ] Analytics set up
   - [ ] Error monitoring configured
   - [ ] Uptime monitoring
   - [ ] Backup strategy

### Launch Announcement

Once everything is ready:

1. **Soft Launch**
   - Release to small group of users
   - Monitor for issues
   - Gather feedback

2. **Full Launch**
   - Marketing campaign
   - User onboarding
   - Support system ready

3. **Post-Launch**
   - Monitor performance
   - Address user feedback
   - Plan feature updates

## 📞 Support

### Contact Information
- **Phone**: +91 9728854984
- **Email**: support@futureplus.in
- **Admin Panel**: `/admin`

### Emergency Procedures
1. **Security Incident**: Immediately change all credentials
2. **Payment Issues**: Suspend payment processing
3. **Database Issues**: Restore from backup
4. **Performance Issues**: Enable maintenance mode

## 🎉 Success Metrics

Track these metrics after launch:
- Daily active users
- Registration rate
- Payment conversion rate
- User retention rate
- Revenue growth
- Support ticket resolution time

---

**🎊 Congratulations! Your Future Plus platform is now ready to serve users and help them earn daily income!**