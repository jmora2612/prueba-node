/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';


export class bookDTO {
  _id?: mongoose.Types.ObjectId;
  title: string;
  chapters: number;
  pages: number;
}
