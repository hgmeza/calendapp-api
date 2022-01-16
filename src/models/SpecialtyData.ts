import { hashKey, table } from "@aws/dynamodb-data-mapper-annotations";

@table(process.env.DYNAMO_SPECIALTY_DATA)
class SpecialtyData {
  @hashKey({
    type: "String",
  })
  specialty: string;
}

export default SpecialtyData;
