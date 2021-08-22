import { NestFactory } from "@nestjs/core";
import { CommandModule, CommandService } from "nestjs-command";
import { AppModule } from "src/app.module";

(async () =>
    (await (await NestFactory.createApplicationContext(AppModule))
        .select(CommandModule)
        .get(CommandService)
        .exec()
    )
)();