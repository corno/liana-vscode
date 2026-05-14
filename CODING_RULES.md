# AI Agent Instructions

> **⚠️ CRITICAL: READ THIS ENTIRE FILE BEFORE WRITING ANY CODE ⚠️**

---

## 🔴 MANDATORY Coding Style Rules

### ✅ RULE #1: Naming Convention is ALWAYS snake_case

**ALL code in this project uses snake_case for naming - NO EXCEPTIONS.**

Before writing ANY code, verify you are using snake_case for all identifiers.

#### Rules:
- **Class names**: `Liana_Folder_Decorator` (snake_case)
- **Function names**: `configure_workspace_settings()` (snake_case)
- **Variable names**: `liana_decorator`, `path_parts`, `has_liana_dir` (snake_case)
- **Constants**: `schema_file_path` (snake_case)
- **Private members**: `_on_did_change_file_decorations` (snake_case)
- **Storage keys**: `'liana.last_authoring_environment_directory'` (snake_case)
- **Command IDs**: `'liana.toggle_notation_style'` (snake_case with dots)

#### Exception:
When implementing external interfaces (e.g., VS Code API), keep the interface method names as required by the API:
- `provideFileDecoration()` - required by FileDecorationProvider interface
- `onDidChangeFileDecorations` - required by FileDecorationProvider interface

Only use camelCase when the external API contract requires it.

#### Implementation Guidelines:
- All new code must use snake_case
- When editing existing code, convert to snake_case where possible (except interface contracts)
- Maintain consistency across the entire codebase
