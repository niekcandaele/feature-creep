import {
  AccountRecovery,
  ClientAttributes,
  UserPool,
  UserPoolClient,
} from '@aws-cdk/aws-cognito';
import * as cdk from '@aws-cdk/core';

const DOMAIN_NAME = 'featurecreep.app';
export class AuthStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /*     // Domain + TLS stuff
        const zone = new PublicHostedZone(this, 'HostedZone', {
          zoneName: 'featurecreep.app'
        });

        // TLS certificate
        const certificateArn = new acm.DnsValidatedCertificate(this, 'SiteCertificate', {
          domainName: DOMAIN_NAME,
          hostedZone: zone,
          region: 'eu-west-1',
        }).certificateArn;
        new cdk.CfnOutput(this, 'Certificate', { value: certificateArn }); */

    // Cognito User Pool with Email Sign-in Type.
    const userPool = new UserPool(this, 'userPool', {
      signInAliases: {
        email: true,
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      selfSignUpEnabled: true,
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
    });

    /* App Client */
    const clientWriteAttributes = new ClientAttributes().withStandardAttributes(
      { email: true }
    );

    const clientReadAttributes = clientWriteAttributes.withStandardAttributes({
      emailVerified: true,
    });

    const userPoolClient = new UserPoolClient(this, 'userPoolClient', {
      userPool,
      generateSecret: false,
      authFlows: {
        userPassword: true,
      },
      preventUserExistenceErrors: true,
      readAttributes: clientReadAttributes,
      writeAttributes: clientWriteAttributes,
      oAuth: {
        flows: {
          implicitCodeGrant: true,
        },
        callbackUrls: ['http://localhost:3000/redirect'],
      },
    });

    /** Auth web pages */
    const domain = userPool.addDomain('CognitoDomain', {
      cognitoDomain: {
        domainPrefix: 'feature-creep',
      },
    });

    domain.signInUrl(userPoolClient, {
      redirectUri: 'http://localhost:3000/redirect',
    });
  }
}
