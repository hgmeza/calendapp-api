import type { AWS } from "@serverless/typescript";

import * as specialty from "@functions/specialty";

const serverlessConfiguration: AWS = {
  service: "calendapp-api",
  frameworkVersion: "2",
  plugins: [
    "serverless-esbuild",
    "serverless-dotenv-plugin",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "us-east-2",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: {
    getSpecialties: { ...specialty.getSpecialtiesHandler },
    getBySpecialty: { ...specialty.getBySpecialtyHandler },
    getAvailability: { ...specialty.getAvailabilityHandler },
  },
  resources: {
    Resources: {
      CalendappRole: {
        Type: "AWS::IAM::Role",
        Properties: {
          RoleName: "CalendappRole",
          AssumeRolePolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: {
                  Service: ["lambda.amazonaws.com"],
                },
                Action: "sts:AssumeRole",
              },
            ],
          },
          ManagedPolicyArns: [
            "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
          ],
          Policies: [
            {
              PolicyName: "CalendappPolicy",
              PolicyDocument: {
                Version: "2012-10-17",
                Statement: [
                  {
                    Effect: "Allow",
                    Action: [
                      "dynamodb:DescribeTable",
                      "dynamodb:Query",
                      "dynamodb:Scan",
                      "dynamodb:GetItem",
                      "dynamodb:PutItem",
                      "dynamodb:UpdateItem",
                      "dynamodb:DeleteItem",
                      "dynamodb:BatchWriteItem",
                      "dynamodb:BatchGetItem",
                    ],
                    Resource:
                      "arn:aws:dynamodb:us-east-2:270796812728:table/calendapp-dev-*",
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
