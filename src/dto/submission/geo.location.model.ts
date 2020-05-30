import { Field, ObjectType } from '@nestjs/graphql';
import { GeoLocation } from '../../schema/submission.schema';

@ObjectType('GeoLocation')
export class GeoLocationModel {
  @Field({ nullable: true })
  country?: string

  @Field({ nullable: true })
  city?: string

  constructor(geo: GeoLocation) {
    this.country = geo.country
    this.city = geo.city
  }
}
