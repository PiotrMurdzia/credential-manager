import { HttpRequest } from "@azure/functions";
import { checkRequestBodyParamsForCreateOrUpdate, checkRequestQueryParamsForGetOrRemove } from "../../_helpers/RequestParamsHelper";
import Credential from '../../_common/models/Credential.model';

export const remove = async (req: HttpRequest) => {
    const { id_connection } = req.body;

    try {
        // Chack body params
        checkRequestQueryParamsForGetOrRemove(id_connection);

        // Check if row with id_connection already exists
        let response_from_db = await Credential.get(id_connection.toString());

        if (!response_from_db) {
            return {
                status: 404,
                body: {
                    status: 'Fail',
                    description: 'Resource with the provided id_connection does not exist.'
                }
            };
        }

        await Credential.delete(response_from_db);
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

    return {
        status: 200,
        body: {
            status: 'OK',
            description: 'Resource deleted successfully.'
        }
    };
}
