/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export class authorDTO {
  _id?: mongoose.Types.ObjectId;
  name: string;
  book: string | mongoose.Types.ObjectId;
}

