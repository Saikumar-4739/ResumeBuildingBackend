// Example for enabling CORS in a NestJS application
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors()); // Enable CORS
  await app.listen(3020);
}
bootstrap();
