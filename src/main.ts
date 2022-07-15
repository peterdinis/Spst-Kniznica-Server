import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { setupSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console
  });
  app.enableCors({
    credentials: true,
    allowedHeaders: '*',
    origin: 'http://localhost:3000',
  });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.listen(3001);
}
bootstrap();
