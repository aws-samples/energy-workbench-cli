# Energy Workbench CLI

This command line interface automates development and operational tasks for OSDU open source software. The workbench combines pre-built software modules, data operations via SDK, and common operational commands into a single command line interface. OSDU Workbench (owb) reduces common operations that take days or weeks to hours or minutes.

<!-- toc -->
* [Energy Workbench CLI](#energy-workbench-cli)
<!-- tocstop -->

## Usage

### For development

```sh-session
./bin/dev <your-command>
```

<!-- usage -->
```sh-session
$ npm install -g @aws/energy-workbench-cli
$ ewb COMMAND
running command...
$ ewb (--version)
@aws/energy-workbench-cli/0.0.1 darwin-arm64 node-v19.9.0
$ ewb --help [COMMAND]
USAGE
  $ ewb COMMAND
...
```
<!-- usagestop -->

## Commands

<!-- commands -->
* [`ewb create module [TEMPLATE]`](#ewb-create-module-template)
* [`ewb create project [TEMPLATE]`](#ewb-create-project-template)
* [`ewb group add [GROUPTOADD]`](#ewb-group-add-grouptoadd)
* [`ewb group list`](#ewb-group-list)
* [`ewb help [COMMANDS]`](#ewb-help-commands)
* [`ewb member add GROUPNAME MEMBERNAME ROLE`](#ewb-member-add-groupname-membername-role)
* [`ewb member groups MEMBERTOLIST`](#ewb-member-groups-membertolist)
* [`ewb member list GROUPTOLIST`](#ewb-member-list-grouptolist)
* [`ewb plugins`](#ewb-plugins)
* [`ewb plugins:install PLUGIN...`](#ewb-pluginsinstall-plugin)
* [`ewb plugins:inspect PLUGIN...`](#ewb-pluginsinspect-plugin)
* [`ewb plugins:install PLUGIN...`](#ewb-pluginsinstall-plugin-1)
* [`ewb plugins:link PLUGIN`](#ewb-pluginslink-plugin)
* [`ewb plugins:uninstall PLUGIN...`](#ewb-pluginsuninstall-plugin)
* [`ewb plugins:uninstall PLUGIN...`](#ewb-pluginsuninstall-plugin-1)
* [`ewb plugins:uninstall PLUGIN...`](#ewb-pluginsuninstall-plugin-2)
* [`ewb plugins update`](#ewb-plugins-update)
* [`ewb search kind [KIND]`](#ewb-search-kind-kind)
* [`ewb setup creds [ENCRYPT]`](#ewb-setup-creds-encrypt)
* [`ewb start`](#ewb-start)
* [`ewb user add [USERNAME] [USERPASSWORD]`](#ewb-user-add-username-userpassword)

## `ewb create module [TEMPLATE]`

Add a new module to an existing project

```
USAGE
  $ ewb create module [TEMPLATE]

ARGUMENTS
  TEMPLATE  Template

DESCRIPTION
  Add a new module to an existing project

EXAMPLES
  $ ewb create module 'app' --template 'example' --git 'true' --cicd 'true'
```

## `ewb create project [TEMPLATE]`

Start new application or project from a template

```
USAGE
  $ ewb create project [TEMPLATE] [-g <value>] [-c <value>]

ARGUMENTS
  TEMPLATE  Template

FLAGS
  -c, --cicd=<value>  [default: github] Option to include cicd pipeline.
  -g, --git=<value>   [default: true] Option for creating git repository

DESCRIPTION
  Start new application or project from a template

EXAMPLES
  $ ewb create project 'app' --template 'example' --git 'true' --cicd 'true'
```

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

## `ewb help [COMMANDS]`

Display help for ewb.

```
USAGE
  $ ewb help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ewb.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.20/src/commands/help.ts)_

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

## `ewb plugins`

List installed plugins.

```
USAGE
  $ ewb plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ ewb plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `ewb plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ ewb plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ ewb plugins add

EXAMPLES
  $ ewb plugins:install myplugin 

  $ ewb plugins:install https://github.com/someuser/someplugin

  $ ewb plugins:install someuser/someplugin
```

## `ewb plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ ewb plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ ewb plugins:inspect myplugin
```

## `ewb plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ ewb plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ ewb plugins add

EXAMPLES
  $ ewb plugins:install myplugin 

  $ ewb plugins:install https://github.com/someuser/someplugin

  $ ewb plugins:install someuser/someplugin
```

## `ewb plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ ewb plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ ewb plugins:link myplugin
```

## `ewb plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ewb plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ewb plugins unlink
  $ ewb plugins remove
```

## `ewb plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ewb plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ewb plugins unlink
  $ ewb plugins remove
```

## `ewb plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ewb plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ewb plugins unlink
  $ ewb plugins remove
```

## `ewb plugins update`

Update installed plugins.

```
USAGE
  $ ewb plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `ewb search kind [KIND]`

Perform a search call using the kind key and flags for query and limit

```
USAGE
  $ ewb search kind [KIND] [-q <value>] [--limit <value>] [--table <value>]

ARGUMENTS
  KIND  kind to query

FLAGS
  -q, --query=<value>  Specific query to run
  --limit=<value>      How many lines to return
  --table=<value>      What format to display search results

DESCRIPTION
  Perform a search call using the kind key and flags for query and limit

EXAMPLES
  $ ewb search kind osdu:wks:master-data--Well:1.0.0
```

## `ewb setup creds [ENCRYPT]`

Configures credentials and saves them to local file.

```
USAGE
  $ ewb setup creds [ENCRYPT] [-p <value>] [-k <value>] [-s <value>]

ARGUMENTS
  ENCRYPT  Encrypt secret

FLAGS
  -k, --format=<value>   API Key
  -p, --source=<value>   [default: default] OSDU User Profile to Use
  -s, --display=<value>  API Secret

DESCRIPTION
  Configures credentials and saves them to local file.

EXAMPLES
  $ ewb setup creds --profile 'example' --ApiKey 'yourKey' --ApiSecret 'abc123'
```

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

_See code: [dist/commands/start.ts](https://github.com/aws-samples/energy-workbench-cli/blob/v0.0.1/dist/commands/start.ts)_

## `ewb user add [USERNAME] [USERPASSWORD]`

Adds a user to a cognito user pool

```
USAGE
  $ ewb user add [USERNAME] [USERPASSWORD]

ARGUMENTS
  USERNAME      User to add
  USERPASSWORD  Password to add

DESCRIPTION
  Adds a user to a cognito user pool

EXAMPLES
  $ ewb user add
```
<!-- commandsstop -->
