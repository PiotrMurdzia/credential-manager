import { HttpRequest } from "@azure/functions";
import { checkRequestBodyParamsForCreateOrUpdate, checkRequestQueryParamsForGetOrRemove } from "../../_helpers/RequestParamsHelper";
import Credential from '../../_common/models/Credential.model';

export const remove = async (req: HttpRequest) => {
    const { uuid } = req.body;

    try {
        // Chack body params
        checkRequestQueryParamsForGetOrRemove(uuid);

        // Check if row with uuid already exists
        let response_from_db = await Credential.get(uuid);

        if (!response_from_db) {
            return {
                status: 404,
                body: {
                    status: 'Fail',
                    description: 'Resource with the provided UUID does not exist.'
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
