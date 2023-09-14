import { Construct } from "constructs";
import { RemovalPolicy, Duration, PhysicalName } from "aws-cdk-lib";
import { aws_s3 as s3 } from "aws-cdk-lib";
import { LifecyclePolicy } from "aws-cdk-lib/aws-efs";
import { NagSuppressions } from "cdk-nag";

interface SolutionS3Props extends s3.BucketProps {
  /**
   * Optional: set bucket versioning to false, this is true by default
   * @default "Standard lifecycle policy."
   */
  readonly bucketLifeCyclePolicyArray?: Array<s3.LifecycleRule>;

  /**
   * Optional: set bucket versioning to false, this is true by default
   * @default "S3 standard"
   */
  readonly bucketStorageClass?: boolean;

  /**
   * Optional: set bucket versioning to false, this is true by default
   * @default undefined
   */
  readonly cors?: Array<s3.CorsRule>;
}

/**
 * This construct provides a pre-configured default s3 bucket.
 * This pre-configured default meets cdk_nag AWS specifications
 * for security and well-architected infrastructure.
 * The construct deploys an operational S3 bucket with an associated access log bucket.
 * By default the bucket will include AWS managed encryption, block all public access,
 * bucket versioning, and autoDelete objects as true.
 */

export class SolutionS3 extends s3.Bucket {
  /**
   * S3 bucket object to be passed to other functions
   */
  public readonly s3Bucket: s3.Bucket;
  /**
   * S3 bucket object to be passed to other functions
   */
  public readonly accessLogBucket: s3.Bucket;

  /**
   * Creates an s3 bucket that enables cdk_nag compliance through defaults
   * This dummy data can be used to demonstrate the data pipeline
   * By default the bucket will include AWS managed encryption, block all public access,
   * bucket versioning, and autoDelete objects as true.
   * @param {Construct} scope the Scope of the CDK Construct
   * @param {CdlS3Props} props the CdlS3Props [properties]{@link SolutionS3Props}
   * @param CdlS3Props
   */
  constructor(scope: Construct, id: string, props: SolutionS3Props) {
    const accessLogBucket = new s3.Bucket(scope, `access-logs-${id}`, {
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    super(scope, id, {
      ...props,
      bucketName: PhysicalName.GENERATE_IF_NEEDED,
      encryption: s3.BucketEncryption.S3_MANAGED,
      cors: props.cors,
      enforceSSL: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      versioned: props.versioned ? props.versioned : true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      serverAccessLogsPrefix: id,
      /**
       * Creates a separate bucket for access logs
       */
      serverAccessLogsBucket: accessLogBucket,
    });

    NagSuppressions.addResourceSuppressions(accessLogBucket, [
      {
        id: "AwsSolutions-S1",
        reason:
          "Access log buckets do not require their own access logs. This would create an infinite regression of access logs.",
      },
    ]);

    /**
     * Creates a standard opinionated cost-optimized lifecycle policy.
     * This policy begins with S3 standard storage.
     * After 30 days of no access objects are transitioned to S3 infrequent access.
     * After 90 days of no access objects are transitioned to S3 Glacier instant retrieval.
     */
    const costOptimizedLifecycleRule = [
      {
        transitions: [
          {
            storageClass: s3.StorageClass.INFREQUENT_ACCESS,
            transitionAfter: Duration.days(30),
          },
          {
            storageClass: s3.StorageClass.GLACIER_INSTANT_RETRIEVAL,
            transitionAfter: Duration.days(90),
          },
        ],
      },
    ];

    /**
     * If optional bucketLifeCyclePolicyArray is defined as prop,
     * loops through array of policies and adds each to the s3 bucket.
     * This allows standard s3 policy to be default
     * and user can define any additional policies to ovveride this default.
     */
    if (props.bucketLifeCyclePolicyArray) {
      console.log("Lifecycle policy option enabled");
      props.bucketLifeCyclePolicyArray.forEach((policy) => {
        this.s3Bucket.addLifecycleRule(policy);
      });
    }
  }
}
