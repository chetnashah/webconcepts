
Alternative smart generator like Cmake.

https://gn.googlesource.com/gn/+/refs/heads/main/docs/quick_start.md

## What is GN (Generator for Ninja)

GN is a meta-build system that generates NinjaBuild files. 

It's meant to be faster and simpler than GYP (meant to replace gyp). 

**It outputs only Ninja build files.**

## Imp files

### `.gn` dotfile

When gn starts, it will search the current directory and parent directories
for a file called ".gn". This indicates the source root. You can override
this detection by using the --root command-line argument

The .gn file in the source root will be executed. The syntax is the same as a
buildfile, but with very limited build setup-specific meaning.

If you specify --root, by default GN will look for the file .gn in that
directory. If you want to specify a different file, you can additionally pass
--dotfile:
```
gn gen out/Debug --root=/home/build --dotfile=/home/my_gn_file.gn
```

`buildconfig` field file: Path to the build config file. This file will be used to set up the build file execution environment for each toolchain.

Example `.gn` file contents
```
  buildconfig = "//build/config/BUILDCONFIG.gn"

  check_targets = [
    "//doom_melon/*",  # Check everything in this subtree.
    "//tools:mind_controlling_ant",  # Check this specific target.
  ]

  root = "//:root"

  secondary_source = "//build/config/temporary_buildfiles/"

  default_args = {
    # Default to release builds for this project.
    is_debug = false
    is_component_build = false
  }
```

## generate ninja files with `gn gen`

```
gn gen out/Default
```

`gn gen` takes all the configuration choices and makes all the decisions. All it really does is generate the `.ninja` files in the build directory. 

This step only has to be done by hand when you change the configuration or completely nuke the build directory. In general, it only needs to be done when the GN files change, and in incremental builds it happens automatically if the GN files or configuration change.

### Giving arguments to gen process

```
gn gen out/foo --args='is_debug=false target_cpu="x64" v8_target_cpu="arm64" use_goma=true'
```

### Listing available build variables

```
gn args --list out/my_build
```

## Dependency graph and `BUILD.gn` file

GN uses a dependency graph to determine the build order.

Everything in GN is rooted in the dependency graph. There is one root `BUILD.gn` file.

The only way other `BUILD.gn` files are even read is if there is a dependency on a label in that directory.



### Group

In GN, a “group” is just a collection of dependencies that’s not complied or linked.



## Commands

analyze: Analyze which targets are affected by a list of files.
args: Display or configure arguments declared by the build.
check: Check header dependencies.
clean: Cleans the output directory.
clean_stale: Cleans the stale output files from the output directory.
desc: Show lots of insightful information about a target or config.
format: Format .gn files.
gen: Generate ninja files.
help: Does what you think.
ls: List matching targets.
meta: List target metadata collection results.
outputs: Which files a source/target make.
path: Find paths between two targets.
refs: Find stuff referencing a target or file.\


## Built-in target types

Built-in target types
1. `executable`, `shared_library`, `static_library`
2. `loadable_module`: like a shared library but loaded at runtime
3. `source_set`: compiles source files with no intermediate library

4. `group`: a named group of targets (deps but no sources)
5. `copy`
6. `action`, `action _foreach`: run a script
7. `bundle_data`,`create_bundle`: Mac & iOS
8. `component`: shared library or source set depending on mode
9. `test` 
10. `app`: executable or iOS application + bundle
11. `android_apk`, `generate_jni`, etc.: Lots of Android ones!

Example target declaration with deps:
```
static_library(“base”) {
  sources = [
    “a.cc”,
    “b.cc”,
  ]

  deps = [
    “//fancypants”,
    “//foo/bar:baz”,
  ]
}
```

## Variables that you can set in targets

