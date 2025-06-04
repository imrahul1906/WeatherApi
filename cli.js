import { Command } from "commander";
import figlet from "figlet";
import { Server } from "./server/Server.js";

const program = new Command();

program
    .name("Weather API")
    .description("A CLI tool that provides weather forcast for a given location and dates range.")
    .version("1.0")
    .configureHelp({
        formatHelp: (cmd, helper) => {
            const optionLines = cmd.options.map((option) => {
                const term = helper.optionTerm(option);
                const description = helper.optionDescription(option);
                return `  ${term.padEnd(20)} ${description}`;
            });

            return [
                figlet.textSync("Weather API"),
                "",
                "Get weather data",
                "",
                "Commands:",
                "  node cli.js weather --from <date1> --to <date2> --location<location>",
                "",
                "Options:",
                ...optionLines,
                "",
                "Use '--help' with a command for more info",
            ].join("\n");
        },
    })

program
    .command('weather')
    .option('--from <string>', 'from date in yyyy-MM-dd format ')
    .option('--to <string>', 'to date in yyyy-MM-dd format')
    .requiredOption('-l, --location <string>', 'Location for which weather data is needed')
    .action(async (options) => {
        try {
            const server = new Server(options);
            await server.init();
            await server.startServer();

        } catch (e) {
            console.log(`Could not initialize command: ${e}`);
        }

    });

program.parse();