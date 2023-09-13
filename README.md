# osdu-workbench-cli

This command line interface automates development and operational tasks for OSDU open source software. The workbench combines pre-built software modules, data operations via SDK, and common operational commands into a single command line interface. OSDU Workbench (owb) reduces common operations that take days or weeks to hours or minutes.

<!-- toc -->
* [osdu-workbench-cli](#osdu-workbench-cli)
<!-- tocstop -->

## Usage

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.12/src/commands/help.ts)_

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
<!-- commandsstop -->
