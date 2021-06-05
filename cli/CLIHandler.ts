import rl from "readline";

const readLine = rl.createInterface(process.stdin, process.stdout);

export const cliHandlers: { [key: string]: { description: string, method: CliMethod } } = {};

export const cliHandler = (command: string, description: string, method: CliMethod) => cliHandlers[command] = { description, method };

export const getCliMethod = (command: string) => 
{
	for (const key in cliHandlers)
	{
		if (command == key || command == key[0] || command == `-${key[0]}`)
			return cliHandlers[key];
	}
	return null;
}

export const ask = (question: string, defaultVal: string = "") => new Promise<string>(res => readLine.question(`${question}: ` + ((!!defaultVal) ? `[${defaultVal}] ` : ""), (answer) => res((!!answer) ? answer : defaultVal)));

export const stop = () => readLine.close();

type CliMethod = (cwd: string, ...args: string[]) => void;
