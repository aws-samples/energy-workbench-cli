"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmplifyDeploy = void 0;
const constructs_1 = require("constructs");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cdk_lib_2 = require("aws-cdk-lib");
const cr = __importStar(require("aws-cdk-lib/custom-resources"));
const Amplify = __importStar(require("@aws-cdk/aws-amplify-alpha"));
const cdk_nag_1 = require("cdk-nag");
class AmplifyDeploy extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        // create a codecommit repository and 
        this.repository = new aws_cdk_lib_2.aws_codecommit.Repository(this, 'AmplifyCodeCommitRepository', {
            repositoryName: props.repoName,
            description: "Amplify Web Application Deployment Repository",
            code: aws_cdk_lib_2.aws_codecommit.Code.fromDirectory(props.appPath, 'dev')
        });
        // define an amplify app
        this.amplifyApp = new Amplify.App(this, 'CDLWebApp', {
            description: "Sample AWS Amplify Application for Carbon Data Lake Quickstart Development Kit",
            sourceCodeProvider: new Amplify.CodeCommitSourceCodeProvider({
                repository: this.repository,
            }),
            environmentVariables: {
                'REGION': props.region,
                'API_ID': props.apiId,
                'GRAPH_QL_URL': props.graphqlUrl,
                'IDENTITY_POOL_ID': props.identityPoolId,
                'USER_POOL_ID': props.userPoolId,
                'USER_POOL_WEB_CLIENT_ID': props.userPoolWebClientId,
                'UPLOAD_BUCKET': props.landingBucketName,
            },
            customRules: []
        });
        this.amplifyApp.addCustomRule(Amplify.CustomRule.SINGLE_PAGE_APPLICATION_REDIRECT); // adds support for amplify single page react application delivery
        const devBranch = this.amplifyApp.addBranch('dev');
        this.amplifyApp.applyRemovalPolicy(aws_cdk_lib_1.RemovalPolicy.DESTROY);
        /**
          * Automatically deploys the Amplify app by releasing new changes to the build stage
         */
        const amplifyAutoDeploy = new cr.AwsCustomResource(this, 'AmplifyAutoDeploy', {
            onCreate: {
                service: 'Amplify',
                action: 'startJob',
                physicalResourceId: cr.PhysicalResourceId.of('app-build-trigger'),
                parameters: {
                    appId: this.amplifyApp.appId,
                    branchName: devBranch.branchName,
                    jobType: 'RELEASE',
                    jobReason: 'Auto Start build',
                }
            },
            policy: cr.AwsCustomResourcePolicy.fromStatements([new aws_cdk_lib_1.aws_iam.PolicyStatement({
                    actions: ['amplify:StartJob'],
                    effect: aws_cdk_lib_1.aws_iam.Effect.ALLOW,
                    resources: [
                        `${this.amplifyApp.arn}/branches/${devBranch.branchName}/jobs/*`,
                    ]
                })
            ]),
        });
        cdk_nag_1.NagSuppressions.addResourceSuppressionsByPath(aws_cdk_lib_1.Stack.of(this), "/WebStack/AmplifyDeployment/AmplifyAutoDeploy/CustomResourcePolicy/Resource", [
            {
                id: 'AwsSolutions-IAM5',
                reason: 'This is required to allow deployment of all jobs, since jobs are assigned dynamically.',
            }
        ]);
        cdk_nag_1.NagSuppressions.addStackSuppressions(aws_cdk_lib_1.Stack.of(this), [
            {
                id: 'AwsSolutions-L1',
                reason: 'This resource uses the standard custom resource construct, which is built for stability using a previous lambda runtime.',
            },
            {
                id: 'AwsSolutions-IAM4',
                reason: 'AWS Custom Resource is an AWS maintained construct that uses AWS Managed Policies.',
            }
        ]);
    }
}
exports.AmplifyDeploy = AmplifyDeploy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RydWN0LWFtcGxpZnktZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uc3RydWN0LWFtcGxpZnktZGVwbG95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXVDO0FBQ3ZDLDZDQUE4RTtBQUM5RSw2Q0FBMkQ7QUFDM0QsaUVBQW1EO0FBQ25ELG9FQUFxRDtBQUNyRCxxQ0FBMEM7QUFlMUMsTUFBYSxhQUFjLFNBQVEsc0JBQVM7SUFNMUMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUF5QjtRQUNqRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBRVosc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSw0QkFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsNkJBQTZCLEVBQUU7WUFDN0UsY0FBYyxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQzlCLFdBQVcsRUFBRSwrQ0FBK0M7WUFDNUQsSUFBSSxFQUFFLDRCQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQztTQUM1RCxDQUFDLENBQUM7UUFFSCx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUNuRCxXQUFXLEVBQUUsZ0ZBQWdGO1lBQzdGLGtCQUFrQixFQUFFLElBQUksT0FBTyxDQUFDLDRCQUE0QixDQUFDO2dCQUMzRCxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7YUFDNUIsQ0FDQTtZQUNELG9CQUFvQixFQUFFO2dCQUNwQixRQUFRLEVBQUUsS0FBSyxDQUFDLE1BQU07Z0JBQ3RCLFFBQVEsRUFBRSxLQUFLLENBQUMsS0FBSztnQkFDckIsY0FBYyxFQUFFLEtBQUssQ0FBQyxVQUFVO2dCQUNoQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsY0FBYztnQkFDeEMsY0FBYyxFQUFFLEtBQUssQ0FBQyxVQUFVO2dCQUNoQyx5QkFBeUIsRUFBRSxLQUFLLENBQUMsbUJBQW1CO2dCQUNwRCxlQUFlLEVBQUUsS0FBSyxDQUFDLGlCQUFpQjthQUN6QztZQUNELFdBQVcsRUFBRSxFQUFFO1NBRWhCLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZ0NBQWdDLENBQUMsQ0FBQSxDQUFDLGtFQUFrRTtRQUdySixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVuRCxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLDJCQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFMUQ7O1dBRUc7UUFDSCxNQUFNLGlCQUFpQixHQUFHLElBQUksRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUM1RSxRQUFRLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLE1BQU0sRUFBRSxVQUFVO2dCQUNsQixrQkFBa0IsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2dCQUNqRSxVQUFVLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztvQkFDNUIsVUFBVSxFQUFFLFNBQVMsQ0FBQyxVQUFVO29CQUNoQyxPQUFPLEVBQUUsU0FBUztvQkFDbEIsU0FBUyxFQUFFLGtCQUFrQjtpQkFDaEM7YUFDRjtZQUNELE1BQU0sRUFBRSxFQUFFLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUUsSUFBSSxxQkFBRyxDQUFDLGVBQWUsQ0FBQztvQkFDMUUsT0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUM7b0JBQzdCLE1BQU0sRUFBRSxxQkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLO29CQUN4QixTQUFTLEVBQUU7d0JBQ1QsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsYUFBYSxTQUFTLENBQUMsVUFBVSxTQUFTO3FCQUNqRTtpQkFDRixDQUFDO2FBQ0QsQ0FBQztTQUNILENBQUMsQ0FBQztRQUVILHlCQUFlLENBQUMsNkJBQTZCLENBQUMsbUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQzVELDZFQUE2RSxFQUFFO1lBQzdFO2dCQUNFLEVBQUUsRUFBRSxtQkFBbUI7Z0JBQ3ZCLE1BQU0sRUFDSix3RkFBd0Y7YUFDM0Y7U0FDRixDQUNBLENBQUE7UUFFRCx5QkFBZSxDQUFDLG9CQUFvQixDQUFDLG1CQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ25EO2dCQUNFLEVBQUUsRUFBRSxpQkFBaUI7Z0JBQ3JCLE1BQU0sRUFDSiwwSEFBMEg7YUFDN0g7WUFDRDtnQkFDRSxFQUFFLEVBQUUsbUJBQW1CO2dCQUN2QixNQUFNLEVBQ0osb0ZBQW9GO2FBQ3ZGO1NBQ0YsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKO0FBM0ZELHNDQTJGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgYXdzX2lhbSBhcyBpYW0sIENmbk91dHB1dCwgUmVtb3ZhbFBvbGljeSwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBhd3NfY29kZWNvbW1pdCBhcyBjb2RlY29tbWl0IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgY3IgZnJvbSAnYXdzLWNkay1saWIvY3VzdG9tLXJlc291cmNlcyc7XG5pbXBvcnQgKiBhcyBBbXBsaWZ5IGZyb20gXCJAYXdzLWNkay9hd3MtYW1wbGlmeS1hbHBoYVwiXG5pbXBvcnQgeyBOYWdTdXBwcmVzc2lvbnMgfSBmcm9tICdjZGstbmFnJztcblxuaW50ZXJmYWNlIEFtcGxpZnlEZXBsb3lQcm9wcyB7XG4gIGFwcFBhdGg6IHN0cmluZztcbiAgcmVwb05hbWU6IHN0cmluZztcbiAgcmVnaW9uOiBzdHJpbmc7XG4gIGFwaUlkOiBzdHJpbmc7XG4gIGdyYXBocWxVcmw6IHN0cmluZztcbiAgaWRlbnRpdHlQb29sSWQ6IHN0cmluZztcbiAgdXNlclBvb2xJZDogc3RyaW5nO1xuICB1c2VyUG9vbFdlYkNsaWVudElkOiBzdHJpbmc7XG4gIGxhbmRpbmdCdWNrZXROYW1lOiBzdHJpbmc7XG5cbn1cblxuZXhwb3J0IGNsYXNzIEFtcGxpZnlEZXBsb3kgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVwb3NpdG9yeTogY29kZWNvbW1pdC5SZXBvc2l0b3J5O1xuICBwdWJsaWMgYW1wbGlmeUFwcDogQW1wbGlmeS5BcHA7XG4gIHB1YmxpYyByZXBvc2l0b3J5TmFtZVN0cmluZzogc3RyaW5nO1xuICBwdWJsaWMgYnJhbmNoT3V0cHV0OiBhbnk7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IEFtcGxpZnlEZXBsb3lQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZClcbiAgICAgICAgXG4gICAgICAgIC8vIGNyZWF0ZSBhIGNvZGVjb21taXQgcmVwb3NpdG9yeSBhbmQgXG4gICAgICAgIHRoaXMucmVwb3NpdG9yeSA9IG5ldyBjb2RlY29tbWl0LlJlcG9zaXRvcnkodGhpcywgJ0FtcGxpZnlDb2RlQ29tbWl0UmVwb3NpdG9yeScsIHtcbiAgICAgICAgICAgIHJlcG9zaXRvcnlOYW1lOiBwcm9wcy5yZXBvTmFtZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkFtcGxpZnkgV2ViIEFwcGxpY2F0aW9uIERlcGxveW1lbnQgUmVwb3NpdG9yeVwiLFxuICAgICAgICAgICAgY29kZTogY29kZWNvbW1pdC5Db2RlLmZyb21EaXJlY3RvcnkocHJvcHMuYXBwUGF0aCwgJ2RldicpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGRlZmluZSBhbiBhbXBsaWZ5IGFwcFxuICAgICAgICB0aGlzLmFtcGxpZnlBcHAgPSBuZXcgQW1wbGlmeS5BcHAodGhpcywgJ0NETFdlYkFwcCcsIHtcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTYW1wbGUgQVdTIEFtcGxpZnkgQXBwbGljYXRpb24gZm9yIENhcmJvbiBEYXRhIExha2UgUXVpY2tzdGFydCBEZXZlbG9wbWVudCBLaXRcIixcbiAgICAgICAgICBzb3VyY2VDb2RlUHJvdmlkZXI6IG5ldyBBbXBsaWZ5LkNvZGVDb21taXRTb3VyY2VDb2RlUHJvdmlkZXIoe1xuICAgICAgICAgICAgcmVwb3NpdG9yeTogdGhpcy5yZXBvc2l0b3J5LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgKSxcbiAgICAgICAgICBlbnZpcm9ubWVudFZhcmlhYmxlczoge1xuICAgICAgICAgICAgJ1JFR0lPTic6IHByb3BzLnJlZ2lvbixcbiAgICAgICAgICAgICdBUElfSUQnOiBwcm9wcy5hcGlJZCxcbiAgICAgICAgICAgICdHUkFQSF9RTF9VUkwnOiBwcm9wcy5ncmFwaHFsVXJsLFxuICAgICAgICAgICAgJ0lERU5USVRZX1BPT0xfSUQnOiBwcm9wcy5pZGVudGl0eVBvb2xJZCxcbiAgICAgICAgICAgICdVU0VSX1BPT0xfSUQnOiBwcm9wcy51c2VyUG9vbElkLFxuICAgICAgICAgICAgJ1VTRVJfUE9PTF9XRUJfQ0xJRU5UX0lEJzogcHJvcHMudXNlclBvb2xXZWJDbGllbnRJZCxcbiAgICAgICAgICAgICdVUExPQURfQlVDS0VUJzogcHJvcHMubGFuZGluZ0J1Y2tldE5hbWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdXN0b21SdWxlczogW11cblxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuYW1wbGlmeUFwcC5hZGRDdXN0b21SdWxlKEFtcGxpZnkuQ3VzdG9tUnVsZS5TSU5HTEVfUEFHRV9BUFBMSUNBVElPTl9SRURJUkVDVCkgLy8gYWRkcyBzdXBwb3J0IGZvciBhbXBsaWZ5IHNpbmdsZSBwYWdlIHJlYWN0IGFwcGxpY2F0aW9uIGRlbGl2ZXJ5XG5cblxuICAgICAgICBjb25zdCBkZXZCcmFuY2ggPSB0aGlzLmFtcGxpZnlBcHAuYWRkQnJhbmNoKCdkZXYnKTtcblxuICAgICAgICB0aGlzLmFtcGxpZnlBcHAuYXBwbHlSZW1vdmFsUG9saWN5KFJlbW92YWxQb2xpY3kuREVTVFJPWSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAgKiBBdXRvbWF0aWNhbGx5IGRlcGxveXMgdGhlIEFtcGxpZnkgYXBwIGJ5IHJlbGVhc2luZyBuZXcgY2hhbmdlcyB0byB0aGUgYnVpbGQgc3RhZ2VcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGFtcGxpZnlBdXRvRGVwbG95ID0gbmV3IGNyLkF3c0N1c3RvbVJlc291cmNlKHRoaXMsICdBbXBsaWZ5QXV0b0RlcGxveScsIHtcbiAgICAgICAgICBvbkNyZWF0ZToge1xuICAgICAgICAgICAgc2VydmljZTogJ0FtcGxpZnknLFxuICAgICAgICAgICAgYWN0aW9uOiAnc3RhcnRKb2InLFxuICAgICAgICAgICAgcGh5c2ljYWxSZXNvdXJjZUlkOiBjci5QaHlzaWNhbFJlc291cmNlSWQub2YoJ2FwcC1idWlsZC10cmlnZ2VyJyksXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgICAgICAgICAgYXBwSWQ6IHRoaXMuYW1wbGlmeUFwcC5hcHBJZCxcbiAgICAgICAgICAgICAgICBicmFuY2hOYW1lOiBkZXZCcmFuY2guYnJhbmNoTmFtZSxcbiAgICAgICAgICAgICAgICBqb2JUeXBlOiAnUkVMRUFTRScsXG4gICAgICAgICAgICAgICAgam9iUmVhc29uOiAnQXV0byBTdGFydCBidWlsZCcsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwb2xpY3k6IGNyLkF3c0N1c3RvbVJlc291cmNlUG9saWN5LmZyb21TdGF0ZW1lbnRzKFsgbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICAgICAgYWN0aW9uczogWydhbXBsaWZ5OlN0YXJ0Sm9iJ10sXG4gICAgICAgICAgICBlZmZlY3Q6IGlhbS5FZmZlY3QuQUxMT1csXG4gICAgICAgICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgICAgICAgYCR7dGhpcy5hbXBsaWZ5QXBwLmFybn0vYnJhbmNoZXMvJHtkZXZCcmFuY2guYnJhbmNoTmFtZX0vam9icy8qYCxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9KVxuICAgICAgICAgIF0pLFxuICAgICAgICB9KTtcblxuICAgICAgICBOYWdTdXBwcmVzc2lvbnMuYWRkUmVzb3VyY2VTdXBwcmVzc2lvbnNCeVBhdGgoU3RhY2sub2YodGhpcyksXG4gICAgICAgIFwiL1dlYlN0YWNrL0FtcGxpZnlEZXBsb3ltZW50L0FtcGxpZnlBdXRvRGVwbG95L0N1c3RvbVJlc291cmNlUG9saWN5L1Jlc291cmNlXCIsIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJ0F3c1NvbHV0aW9ucy1JQU01JyxcbiAgICAgICAgICAgIHJlYXNvbjpcbiAgICAgICAgICAgICAgJ1RoaXMgaXMgcmVxdWlyZWQgdG8gYWxsb3cgZGVwbG95bWVudCBvZiBhbGwgam9icywgc2luY2Ugam9icyBhcmUgYXNzaWduZWQgZHluYW1pY2FsbHkuJyxcbiAgICAgICAgICB9XG4gICAgICAgIF0gXG4gICAgICAgIClcblxuICAgICAgICBOYWdTdXBwcmVzc2lvbnMuYWRkU3RhY2tTdXBwcmVzc2lvbnMoU3RhY2sub2YodGhpcyksIFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJ0F3c1NvbHV0aW9ucy1MMScsXG4gICAgICAgICAgICByZWFzb246XG4gICAgICAgICAgICAgICdUaGlzIHJlc291cmNlIHVzZXMgdGhlIHN0YW5kYXJkIGN1c3RvbSByZXNvdXJjZSBjb25zdHJ1Y3QsIHdoaWNoIGlzIGJ1aWx0IGZvciBzdGFiaWxpdHkgdXNpbmcgYSBwcmV2aW91cyBsYW1iZGEgcnVudGltZS4nLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6ICdBd3NTb2x1dGlvbnMtSUFNNCcsXG4gICAgICAgICAgICByZWFzb246XG4gICAgICAgICAgICAgICdBV1MgQ3VzdG9tIFJlc291cmNlIGlzIGFuIEFXUyBtYWludGFpbmVkIGNvbnN0cnVjdCB0aGF0IHVzZXMgQVdTIE1hbmFnZWQgUG9saWNpZXMuJyxcbiAgICAgICAgICB9XG4gICAgICAgIF0pXG4gICAgfVxufVxuIl19