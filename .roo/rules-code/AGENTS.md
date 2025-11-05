# Project Coding Rules (Non-Obvious Only)

- Always use toolParamNames from src/shared/tools.ts for tool parameter types instead of defining custom types
- Task.ts event system requires specific event payload structure - use type definitions from ClineEvents
- Diff strategy must use MultiSearchReplaceDiffStrategy with fuzzyMatchThreshold (default 1.0)
- API providers in src/api/providers/ must follow base-provider.ts pattern with transform/ directory
- Terminal integration in src/integrations/terminal/ requires both VSCode and ExecaTerminal implementations
- Webview communication uses postMessageToWebview() pattern with specific type/structure
- File context tracking in src/core/context-tracking/ must be properly disposed to prevent memory leaks
- CheckpointService initialization in Task constructor - don't manually instantiate RepoPerTaskCheckpointService
- MCP integration requires waiting for McpServerManager.getInstance() completion before use
- Locale files in src/i18n/locales/ vs webview-ui/src/i18n/locales/ are completely separate systems
