import { AzureOpenAI } from "openai";

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const deployment = process.env.AZURE_DEPLOYMENT_NAME;
const apiVersion = process.env.AZURE_API_VERSION;
const apiKey = process.env.OPENAI_API_KEY_AZURE;

const options = {
    endpoint,
    apiKey,
    deployment,
    apiVersion
}

const AzureOpenAIClient = new AzureOpenAI(options);

export default AzureOpenAIClient;