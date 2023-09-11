import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { bookDTO } from 'src/shared/dtos/libs/bookDTO';

/**
 * @method BookValidation()
 * Este Dto, es el encargado del libro
 */

export class BooksValidation extends PartialType(bookDTO) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(2)
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  chapters: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pages: number;
}
