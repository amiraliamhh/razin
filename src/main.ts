import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

process.env.PRODUCTION = !!process.env.PRODUCTION as any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  
  await app.listen(3000);
}
bootstrap();
