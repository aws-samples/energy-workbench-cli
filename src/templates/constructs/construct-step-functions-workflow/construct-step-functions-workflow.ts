import { Construct } from "constructs";
import { aws_stepfunctions as sfn } from "aws-cdk-lib";
import { aws_stepfunctions_tasks as tasks } from "aws-cdk-lib";
import { aws_lambda as lambda } from "aws-cdk-lib";
import { SolutionLambda } from "../construct-solution-lambda-function/construct-solution-lambda-function";

/**
 * Properties for a StepFunctionsWorkflow construct
 */
export interface StepFunctionsWorkflowProps {
  /**
   * The configuration object that defines the workflow
   */
  config: WorkflowConfig;
}

/**
 * The configuration object for the workflow
 */
export interface WorkflowConfig {
  /**
   * The name of the state machine
   */
  name: string;

  /**
   * The workflow definition. Each element represents a state,
   * with "Type" specifying the state type.
   * Task states should reference a name defined in "States"
   */
  Definition: WorkflowDefinition[];

  /**
   * Lambda functions referenced by name in the Definition
   */
  States: { [name: string]: LambdaFunctionProps };
}

/**
 * Definition element for a single state in the workflow
 */
export interface WorkflowDefinition {
  /**
   * The state type - Task, Pass, Choice, etc
   */
  Type: string;

  /**
   * Additional state configuration based on the type
   */
  [key: string]: any;
}

/**
 * Props for defining a Lambda function
 */
export interface LambdaFunctionProps {
  /**
   * Lambda runtime
   */
  runtime: lambda.Runtime;

  /**
   * Lambda handler
   */
  handler: string;

  /**
   * Path to lambda code
   */
  code: lambda.Code;
}

export class StepFunctionsWorkflow extends Construct {
  constructor(scope: Construct, id: string, props: StepFunctionsWorkflowProps) {
    super(scope, id);

    // Create Lambda functions
    const lambdaFunctions = {};
    for (const [name, fnProps] of Object.entries(props.config.States)) {
      lambdaFunctions[name] = new SolutionLambda(this, name, fnProps);
    }

    // Build Step Functions state machine definition
    const definition = props.config.Definition.map((state) => {
      if (state.Type === "Task") {
        const name = state.Resource;
        return new tasks.LambdaInvoke(this, name, {
          lambdaFunction: lambdaFunctions[name],
        });
      }

      // Add other state types here

      return new sfn[state.Type](this, state.Name, state);
    });

    // Create state machine
    new sfn.StateMachine(this, props.config.name, {
      definition: sfn.Chain.start(definition[0]),
    });
  }
}
