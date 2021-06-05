#!/usr/bin/env node

import { getCliMethod, stop } from "./CLIHandler";

/**
 * Options:
 *  [new|n|-n]		creates a new project
 * 	[run|r|-r]		run project (in development or production mode)
 *  [build|b|-b]	build project
 * 	[watch|w|-w]	watch project in development mode
 * 	[help|h|-h]		show all the options
 */

(async () => 
{
	const [, , cmd = "", ...args] = process.argv;
	const cwd = process.cwd();

	const options = ["new", "run", "build", "watch", "help"];

	// load all the options
	options.forEach(o => require("./" + o));

	if (cmd.length > 0)
	{
		await getCliMethod(cmd).method(cwd, ...args);
	}
	else
	{
		console.clear();
		console.log(`invalid option \"${cmd}\"`);
		console.log("pick one from the list below.");
		await getCliMethod("help").method(cwd, ...args);
	}
	stop();
})();
