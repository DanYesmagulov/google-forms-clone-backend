import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as path from 'path';

(async function bootstrap() {
  const PORT = process.env.PORT || 6000;
  process.env.APP_DIR = process.env.APP_DIR || path.join(__dirname, "..")


  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: ['auth'],
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await swagger(app)
  await app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
  )
})()

async function swagger(app:INestApplication): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle("Question - answer tests application")
    .setDescription("Test examination application inspired by google forms")
    .setVersion("0.1")
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("docs", app, document)
}
