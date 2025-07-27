# Monorepo Template

This monorepo template provides a robust foundation for building scalable, multi-package JavaScript and TypeScript projects. It leverages Yarn Workspaces and Turborepo to streamline dependency management, build processes, and development workflows. Designed for front-end and back-end applications, this template supports React for UI development, Node.js for server-side logic, and shared utility packages for code reuse across projects

## 🚀 Features

- **Unified Workspace Management**: Streamlined development across multiple packages and applications
- **Dependency Management**: Centralized package management with workspace-aware installations
- **Build Orchestration**: Intelligent build caching and parallel execution
- **Code Quality**: Integrated linting, formatting, and testing workflows
- **CI/CD Ready**: Pre-configured pipelines for automated testing and deployment
- **Developer Experience**: Hot reload, type checking, and debugging capabilities
- **Scalable Architecture**: Modular structure supporting both libraries and applications

## 📁 Repository Structure

```
monorepo-template/
├── .github/                    # GitHub workflows and templates
│   ├── workflows/
│   │   ├── ci.yml             # Continuous integration pipeline
│   │   ├── release.yml        # Release automation
│   │   └── pr-checks.yml      # Pull request validation
│   └── PULL_REQUEST_TEMPLATE.md
├── .vscode/                    # VS Code workspace configuration
│   ├── extensions.json        # Recommended extensions
│   ├── settings.json          # Workspace settings
│   └── launch.json           # Debug configuration
├── apps/                       # Application packages
│   ├── web/          # Frontend web application with Next.js
│   ├── dashboard/   # Admin dashboard web application with Tanstack Router powered by Vite
│   └── mobile/                # Mobile application
├── packages/                   # Shared library packages
│   ├── ui/                    # Shared UI components
│   ├── utils/
    ├── eslint-config/         # Shared ESLint configuration
│   ├── jest-config/           # Testing configuration             # Utility functions
│   ├── config/                # Configuration presets
│   └── types/                 # TypeScript definitions
├── docs/                       # Documentation
│   ├── architecture.md        # System architecture overview
│   ├── contributing.md        # Contribution guidelines
│   └── deployment.md          # Deployment instructions
├── .biomejs.json               # Biome configuration for linting and formatting
├── .eslintrc.js               # ESLint configuration (if using alongside Biome)
├── .gitignore                 # Git ignore patterns
├── .nvmrc                     # Node.js version specification
├── commitlint.config.js       # Commitlint configuration
├── jest.config.js             # Jest testing configuration
├── package.json               # Root package configuration
├── tsconfig.json              # TypeScript configuration
├── turbo.json                 # Turborepo configuration
└── bun.lockb               # Dependency lock file
```

## 🛠 Prerequisites

Ensure your development environment meets these requirements:

- **Node.js**: v18.0.0 or higher
- **Package Manager**: Bun (preferred) or Yarn v3+ or npm v8+
- **Git**: v2.30.0 or higher

## Package Manager Setup

```bash
#inside the package.json, add this:
 "packageManager": "bun@1.2.19",

# Or this for yarn
  "packageManager": "yarn@1.22.22",

# Or this or npm
  "packageManager": "npm@10.9.0",
```

## 📋 Dependencies Installation

### Core Development Dependencies

Install the essential development dependencies for code quality, git hooks, and commit management:

```bash
# Install Biome for code quality, linting and formatting
bun add -D @biomejs/biome

# Install Husky for git hooks
bun add -D husky

# Install lint-staged for running linters on staged files
bun add -D lint-staged

# Install Commitlint for commit message validation
bun add -D @commitlint/cli @commitlint/config-conventional
```

### Setup Commands

After installing dependencies, run these setup commands:

```bash
# Initialize Husky
npx husky init

# Create Biome configuration
npx @biomejs/biome init

# Setup git hooks
echo "npx lint-staged" > .husky/pre-commit
echo "npx commitlint --edit \$1" > .husky/commit-msg

# Make hooks executable
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

## ⚡ Quick Start

### 1. Repository Setup

```bash
# Clone the template
git clone https://github.com/John-pels/monorepo-template.git your-project-name
cd your-project-name

# Remove existing git history and initialize fresh repository
rm -rf .git
git init
git add .
git commit -m "Initial commit from monorepo template"
```

### 2. Environment Configuration

```bash
# Install dependencies
bun install

# Copy environment template
cp .env.example .env

# Configure Node.js version
nvm use
```

### 3. Development Workflow

```bash
# Start all applications in development mode
bun dev

# Start a specific application in development mode
bun dev --filter=app-name # For instance, bun dev --filter=web

