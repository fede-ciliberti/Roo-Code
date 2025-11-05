# Debug Mode Guidelines

## Error Handling Patterns

- Task.ts uses EventEmitter pattern with specific ClineEvents interface
- Error propagation must follow the abortTask flow in Task.ts
- Terminal errors in src/integrations/terminal/ require fallback to ExecaTerminal
- API errors in src/api/providers/ need specific retry logic per provider type

## Memory Management

- FileContextTracker in src/core/context-tracking/ must be properly disposed
- CheckpointService should not be manually instantiated - use Task constructor
- TerminalRegistry in src/integrations/terminal/ manages cleanup automatically

## Streaming Debug Info

- API streaming uses async generators in Task.ts attemptApiRequest method
- MCP hub requires McpServerManager.getInstance() completion check
- Webview communication uses specific IPC message types from roo-code.d.ts
