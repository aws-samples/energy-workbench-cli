import { Construct } from "constructs";
import { Stack } from "aws-cdk-lib";
// import { NagSuppressions } from "cdk-nag"; uncomment if you need to use CDK_nag suppressions

interface QuickSightDashboardProps {
  myExampleProp: string;
}

export class QuickSightDashboard extends Construct {
  public myExamplePublicProp: any;

  constructor(scope: Construct, id: string, props: QuickSightDashboardProps) {
    super(scope, id);
    /**
     * Build your starter construct here
     * When you have built it you can import into a stack
     */
  }
}
