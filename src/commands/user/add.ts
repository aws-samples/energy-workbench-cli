import { Args, Command, Flags } from "@oclif/core";
import { USER } from "@aws/energy-workbench-sdk";

export default class UserAddCli extends Command {
  static description = "Adds a user to a cognito user pool";
  static examples = ["<%= config.bin %> <%= command.id %>"];
  static args = {
    userName: Args.string({ description: "User to add" }),
    userPassword: Args.string({ description: "Password to add" }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(UserAddCli);
    const poolId = "us-east-1_yPBozDpy1";
    const addUserInstance = new USER.AddUser(poolId);
    const newUser = args.userName || "";
    const tempPass = args.userPassword || "";
    try {
      await addUserInstance.add(newUser, tempPass);
      console.log(`User ${newUser} added successfully!`);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  }
}
