"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdlS3 = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cdk_lib_2 = require("aws-cdk-lib");
const cdk_nag_1 = require("cdk-nag");
/**
   * This construct provides a pre-configured default s3 bucket.
   * This pre-configured default meets cdk_nag AWS specifications
   * for security and well-architected infrastructure.
   * The construct deploys an operational S3 bucket with an associated access log bucket.
   * By default the bucket will include AWS managed encryption, block all public access,
   * bucket versioning, and autoDelete objects as true.
   */
class CdlS3 extends aws_cdk_lib_2.aws_s3.Bucket {
    /**
        * Creates an s3 bucket that enables cdk_nag compliance through defaults
        * This dummy data can be used to demonstrate the data pipeline
        * By default the bucket will include AWS managed encryption, block all public access,
        * bucket versioning, and autoDelete objects as true.
        * @param {Construct} scope the Scope of the CDK Construct
        * @param {CdlS3Props} props the CdlS3Props [properties]{@link CdlS3Props}
        * @param CdlS3Props
    */
    constructor(scope, id, props) {
        const accessLogBucket = new aws_cdk_lib_2.aws_s3.Bucket(scope, `access-logs-${id}`, {
            encryption: aws_cdk_lib_2.aws_s3.BucketEncryption.S3_MANAGED,
            enforceSSL: true,
            blockPublicAccess: aws_cdk_lib_2.aws_s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });
        super(scope, id, {
            ...props,
            bucketName: aws_cdk_lib_1.PhysicalName.GENERATE_IF_NEEDED,
            encryption: aws_cdk_lib_2.aws_s3.BucketEncryption.S3_MANAGED,
            cors: props.cors,
            enforceSSL: true,
            blockPublicAccess: aws_cdk_lib_2.aws_s3.BlockPublicAccess.BLOCK_ALL,
            versioned: props.versioned ? props.versioned : true,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
            serverAccessLogsPrefix: id,
            /**
             * Creates a separate bucket for access logs
             */
            serverAccessLogsBucket: accessLogBucket
        });
        cdk_nag_1.NagSuppressions.addResourceSuppressions(accessLogBucket, [
            {
                id: 'AwsSolutions-S1',
                reason: 'Access log buckets do not require their own access logs. This would create an infinite regression of access logs.',
            }
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
                        storageClass: aws_cdk_lib_2.aws_s3.StorageClass.INFREQUENT_ACCESS,
                        transitionAfter: aws_cdk_lib_1.Duration.days(30),
                    },
                    {
                        storageClass: aws_cdk_lib_2.aws_s3.StorageClass.GLACIER_INSTANT_RETRIEVAL,
                        transitionAfter: aws_cdk_lib_1.Duration.days(90),
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
            (props.bucketLifeCyclePolicyArray).forEach(policy => {
                this.s3Bucket.addLifecycleRule(policy);
            });
        }
    }
}
exports.CdlS3 = CdlS3;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RydWN0LWNkbC1zMy1idWNrZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25zdHJ1Y3QtY2RsLXMzLWJ1Y2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBb0U7QUFDcEUsNkNBQTBDO0FBRTFDLHFDQUEwQztBQXlCeEM7Ozs7Ozs7S0FPSztBQUdMLE1BQWEsS0FBTSxTQUFRLG9CQUFFLENBQUMsTUFBTTtJQVVsQzs7Ozs7Ozs7TUFRRTtJQUNGLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBaUI7UUFDdkQsTUFBTSxlQUFlLEdBQUcsSUFBSSxvQkFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRTtZQUM5RCxVQUFVLEVBQUUsb0JBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVO1lBQzFDLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGlCQUFpQixFQUFFLG9CQUFFLENBQUMsaUJBQWlCLENBQUMsU0FBUztZQUNqRCxhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1lBQ3BDLGlCQUFpQixFQUFFLElBQUk7U0FDMUIsQ0FBQyxDQUFBO1FBRUYsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDYixHQUFHLEtBQUs7WUFDUixVQUFVLEVBQUUsMEJBQVksQ0FBQyxrQkFBa0I7WUFDM0MsVUFBVSxFQUFFLG9CQUFFLENBQUMsZ0JBQWdCLENBQUMsVUFBVTtZQUMxQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7WUFDaEIsVUFBVSxFQUFFLElBQUk7WUFDaEIsaUJBQWlCLEVBQUUsb0JBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTO1lBQ2pELFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ25ELGFBQWEsRUFBRSwyQkFBYSxDQUFDLE9BQU87WUFDcEMsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixzQkFBc0IsRUFBRSxFQUFFO1lBQzFCOztlQUVHO1lBQ0gsc0JBQXNCLEVBQUUsZUFBZTtTQUMxQyxDQUFDLENBQUM7UUFFSCx5QkFBZSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsRUFBRTtZQUNyRDtnQkFDRSxFQUFFLEVBQUUsaUJBQWlCO2dCQUNyQixNQUFNLEVBQ0osbUhBQW1IO2FBQ3RIO1NBQUMsQ0FBRSxDQUFBO1FBRVI7Ozs7O1VBS0U7UUFDRixNQUFNLDBCQUEwQixHQUFHO1lBQy9CO2dCQUNJLFdBQVcsRUFBRTtvQkFDVDt3QkFDSSxZQUFZLEVBQUUsb0JBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQWlCO3dCQUMvQyxlQUFlLEVBQUUsc0JBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO3FCQUNyQztvQkFDRDt3QkFDSSxZQUFZLEVBQUUsb0JBQUUsQ0FBQyxZQUFZLENBQUMseUJBQXlCO3dCQUN2RCxlQUFlLEVBQUUsc0JBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO3FCQUNyQztpQkFDSjthQUNKO1NBQ0osQ0FBQztRQUVGOzs7OztjQUtNO1FBQ04sSUFBRyxLQUFLLENBQUMsMEJBQTBCLEVBQUU7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQy9DLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFFTCxDQUFDO0NBRUo7QUF4RkMsc0JBd0ZEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBSZW1vdmFsUG9saWN5LCBEdXJhdGlvbiwgUGh5c2ljYWxOYW1lIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgYXdzX3MzIGFzIHMzIH0gZnJvbSAnYXdzLWNkay1saWInXG5pbXBvcnQgeyBMaWZlY3ljbGVQb2xpY3kgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWZzJztcbmltcG9ydCB7IE5hZ1N1cHByZXNzaW9ucyB9IGZyb20gJ2Nkay1uYWcnO1xuXG5pbnRlcmZhY2UgQ2RsUzNQcm9wcyBleHRlbmRzIHMzLkJ1Y2tldFByb3BzIHtcblxuICAgIC8qKlxuICAgICAqIE9wdGlvbmFsOiBzZXQgYnVja2V0IHZlcnNpb25pbmcgdG8gZmFsc2UsIHRoaXMgaXMgdHJ1ZSBieSBkZWZhdWx0XG4gICAgICogQGRlZmF1bHQgXCJTdGFuZGFyZCBsaWZlY3ljbGUgcG9saWN5LlwiXG4gICAgICovXG4gICAgcmVhZG9ubHkgYnVja2V0TGlmZUN5Y2xlUG9saWN5QXJyYXk/OiBBcnJheSA8czMuTGlmZWN5Y2xlUnVsZT47XG5cbiAgICAvKipcbiAgICAgKiBPcHRpb25hbDogc2V0IGJ1Y2tldCB2ZXJzaW9uaW5nIHRvIGZhbHNlLCB0aGlzIGlzIHRydWUgYnkgZGVmYXVsdFxuICAgICAqIEBkZWZhdWx0IFwiUzMgc3RhbmRhcmRcIlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGJ1Y2tldFN0b3JhZ2VDbGFzcz86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBPcHRpb25hbDogc2V0IGJ1Y2tldCB2ZXJzaW9uaW5nIHRvIGZhbHNlLCB0aGlzIGlzIHRydWUgYnkgZGVmYXVsdFxuICAgICAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuICAgICAqL1xuICAgIHJlYWRvbmx5IGNvcnM/OiBBcnJheTxzMy5Db3JzUnVsZT47XG5cblxuICB9XG5cbiAgLyoqXG4gICAgICogVGhpcyBjb25zdHJ1Y3QgcHJvdmlkZXMgYSBwcmUtY29uZmlndXJlZCBkZWZhdWx0IHMzIGJ1Y2tldC5cbiAgICAgKiBUaGlzIHByZS1jb25maWd1cmVkIGRlZmF1bHQgbWVldHMgY2RrX25hZyBBV1Mgc3BlY2lmaWNhdGlvbnNcbiAgICAgKiBmb3Igc2VjdXJpdHkgYW5kIHdlbGwtYXJjaGl0ZWN0ZWQgaW5mcmFzdHJ1Y3R1cmUuXG4gICAgICogVGhlIGNvbnN0cnVjdCBkZXBsb3lzIGFuIG9wZXJhdGlvbmFsIFMzIGJ1Y2tldCB3aXRoIGFuIGFzc29jaWF0ZWQgYWNjZXNzIGxvZyBidWNrZXQuXG4gICAgICogQnkgZGVmYXVsdCB0aGUgYnVja2V0IHdpbGwgaW5jbHVkZSBBV1MgbWFuYWdlZCBlbmNyeXB0aW9uLCBibG9jayBhbGwgcHVibGljIGFjY2VzcyxcbiAgICAgKiBidWNrZXQgdmVyc2lvbmluZywgYW5kIGF1dG9EZWxldGUgb2JqZWN0cyBhcyB0cnVlLlxuICAgICAqL1xuXG4gIFxuICBleHBvcnQgY2xhc3MgQ2RsUzMgZXh0ZW5kcyBzMy5CdWNrZXQge1xuICAgIC8qKlxuICAgICAqIFMzIGJ1Y2tldCBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIG90aGVyIGZ1bmN0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyByZWFkb25seSBzM0J1Y2tldDogczMuQnVja2V0O1xuICAgIC8qKlxuICAgICAqIFMzIGJ1Y2tldCBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIG90aGVyIGZ1bmN0aW9uc1xuICAgICAqL1xuICAgIHB1YmxpYyByZWFkb25seSBhY2Nlc3NMb2dCdWNrZXQ6IHMzLkJ1Y2tldDtcblxuICAgIC8qKlxuICAgICAgICAqIENyZWF0ZXMgYW4gczMgYnVja2V0IHRoYXQgZW5hYmxlcyBjZGtfbmFnIGNvbXBsaWFuY2UgdGhyb3VnaCBkZWZhdWx0c1xuICAgICAgICAqIFRoaXMgZHVtbXkgZGF0YSBjYW4gYmUgdXNlZCB0byBkZW1vbnN0cmF0ZSB0aGUgZGF0YSBwaXBlbGluZVxuICAgICAgICAqIEJ5IGRlZmF1bHQgdGhlIGJ1Y2tldCB3aWxsIGluY2x1ZGUgQVdTIG1hbmFnZWQgZW5jcnlwdGlvbiwgYmxvY2sgYWxsIHB1YmxpYyBhY2Nlc3MsXG4gICAgICAgICogYnVja2V0IHZlcnNpb25pbmcsIGFuZCBhdXRvRGVsZXRlIG9iamVjdHMgYXMgdHJ1ZS5cbiAgICAgICAgKiBAcGFyYW0ge0NvbnN0cnVjdH0gc2NvcGUgdGhlIFNjb3BlIG9mIHRoZSBDREsgQ29uc3RydWN0XG4gICAgICAgICogQHBhcmFtIHtDZGxTM1Byb3BzfSBwcm9wcyB0aGUgQ2RsUzNQcm9wcyBbcHJvcGVydGllc117QGxpbmsgQ2RsUzNQcm9wc31cbiAgICAgICAgKiBAcGFyYW0gQ2RsUzNQcm9wc1xuICAgICovXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IENkbFMzUHJvcHMpIHtcbiAgICAgICAgY29uc3QgYWNjZXNzTG9nQnVja2V0ID0gbmV3IHMzLkJ1Y2tldChzY29wZSwgYGFjY2Vzcy1sb2dzLSR7aWR9YCwge1xuICAgICAgICAgICAgZW5jcnlwdGlvbjogczMuQnVja2V0RW5jcnlwdGlvbi5TM19NQU5BR0VELFxuICAgICAgICAgICAgZW5mb3JjZVNTTDogdHJ1ZSxcbiAgICAgICAgICAgIGJsb2NrUHVibGljQWNjZXNzOiBzMy5CbG9ja1B1YmxpY0FjY2Vzcy5CTE9DS19BTEwsXG4gICAgICAgICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICAgICAgICBhdXRvRGVsZXRlT2JqZWN0czogdHJ1ZSxcbiAgICAgICAgfSlcblxuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHtcbiAgICAgICAgICAgIC4uLnByb3BzLFxuICAgICAgICAgICAgYnVja2V0TmFtZTogUGh5c2ljYWxOYW1lLkdFTkVSQVRFX0lGX05FRURFRCxcbiAgICAgICAgICAgIGVuY3J5cHRpb246IHMzLkJ1Y2tldEVuY3J5cHRpb24uUzNfTUFOQUdFRCxcbiAgICAgICAgICAgIGNvcnM6IHByb3BzLmNvcnMsXG4gICAgICAgICAgICBlbmZvcmNlU1NMOiB0cnVlLFxuICAgICAgICAgICAgYmxvY2tQdWJsaWNBY2Nlc3M6IHMzLkJsb2NrUHVibGljQWNjZXNzLkJMT0NLX0FMTCxcbiAgICAgICAgICAgIHZlcnNpb25lZDogcHJvcHMudmVyc2lvbmVkID8gcHJvcHMudmVyc2lvbmVkIDogdHJ1ZSxcbiAgICAgICAgICAgIHJlbW92YWxQb2xpY3k6IFJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgICAgICAgICAgIGF1dG9EZWxldGVPYmplY3RzOiB0cnVlLFxuICAgICAgICAgICAgc2VydmVyQWNjZXNzTG9nc1ByZWZpeDogaWQsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENyZWF0ZXMgYSBzZXBhcmF0ZSBidWNrZXQgZm9yIGFjY2VzcyBsb2dzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHNlcnZlckFjY2Vzc0xvZ3NCdWNrZXQ6IGFjY2Vzc0xvZ0J1Y2tldFxuICAgICAgICB9KTtcblxuICAgICAgICBOYWdTdXBwcmVzc2lvbnMuYWRkUmVzb3VyY2VTdXBwcmVzc2lvbnMoYWNjZXNzTG9nQnVja2V0LCBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiAnQXdzU29sdXRpb25zLVMxJyxcbiAgICAgICAgICAgICAgcmVhc29uOlxuICAgICAgICAgICAgICAgICdBY2Nlc3MgbG9nIGJ1Y2tldHMgZG8gbm90IHJlcXVpcmUgdGhlaXIgb3duIGFjY2VzcyBsb2dzLiBUaGlzIHdvdWxkIGNyZWF0ZSBhbiBpbmZpbml0ZSByZWdyZXNzaW9uIG9mIGFjY2VzcyBsb2dzLicsXG4gICAgICAgICAgICB9XSwpXG4gICAgICAgIFxuICAgICAgICAvKiogXG4gICAgICAgICAqIENyZWF0ZXMgYSBzdGFuZGFyZCBvcGluaW9uYXRlZCBjb3N0LW9wdGltaXplZCBsaWZlY3ljbGUgcG9saWN5LlxuICAgICAgICAgKiBUaGlzIHBvbGljeSBiZWdpbnMgd2l0aCBTMyBzdGFuZGFyZCBzdG9yYWdlLlxuICAgICAgICAgKiBBZnRlciAzMCBkYXlzIG9mIG5vIGFjY2VzcyBvYmplY3RzIGFyZSB0cmFuc2l0aW9uZWQgdG8gUzMgaW5mcmVxdWVudCBhY2Nlc3MuXG4gICAgICAgICAqIEFmdGVyIDkwIGRheXMgb2Ygbm8gYWNjZXNzIG9iamVjdHMgYXJlIHRyYW5zaXRpb25lZCB0byBTMyBHbGFjaWVyIGluc3RhbnQgcmV0cmlldmFsLlxuICAgICAgICAqL1xuICAgICAgICBjb25zdCBjb3N0T3B0aW1pemVkTGlmZWN5Y2xlUnVsZSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yYWdlQ2xhc3M6IHMzLlN0b3JhZ2VDbGFzcy5JTkZSRVFVRU5UX0FDQ0VTUyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25BZnRlcjogRHVyYXRpb24uZGF5cygzMCksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JhZ2VDbGFzczogczMuU3RvcmFnZUNsYXNzLkdMQUNJRVJfSU5TVEFOVF9SRVRSSUVWQUwsXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uQWZ0ZXI6IER1cmF0aW9uLmRheXMoOTApLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAqIElmIG9wdGlvbmFsIGJ1Y2tldExpZmVDeWNsZVBvbGljeUFycmF5IGlzIGRlZmluZWQgYXMgcHJvcCxcbiAgICAgICAgKiBsb29wcyB0aHJvdWdoIGFycmF5IG9mIHBvbGljaWVzIGFuZCBhZGRzIGVhY2ggdG8gdGhlIHMzIGJ1Y2tldC5cbiAgICAgICAgKiBUaGlzIGFsbG93cyBzdGFuZGFyZCBzMyBwb2xpY3kgdG8gYmUgZGVmYXVsdFxuICAgICAgICAqIGFuZCB1c2VyIGNhbiBkZWZpbmUgYW55IGFkZGl0aW9uYWwgcG9saWNpZXMgdG8gb3Z2ZXJpZGUgdGhpcyBkZWZhdWx0LlxuICAgICAgICAgICAgKi9cbiAgICAgICAgaWYocHJvcHMuYnVja2V0TGlmZUN5Y2xlUG9saWN5QXJyYXkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGlmZWN5Y2xlIHBvbGljeSBvcHRpb24gZW5hYmxlZFwiKTtcbiAgICAgICAgICAgIChwcm9wcy5idWNrZXRMaWZlQ3ljbGVQb2xpY3lBcnJheSkuZm9yRWFjaChwb2xpY3kgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuczNCdWNrZXQuYWRkTGlmZWN5Y2xlUnVsZShwb2xpY3kpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIFxufSAgIl19