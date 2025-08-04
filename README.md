# 💰 Future Plus - Daily Earning Platform

A comprehensive microtask and investment platform designed for Indian users to earn daily income through various plans and activities.

## 🌟 Features

### 💰 Earning Opportunities
- **Daily Earnings**: Earn ₹500-₹2000 daily through microtasks and investments
- **4 Investment Plans**: Lucky Draw, Passion Income, Premium, and Big Bonanza
- **Referral System**: 10% bonus on successful referrals
- **Gift & Rewards**: Regular lucky draws and bonus distributions

### 💳 Wallet & Payments
- **Secure Wallet**: Balance and bonus management
- **UPI Integration**: Easy recharge and withdrawal with UPI
- **10% Bonus**: Instant bonus on first recharge
- **Transaction History**: Complete transaction tracking

### 👥 User Management
- **Simple Registration**: No KYC required
- **Dashboard**: Comprehensive user dashboard
- **Team Management**: Build and manage your referral team
- **Mobile-First**: Optimized for mobile devices

### 🛡️ Admin Panel
- **Secure Access**: Key-protected admin authentication
- **User Management**: Monitor and manage user activities
- **Plan Management**: Control investment plans and returns
- **Gift Management**: Create and manage lucky draws

## 🚀 Technology Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT-based authentication
- **Payment**: UPI integration ready
- **Deployment**: Vercel-ready configuration

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── wallet/        # Wallet operations
│   │   ├── admin/         # Admin operations
│   │   ├── plans/         # Plan management
│   │   └── referral/      # Referral system
│   ├── auth/              # Authentication pages
│   ├── wallet/            # Wallet management
│   ├── admin/             # Admin panel
│   ├── plans/             # Investment plans
│   ├── referral/          # Referral system
│   ├── gift/              # Gift & rewards
│   ├── team/              # Team management
│   ├── about/             # About page
│   └── app/               # App download page
├── components/
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
└── lib/                   # Utilities and configurations
```

## 🎯 Key Pages

### Main Dashboard (`/`)
- Icon grid with 8 main features
- Hero section with earning statistics
- Quick stats and balance display
- Mobile-first responsive design

### Authentication (`/auth`)
- Login and registration forms
- Email/mobile authentication
- Password validation
- JWT token management

### Wallet (`/wallet`)
- Balance overview (main + bonus)
- Recharge functionality with UPI
- Withdrawal processing
- Transaction history

### Admin Panel (`/admin`)
- Secure key-based authentication
- User management and monitoring
- Plan activation/deactivation
- Gift draw management

## 📱 Mobile Optimization

The platform is designed with a mobile-first approach:
- Responsive design for all screen sizes
- Touch-friendly interface
- Optimized performance for mobile networks
- Progressive Web App ready

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/futureplus.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Configure environment variables (see below)
   - Deploy automatically

### Environment Variables

Create `.env.local` for production:

```env
# Database Configuration
DATABASE_URL="file:./dev.db"

# Admin Configuration
ADMIN_EMAIL="admin@futureplus.in"
ADMIN_PASSWORD="your_secure_admin_password"
ADMIN_KEY="your_secure_admin_key"

# JWT Configuration
JWT_SECRET="your_super_secure_jwt_secret"

# Application Configuration
NODE_ENV="production"
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your_nextauth_secret"

# Contact Information
CONTACT_PHONE="+91 9728854984"
CONTACT_EMAIL="support@futureplus.in"
UPI_ID="mr.saharan1992-3@okhdfcbank"
```

### Database Setup

1. **Generate Prisma Client**
   ```bash
   npm run db:generate
   ```

2. **Push Database Schema**
   ```bash
   npm run db:push
   ```

3. **Seed Initial Data**
   ```bash
   npm run db:seed
   ```

## 🔑 Admin Access

After deployment, access the admin panel at `/admin` with these credentials:

- **Admin Key**: `FUTUREPLUS_ADMIN_KEY_2024`
- **Email**: `admin@futureplus.in`
- **Password**: `admin123`

⚠️ **Security Note**: Change the default admin credentials immediately after deployment!

## 💳 Payment Configuration

### UPI Settings
- **UPI ID**: `mr.saharan1992-3@okhdfcbank`
- **Contact Number**: `+91 9728854984`
- **Support Email**: `support@futureplus.in`

### Payment Flow
1. User initiates recharge
2. System generates UPI payment details
3. User pays via any UPI app
4. User enters UTR/reference number
5. Admin verifies and credits balance
6. 10% bonus automatically added

## 📊 Investment Plans

| Plan | Price | Duration | Daily Return | Total Return |
|------|-------|----------|-------------|--------------|
| Lucky Draw | ₹450 | 30 days | ₹50 | ₹1,500 |
| Passion Income | ₹1,700 | 60 days | ₹200 | ₹12,000 |
| Premium | ₹3,500 | 90 days | ₹450 | ₹40,500 |
| Big Bonanza | ₹8,500 | 120 days | ₹1,200 | ₹1,44,000 |

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Prisma ORM with parameterized queries
- **XSS Protection**: Next.js built-in security headers
- **Rate Limiting**: API endpoint protection ready

## 📈 Monitoring & Analytics

- **User Activity Tracking**: Complete user journey tracking
- **Transaction Monitoring**: Real-time transaction monitoring
- **Revenue Analytics**: Dashboard with revenue insights
- **User Growth Analytics**: User acquisition and retention metrics

## 🛠️ Development

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Database operations
npm run db:push        # Push schema to database
npm run db:generate    # Generate Prisma client
npm run db:seed        # Seed initial data

# Build for production
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📱 Mobile App

The platform includes mobile app download functionality:
- **Android App**: Native Android application
- **Desktop App**: Windows/Mac desktop application
- **Telegram Bot**: Automated trading assistant

## 🎯 Marketing Features

- **Referral System**: Users can refer friends and earn 10% bonus
- **Gift Draws**: Regular lucky draws to engage users
- **Bonus Programs**: Various bonus schemes for active users
- **Social Sharing**: Built-in social media sharing features

## 📞 Support

- **Phone**: +91 9728854984
- **Email**: support@futureplus.in
- **Admin Panel**: 24/7 monitoring and management

## 🔮 Future Enhancements

- **Payment Gateway Integration**: Razorpay/Stripe integration
- **Advanced Analytics**: Real-time dashboard with charts
- **Mobile Apps**: Native iOS and Android applications
- **API Documentation**: Complete API documentation
- **Multi-language Support**: Hindi and other regional languages

## 📄 Legal & Compliance

- **Privacy Policy**: User data protection and privacy
- **Terms of Service**: Platform usage terms and conditions
- **GST Compliance**: Ready for GST integration
- **KYC Integration**: Optional KYC verification for higher limits

---

Built with ❤️ for the Indian earning community. Future Plus - Your trusted daily earning platform.