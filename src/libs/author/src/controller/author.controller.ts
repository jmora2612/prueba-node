import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';
import { URLS } from 'src/shared/urls/libs/urls';

import { AuthorValidation } from '../validations/AuthorValidation';
import { AuthorService } from '../service/author.service';

@ApiTags('author')
@Controller()
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({})
  @ApiBody({ type: AuthorValidation })
  @Post(URLS.createAuthor)
  async create(@Body() createdAuthor: AuthorValidation, @Res() res: Response) {
    await this.authorService
      .create(createdAuthor)
      .then((result: any) => {
        const response = {
          status: 'success',
          data: result,
          message: 'Autor creado de forma exitosa.',
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

  @Get(URLS.listAuthor)
  async getAuthors(@Res() res: Response) {
    await this.authorService
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
