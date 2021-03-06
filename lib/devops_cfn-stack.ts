import sns = require('@aws-cdk/aws-sns');
import subs = require('@aws-cdk/aws-sns-subscriptions');
import sqs = require('@aws-cdk/aws-sqs');
import cdk = require('@aws-cdk/core');
import { QueueRecorder } from './queue-recorder';

export class DevopsCfnStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'DevopsCfnQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'DevopsCfnTopic');

    topic.addSubscription(new subs.SqsSubscription(queue));

    new QueueRecorder(this, 'LambdaListenQueue', {
      inputQueue: queue
    })


  }
}
