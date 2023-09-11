import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Author } from '../schemas/Author.schema';
import { authorDTO } from 'src/shared/dtos/libs/authorDTO';
import mongoose, { Model } from 'mongoose';
@Injectable()
export class AuthorService {
  constructor(@InjectModel('Author') private authorModel: Model<Author>) {}

  async create(author: authorDTO) {
    const { name, book } = author;
    author.book = new mongoose.Types.ObjectId(book);
    const findOne = await this.authorModel.findOne({
      name,
    });

    if (findOne?.name === name) throw 'Ya existe un autor con este nombre.';

    return await new this.authorModel(author).save();
  }

  async findAll() {
    const aggregate = [
      {
        $lookup: {
          from: 'books',
          localField: 'book',
          foreignField: '_id',
          as: 'book',
        },
      },
      {
        $unwind: '$book',
      },
      {
        $project: {
          title: 1,
          book: { _id: '$book._id', name: '$book.title' },
        },
      },
    ];

    const findAuthors = await this.authorModel.aggregate(aggregate);
    console.log(findAuthors);

    return findAuthors.length
      ? findAuthors
      : (() => {
          throw 'No hay autores disponibles.';
        })();
  }
}
