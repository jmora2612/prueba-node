import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorModule } from './libs/author/src';
import { BookModule } from './libs/book/src';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://127.0.0.1:27017/proyecto-prueba',
      }),
    }),
    AuthorModule,
    BookModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
