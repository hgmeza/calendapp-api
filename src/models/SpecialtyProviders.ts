import {
  attribute,
  hashKey,
  table,
  rangeKey,
} from "@aws/dynamodb-data-mapper-annotations";

@table(process.env.DYNAMO_SPECIALTY_PROVIDERS)
class SpecialtyProviders {
  @hashKey({
    type: "String",
  })
  specialty: string;

  @rangeKey({
    type: "String",
  })
  provider: string;

  @attribute()
  address: {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
  };
}

export default SpecialtyProviders;
