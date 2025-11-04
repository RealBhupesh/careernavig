# CareerAI - AI-Powered Career Navigation Platform

CareerAI is a comprehensive career guidance platform that leverages artificial intelligence to help students and graduates navigate their career paths. The platform provides personalized insights, skill analysis, resume optimization, mock interviews, and job matching services.

## Features

### 🎯 Core Features

- **Skill Analysis**: AI-powered analysis of your resume and skills to identify strengths and opportunities
- **Career Path Recommendations**: Get personalized career suggestions based on your unique profile and market demands
- **Resume Optimizer**: Receive AI-powered feedback to make your resume stand out to employers
- **Mock Interview Practice**: Practice interviews with an AI interviewer for technical and behavioral questions
- **Job Matching**: Find jobs with AI-calculated match percentages based on your qualifications
- **Learning Resources**: Curated learning resources from top platforms to bridge your skill gaps

### 🌟 Additional Features

- **Dark Mode Support**: Toggle between light, dark, and system themes
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile devices
- **SEO Optimized**: Complete meta tags and OpenGraph support for better discoverability
- **Rate Limiting**: API rate limiting to prevent abuse and ensure fair usage
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Tech Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **AI Integration**: OpenAI GPT-4o via Vercel AI SDK
- **Form Handling**: React Hook Form + Zod
- **Theme**: next-themes
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd careernavig
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
careernavig/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── analyze-profile/  # Profile analysis endpoint
│   │   ├── analyze-resume/   # Resume analysis endpoint
│   │   └── interview/        # Interview endpoints
│   ├── careers/              # Career paths page
│   ├── dashboard/            # Dashboard page
│   ├── interview/            # Mock interview page
│   ├── jobs/                 # Job matching page
│   ├── profile/              # Skill analysis page
│   ├── resources/            # Learning resources page
│   ├── resume/               # Resume optimizer page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # UI components (shadcn/ui)
│   ├── theme-provider.tsx    # Theme provider
│   └── theme-toggle.tsx      # Theme toggle component
├── lib/                      # Utility functions
│   ├── api-utils.ts          # API utilities and error handling
│   ├── rate-limit.ts         # Rate limiting implementation
│   └── utils.ts              # General utilities
├── hooks/                    # Custom React hooks
└── public/                   # Static assets
```

## API Routes

### POST `/api/analyze-profile`
Analyzes user profile (resume, skills, interests) and provides career guidance.

**Request Body:**
```json
{
  "resumeText": "string",
  "skills": "string",
  "interests": "string"
}
```

### POST `/api/analyze-resume`
Analyzes resume and provides optimization feedback.

**Request Body:**
```json
{
  "resumeText": "string"
}
```

### POST `/api/interview/start`
Starts a mock interview session for a specific role.

**Request Body:**
```json
{
  "role": "string"
}
```

### POST `/api/interview/respond`
Processes interview answers and provides feedback.

**Request Body:**
```json
{
  "role": "string",
  "answer": "string",
  "questionNumber": number,
  "conversationHistory": array
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI features | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | No |
| `NEXT_PUBLIC_APP_URL` | Application URL | No |
| `NODE_ENV` | Environment (development/production) | No |

## Features in Development

- [ ] User authentication and accounts
- [ ] Resume file upload (PDF, DOCX)
- [ ] Save/bookmark jobs and resources
- [ ] User profile persistence with database
- [ ] Real-time job API integration
- [ ] Email notifications
- [ ] Advanced analytics and insights
- [ ] Career roadmap generation
- [ ] Skill gap analysis visualization

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

Make sure to:
1. Set all required environment variables
2. Configure build command: `npm run build`
3. Configure start command: `npm run start`

## Development

### Running Tests
```bash
npm run test
```

### Linting
```bash
npm run lint
```

### Building for Production
```bash
npm run build
```

## Performance Optimization

- **Code Splitting**: Automatic code splitting via Next.js
- **Image Optimization**: Next.js Image component for optimized images
- **API Caching**: Implement caching strategies for API responses
- **Rate Limiting**: 20 requests per minute per user to prevent abuse

## Security Considerations

- API rate limiting implemented
- Input validation on all API endpoints
- Environment variables for sensitive data
- CORS policies configured
- XSS protection via React
- SQL injection protection (when database is added)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [OpenAI](https://openai.com/)
- Icons from [Lucide](https://lucide.dev/)

---

Made with ❤️ by the CareerAI Team
