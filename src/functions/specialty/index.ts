// import schema from './schema';
import { handlerPath } from "@libs/handlerResolver";

export const getSpecialtiesHandler = {
  handler: `${handlerPath(__dirname)}/handler.getSpecialtiesHandler`,
  events: [
    {
      http: {
        method: "get",
        path: "specialty-data",
        // request: {
        //   schemas: {
        //     'application/json': schema
        //   }
        // }
      },
    },
  ],
};

export const getBySpecialtyHandler = {
  handler: `${handlerPath(__dirname)}/handler.getBySpecialtyHandler`,
  events: [
    {
      http: {
        method: "get",
        path: "by-specialty",
      },
    },
  ],
};

export const getAvailabilityHandler = {
  handler: `${handlerPath(__dirname)}/handler.getProviderHandler`,
  events: [
    {
      http: {
        method: "get",
        path: "availability",
      },
    },
  ],
};
