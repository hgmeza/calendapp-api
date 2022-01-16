import { DynamoDB, config } from "aws-sdk";
import { DataMapper } from "@aws/dynamodb-data-mapper";

/* istanbul ignore next */
export const getDataMapper = () => {
  config.update({ region: process.env.AWS_PROVIDER_REGION });
  const client = new DynamoDB(config);
  return new DataMapper({ client });
};
