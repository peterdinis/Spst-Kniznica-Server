import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('SPST Library API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors({
    credentials: true,
    allowedHeaders: '*',
    origin: "http://localhost:3000"
  });
  
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  await app.listen(3001);
}
bootstrap();
