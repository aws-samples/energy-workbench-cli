
interface Env {
  OSDU_ENDPOINT: string;
  OSDU_REGION: string;
}

export function validateEnv() {
  if (!process.env.OSDU_ENDPOINT) {
    throw new Error("OSDU_ENDPOINT env var is required");
  }

  if (!process.env.OSDU_REGION) {
    throw new Error("OSDU_REGION env var is required");
  }

  if (!process.env.AWS_PROFILE) {
    throw new Error("AWS_PROFILE env var is required");
  }

  return {
    endpoint: process.env.OSDU_ENDPOINT,
    region: process.env.OSDU_REGION,
    aws_profile: process.env.AWS_PROFILE
  };
}
