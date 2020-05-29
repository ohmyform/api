import { Field, InputType } from '@nestjs/graphql';
import { ColorsInput } from './colors.input';

@InputType('DesignInput')
export class DesignInput {
  @Field()
  readonly colors: ColorsInput

  @Field({ nullable: true })
  readonly font?: string
}