`aliased_deps`: `[scope]` Set of crate-dependency pairs.
`all_dependent_configs`: `[label list]` Configs to be forced on dependents.
`allow_circular_includes_from`: `[label list]` Permit includes from deps.
arflags: [string list] Arguments passed to static_library archiver.
args: [string list] Arguments passed to an action.
asmflags: [string list] Flags passed to the assembler.
assert_no_deps: `[label pattern list]` Ensure no deps on these targets.
bridge_header: `[string]` Path to C/Objective-C compatibility header.
bundle_contents_dir: Expansion of {{bundle_contents_dir}} in create_bundle.
bundle_deps_filter: [label list] A list of labels that are filtered out.
bundle_executable_dir: Expansion of {{bundle_executable_dir}} in create_bundle
bundle_resources_dir: Expansion of {{bundle_resources_dir}} in create_bundle.
bundle_root_dir: Expansion of {{bundle_root_dir}} in create_bundle.
cflags: [string list] Flags passed to all C compiler variants.
cflags_c: [string list] Flags passed to the C compiler.
cflags_cc: [string list] Flags passed to the C++ compiler.
cflags_objc: [string list] Flags passed to the Objective C compiler.
cflags_objcc: [string list] Flags passed to the Objective C++ compiler.
check_includes: `[boolean]` Controls whether a target's files are checked.
code_signing_args: [string list] Arguments passed to code signing script.
code_signing_outputs: [file list] Output files for code signing step.
code_signing_script: [file name] Script for code signing.
code_signing_sources: [file list] Sources for code signing step.
complete_static_lib: `[boolean]` Links all deps into a static library.
configs: [label list] Configs applying to this target or config.
contents: Contents to write to file.
crate_name: `[string]` The name for the compiled crate.
crate_root: `[string]` The root source file for a binary or library.
crate_type: `[string]` The type of linkage to use on a shared_library.
data: [file list] Runtime data file dependencies.
data_deps: [label list] Non-linked dependencies.
data_keys: [string list] Keys from which to collect metadata.
defines: [string list] C preprocessor defines.
depfile: `[string]` File name for input dependencies for actions.
deps: [label list] Private linked dependencies.
externs: `[scope]` Set of Rust crate-dependency pairs.
framework_dirs: [directory list] Additional framework search directories.
frameworks: `[name list]` Name of frameworks that must be linked.
friend: `[label pattern list]` Allow targets to include private headers.
gen_deps: `[label list]` Declares targets that should generate when this one does.
include_dirs: [directory list] Additional include directories.
inputs: [file list] Additional compile-time dependencies.
ldflags: [string list] Flags passed to the linker.
lib_dirs: [directory list] Additional library directories.
libs: [string list] Additional libraries to link.
metadata: `[scope]` Metadata of this target.
mnemonic: `[string]` Prefix displayed when ninja runs this action.
module_name: `[string]` The name for the compiled module.
output_conversion: Data format for generated_file targets.
output_dir: `[directory]` Directory to put output file in.
output_extension: [string] Value to use for the output's file extension.
output_name: `[string]` Name for the output file other than the default.
output_prefix_override: `[boolean]` Don't use prefix for output name.
outputs: [file list] Output files for actions and copy targets.
partial_info_plist: `[filename]` Path plist from asset catalog compiler.
pool: `[string]` Label of the pool used by binary targets and actions.
precompiled_header: `[string]` Header file to precompile.
precompiled_header_type: `[string]` “gcc” or “msvc”.
precompiled_source: [file name] Source file to precompile.
product_type: `[string]` Product type for the bundle.
public: [file list] Declare public header files for a target.
public_configs: [label list] Configs applied to dependents.
public_deps: [label list] Declare public dependencies.
rebase: `[boolean]` Rebase collected metadata as files.
response_file_contents: [string list] Contents of .rsp file for actions.
script: [file name] Script file for actions.
sources: [file list] Source files for a target.
swiftflags: [string list] Flags passed to the swift compiler.
testonly: `[boolean]` Declares a target must only be used for testing.
transparent: `[bool]` True if the bundle is transparent.
visibility: [label list] A list of labels that can depend on a target.
walk_keys: [string list] Key(s) for managing the metadata collection walk.
weak_frameworks: [name list] Name of frameworks that must be weak linked.
write_runtime_deps: Writes the target's runtime_deps to the given path.
xcasset_compiler_flags: [string list] Flags passed to xcassets compiler
xcode_extra_attributes: `[scope]` Extra attributes for Xcode projects.
xcode_test_application_name: `[string]` Name for Xcode test target.


```
  static_library("lib") {
    # This target can include our private headers.
    friend = [ ":unit_tests" ]

    public = [
      "public_api.h",  # Normal public API for dependent targets.
    ]

    # Private API and sources.
    sources = [
      "a_source_file.cc",

      # Normal targets that depend on this one won't be able to include this
      # because this target defines a list of "public" headers. Without the
      # "public" list, all headers are implicitly public.
      "private_api.h",
    ]
  }

  executable("unit_tests") {
    sources = [
      # This can include "private_api.h" from the :lib target because it
      # depends on that target and because of the friend annotation.
      "my_test.cc",
    ]

    deps = [
      ":lib",  # Required for the include to be allowed.
    ]
  }
```

