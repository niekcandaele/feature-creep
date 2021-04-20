import { AccountRecovery, ClientAttributes, UserPool, UserPoolClient } from '@aws-cdk/aws-cognito';
import * as cdk from '@aws-cdk/core';

export class AuthStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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
          mutable: true
        }
      },
    });

    /* App Client */
    const clientWriteAttributes = (new ClientAttributes())
      .withStandardAttributes({ email: true });

    const clientReadAttributes = clientWriteAttributes
      .withStandardAttributes({ emailVerified: true });

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
        callbackUrls: [
          'https://featurecreep.app'
        ]
      }
    });

    /** Auth web pages */
    const domain = userPool.addDomain('CognitoDomain', {
      cognitoDomain: {
        domainPrefix: 'feature-creep'
      }
    });

    const signInUrl = domain.signInUrl(userPoolClient, {
      redirectUri: 'https://featurecreep.app'
    });
  }
}
