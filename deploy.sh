#!/bin/bash

# Future Plus Deployment Script
# This script helps deploy the application to Vercel

echo "🚀 Starting Future Plus Deployment Process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npm run db:generate

# Push database schema
echo "📊 Pushing database schema..."
npm run db:push

# Seed initial data
echo "🌱 Seeding initial data..."
npm run db:seed

# Run linting
echo "🔍 Running code quality checks..."
npm run lint

# Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Build completed successfully!"
echo ""
echo "🎯 Next steps for deployment:"
echo ""
echo "1. 📤 Push to GitHub:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial Future Plus deployment'"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/yourusername/futureplus.git"
echo "   git push -u origin main"
echo ""
echo "2. 🌐 Deploy to Vercel:"
echo "   - Go to vercel.com"
echo "   - Import your GitHub repository"
echo "   - Configure environment variables from .env.production"
echo "   - Deploy"
echo ""
echo "3. 🔑 Security Setup:"
echo "   - Change default admin credentials"
echo "   - Update all secrets in Vercel environment variables"
echo "   - Set up domain and SSL"
echo ""
echo "4. 📱 Post-deployment:"
echo "   - Test all features"
echo "   - Set up payment gateway if needed"
echo "   - Configure email notifications"
echo "   - Set up monitoring and analytics"
echo ""
echo "🎉 Future Plus is ready for deployment!"
echo ""
echo "🔑 Default Admin Credentials:"
echo "   Email: admin@futureplus.in"
echo "   Password: admin123"
echo "   Admin Key: FUTUREPLUS_ADMIN_KEY_2024"
echo ""
echo "⚠️  IMPORTANT: Change these credentials immediately after deployment!"