# Contributing to CareerAI

Thank you for your interest in contributing to CareerAI! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (OS, browser, Node version)

### Suggesting Features

Feature suggestions are welcome! Please create an issue with:
- A clear, descriptive title
- Detailed description of the proposed feature
- Use cases and benefits
- Any implementation ideas (optional)

### Pull Requests

1. **Fork the repository** and create your branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards:
   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**:
   ```bash
   npm run build
   npm run lint
   ```

4. **Commit your changes** with clear, descriptive commit messages:
   ```bash
   git commit -m "Add feature: description of your changes"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** with:
   - Clear title and description
   - Reference to related issues
   - Screenshots (if UI changes)
   - List of changes made

## Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd careernavig
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Add your OpenAI API key
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` when possible
- Use proper error handling

### React/Next.js
- Use functional components with hooks
- Follow React best practices
- Use proper component composition
- Implement proper error boundaries

### Styling
- Use Tailwind CSS for styling
- Follow the existing design system
- Ensure responsive design
- Support both light and dark modes

### API Routes
- Implement proper error handling
- Add input validation
- Use rate limiting
- Write clear API documentation

## Project Structure

```
careernavig/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/              # Utility functions
├── hooks/            # Custom React hooks
└── public/           # Static assets
```

## Testing

Before submitting a PR:
1. Test your changes locally
2. Ensure the build succeeds: `npm run build`
3. Run linting: `npm run lint`
4. Test on multiple browsers (if UI changes)
5. Test responsive design (if UI changes)

## Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Reach out to the maintainers
- Check existing issues and PRs

Thank you for contributing to CareerAI! 🎉