# Run specific application
bun workspace @your-org/web dev
bun workspace @your-org/api dev

# Build all packages
bun run build

# Run tests across all packages
bun run test

# Lint codebase
bun run lint

# Fix linting and formatting issues
bun format-and-lint:fix

# Format code
bun run format

# Check for typescript error without writing
bun run check-types

# watchout for typescript error without writing
bun run check-types:watch
```

## 📦 Package Management

### Adding Dependencies

```bash
# Add dependency to specific workspace
bun workspace @your-org/web add react react-dom
bun workspace @your-org/api add express

# Add dev dependency to root
bun add -D typescript @types/node

# Add dependency to multiple workspaces
bun workspaces foreach add lodash
```

For each application in the `apps/` folder,we add `"@repo/ui": "*",` to the dependencies in the app `package.json` file and

- also add the `"@repo/eslint-config": "*",` and `"@repo/typescript-config": "*",` to the `devDependencies` in the `package.json` file. Do the same for every new package you add to the `packages/` folder.

### Creating New Application and Packages

```bash
# Create new application
cd apps/

# To create a new Next.js application, then run the below command
npx create-next-app@latest

# To create a new web application with Vite.js, run the below command and follow the prompts
npm create vite@latest

# Create new shared package
mkdir packages/auth
cd packages/auth
bun init -y
```

**NOTE**: Just as UI is for anything user interface or components, shared providers such as Tanstack Query, Chakra UI, Zustand, HTTP clients, etc can be added inside this package and used across the applications. See this packages folder as a place where you can create local NPM packages and use them anywhere in this monorepo.

**\*Also**, it is super important to use different port for all the applications in the `package.json` . For instance, we have two applications in the `apps/` folder.

- For the `web` application, we will use port `8000`
- For the `dashboard` application, we will use port `8001`.

### Workspace Dependencies

Reference internal packages in root `package.json`:

```json
 "workspaces": ["apps/*", "packages/*"],
```

## 🏗 Build System

### Build Configuration

The monorepo uses Turborepo for efficient build orchestration:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "inputs": ["src/**", "test/**"]
    },
    "lint": {
      "outputs": []
    }
  }
}
```

### Build Commands

```bash
# Build with caching
bun run build

# Build a soecific app with caching
bun run build --filter=app-name # For instance, bun run build --filter=web

# Build specific package and its dependencies
bun workspace @your-org/web build

# Clear build cache
bun build --force

# Build with verbose output
bun build --verbose
```

## 🧪 Testing Strategy

### Test Structure

- **Unit Tests**: Individual function and component testing
- **Integration Tests**: Cross-package interaction validation
- **E2E Tests**: Full application workflow testing

### Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run tests with coverage
bun test --coverage

# Run tests for specific package
bun workspace @your-org/utils test
```

### Test Configuration

Jest configuration supports multiple testing environments:

```javascript
module.exports = {
  projects: [
    {
      displayName: "web",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/apps/web/**/*.test.{js,ts,tsx}"],
    },
    {
      displayName: "api",
      testEnvironment: "node",
      testMatch: ["<rootDir>/apps/api/**/*.test.{js,ts}"],
    },
  ],
};
```

## 🔧 Code Quality

### Biome Configuration

Create a `biome.json` configuration file:

```json
{
  "$schema": "https://biomejs.dev/schemas/1.8.3/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "ignore": ["./apps/dashboard/src/routeTree.gen.ts"],
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedVariables": "error",
        "noUnusedImports": "error"
      },
      "security": {
        "noDangerouslySetInnerHtml": "off"
      },
      "suspicious": {
        "noConsoleLog": "warn"
      },
      "a11y": {
        "noSvgWithoutTitle": "off"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "lineWidth": 80,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineEnding": "lf",
    "formatWithErrors": false
  },
  "javascript": {
    "formatter": {
      "semicolons": "asNeeded",
      "trailingCommas": "es5",
      "quoteStyle": "single",
      "arrowParentheses": "always",
      "bracketSameLine": false,
      "bracketSpacing": true,
      "jsxQuoteStyle": "double",
      "quoteProperties": "asNeeded"
    }
  },
  "json": {
    "formatter": {
      "trailingCommas": "none"
    },
    "parser": {
      "allowComments": true
    }
  }
}
```

### Linting, Formatting and Code Quality Commands

```bash
# Check code with Biome (linting + formatting)
bun biome check .

# Fix linting and formatting issues
bun biome check --apply .

# Format code only
bun biome format --write .

# Lint code only
bun biome lint .

