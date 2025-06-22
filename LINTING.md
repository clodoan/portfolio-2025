# Linting Guide

This project uses [Biome](https://biomejs.dev/) for linting, formatting, and organizing imports. Here are the available commands:

## Available Scripts

### Linting

- **`pnpm lint`** - Check for lint errors without fixing them
- **`pnpm lint:fix`** - Check for lint errors and automatically fix what can be fixed
- **`pnpm check`** - Run linting, formatting, and import organizing all at once (recommended)
- **`pnpm check:ci`** - Check all files for CI/CD (fails if any issues found)

### Formatting

- **`pnpm format`** - Format all files
- **`pnpm format:check`** - Check if files are properly formatted (without changing them)

## Configuration

The linting configuration is in `biome.json`. Key features:

- **Ignores build directories**: `.next/`, `node_modules/`, `build/`, `dist/`
- **Modern JavaScript formatting**: ES5 trailing commas, double quotes, 2-space indentation
- **Import organization**: Automatically sorts and organizes imports
- **Recommended rules**: Uses Biome's recommended linting rules

## Recommended Workflow

1. **During development**: Run `pnpm check` to fix all issues at once
2. **Before committing**: Run `pnpm check:ci` to ensure everything passes
3. **Quick lint check**: Run `pnpm lint` to see what needs attention

## VS Code Integration

To get Biome working in VS Code:

1. Install the [Biome VS Code extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
2. Add to your VS Code settings:
   ```json
   {
     "editor.defaultFormatter": "biomejs.biome",
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "quickfix.biome": "explicit",
       "source.organizeImports.biome": "explicit"
     }
   }
   ```

This will automatically format and fix lint issues on save!
