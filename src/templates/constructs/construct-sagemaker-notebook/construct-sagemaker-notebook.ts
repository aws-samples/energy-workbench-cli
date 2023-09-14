import { Stack, StackProps, CfnOutput, RemovalPolicy, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { SolutionS3 } from "../construct-solution-s3-bucket/construct-solution-s3-bucket";
import { aws_iam as iam } from "aws-cdk-lib";
import { aws_s3 as s3 } from "aws-cdk-lib";
import { aws_sagemaker as sagemaker } from "aws-cdk-lib";
import { aws_codecommit as codecommit } from "aws-cdk-lib";
import { aws_kms as kms } from "aws-cdk-lib";
import * as path from "path";
import { NagSuppressions } from "cdk-nag";

interface SagemakerNotebookProps extends StackProps {
  dataBucket: s3.Bucket;
}

export class SageMakerNotebookStack extends Stack {
  constructor(scope: Construct, id: string, props: SagemakerNotebookProps) {
    super(scope, id, props);

    // Used for forecasting
    const sagemakerForecastResultsBucket = new SolutionS3(
      this,
      "ForecastBucket",
      {
        bucketName: "ForecastBucket",
      }
    );

    // role to be assumed by the sagemaker notebook, grants privileges to read from
    // encriched data bucket, write to results bucket, and full access to Forecast
    const sagemakerExecutionRole = new iam.Role(
      this,
      "sagemaker-execution-role",
      {
        assumedBy: new iam.ServicePrincipal("sagemaker.amazonaws.com"),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName(
            "AmazonSageMakerFullAccess"
          ),
          iam.ManagedPolicy.fromAwsManagedPolicyName(
            "AmazonForecastFullAccess"
          ),
        ],
        inlinePolicies: {
          s3Buckets: new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                resources: [
                  sagemakerForecastResultsBucket.bucketArn,
                  props.dataBucket.bucketArn,
                ],
                actions: ["s3:ListBucket"],
              }),
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                resources: [sagemakerForecastResultsBucket.arnForObjects("*")],
                actions: ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
              }),
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                resources: [props.dataBucket.arnForObjects("*")],
                actions: ["s3:GetObject"],
              }),
            ],
          }),
        },
      }
    );

    // creates a kms key to encrypt the storage volume attached the notebook instance
    const encryptionKey = new kms.Key(this, "CDLSagemakerEncryptionKey", {
      alias: `${Stack.of(this).stackName}SagemakerEncryptionKey`,
      enableKeyRotation: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // creates a codecommit repo and uploads the sagemaker notebook to it as a first commit
    const sagemakerCodecommitRepo = new codecommit.Repository(
      this,
      "SagemakerCodecommitRepo",
      {
        repositoryName: "CDLSagemakerRepository",
        code: codecommit.Code.fromDirectory(
          path.join(__dirname, "sample-notebooks/")
        ), // optional property, branch parameter can be omitted
      }
    );

    sagemakerCodecommitRepo.grantRead(sagemakerExecutionRole);

    // creates a sagemaker notebook instance with the defined codecommit repo as the default repo
    const sagemakerNotebookInstance = new sagemaker.CfnNotebookInstance(
      this,
      "SagemakerNotebook",
      {
        instanceType: "ml.t2.medium",
        roleArn: sagemakerExecutionRole.roleArn,
        defaultCodeRepository: sagemakerCodecommitRepo.repositoryCloneUrlHttp,
        volumeSizeInGb: 20,
        kmsKeyId: encryptionKey.keyId,
      }
    );

    NagSuppressions.addResourceSuppressions(sagemakerNotebookInstance, [
      {
        id: "AwsSolutions-SM1",
        reason:
          "This notebook does not require a VPC because it has additional security measures implemented. Because this is a development tool we are reducing the number of VPCs required.",
      },
    ]);

    NagSuppressions.addResourceSuppressions(sagemakerNotebookInstance, [
      {
        id: "AwsSolutions-SM3",
        reason: "This notebook instance requires direct internet access.",
      },
    ]);

    // creates a role for Amazon Forecast to assume, with permissions to access data in the results bucket
    const forecastRole = new iam.Role(this, "forecast-execution-role", {
      assumedBy: new iam.ServicePrincipal("forecast.amazonaws.com"),
      inlinePolicies: {
        s3Buckets: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              resources: [
                sagemakerForecastResultsBucket.bucketArn,
                props.dataBucket.bucketArn,
              ],
              actions: ["s3:ListBucket"],
            }),
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              resources: [sagemakerForecastResultsBucket.arnForObjects("*")],
              actions: ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
            }),
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              resources: [props.dataBucket.arnForObjects("*")],
              actions: ["s3:GetObject"],
            }),
          ],
        }),
      },
    });

    new CfnOutput(this, "CDLSagemakerRepository", {
      value: sagemakerCodecommitRepo.repositoryCloneUrlHttp,
      description: "CDLSagemakerRepository",
      exportName: "CDLSagemakerRepository",
    });

    // Output link to Sagemaker Notebook in the console
    new CfnOutput(this, "SagemakerNotebookUrl", {
      value: `https://${this.region}.console.aws.amazon.com/sagemaker/home?region=${this.region}#/notebook-instances/${sagemakerNotebookInstance.notebookInstanceName}`,
      description: "AWS console URL for Sagemaker Notebook ML Instance",
      exportName: "SagemakerNotebookUrl",
    });

    new CfnOutput(this, "ForecastResultsBucket", {
      value: sagemakerForecastResultsBucket.bucketName,
      description:
        "Bucket for storing results from the optional forecast stack.",
      exportName: "ForecastResultsBucket",
    });

    new CfnOutput(this, "ForecastResultsRole", {
      value: forecastRole.roleArn,
      description:
        "Role arn assumed by Amazon Forecast, grants permissions to read training and validation data.",
      exportName: "ForecastResultsRole",
    });

    Tags.of(this).add("component", "sagemakerNotebook");
  }
}