# Fix linting issues only
bun biome lint --apply .

# Organize imports
bun biome check --apply-unsafe .
```

### Git Hooks Configuration

Create a `commitlint.config.js` file:

```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
    "header-max-length": [2, "always", 100],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "translation",
        "security",
        "changeset",
      ],
    ],
  },
};
```

### Package.json Scripts

Add these scripts to your root `package.json`:

```json
{
  "scripts": {
    "build": "turbo run build",
    "dev": "dotenv -- turbo run dev",
    "lint": "biome check --write --unsafe",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "format-and-lint:fix": "biome check --write --unsafe",
    "prepare": "husky",
    "knip": "knip",
    "check-types": "turbo run check-types",
    "check-types:watch": "turbo run check-types:watch"
  }
}
```

### Pre-commit Hooks

Configure lint-staged in your `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json}": ["biome check --apply --no-errors-on-unmatched"],
    "*.{md,yml,yaml}": ["biome format --write --no-errors-on-unmatched"]
  }
}
```

### Environment Variables

Configure environment-specific variables:

```bash
# Development
NODE_ENV=development
API_URL=http://localhost:3001

# Production
NODE_ENV=production
API_URL=https://api.yourdomain.com
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The repository includes automated workflows for:

- **Continuous Integration**: Automated testing on pull requests
- **Dependency Updates**: Automated dependency management
- **Release Management**: Semantic versioning and changelog generation
- **Deployment**: Automated deployment to staging and production

### Pipeline Configuration

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "yarn"
      - run: yarn install --frozen-lockfile
      - run: yarn lint
      - run: yarn test
      - run: yarn build
```

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the coding standards
4. Add tests for new functionality
5. Run the full test suite: `bun test`
6. Commit using conventional commits: `git commit -m "feat: add amazing feature"`
7. Push to your branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Commit Convention

Follow conventional commits for automated changelog generation. The commitlint configuration enforces these rules:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, missing semicolons, etc)
- `refactor:` Code refactoring without changing functionality
- `perf:` Performance improvements
- `test:` Test additions or modifications
- `build:` Build system or external dependency changes
- `ci:` CI/CD configuration changes
- `chore:` Maintenance tasks and other changes
- `revert:` Reverting previous commits

**Commit Message Format:**

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Examples:**

```bash
git commit -m "feat: add user authentication system"
git commit -m "fix(api): resolve login endpoint timeout issue"
git commit -m "docs: update installation instructions"
git commit -m "style: format code with biome"
```

## 📚 Documentation

- [Architecture Overview](./docs/architecture.md)
- [API Documentation](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guidelines](./docs/contributing.md)
- [Troubleshooting](./docs/troubleshooting.md)

## 🛡 Security

### Security Practices

- Regular dependency audits with `bun audit`
- Automated vulnerability scanning in CI/CD
- Environment variable validation
- Input sanitization and validation
- HTTPS enforcement in production

## 📊 Performance

### Optimization Features

- **Build Caching**: Turborepo intelligent caching
- **Code Splitting**: Automatic bundle optimization
- **Tree Shaking**: Dead code elimination
- **Asset Optimization**: Image and font optimization
- **CDN Integration**: Static asset delivery optimization

## 🔍 Troubleshooting

### Common Issues

**Installation Problems**

```bash
# Clear cache and reinstall
bun cache clean
rm -rf node_modules yarn.lock
bun install
```

**Find and Fix Unused Dependencies, Exports, and File**

```bash
bun run knip
```

**Build Failures**

```bash
# Check TypeScript errors
bun run check-types

# Clear build cache
bun run build --force
```

**Test Issues**

```bash
# Clear Jest cache
bun test --clearCache

# Run tests in debug mode
bun test --verbose
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Turborepo](https://turbo.build/) for build orchestration
- [Bun](https://bun.com/docs) for package management
- [Next.js](https://nextjs.org/) for creating next.js application
- [Vite.js](https://vite.dev/guide/) for creating vite powered application.
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Jest](https://jestjs.io/) for testing framework
- [Biome](https://biomejs.dev/) for code linting and formatting
- [Husky](https://typicode.github.io/husky/) for git hooks
- [Commitlint](https://commitlint.js.org/) for commit message validation

## 📞 Support

- 📖 [Documentation](./docs/)
- 🐛 [Issue Tracker](https://github.com/John-pels/monorepo-template/issues)
- 💬 [Discussions](https://github.com/John-pels/monorepo-template/discussions)
- 📧 [Email Support](johnoluemmanuel@gmail.com)

---
