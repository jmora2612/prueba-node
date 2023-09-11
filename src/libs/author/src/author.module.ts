import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from '@nestjs/jwt';
import { AuthorSchema } from './schemas/Author.schema';
import { AuthorService } from './service/author.service';
import { AuthorController } from './controller/author.controller';
const { JWT_KEY } = process.env;

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: '60m', algorithm: 'HS256' },
    }),
  ],
  providers: [AuthorService],
  controllers: [AuthorController],
  exports: [MongooseModule, AuthorService],
})
export class AuthorModule {}

