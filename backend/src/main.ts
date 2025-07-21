import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "dotenv/config";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
