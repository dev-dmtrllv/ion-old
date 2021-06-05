import { ask, cliHandler } from "./CLIHandler";
import path from "path";
import fs from "fs";
import { spawn } from "child_process";
import { platform } from "os";

const run = (cwd: string, cmd: string, ...args: string[]) => new Promise(res => 
{
	const p = spawn((platform() === "win32" ? cmd + ".cmd" : cmd) + " " + args.join(" "), { cwd });
	p.on("exit", res);
});

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
		while (config.name.length == 0)
			config.name = await ask("name", args[0] || path.basename(cwd));

		config.path = config.name == path.basename(cwd) ? cwd : path.resolve(cwd, config.name);
		config.host = await ask("host", "localhost");
		config.port = Number(await ask("port", "80"));
	}

	const _ = (...p: string[]) => path.resolve(config.path, ...p);

	if (!fs.existsSync(config.path))
		fs.mkdirSync(config.path, { recursive: true });

	// write package.json
	fs.writeFileSync(_("package.json"), JSON.stringify({
		name: config.name,
		version: "0.1.0",
		scripts: {
			start: "ion watch",
			build: "ion build",
			serve: "ion run"
		},
		// dependencies: require("../package.json").dependencies,
		license: "ISC"
	}));

	// run(config.path, "npm", "install");

	await run(config.path, "npm", "i", "git+https://github.com/dev-dmtrllv/ion.git", "--save");

	console.log(`Creating project "${config.name}" in ${config.path}...`);
});

type CreateConfig = {
	name: string;
	path: string;
	host: string;
	port: number;
};
