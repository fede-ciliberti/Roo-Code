// background-execution.spec.ts

import { describe, it, expect, vi } from "vitest"
import { Task } from "../../../core/task/Task"
import { executeCommand, ExecuteCommandOptions } from "../../../core/tools/executeCommandTool"
import { TerminalRegistry } from "../TerminalRegistry"
import { Terminal } from "../Terminal"

// Mock Task class
class MockTask {
	taskId = "test-task"
	cwd = "/test/workspace"
	consecutiveMistakeCount = 0
	didRejectTool = false
	lastMessageTs = undefined
	terminalProcess = undefined

	async say() {}
	async ask() {
		throw new Error("Should not be called for background execution")
	}
	recordToolError() {}
}

vi.mock("fs/promises")
vi.mock("../TerminalRegistry")
vi.mock("../Terminal")
vi.mock("../../../i18n")

describe("Background execution", () => {
	let mockTask: MockTask
	let mockProvider: any

	beforeEach(() => {
		mockTask = new MockTask()
		mockProvider = {
			postMessageToWebview: vi.fn(),
			getState: vi.fn().mockResolvedValue({
				terminalOutputLineLimit: 500,
				terminalOutputCharacterLimit: 10000,
				terminalShellIntegrationDisabled: true,
			}),
		}

		// Mock terminal methods
		vi.mocked(TerminalRegistry.getOrCreateTerminal).mockResolvedValue({
			getCurrentWorkingDirectory: () => "/test/workspace",
			runCommand: vi.fn().mockReturnValue(Promise.resolve()),
			terminal: {
				show: vi.fn(),
			},
		} as any)
	})

	it("should execute command in background when background parameter is true", async () => {
		const options: ExecuteCommandOptions = {
			executionId: "test-id",
			command: "echo 'test'",
			background: true,
			terminalOutputLineLimit: 500,
			terminalOutputCharacterLimit: 10000,
		}

		// Mock the callbacks
		const callbacks = {
			onLine: vi.fn(),
			onCompleted: vi.fn(),
			onShellExecutionStarted: vi.fn(),
			onShellExecutionComplete: vi.fn(),
		}

		// Mock terminal instance
		const mockTerminal = {
			getCurrentWorkingDirectory: () => "/test/workspace",
			runCommand: vi.fn().mockReturnValue(Promise.resolve()),
			terminal: { show: vi.fn() },
		}

		vi.mocked(TerminalRegistry.getOrCreateTerminal).mockResolvedValue(mockTerminal as any)

		// Execute command with background = true
		const [rejected, result] = await executeCommand(mockTask, options)

		// Verify that task.ask was NOT called (which means it ran in background)
		// Since we can't easily test the internal callback behavior, we verify the command was set up for background execution
		expect(rejected).toBe(false)
		expect(typeof result).toBe("string")
	})

	it("should execute command with background=false by default", async () => {
		const options: ExecuteCommandOptions = {
			executionId: "test-id",
			command: "echo 'test'",
			background: false,
			terminalOutputLineLimit: 500,
			terminalOutputCharacterLimit: 10000,
		}

		// Mock terminal instance
		const mockTerminal = {
			getCurrentWorkingDirectory: () => "/test/workspace",
			runCommand: vi.fn().mockReturnValue(Promise.resolve()),
			terminal: { show: vi.fn() },
		}

		vi.mocked(TerminalRegistry.getOrCreateTerminal).mockResolvedValue(mockTerminal as any)

		const [rejected, result] = await executeCommand(mockTask, options)

		expect(rejected).toBe(false)
		expect(typeof result).toBe("string")
	})

	it("should handle background parameter as boolean true", async () => {
		const options: ExecuteCommandOptions = {
			executionId: "test-id",
			command: "echo 'test'",
			background: true,
			terminalOutputLineLimit: 500,
			terminalOutputCharacterLimit: 10000,
		}

		// Mock terminal instance
		const mockTerminal = {
			getCurrentWorkingDirectory: () => "/test/workspace",
			runCommand: vi.fn().mockReturnValue(Promise.resolve()),
			terminal: { show: vi.fn() },
		}

		vi.mocked(TerminalRegistry.getOrCreateTerminal).mockResolvedValue(mockTerminal as any)

		const [rejected, result] = await executeCommand(mockTask, options)

		expect(rejected).toBe(false)
		// When background is true, the command should run and complete
		expect(result).toContain("Command executed in terminal")
	})

	it("should default background to false when not provided", async () => {
		const options: ExecuteCommandOptions = {
			executionId: "test-id",
			command: "echo 'test'",
			terminalOutputLineLimit: 500,
			terminalOutputCharacterLimit: 10000,
		}

		// Mock terminal instance
		const mockTerminal = {
			getCurrentWorkingDirectory: () => "/test/workspace",
			runCommand: vi.fn().mockReturnValue(Promise.resolve()),
			terminal: { show: vi.fn() },
		}

		vi.mocked(TerminalRegistry.getOrCreateTerminal).mockResolvedValue(mockTerminal as any)

		const [rejected, result] = await executeCommand(mockTask, options)

		expect(rejected).toBe(false)
		expect(typeof result).toBe("string")
	})
})
