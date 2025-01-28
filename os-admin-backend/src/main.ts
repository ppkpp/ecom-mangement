import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { join } from 'path';
import * as express from 'express';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  app.enableCors({
    origin: 'http://localhost:5173', // Allow frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies/auth headers
  });
  const config = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('Ecommerce Admin')
    .setVersion('1.0')
    .addTag('Ecommerce Admin')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
