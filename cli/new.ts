import { ask, cliHandler } from "./CLIHandler";
import path from "path";

export default cliHandler("new", "Creates a new project.", async (cwd, ...args) => 
{
	const ignoreCheck = args.includes("-y");

	const config: CreateConfig = {
		name: "",
		path: cwd,
		host: "localhost",
		port: 80
	};

	if (ignoreCheck)
	{
		args.splice(args.indexOf("-y"), 1);
		config.name = args[0] || path.basename(cwd);
		config.path = config.name == path.basename(cwd) ? cwd : path.resolve(cwd, config.name);
	}
	else
	{
		while(config.name.length == 0)
			config.name = await ask("name", args[0] || path.basename(cwd));

		config.path = config.name == path.basename(cwd) ? cwd : path.resolve(cwd, config.name);
		config.host = await ask("host", "localhost");
		config.port = Number(await ask("port", "80"));
	}

	console.log(`Creating project "${config.name}" in ${config.path}...`);
});

type CreateConfig = {
	name: string;
	path: string;
	host: string;
	port: number;
};
