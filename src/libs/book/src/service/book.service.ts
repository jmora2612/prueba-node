import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Book } from '../schemas/Book.schema';
import { bookDTO } from 'src/shared/dtos/libs/bookDTO';

@Injectable()
export class BookService {
  constructor(
    @InjectModel('Book') private bookModel: Model<Book>,
    private jwtService: JwtService,
  ) {}

  async create(book: bookDTO) {
    const findOne = await this.bookModel.findOne({
      tilte: book.title,
    });

    if (findOne?.title === book.title)
      throw 'Ya existe un libro con este nombre.';

    return await new this.bookModel(book).save();
  }

  async findAll() {
    const findAuthors = await this.bookModel.find();

    return findAuthors.length
      ? findAuthors
      : (() => {
          throw 'No hay autores disponibles.';
        })();
  }
}
