import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 6000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: ['auth'],
  });

  const config = new DocumentBuilder()
    .setTitle('Google Forms Copy')
    .setDescription('Rest API documentation')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`),
  );
}
bootstrap();
