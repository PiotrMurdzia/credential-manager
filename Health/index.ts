import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest) {
    context.res = {
        status: 200,
        body: {
            status: 'OK --- '
        }
    };
};

export default httpTrigger;
