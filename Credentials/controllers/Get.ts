import { HttpRequest } from "@azure/functions";
import { checkRequestQueryParamsForGetOrRemove } from "../../_helpers/RequestParamsHelper";
import Credential from '../../_common/models/Credential.model';

export const get = async (req: HttpRequest) => {
    const { id_connection } = req.query;

    try {
        // Chack body params
        checkRequestQueryParamsForGetOrRemove(id_connection);

        // Check if row with id_connection already exists
        const response_from_db = await Credential.get(id_connection.toString());

        if (!response_from_db) {
            return {
                status: 404,
                body: {
                    status: 'Fail',
                    description: 'Resource with the provided id_connection not exists.'
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
