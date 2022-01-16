import {
  failedResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { successResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { getDataMapper } from "@libs/utils";
import ProviderAvailability from "src/models/ProviderAvailability";
import SpecialtyData from "src/models/SpecialtyData";
import SpecialtyProviders from "src/models/SpecialtyProviders";

// import schema from "./schema";

const getSpecialties: ValidatedEventAPIGatewayProxyEvent<null> = async () => {
  try {
    const mapper = getDataMapper();
    const specialties: SpecialtyData[] = [];
    for await (const specialty of mapper.scan(SpecialtyData)) {
      specialties.push(specialty);
    }
    return successResponse({
      result: specialties,
    });
  } catch (error) {
    console.error(error.message);
    return failedResponse({
      result: null,
      error: { message: "Unable to get specialties" },
    });
  }
};

const getBySpecialty: ValidatedEventAPIGatewayProxyEvent<null> = async (
  event,
) => {
  try {
    const mapper = getDataMapper();
    const { specialty } = event.queryStringParameters as { specialty: string };

    const providers: SpecialtyProviders[] = [];
    const iter = mapper.query(SpecialtyProviders, { specialty });

    for await (const provider of iter) {
      providers.push(provider);
    }

    return successResponse({
      result: providers,
    });
  } catch (error) {
    console.error(error.message);
    return failedResponse({
      error: { message: "Unable to query providers" },
    });
  }
};

const getProvider: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {
  try {
    const mapper = getDataMapper();
    // const { specialty, provider } = event.queryStringParameters as {
    //   specialty: string;
    //   provider: string;
    // };

    const itemToGet = Object.assign(new ProviderAvailability(), {
      specialty: "Dentist",
      provider: "Dr. Ervin Howell",
    });
    const item = await mapper.get(
      Object.assign(new ProviderAvailability(), itemToGet),
    );

    return successResponse({
      result: item,
    });
  } catch (error) {
    console.error(error.message);
    return failedResponse({
      error: { message: "Unable to query providers" },
    });
  }
};

export const getProviderHandler = middyfy(getProvider);
export const getSpecialtiesHandler = middyfy(getSpecialties);
export const getBySpecialtyHandler = middyfy(getBySpecialty);
