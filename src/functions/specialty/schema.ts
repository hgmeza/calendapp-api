export default {
  type: "object",
  properties: {
    queryStringParameters: {
      specialty: { type: "string" },
    },
  },
  // required: ['name']
} as const;
