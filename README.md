Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties.

# Energy Workbench CLI (EWB)

This command line interface supports the automation of operational tasks for EDI - [Energy Data Insights on AWS - OSDU Data Platform](https://aws.amazon.com/energy/osdu-data-platform/). This CLI - Command Line Interface - leverages oclif - The Open CLI Framework - an open source framework for building CLI in Node.js and Typescript. This EDI CLI allows to interact with EDI instances in an easy and intuitive way enabling you to perform common operational actions into a single command line interface.

<!-- toc -->
* [Energy Workbench CLI (EWB)](#energy-workbench-cli-ewb)
* [Get started](#get-started)
* [Configure environment variables](#configure-environment-variables)
* [Export environment variables](#export-environment-variables)
* [How to use](#usage)
<!-- tocstop -->

## Get started

Follow these steps to get started:
* download the EWB SDK from your given repository
* download the EWB CLI from your given repository
* unzip it to your home directory (in case it's zipped)
* start a shell session and build both the SDK and the CLI (the following example works for linux and macOS)

<!-- install -->
```sh-session
$ cd
$ cd cd edi-workbench/energy-workbench-sdk/
$ npm install
$ npm run build
$ npm link
$ cd cd ~/edi-workbench/energy-workbench-cli/
$ npm link @aws/energy-workbench-sdk
$ npm install
$ npm run build
$ npm link
$ ewb --version
```
<!-- installstop -->

After building both the SDK and the CLI, you should be able to test it and see something like @aws/energy-workbench-cli/0.0.1 for ewb --version.

## Configure environment variables

After extracting both the SDK and the CLI and building them, your next step to use should be to configure the environment variables needed to connect to the EDI instance.

<!-- config -->
```sh-session
$ ewb start
```
<!-- configstop -->
Select the option to configure credentials and follow the prompts to configure all the required environment variables. Additionally, you will have to configure the required variables for aws cli.

## Export environment variables

Depending on your specific operational system and the machine you are running the CLI, you might have to explicitly export the environment variables. This is true for macOS. The reason for that is that the CLI will export the variables in a sub-process, and when that sub-process ends the variables will also end. This is how to display and export the environment variables needed:


<!-- export -->
```sh-session
$ ewb start
```
<!-- exportstop -->
Select the option to export you credentials, select which profile you would like to export, copy and paste the export commands. 

## Usage

<!-- usage -->
```sh-session
$ ewb COMMAND
running command...
$ ewb (--version)
@aws/energy-workbench-cli/0.0.1 darwin-arm64 node-v21.7.2
$ ewb --help [COMMAND]
USAGE
  $ ewb COMMAND
...
```
<!-- usagestop -->

## Commands

<!-- commands -->
* [`ewb config [ENCRYPT]`](#ewb-config-encrypt)
* [`ewb export`](#ewb-export)
* [`ewb group add [GROUPTOADD]`](#ewb-group-add-grouptoadd)
* [`ewb group list`](#ewb-group-list)
* [`ewb member add GROUPNAME MEMBERNAME ROLE`](#ewb-member-add-groupname-membername-role)
* [`ewb member bootstrap MEMBERNAME`](#ewb-member-bootstrap-membername)
* [`ewb member groups MEMBERTOLIST`](#ewb-member-groups-membertolist)
* [`ewb member list GROUPTOLIST`](#ewb-member-list-grouptolist)
* [`ewb search kind [KIND]`](#ewb-search-kind-kind)
* [`ewb start`](#ewb-start)
* [`ewb user add [USERNAME] [USERPASSWORD] [POOLID]`](#ewb-user-add-username-userpassword-poolid)

## `ewb config [ENCRYPT]`

Configures credentials and saves them to local file.

```
USAGE
  $ ewb config [ENCRYPT] [-p <value>] [-k <value>] [-s <value>]

ARGUMENTS
  ENCRYPT  Encrypt secret

FLAGS
  -k, --format=<value>   API Key
  -p, --source=<value>   [default: default] OSDU User Profile to Use
  -s, --display=<value>  API Secret

DESCRIPTION
  Configures credentials and saves them to local file.

EXAMPLES
  $ ewb config --profile 'example' --ApiKey 'yourKey' --ApiSecret 'abc123'
```

_See code: [dist/commands/config.js](https://github.com/aws-samples/energy-workbench-cli/blob/v0.0.1/dist/commands/config.js)_

## `ewb export`

Export credentials to local command line session.

```
USAGE
  $ ewb export [-p <value>]

FLAGS
  -p, --profile=<value>  [default: default] Local configuration profile to use

DESCRIPTION
  Export credentials to local command line session.

EXAMPLES
  $ ewb export --profile 'example'
```

_See code: [dist/commands/export.js](https://github.com/aws-samples/energy-workbench-cli/blob/v0.0.1/dist/commands/export.js)_

## `ewb group add [GROUPTOADD]`

Adds a group

```
USAGE
  $ ewb group add [GROUPTOADD]

ARGUMENTS
  GROUPTOADD  Group to add

DESCRIPTION
  Adds a group

EXAMPLES
  $ ewb group add
```

_See code: [dist/commands/group/add.js](https://github.com/aws-samples/energy-workbench-cli/blob/v0.0.1/dist/commands/group/add.js)_

## `ewb group list`

List all groups for a specific instance.

```
USAGE
  $ ewb group list

DESCRIPTION
  List all groups for a specific instance.

EXAMPLES
  $ ewb group list
```

_See code: [dist/commands/group/list.js](https://github.com/aws-samples/energy-workbench-cli/blob/v0.0.1/dist/commands/group/list.js)_

## `ewb member add GROUPNAME MEMBERNAME ROLE`

Add a member to a specific group with a defined role.

```
USAGE
  $ ewb member add GROUPNAME MEMBERNAME ROLE

ARGUMENTS
  GROUPNAME   Group to add member to.
  MEMBERNAME  Member to add to the group.
  ROLE        Role to add member with.

DESCRIPTION
  Add a member to a specific group with a defined role.

EXAMPLES
  $ ewb member add users.datalake.admins@osdu.example.com test@testing.com OWNER
```

_See code: [dist/commands/member/add.js](https://github.com/aws-samples/energy-workbench-cli/blob/v0.0.1/dist/commands/member/add.js)_

## `ewb member bootstrap MEMBERNAME`

Add a member to all the default groups needed to perform basic tasks.

```
USAGE
  $ ewb member bootstrap MEMBERNAME

ARGUMENTS
  MEMBERNAME  Member to add to the groups.

DESCRIPTION
  Add a member to all the default groups needed to perform basic tasks.

EXAMPLES
  $ ewb member bootstrap test@testing.com
```

_See code: [dist/commands/member/bootstrap.js](https://github.com/aws-samples/energy-workbench-cli/blob/v0.0.1/dist/commands/member/bootstrap.js)_

## `ewb member groups MEMBERTOLIST`

List all groups for a specific member.

```
USAGE
  $ ewb member groups MEMBERTOLIST

ARGUMENTS
  MEMBERTOLIST  Member to list groups from.

DESCRIPTION
  List all groups for a specific member.

EXAMPLES
  $ ewb member groups user@testing.com
```

_See code: [dist/commands/member/groups.js](https://github.com/aws-samples/energy-workbench-cli/blob/v0.0.1/dist/commands/member/groups.js)_

## `ewb member list GROUPTOLIST`

List all members for a specific group.

```
USAGE
  $ ewb member list GROUPTOLIST

ARGUMENTS
  GROUPTOLIST  Group to list members from.

DESCRIPTION
  List all members for a specific group.

EXAMPLES
  $ ewb member list users.datalake.admins@osdu.example.com
```

_See code: [dist/commands/member/list.js](https://github.com/aws-samples/energy-workbench-cli/blob/v0.0.1/dist/commands/member/list.js)_

## `ewb search kind [KIND]`

Perform a search call using the kind key and flags for query and limit.

```
USAGE
  $ ewb search kind [KIND] [-q <value>] [--limit <value>] [--table <value>]

ARGUMENTS
  KIND  kind to query

FLAGS
  -q, --query=<value>  Specific query to run
      --limit=<value>  How many lines to return
      --table=<value>  What format to display search results

DESCRIPTION
  Perform a search call using the kind key and flags for query and limit.

EXAMPLES
  $ ewb search kind osdu:wks:master-data--Well:1.0.0
```

_See code: [dist/commands/search/kind.js](https://github.com/aws-samples/energy-workbench-cli/blob/v0.0.1/dist/commands/search/kind.js)_

## `ewb start`

Basic start command implements a command prompt input workflow.

```
USAGE
  $ ewb start

DESCRIPTION
  Basic start command implements a command prompt input workflow.

EXAMPLES
  $ ewb start
```

_See code: [dist/commands/start.js](https://github.com/aws-samples/energy-workbench-cli/blob/v0.0.1/dist/commands/start.js)_

## `ewb user add [USERNAME] [USERPASSWORD] [POOLID]`

Adds a user to a cognito user pool

```
USAGE
  $ ewb user add [USERNAME] [USERPASSWORD] [POOLID]

ARGUMENTS
  USERNAME      User to add
  USERPASSWORD  Password to add
  POOLID        Cognito Pool ID

DESCRIPTION
  Adds a user to a cognito user pool

EXAMPLES
  $ ewb user add
```

_See code: [dist/commands/user/add.js](https://github.com/aws-samples/energy-workbench-cli/blob/v0.0.1/dist/commands/user/add.js)_
<!-- commandsstop -->

## Development

This tool uses the Open CLI Framework (OCLIF). To add additional commands or operations please reference [OCLIF documentation](https://oclif.io/docs/generator_commands). Below are some basic commands to get started.

To add to the CLI:

```sh-session
# to generate a new command
oclif generate command NAME

# to generate a new hook
oclif generate hook NAME
```

To run existing commands in development mode:

```sh-session
./bin/dev <your-command>
```

To build the existing CLI:

```sh-session
npm run build
```

To dynamically update the README:

```sh-session
npm run build
oclif readme
```
