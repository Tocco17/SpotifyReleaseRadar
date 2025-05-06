import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getProcessVariableRequired(name: string) {
	const variable = process.env[name]
	if (!variable)
		throw new Error(`${name} environment varibale not present.`)

	return variable
}
