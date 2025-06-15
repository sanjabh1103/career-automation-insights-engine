
# APO Dashboard - AI-Powered Career Automation Analysis

![APO Dashboard](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)

## 🚀 Overview

The **APO Dashboard** (Automation Potential Overview) is an advanced AI-powered web application that analyzes career automation potential using real-time data from the O*NET database. It helps professionals, career counselors, and researchers understand how AI and automation might impact different occupations over time.

## ✨ Key Features

### 🔍 **Intelligent Career Search**
- **Real-time O*NET Integration**: Search through 1000+ occupations from the official O*NET database
- **AI-Powered Analysis**: Advanced automation potential calculations using Google's Gemini AI
- **Smart Filtering**: Filter by occupation codes, keywords, and categories
- **Input Sanitization**: Enterprise-grade security with XSS protection

### 📊 **Comprehensive Analysis**
- **Detailed APO Scoring**: Multi-dimensional automation analysis across:
  - Tasks and Work Activities
  - Required Knowledge Areas
  - Essential Skills
  - Core Abilities
  - Technology Requirements
- **Confidence Metrics**: AI-generated confidence levels for predictions
- **Timeline Forecasting**: Estimated automation timelines (2-15+ years)
- **Risk Assessment**: Color-coded risk levels (Low, Medium, Med-High, High)

### 📈 **Advanced Visualizations**
- **Interactive Charts**: Dynamic visualizations using Recharts
- **Category Breakdowns**: Detailed analysis by skill/knowledge categories
- **Comparison Views**: Side-by-side occupation comparisons
- **Trend Analysis**: Historical and projected automation trends

### 💾 **Data Management**
- **Secure Storage**: User-specific data with Row Level Security (RLS)
- **Export Capabilities**: 
  - **CSV Export**: Excel/Google Sheets compatible
  - **PDF Reports**: Professional formatted reports with insights
- **Save & Load**: Persistent analysis collections
- **Search History**: Track and revisit previous searches

### 🎯 **Job Market Intelligence**
- **Real-time Job Data**: Integration with SerpAPI for current job postings
- **Market Trends**: Salary ranges, location data, and demand metrics
- **Career Insights**: AI-generated opportunities and challenges

### 👤 **User Experience**
- **Secure Authentication**: Email/password with Supabase Auth
- **Personal Dashboard**: Manage profiles, settings, and saved data
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Accessibility**: WCAG compliant with screen reader support
- **Guided Onboarding**: Interactive tour for new users

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI primitives
- **State Management**: TanStack Query for server state
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **AI Integration**: Google Gemini API for analysis
- **Data Sources**: O*NET Web Services, SerpAPI
- **Charts**: Recharts for data visualization
- **Build Tool**: Vite for fast development and building

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- API keys for O*NET, Google AI, and SerpAPI

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd apo-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env.local` file with your API keys:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Database Setup**
The application requires several Supabase tables. Run the provided SQL migrations:
- User profiles and settings
- Search history tracking
- Saved analyses storage
- User credits system

5. **Configure Supabase Secrets**
Add these secrets in your Supabase dashboard:
- `ONET_API_KEY`: O*NET Web Services API key
- `GOOGLE_AI_API_KEY`: Google AI/Gemini API key
- `SERPAPI_KEY`: SerpAPI key for job market data

6. **Start Development Server**
```bash
npm run dev
```

7. **Open your browser**
Navigate to `http://localhost:5173`

## 📖 User Guide

### Getting Started

1. **Sign Up/Login**: Create an account or sign in to access personalized features
2. **Take the Tour**: New users get an interactive onboarding experience
3. **Search Careers**: Use the search interface to find occupations
4. **Analyze APO**: Click on any occupation to get detailed automation analysis
5. **Save & Export**: Build collections and export your findings

### Core Workflows

#### **Analyzing a Single Career**
1. Enter occupation name or keywords in the search box
2. Browse results and click on an occupation
3. Review the comprehensive APO analysis:
   - Overall automation score
   - Category-specific breakdowns
   - Timeline predictions
   - AI-generated insights
4. Add to your selected careers collection

#### **Comparing Multiple Careers**
1. Select multiple occupations to your collection
2. Use the comparison panel to see side-by-side analysis
3. Export comparisons as CSV or PDF reports

#### **Market Research**
1. View job market data for any analyzed occupation
2. See current salary ranges and job availability
3. Understand geographic distribution of opportunities

### Advanced Features

- **Export Options**: Choose between CSV (data analysis) or PDF (presentation)
- **Search History**: Revisit previous searches and their results
- **Profile Management**: Update personal information and preferences
- **Settings**: Customize default export formats and notifications

## 🔒 Security & Privacy

- **Data Encryption**: All data transmitted over HTTPS
- **Input Sanitization**: Protection against XSS and injection attacks
- **User Isolation**: Row Level Security ensures users only see their own data
- **Secure Authentication**: Industry-standard auth with Supabase
- **API Security**: Rate limiting and proper error handling
- **Privacy First**: No unnecessary data collection or tracking

## 🏗️ Architecture

### Frontend Architecture
- **Component-based**: Modular React components with TypeScript
- **Error Boundaries**: Comprehensive error handling and recovery
- **State Management**: Server state with TanStack Query, local state with React hooks
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### Backend Architecture
- **Serverless Functions**: Supabase Edge Functions for API integrations
- **Database**: PostgreSQL with Row Level Security
- **Real-time**: Optional real-time subscriptions for collaborative features
- **File Storage**: Supabase Storage for user uploads (if needed)

### Data Flow
1. User searches → Frontend validates and sanitizes input
2. Search request → Supabase Edge Function → O*NET API
3. APO calculation → Edge Function → Google AI API
4. Results stored → PostgreSQL with user association
5. Job market data → SerpAPI integration
6. Export generation → Client-side or server-side processing

## 🎯 Use Cases

### **Career Counselors**
- Provide data-driven career guidance
- Help clients understand automation risks
- Create professional reports for consultations

### **HR Professionals**
- Assess workforce automation impact
- Plan reskilling and upskilling programs
- Make strategic hiring decisions

### **Job Seekers**
- Understand career longevity prospects
- Identify automation-resistant skills to develop
- Make informed career transition decisions

### **Researchers & Analysts**
- Study automation trends across industries
- Generate reports on labor market evolution
- Compare automation potential across occupations

### **Educational Institutions**
- Guide curriculum development
- Help students choose future-ready careers
- Research workforce development needs

## 🔧 API Integrations

- **O*NET Web Services**: Official occupation data and classifications
- **Google Gemini AI**: Advanced natural language processing for analysis
- **SerpAPI**: Real-time job market and salary data
- **Supabase**: Authentication, database, and serverless functions

## 📊 Performance

- **Fast Loading**: Optimized bundle with code splitting
- **Caching**: Intelligent caching of API responses
- **Responsive**: Smooth performance across all device sizes
- **Scalable**: Designed to handle growing user bases

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for:
- Code style and standards
- Testing requirements
- Pull request process
- Issue reporting

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information
4. Contact support via email

## 🗺️ Roadmap

### Upcoming Features
- **Industry Analysis**: Sector-wide automation trends
- **Skills Gap Analysis**: Identify skill development opportunities
- **Collaborative Workspaces**: Team-based analysis and sharing
- **API Access**: Developer API for integrations
- **Mobile App**: Native mobile applications
- **Advanced AI**: Enhanced prediction models

---

**Built with ❤️ for the future of work**

*Last updated: December 2024*
