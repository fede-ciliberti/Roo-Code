# Architect Mode Guidelines

## Core Architecture

- Task.ts is the central orchestration class with EventEmitter pattern
- Provider pattern with multiple API providers in src/api/providers/
- Diff-based editing with MultiSearchReplaceDiffStrategy
- Two-tier terminal system: VSCode and ExecaTerminal fallbacks

## System Integration Points

- MCP hub requires McpServerManager.getInstance() async completion
- Webview communication via postMessageToWebview() with specific IPC types
- Checkpoint system with RepoPerTaskCheckpointService initialization
- File context tracking with proper disposal patterns

## Provider Architecture

- Each provider follows base-provider.ts pattern with transform/ directory
- Multiple provider support: Anthropic, OpenAI, Gemini, Bedrock, etc.
- Cache strategy implementation varies per provider
- Streaming via ApiStream async generators

## Webview-Extension Communication

- Specific IPC message structure from roo-code.d.ts
- Event system with ClineEvents interface
- State management through providerRef WeakRef pattern
- Message persistence via apiConversationHistory and clineMessages
