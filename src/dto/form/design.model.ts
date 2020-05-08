import { Field, ObjectType } from '@nestjs/graphql';
import { Design } from '../../schema/form.schema';
import { ColorsModel } from './colors.model';

@ObjectType('Design')
export class DesignModel {
  @Field()
  readonly colors: ColorsModel

  @Field({ nullable: true })
  readonly font?: string

  constructor(partial: Partial<Design>) {
    this.colors = new ColorsModel(partial.colors)
    this.font = partial.font
  }
}
