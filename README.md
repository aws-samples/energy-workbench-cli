Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
This deliverable is considered Developed Content as defined in the AWS Service Terms and the SOW between the parties.

# Energy Workbench CLI (EWB)

This command line interface automates development and operational tasks for [Energy Data Insights on AWS - OSDU Data Platform](https://aws.amazon.com/energy/osdu-data-platform/). The workbench combines pre-built software modules, data operations via SDK, and common operational actions into a single command line interface.

<!-- toc -->
* [Energy Workbench CLI (EWB)](#energy-workbench-cli-ewb)
* [to generate a new command](#to-generate-a-new-command)
* [to generate a new hook](#to-generate-a-new-hook)
<!-- tocstop -->

## Usage

<!-- usage -->
```sh-session
$ npm install -g @aws/energy-workbench-cli
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
