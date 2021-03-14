import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle("Whatsapp Backend")
    .setDescription("This is whatsapp API description")
    .setVersion("0.0.1")
    .addBearerAuth({
      bearerFormat: "jwt",
      scheme: "bearer",
      type: "http",
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(8080);
}
bootstrap();
