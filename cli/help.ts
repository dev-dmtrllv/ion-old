import { cliHandler, cliHandlers } from "./CLIHandler";

export default cliHandler("help", "Shows this dialog.", (cwd, ...args) => 
{
	for(const cmd in cliHandlers)
		console.log(`[ ${cmd} | ${cmd[0]} | -${cmd[0]} ]\t${cliHandlers[cmd].description}`);
});
