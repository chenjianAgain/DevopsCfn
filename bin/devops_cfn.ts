#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { DevopsCfnStack } from '../lib/devops_cfn-stack';

const app = new cdk.App();
new DevopsCfnStack(app, 'DevopsCfnStack');