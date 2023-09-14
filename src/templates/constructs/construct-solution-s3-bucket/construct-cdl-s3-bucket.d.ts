import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';
interface CdlS3Props extends s3.BucketProps {
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
export declare class CdlS3 extends s3.Bucket {
    /**
     * S3 bucket object to be passed to other functions
     */
    readonly s3Bucket: s3.Bucket;
    /**
     * S3 bucket object to be passed to other functions
     */
    readonly accessLogBucket: s3.Bucket;
    /**
        * Creates an s3 bucket that enables cdk_nag compliance through defaults
        * This dummy data can be used to demonstrate the data pipeline
        * By default the bucket will include AWS managed encryption, block all public access,
        * bucket versioning, and autoDelete objects as true.
        * @param {Construct} scope the Scope of the CDK Construct
        * @param {CdlS3Props} props the CdlS3Props [properties]{@link CdlS3Props}
        * @param CdlS3Props
    */
    constructor(scope: Construct, id: string, props: CdlS3Props);
}
export {};
