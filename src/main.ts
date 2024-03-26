import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initConfig } from './init.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //CONFIGURACION INICIAL
  try {
    if (await initConfig(app)) {
      console.log('Initial configuration completed successfully');
    }
  } catch (error) {
    console.error(error);
  }
  //FIN CONFIGURACION INICIAL
  app.enableCors(); // habilita los cors
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
    }
  )); // habilita la validacion de los DTO
  await app.listen(3000);
}
bootstrap();
