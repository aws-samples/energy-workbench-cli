import { Construct } from 'constructs';
import { aws_codecommit as codecommit } from 'aws-cdk-lib';
import * as Amplify from "@aws-cdk/aws-amplify-alpha";
interface AmplifyDeployProps {
    appPath: string;
    repoName: string;
    region: string;
    apiId: string;
    graphqlUrl: string;
    identityPoolId: string;
    userPoolId: string;
    userPoolWebClientId: string;
    landingBucketName: string;
}
export declare class AmplifyDeploy extends Construct {
    repository: codecommit.Repository;
    amplifyApp: Amplify.App;
    repositoryNameString: string;
    branchOutput: any;
    constructor(scope: Construct, id: string, props: AmplifyDeployProps);
}
export {};
