import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { FormDocument, FormSchemaName } from '../../schema/form.schema';

@Injectable()
export class FormCreateService {
  constructor(
    @InjectModel(FormSchemaName) private formModel: Model<FormDocument>,
  ) {
  }

}
