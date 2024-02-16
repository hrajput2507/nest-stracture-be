import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { bool } from "./config";
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { initializeWinston, Logger } from "./common/logging/Logger";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { ValidationPipe } from "./common/pipes/validation.pipe";
import { ApplicationLogger } from "./common/logging/ApplicationLogger";
import { AllExceptionsFilter } from "./common/filters/all-exceptions-filter";
import "dotenv/config";
import { NestExpressApplication } from '@nestjs/platform-express';
import rawBodyMiddleware from "./common/middleware/rawBodyMiddleware";
import { ConfigService } from "@nestjs/config"

initializeWinston();
const logger = new Logger("Application");
configService: ConfigService;

bootstrap().catch((e: Error) => logger.error(e));

async function bootstrap(): Promise<void> {
  logger.info("****** Starting API ******");

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger:
      new ApplicationLogger(),

  });

  const configService = app.get<ConfigService>(ConfigService);


  // app.enableCors({
  //   origin: configService.getOrThrow('CORS_WHITELISTED_DOMAINS').split(','),
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // });

  app.use(rawBodyMiddleware());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.setBaseViewsDir(join(__dirname, '../src/', 'Template'));
  app.setViewEngine('ejs');
  app.setGlobalPrefix("v1");
 
  app.enableCors()

  initializeSwagger(app);
  await app.listen(5000);

  logger.info(`App running at ${5000}`);
}



function initializeSwagger(app: any) {
  if (!bool(true)) {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle("paymentEngine")
    .setDescription("Api documentaion")
    .addTag("payment-engine")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);
}
