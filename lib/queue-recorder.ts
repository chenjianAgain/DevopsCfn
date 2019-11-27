import cdk = require('@aws-cdk/core');
import event_sources = require('@aws-cdk/aws-lambda-event-sources');
import lambda = require('@aws-cdk/aws-lambda');
import sqs = require('@aws-cdk/aws-sqs');
import ddb = require('@aws-cdk/aws-dynamodb');


export interface QueueRecorderProp {
    inputQueue: sqs.Queue;
}

export class QueueRecorder extends cdk.Construct {
    constructor(parent: cdk.Construct, id: string, props: QueueRecorderProp) {
        super(parent, id);
        const ddbTable = new ddb.Table(this, 'QueueRecorderTable', {
            partitionKey: { name: 'id', type: ddb.AttributeType.STRING }
        });

        const fn = new lambda.Function(this, 'helloLambda', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.asset('lambda'),
            handler: 'index.handler',
            environment: {
                TABLE_NAME: ddbTable.tableName
            }
        });
    
        fn.addEventSource(new event_sources.SqsEventSource(props.inputQueue));
        ddbTable.grantWriteData(fn);
    };

}