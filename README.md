# Monorepo Template

A comprehensive, production-ready monorepo template designed to accelerate development teams by providing a solid foundation for managing multiple interconnected projects within a single repository.

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
│   ├── web/                   # Frontend web application
│   ├── api/                   # Backend API service
│   └── mobile/                # Mobile application
├── packages/                   # Shared library packages
│   ├── ui/                    # Shared UI components
│   ├── utils/                 # Utility functions
│   ├── config/                # Configuration presets
│   └── types/                 # TypeScript definitions
├── tools/                      # Development and build tools
│   ├── eslint-config/         # Shared ESLint configuration
│   ├── jest-config/           # Testing configuration
│   └── build-scripts/         # Custom build utilities
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
└── yarn.lock                  # Dependency lock file
```

## 🛠 Prerequisites

Ensure your development environment meets these requirements:

- **Node.js**: v18.0.0 or higher
- **Package Manager**: Yarn v3+ (preferred) or npm v8+
- **Git**: v2.30.0 or higher

## 📋 Dependencies Installation

### Core Development Dependencies

Install the essential development dependencies for code quality, git hooks, and commit management:

```bash
# Install Biome for code quality, linting and formatting
yarn add -D -W @biomejs/biome

# Install Husky for git hooks
yarn add -D -W husky

# Install lint-staged for running linters on staged files
yarn add -D -W lint-staged

# Install Commitlint for commit message validation
yarn add -D -W @commitlint/cli @commitlint/config-conventional
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
yarn install

# Copy environment template
cp .env.example .env

# Configure Node.js version
nvm use
```

### 3. Development Workflow

```bash
# Start all applications in development mode
yarn dev

# Run specific application
yarn workspace @your-org/web dev
yarn workspace @your-org/api dev

# Build all packages
yarn build

# Run tests across all packages
yarn test

# Lint codebase
yarn lint

# Fix linting and formatting issues
yarn lint:fix

# Format code
yarn format

# Check formatting without writing
yarn format:check
```

## 📦 Package Management

### Adding Dependencies

```bash
# Add dependency to specific workspace
yarn workspace @your-org/web add react react-dom
yarn workspace @your-org/api add express

# Add dev dependency to root
yarn add -D -W typescript @types/node

# Add dependency to multiple workspaces
yarn workspaces foreach add lodash
```

### Creating New Packages

```bash
# Create new application
mkdir apps/admin
cd apps/admin
yarn init -y

# Create new shared package
mkdir packages/auth
cd packages/auth
yarn init -y
```

### Workspace Dependencies

Reference internal packages in `package.json`:

```json
{
  "dependencies": {
    "@your-org/ui": "workspace:*",
    "@your-org/utils": "workspace:*"
  }
}
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
yarn build

# Build specific package and its dependencies
yarn workspace @your-org/web build

# Clear build cache
yarn build --force

# Build with verbose output
yarn build --verbose
```

## 🧪 Testing Strategy

### Test Structure

- **Unit Tests**: Individual function and component testing
- **Integration Tests**: Cross-package interaction validation
- **E2E Tests**: Full application workflow testing

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests with coverage
yarn test --coverage

# Run tests for specific package
yarn workspace @your-org/utils test
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
  "$schema": "https://biomejs.dev/schemas/1.4.1/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": {
        "noExtraBooleanCast": "error",
        "noMultipleSpacesInRegularExpressionLiterals": "error",
        "noUselessCatch": "error",
        "noUselessTypeConstraint": "error"
      },
      "correctness": {
        "noConstAssign": "error",
        "noConstantCondition": "error",
        "noEmptyCharacterClassInRegex": "error",
        "noEmptyPattern": "error",
        "noGlobalObjectCalls": "error",
        "noInvalidConstructorSuper": "error",
        "noInvalidNewBuiltin": "error",
        "noNonoctalDecimalEscape": "error",
        "noPrecisionLoss": "error",
        "noSelfAssign": "error",
        "noSetterReturn": "error",
        "noSwitchDeclarations": "error",
        "noUndeclaredVariables": "error",
        "noUnreachable": "error",
        "noUnreachableSuper": "error",
        "noUnsafeFinally": "error",
        "noUnsafeOptionalChaining": "error",
        "noUnusedLabels": "error",
        "noUnusedVariables": "error",
        "useIsNan": "error",
        "useValidForDirection": "error",
        "useYield": "error"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80,
    "ignore": ["**/node_modules/**", "**/dist/**", "**/.next/**"]
  },
  "javascript": {
    "formatter": {
      "jsxQuoteStyle": "double",
      "quoteProperties": "asNeeded",
      "semicolons": "always",
      "arrowParentheses": "always",
      "bracketSameLine": false,
      "bracketSpacing": true,
      "quoteStyle": "single"
    }
  },
  "files": {
    "include": ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.json"],
    "ignore": [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/coverage/**"
    ]
  }
}
```

### Linting, Formatting and Code Quality Commands

```bash
# Check code with Biome (linting + formatting)
yarn biome check .

# Fix linting and formatting issues
yarn biome check --apply .

# Format code only
yarn biome format --write .

# Lint code only
yarn biome lint .

# Fix linting issues only
yarn biome lint --apply .

# Organize imports
yarn biome check --apply-unsafe .
```

### Git Hooks Configuration

Create a `commitlint.config.js` file:

```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
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
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
  },
};
```

### Package.json Scripts

Add these scripts to your root `package.json`:

```json
{
  "scripts": {
    "biome:check": "biome check .",
    "biome:fix": "biome check --apply .",
    "biome:format": "biome format --write .",
    "biome:lint": "biome lint .",
    "biome:lint-fix": "biome lint --apply .",
    "lint": "yarn biome:check",
    "lint:fix": "yarn biome:fix",
    "format": "yarn biome:format",
    "format:check": "biome format .",
    "prepare": "husky install"
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

````

## 🚀 Deployment

### Production Build

```bash
# Create production build
yarn build:prod

# Preview production build
yarn preview

# Analyze bundle size
yarn analyze
````

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
5. Run the full test suite: `yarn test`
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

- Regular dependency audits with `yarn audit`
- Automated vulnerability scanning in CI/CD
- Environment variable validation
- Input sanitization and validation
- HTTPS enforcement in production

### Reporting Security Issues

Please report security vulnerabilities by emailing [security@yourdomain.com](mailto:security@yourdomain.com) rather than using the public issue tracker.

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
yarn cache clean
rm -rf node_modules yarn.lock
yarn install
```

**Build Failures**

```bash
# Check TypeScript errors
yarn type-check

# Clear build cache
yarn build --force
```

**Test Issues**

```bash
# Clear Jest cache
yarn test --clearCache

# Run tests in debug mode
yarn test --verbose
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Turborepo](https://turbo.build/) for build orchestration
- [Yarn Workspaces](https://yarnpkg.com/features/workspaces) for package management
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Jest](https://jestjs.io/) for testing framework
- [Biome](https://biomejs.dev/) for code linting and formatting
- [Husky](https://typicode.github.io/husky/) for git hooks
- [Commitlint](https://commitlint.js.org/) for commit message validation

## 📞 Support

- 📖 [Documentation](./docs/)
- 🐛 [Issue Tracker](https://github.com/John-pels/monorepo-template/issues)
- 💬 [Discussions](https://github.com/John-pels/monorepo-template/discussions)
- 📧 [Email Support](mailto:support@yourdomain.com)

---

**Happy coding! 🎉**
