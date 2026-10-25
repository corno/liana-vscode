import type { Position, TextDocument } from 'vscode'

type Notation_Style = 'verbose' | 'concise'

export class Completion_Style {
	private pending?: { uri: string, version: number, line: number, character: number, style: Notation_Style }

	set(document: TextDocument, position: Position, style?: Notation_Style): void {
		this.pending = style === undefined ? undefined : {
			uri: document.uri.toString(),
			version: document.version,
			line: position.line,
			character: position.character,
			style,
		}
	}

	take(document: TextDocument, position: Position): Notation_Style | undefined {
		const pending = this.pending
		this.pending = undefined
		return pending?.uri === document.uri.toString() && pending.version === document.version
			&& pending.line === position.line && pending.character === position.character
			? pending.style : undefined
	}
}
