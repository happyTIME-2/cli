import { program } from "commander";
import create from "./order/create";

program
  .version(`${require("../package.json").version}`, "-v, --version")
  .usage("[options] <command> [<args>]");

program
  .command("create <app-name>")
  .description("create a new app")
  .action(async (name: string) => await create(name));
program.parse(process.argv);
