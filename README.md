# Career APO Explorer - AI-Powered Career Automation Analysis

![APO Dashboard](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-3.0-blue)

## 🚀 Overview

**Career APO Explorer** (Automation Potential Overview) is a cutting-edge web application that leverages AI to analyze career automation potential. Built with React, TypeScript, and Supabase, it provides professionals, researchers, and career counselors with data-driven insights about how AI and automation might impact different occupations.

### 🔑 Key Features

- **AI-Powered Analysis**: Advanced automation scoring using Google's Gemini AI
- **Real-time Data**: Live integration with O*NET occupation database
- **Comprehensive Insights**: Multi-dimensional analysis across skills, tasks, and abilities
- **Professional Reports**: Export-ready CSV and PDF documentation
- **Collaborative Features**: Share analyses with teams and clients
- **AI Impact Career Planner**: Understand how AI will impact specific job tasks and develop future-proof skills

## 🆕 AI Impact Career Planner

The new AI Impact Career Planner feature helps you understand how AI will affect your specific job and prepare for the future of work:

### Key Capabilities

1. **Occupation Selection**: Search and select your occupation from the O*NET database
2. **Task Analysis**: View your job tasks categorized as:
   - **Automate**: Tasks that can be fully automated by AI
   - **Augment**: Tasks where AI can assist but humans are still needed
   - **Human-only**: Tasks that require uniquely human skills
3. **Custom Task Assessment**: Add and analyze your own specific job tasks
4. **Skill Recommendations**: Get personalized suggestions for skills to develop
5. **Reskilling Resources**: Access curated learning resources for each recommended skill
6. **Progress Tracking**: Track your progress in acquiring new skills
7. **Confidence Filtering**: Filter tasks by AI confidence score
8. **Feedback System**: Provide feedback on assessment accuracy

### How to Use

1. Click the "AI Impact Planner" button in the dashboard header
2. Search for your occupation or enter a custom job title
3. Explore the task analysis, skill recommendations, and learning resources
4. Add your own tasks to get personalized assessments
5. Track your progress in developing recommended skills

## ✨ Core Features

### 🔍 **Core Analysis Engine**
- **Intelligent Career Search**: Real-time search through 1000+ O*NET occupations
- **Multi-Factor APO Scoring**: Analysis across:
  - Work Tasks & Activities
  - Required Knowledge Areas
  - Essential Skills & Abilities
  - Technology Requirements
- **Confidence Metrics**: AI-generated reliability scores
- **Timeline Forecasting**: Automation timeline predictions (2-15+ years)
- **Risk Classification**: Color-coded automation risk levels

### 📊 **Advanced Visualizations**
- **Interactive Charts**: Dynamic data visualization with Recharts
- **Category Breakdowns**: Detailed skill/knowledge analysis
- **Comparison Tools**: Side-by-side occupation comparisons
- **Trend Analysis**: Historical and projected automation trends

### 👤 **User Management & Personalization**
- **Secure Authentication**: Supabase Auth with email/password
- **Personal Dashboard**: Comprehensive user management interface
- **Profile Management**: Customizable user profiles and preferences
- **Usage Analytics**: Personal usage statistics and insights

### 💾 **Data Management**
- **Persistent Storage**: User-specific data with Row Level Security
- **Smart Caching**: Optimized API response caching
- **Export Capabilities**: 
  - **CSV Export**: Excel/Google Sheets compatible
  - **PDF Reports**: Professional formatted documentation
- **Collection Management**: Save, organize, and tag analyses

### 🤝 **Collaboration & Sharing**
- **Share by Link**: Generate shareable URLs for analyses
- **Email Sharing**: Direct email sharing with access controls
- **Token-based Access**: Secure sharing with expiration controls
- **View Tracking**: Monitor share engagement and access

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Supabase Account** (free tier available)
- **API Keys** for external services

### 1. Clone & Install
```bash
git clone <repository-url>
cd apo-dashboard
npm install
```

### 2. Environment Setup
Create `.env.local` with your configuration:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase Configuration
Configure these secrets in your Supabase dashboard:
- `ONET_API_KEY`: O*NET Web Services API key
- `GOOGLE_AI_API_KEY`: Google AI/Gemini API key  
- `SERPAPI_KEY`: SerpAPI key for job market data

### 4. Start Development
```bash
npm run dev
```
Open `http://localhost:5173` to access the application.

## 🏗️ Architecture

### Frontend Stack
- **React 18**: Modern component-based UI framework
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality component library
- **TanStack Query**: Server state management
- **React Router**: Client-side routing
- **Recharts**: Data visualization

### Backend Infrastructure
- **Supabase**: 
  - PostgreSQL database with Row Level Security
  - Authentication and user management
  - Edge Functions for serverless API integration
  - Real-time subscriptions
- **External APIs**:
  - O*NET Web Services for occupation data
  - Google Gemini AI for automation analysis
  - SerpAPI for job market insights

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

### Documentation
- **User Guide**: Comprehensive usage documentation
- **API Documentation**: Developer integration guides
- **Video Tutorials**: Step-by-step walkthroughs

### Community Support
- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: Community Q&A and best practices

---

**🌟 Career APO Explorer - Empowering informed career decisions in the age of AI**

*Built with ❤️ for the future of work*