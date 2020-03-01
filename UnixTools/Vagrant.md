Tool that provisions Virtual box images/ VM images using scripts. i.e. Software defined infrastructure.
Vagrant uses Ruby to wrap VBoxManage (The virtualbox APIs)

Default username password of started box is `vagrant/vagrant`.
But you can also directly login using `vagrant ssh`.

Discover vagrant boxes: https://app.vagrantup.com/boxes/search

Vagrant is written in ruby.

5 main parts:
1. `config.vm.box` - operating system
2. `config.vm.provider` - Virtual box
3. `config.vm.network` - How host/guest networking works e.g. `nat/bridged etc`
4. `config.vm.shared_folder` - sharing of storage between host and guest
5. `config.vm.provision` - what we want setup.

How to start?

Run `vagrant init boxname`
e.g. `vagrant init ubuntu/trusty64`

If you have changed the config file,
use `vagrant reload` if the vagrant box is already up.

To directly log in to the box: 
`vagrant ssh`

### Vagrant Provider

The VM provider e.g. virtualbox, vmware, AWS etc. etc.

### Vagrant Provisioner

Does stuff once machine is up. e.g. Docker, Ansible, Chef, Puppet etc.

Sample Vagrant file:
```rb
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "ubuntu/trusty64"

  
  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    # vb.gui = true
  
    # Customize the amount of memory on the VM:
    vb.memory = "2048"
    vb.cpus = 4
  end


  # config.vm.box_check_update = false
  # config.vm.network "forwarded_port", guest: 80, host: 8080
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"
  config.vm.network "private_network", ip: "192.168.33.10"
  # config.vm.network "public_network"
  # synced folder -> first argument is host path, second arg is guest path
  config.vm.synced_folder ".", "/var/www/html"

  # Enable provisioning with a shell script. Additional provisioners such as
  # Ansible, Chef, Docker, Puppet and Salt are also available. Please see the
  # documentation for more information about their specific syntax and use.
  # config.vm.provision "shell", inline: <<-SHELL
  #   apt-get update
  #   apt-get install -y apache2
  # SHELL
end
```