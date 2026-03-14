# ASTN VS Code Extension

This project has been reorganized into two main parts:

## Structure

- **`frontend/`** - VS Code extension (client + language server)

## Development

### Option 1: Use VS Code Workspace (Recommended)

1. Open the `astn-vscode.code-workspace` file in VS Code
2. This will load both backend and frontend as separate folders
3. Use the debug configurations from the root `.vscode/launch.json`

### Option 2: Open Root Directory

1. Open the root directory in VS Code
2. The `.vscode` configuration will work with the updated paths

## Debug Configuration

The debug configuration has been updated to work with the new structure:

- **Launch Client**: Launches the extension for testing
- **Language Server E2E Test**: Runs the end-to-end tests

Both configurations now correctly reference the `frontend/` directory paths.

## Building

From the root directory:
```bash
# Build frontend only
cd frontend && npm run compile

# Build backend only  
cd backend && npm run compile

# Watch mode (frontend)
cd frontend && npm run watch
```

Or use VS Code tasks (Ctrl+Shift+P → "Tasks: Run Task"):
- **npm: compile** - Builds the frontend
- **npm: watch** - Runs frontend in watch mode
