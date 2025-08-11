# Contributing to WHOOP MCP Server

Thank you for your interest in contributing to the WHOOP MCP Server! This document provides guidelines for contributing to the project.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**: `git clone https://github.com/yourusername/whoop-mcp-server.git`
3. **Install dependencies**: `npm install`
4. **Set up environment**: Copy `env.example` to `.env` and add your WHOOP credentials
5. **Build the project**: `npm run build`

## Development Workflow

1. **Create a feature branch**: `git checkout -b feature/your-feature-name`
2. **Make your changes**
3. **Test your changes**: `npm test`
4. **Build the project**: `npm run build`
5. **Commit your changes**: `git commit -m "Add your feature description"`
6. **Push to your fork**: `git push origin feature/your-feature-name`
7. **Create a pull request**

## Code Style

- Use TypeScript for all new code
- Follow the existing code style and formatting
- Add proper JSDoc comments for public functions
- Include error handling for all API calls
- Write tests for new functionality

## Adding New WHOOP API Endpoints

1. **Add types** to `src/types.ts`
2. **Add API method** to `src/whoop-api.ts`
3. **Add tool definition** to `src/mcp-server.ts`
4. **Add tool handler** to `src/mcp-server.ts`
5. **Update documentation** in `README.md`

## Testing

- Run tests: `npm test`
- Test the MCP server: `npm run start-mcp`
- Test authentication: `npm run auth`

## Pull Request Guidelines

- Provide a clear description of the changes
- Include any relevant issue numbers
- Ensure all tests pass
- Update documentation if needed
- Follow the existing code style

## Issues

When reporting issues, please include:

- Operating system and Node.js version
- Steps to reproduce the issue
- Expected vs actual behavior
- Any error messages or logs

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.
