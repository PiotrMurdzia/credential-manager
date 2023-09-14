import { HttpRequest } from "@azure/functions";
import { checkRequestQueryParamsForGetOrRemove } from "../../_helpers/RequestParamsHelper";
import Credential from '../../_common/models/Credential.model';

export const get = async (req: HttpRequest) => {
    const { uuid } = req.query;

    try {
        // Chack body params
        checkRequestQueryParamsForGetOrRemove(uuid);

        // Check if row with uuid already exists
        const response_from_db = await Credential.get(uuid);

        if (!response_from_db) {
            return {
                status: 404,
                body: {
                    status: 'Fail',
                    description: 'Resource with the provided UUID not exists.'
                }
            };
        }

        return {
            status: 200,
            body: {
                status: 'OK',
                payload: response_from_db
            }
        };
    }
    catch (error) {
        if (error.status) {
            return error;
        }

        return {
            status: 500,
            body: {
                status: 'Error',
                description: 'An unexpected error occurred. Please try again later.'
            }
        };
    }
}
