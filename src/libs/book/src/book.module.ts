import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';
import { BooksSchema } from './schemas/Book.schema';
import { BookService } from './service/book.service';
import { BookController } from './controller/book.controller';
const { JWT_KEY } = process.env;

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BooksSchema }]),
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: '60m', algorithm: 'HS256' },
    }),
  ],
  providers: [BookService],
  controllers: [BookController],
  exports: [MongooseModule, BookService],
})
export class BookModule {}
