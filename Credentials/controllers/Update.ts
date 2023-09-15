import { HttpRequest } from "@azure/functions";
import { checkRequestBodyParamsForCreateOrUpdate } from "../../_helpers/RequestParamsHelper";
import Credential from '../../_common/models/Credential.model';
import { Password } from "../models/Password";

export const update = async (req: HttpRequest) => {
    const { uuid, password } = req.body;

    try {
        // Chack body params
        checkRequestBodyParamsForCreateOrUpdate(uuid, password);

        const encrypt_password = Password.encryptPassword(password);

        // Check if row with uuid already exists
        let response_from_db = await Credential.get(uuid);

        // If not exist create new record
        if (!response_from_db) {
            await Credential.create(encrypt_password, uuid);

            return {
                status: 200,
                body: {
                    status: 'OK',
                    description: 'Resource not founded - created new successfully.'
                }
            };
        }
        else {
            // Update object properties
            response_from_db.password = encrypt_password;
            response_from_db.updated_at = new Date().toISOString();

            await Credential.update(response_from_db);
        }
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
            description: 'Resource updated successfully.'
        }
    };
}
