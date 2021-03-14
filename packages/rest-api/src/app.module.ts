import { Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { mongoConstants } from "../configs/authConstants";
import { MongoExceptionFilter } from "./__exсeption-filters__/mongo.exception-filter";
import { MessagesModule } from "./messages/messages.module";
import { RoomsModule } from "./rooms/rooms.module";
import { WsClientModule } from "./ws-client/ws-client.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(mongoConstants.uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    MessagesModule,
    RoomsModule,
    WsClientModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: MongoExceptionFilter,
    },
  ],
})
export class AppModule {}
