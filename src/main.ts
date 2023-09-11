import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
const port = process.env.PORT;
async function bootstrap() {
  process.env.TZ = 'America/Caracas';
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  // Configuración de Swagger para "auth"
  const authOptions = new DocumentBuilder()
    .setTitle('Proyecto prueba')
    .setDescription('API for the Proyecto prueba')
    .setVersion('1.0')
    .addTag('Proyecto prueba')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-authenticate',
    )
    .build();
  const authDocument = SwaggerModule.createDocument(app, authOptions);
  SwaggerModule.setup('prueba', app, authDocument);

  await app.listen(port);
}

bootstrap();
