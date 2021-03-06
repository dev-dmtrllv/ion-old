import { ask, cliHandler } from "./CLIHandler";
import path from "path";
import fs from "fs";
import { spawnSync } from "child_process";
import { platform } from "os";

const run = (cwd: string, cmd: string, ...args: string[]) => spawnSync((platform() === "win32" ? cmd + ".cmd" : cmd), args, { cwd, stdio: "inherit" });

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

		if (fs.existsSync(config.path))
		{
			const override = await ask(`The folder ${config.path} already exists! Do you want to reinstall? Y/n`, "n");
			if (override.toLowerCase() != "y")
				process.exit();
		}
		else
		{
			fs.mkdirSync(config.path, { recursive: true });
		}


		config.path = config.name == path.basename(cwd) ? cwd : path.resolve(cwd, config.name);
		config.host = await ask("host", "localhost");
		config.port = Number(await ask("port", "80"));
	}

	const _ = (...p: string[]) => path.resolve(config.path, ...p);

	fs.writeFileSync(_("package.json"), JSON.stringify({
		name: config.name,
		version: "0.1.0",
		scripts: {
			start: "ion watch",
			build: "ion build",
			serve: "ion run"
		},
		dependencies: {
			...(require("../package.json").dependencies),
			"ion": "github:dev-dmtrllv/ion"
		},
		license: "ISC"
	}), "utf-8");

	run(config.path, "npm", "install");
});

type CreateConfig = {
	name: string;
	path: string;
	host: string;
	port: number;
};
