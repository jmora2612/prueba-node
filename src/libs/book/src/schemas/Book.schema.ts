/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: Number })
  chapters: number;

  @Prop({ required: true, type: Number })
  pages: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const BooksSchema = SchemaFactory.createForClass(Book);
