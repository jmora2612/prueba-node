import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { authorDTO } from 'src/shared/dtos/libs/authorDTO';

/**
 * @method AuthorValidation()
 * Este Dto, es el encargado del autor
 */

export class AuthorValidation extends PartialType(authorDTO) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(5)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  book: string;
}
