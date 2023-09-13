# osdu-workbench-cli

This command line interface automates development and operational tasks for OSDU open source software. The workbench combines pre-built software modules, data operations via SDK, and common operational commands into a single command line interface. OSDU Workbench (owb) reduces common operations that take days or weeks to hours or minutes.

<!-- toc -->
* [osdu-workbench-cli](#osdu-workbench-cli)
<!-- tocstop -->

## Usage

### For development

```sh-session
./bin/dev <your-command>
```

<!-- usage -->
```sh-session
$ npm install -g osdu-workbench
$ owb COMMAND
running command...
$ owb (--version)
osdu-workbench/0.0.0 darwin-arm64 node-v19.9.0
$ owb --help [COMMAND]
USAGE
  $ owb COMMAND
...
```
<!-- usagestop -->

## Commands

<!-- commands -->
* [`owb data delete [FILE]`](#owb-data-delete-file)
* [`owb data get [DATA] [COMMENT]`](#owb-data-get-data-comment)
* [`owb data post [FILE]`](#owb-data-post-file)
* [`owb data update [FILE]`](#owb-data-update-file)
* [`owb deploy application [FILE]`](#owb-deploy-application-file)
* [`owb help [COMMANDS]`](#owb-help-commands)
* [`owb plugins`](#owb-plugins)
* [`owb plugins:install PLUGIN...`](#owb-pluginsinstall-plugin)
* [`owb plugins:inspect PLUGIN...`](#owb-pluginsinspect-plugin)
* [`owb plugins:install PLUGIN...`](#owb-pluginsinstall-plugin-1)
* [`owb plugins:link PLUGIN`](#owb-pluginslink-plugin)
* [`owb plugins:uninstall PLUGIN...`](#owb-pluginsuninstall-plugin)
* [`owb plugins:uninstall PLUGIN...`](#owb-pluginsuninstall-plugin-1)
* [`owb plugins:uninstall PLUGIN...`](#owb-pluginsuninstall-plugin-2)
* [`owb plugins update`](#owb-plugins-update)
* [`owb setup api [FILE]`](#owb-setup-api-file)
* [`owb setup creds [ENCRYPT]`](#owb-setup-creds-encrypt)
* [`owb setup templates [FILE]`](#owb-setup-templates-file)
* [`owb start`](#owb-start)

## `owb data delete [FILE]`

describe the command here

```
USAGE
  $ owb data delete [FILE] [-n <value>] [-f]

ARGUMENTS
  FILE  file to read

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ owb data delete
```

## `owb data get [DATA] [COMMENT]`

Gets data via API using local SDK.

```
USAGE
  $ owb data get [DATA] [COMMENT] -s <value> [-f <value>] [-d <value>]

ARGUMENTS
  DATA     Data type
  COMMENT  Comment

FLAGS
  -d, --display=<value>  [default: csv] Format to display data
  -f, --format=<value>   [default: csv] Format of data to get.
  -s, --source=<value>   (required) [default: test] Source of data

DESCRIPTION
  Gets data via API using local SDK.

EXAMPLES
  $ owb data get 'geo' --source 'example' --format 'csv' --display 'shell'
```

## `owb data post [FILE]`

describe the command here

```
USAGE
  $ owb data post [FILE] [-n <value>] [-f]

ARGUMENTS
  FILE  file to read

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ owb data post
```

## `owb data update [FILE]`

describe the command here

```
USAGE
  $ owb data update [FILE] [-n <value>] [-f]

ARGUMENTS
  FILE  file to read

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ owb data update
```

## `owb deploy application [FILE]`

describe the command here

```
USAGE
  $ owb deploy application [FILE] [-n <value>] [-f]

ARGUMENTS
  FILE  file to read

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ owb deploy application
```

## `owb help [COMMANDS]`

Display help for owb.

```
USAGE
  $ owb help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for owb.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.19/src/commands/help.ts)_

## `owb plugins`

List installed plugins.

```
USAGE
  $ owb plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ owb plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `owb plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ owb plugins:install PLUGIN...

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
  $ owb plugins add

EXAMPLES
  $ owb plugins:install myplugin 

  $ owb plugins:install https://github.com/someuser/someplugin

  $ owb plugins:install someuser/someplugin
```

## `owb plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ owb plugins:inspect PLUGIN...

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
  $ owb plugins:inspect myplugin
```

## `owb plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ owb plugins:install PLUGIN...

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
  $ owb plugins add

EXAMPLES
  $ owb plugins:install myplugin 

  $ owb plugins:install https://github.com/someuser/someplugin

  $ owb plugins:install someuser/someplugin
```

## `owb plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ owb plugins:link PLUGIN

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
  $ owb plugins:link myplugin
```

## `owb plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ owb plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ owb plugins unlink
  $ owb plugins remove
```

## `owb plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ owb plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ owb plugins unlink
  $ owb plugins remove
```

## `owb plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ owb plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ owb plugins unlink
  $ owb plugins remove
```

## `owb plugins update`

Update installed plugins.

```
USAGE
  $ owb plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `owb setup api [FILE]`

describe the command here

```
USAGE
  $ owb setup api [FILE] [-n <value>] [-f]

ARGUMENTS
  FILE  file to read

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ owb setup api 'configure'
```

## `owb setup creds [ENCRYPT]`

Configures credentials and saves them to local file.

```
USAGE
  $ owb setup creds [ENCRYPT] [-p <value>] [-k <value>] [-s <value>]

ARGUMENTS
  ENCRYPT  Encrypt secret

FLAGS
  -k, --format=<value>   API Key
  -p, --source=<value>   [default: default] OSDU User Profile to Use
  -s, --display=<value>  API Secret

DESCRIPTION
  Configures credentials and saves them to local file.

EXAMPLES
  $ owb setup creds --profile 'example' --ApiKey 'yourKey' --ApiSecret 'abc123'
```

## `owb setup templates [FILE]`

describe the command here

```
USAGE
  $ owb setup templates [FILE] [-n <value>] [-f]

ARGUMENTS
  FILE  file to read

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ owb setup templates
```

## `owb start`

Basic start command implements a command prompt input workflow.

```
USAGE
  $ owb start

DESCRIPTION
  Basic start command implements a command prompt input workflow.

EXAMPLES
  $ owb start
```

_See code: [dist/commands/start.ts](https://github.com/samwardbiddle/osdu-workbench/blob/v0.0.0/dist/commands/start.ts)_
<!-- commandsstop -->
