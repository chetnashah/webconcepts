
https://developer.hashicorp.com/packer/docs/terminology

## Packer block

The `packer {}` block contains Packer settings, including specifying a required Packer version.


## Source block

The `source` block configures a specific builder plugin, which is then invoked by a `build` block.

## Build block

The `build` block defines what Packer should do with the instance after it launches.

## Builders

Builders create machines and generate images from those machines for various platforms. Packer also has some builders that perform helper tasks, like running provisioners.

Packer has the following types of builders:

* `Plugin`: Each plugin has its own associated set of builders. For example, there are separate builders for EC2, VMware, VirtualBox, etc.
* `File`: The file builder creates an artifact from a file.
* `Null`: The null builder sets up an SSH connection and runs the provisioners.
* `Custom`: You can write new builders for new or existing platforms.
* `Community-Supported`: The Packer community develops and maintains builders for several additional platforms.

Refer to the `source` block documentation to learn more about configuring builders in the Packer templating language.

## Communicators

Communicators are the mechanism Packer uses to upload files, execute scripts, etc. with the machine being created.

Communicators are configured within the builder section. Packer currently supports three kinds of communicators:

`none` - No communicator will be used. If this is set, most provisioners also can't be used.

`ssh` - An SSH connection will be established to the machine. This is usually the default.

`winrm` - A WinRM connection will be established.

In addition to the above, some builders have custom communicators they can use. For example, the Docker builder has a "docker" communicator that uses docker exec and docker cp to execute scripts and copy files.





## Provisioner

Provisioners use built-in and third-party software to install and configure the machine image after booting. Provisioners prepare the system, so you may want to use them for the following use cases:

* installing packages
* patching the kernel
* creating users
* downloading application code



