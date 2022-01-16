import {
  attribute,
  hashKey,
  table,
  rangeKey,
} from "@aws/dynamodb-data-mapper-annotations";

@table(process.env.DYNAMO_PROVIDER_AVAILABILITY)
class ProviderAvailability {
  @hashKey({
    type: "String",
  })
  specialty: string;

  @rangeKey({
    type: "String",
  })
  provider: string;

  @attribute()
  availability: string[];
}

export default ProviderAvailability;
