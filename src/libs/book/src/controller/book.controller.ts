import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';
import { URLS } from 'src/shared/urls/libs/urls';
import { BooksValidation } from '../validations/BookValidation';
import { BookService } from '../service/book.service';

@ApiTags('Book')
@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({})
  @ApiBody({ type: BooksValidation })
  @Post(URLS.createBook)
  async create(@Body() createdBook: BooksValidation, @Res() res: Response) {
    await this.bookService
      .create(createdBook)
      .then((result: any) => {
        const response = {
          status: 'success',
          data: result,
          message: 'Libro creado de forma exitosa.',
        };
        res.status(200).send(response);
      })
      .catch((error) => {
        const response = {
          status: 'error',
          message: error,
        };
        res.status(500).send(response);
      });
  }

  @Get(URLS.listBook)
  async getAuthors(@Res() res: Response) {
    await this.bookService
      .findAll()
      .then((result) => {
        const response = {
          status: 'Registro exitoso',
          data: result,
        };
        res.status(200).send(response);
      })
      .catch((error) => {
        const response = {
          status: 'error',
          message: error,
        };
        res.status(500).send(response);
      });
  }
}
