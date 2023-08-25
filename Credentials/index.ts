import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { create } from "./controllers/Create";
import { get } from "./controllers/Get";
import { update } from "./controllers/Update";
import { remove } from "./controllers/Remove";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    switch (req.method) {
        case 'POST':
            context.res = await create(req);

            break;
        case 'GET':
            context.res = await get(req);

            break;
        case 'PUT':
            context.res = await update(req);

            break;

        case 'DELETE':
            context.res = await remove(req);
            break;
        default:
            context.res = {
                status: 500,
                body: {
                    status: 'Internal error.'
                }
            };

            break;
    }
};

export default httpTrigger;
