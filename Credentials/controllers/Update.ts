import { HttpRequest } from "@azure/functions";
import { checkRequestBodyParamsForCreateOrUpdate } from "../../_helpers/RequestParamsHelper";
import Credential from '../../_common/models/Credential.model';

export const update = async (req: HttpRequest) => {
    const { uuid, password } = req.body;

    try {
        // Chack body params
        checkRequestBodyParamsForCreateOrUpdate(uuid, password);

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

        // Update object properties
        response_from_db.password = password;
        response_from_db.updated_at = new Date().toISOString();

        await Credential.update(response_from_db);
    }
    catch (error) {
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
            description: 'Resource updated successfully.'
        }
    };
}
