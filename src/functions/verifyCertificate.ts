import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from '../utils/dynamodbClient'

export const handle : APIGatewayProxyHandler = async(event) => {
    const { id } = event.pathParameters;

    const response = await document.query({
        TableName: 'users_certificates',
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id,
        }
    }).promise()

    console.log(response)

    const userCertificate = response.Items[0]

    if(userCertificate){
        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Certificado válido",
                url: `https://devshop-vaz2.s3.amazonaws.com/${id}.pdf`
            }),
            headers: {
                "Content-type": "application/json",
            }
        }
    }else{
        return {
            statusCode: 201,
            body: JSON.stringify({
                message: "Certificado inválido",
            }),
            headers: {
                "Content-type": "application/json",
            }
        }

    }
}
