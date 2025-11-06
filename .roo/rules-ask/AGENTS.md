# Ask Mode Guidelines

## Communication Patterns

- Task.ts uses EventEmitter with specific ClineEvents interface
- ask() method in Task.ts handles partial message updates and user feedback
- IPC communication uses postMessageToWebview() with type/structure from roo-code.d.ts
- Always use toolParamNames from src/shared/tools.ts for tool parameter validation

## Message Types

- ClineMessage interface in roo-code.d.ts defines all valid message types
- Partial messages require specific handling in Task.ts ask/say methods
- Webview state updates require postStateToWebview() calls
- User feedback processing in handleWebviewAskResponse() method

## Error Messaging

- Error messages should follow the format in Task.ts sayAndCreateMissingParamError()
- Tool error recording uses recordToolError() method in Task.ts
- API failure handling requires specific retry logic per provider type
- MCP integration must wait for McpServerManager.getInstance() completion
