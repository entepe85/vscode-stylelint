'use strict';

module.exports = {
	normalizeDiagnostic,
};

function normalizeDiagnostic(message) {
	return { ...message, code: normalizeCode(message.code), range: normalizeRange(message.range) };
}

function normalizeRange(range) {
	const obj = {
		start: {
			line: range.start.line,
			character: range.start.character,
		},
	};

	if (range.end !== undefined) {
		obj.end = {
			line: range.end.line,
			character: range.end.character,
		};
	}

	return obj;
}

function normalizeCode(code) {
	if (!code) {
		return code;
	}

	if (typeof code === 'string') {
		return code;
	}

	const target = code.target || {};

	return {
		value: code.value,
		target: { scheme: target.scheme, authority: target.authority, path: target.path },
	};
}
