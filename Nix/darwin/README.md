
## What happens on installation?

Nix will:
 - make sure your computer doesn't already have Nix files
   (if it does, I will tell you how to clean them up.)
 - create local users (see the list above for the users I'll make)
 - create a local group (nixbld)
 - install Nix in /nix
 - create a configuration file in /etc/nix
 - set up the "default profile" by creating some Nix-related files in
   /var/root
 - back up /etc/bashrc to /etc/bashrc.backup-before-nix
 - update /etc/bashrc to include some Nix configuration
 - back up /etc/zshrc to /etc/zshrc.backup-before-nix
 - update /etc/zshrc to include some Nix configuration
 - create a Nix volume and a LaunchDaemon to mount it
 - create a LaunchDaemon (at /Library/LaunchDaemons/org.nixos.nix-daemon.plist) for nix-daemon

## Nix creates a dedicated volume

---- Preparing a Nix volume ----------------------------------------------------
    Nix traditionally stores its data in the root directory /nix, but
    macOS now (starting in 10.15 Catalina) has a read-only root directory.
    To support Nix, I will create a volume and configure macOS to mount it
    at /nix.
~~> Configuring /etc/synthetic.conf to make a mount-point at /nix

## Volume prep and shell modification

---- Preparing a Nix volume ----------------------------------------------------
    Nix traditionally stores its data in the root directory /nix, but
    macOS now (starting in 10.15 Catalina) has a read-only root directory.
    To support Nix, I will create a volume and configure macOS to mount it
    at /nix.

~~> Configuring /etc/synthetic.conf to make a mount-point at /nix
Password:

~~> Creating a Nix volume
disk3s7 was already unmounted

~~> Configuring /etc/fstab to specify volume mount options

~~> Encrypt the Nix volume
Volume Nix Store on Nix Store mounted
Encrypting with the new "Disk" crypto user on disk3s7
The new "Disk" user will be the only one who has initial access to disk3s7
The new APFS crypto user UUID will be 100D58A0-0CED-434E-A684-CDAE2ED399CF
Encryption has likely completed due to AES hardware; see "diskutil apfs list"
Volume Nix Store on disk3s7 force-unmounted

~~> Configuring LaunchDaemon to mount 'Nix Store'

~~> Setting up the build group nixbld
            Created:	Yes

~~> Setting up the build user _nixbld1
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 1
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld2
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 2
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld3
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 3
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld4
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 4
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld5
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 5
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld6
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 6
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld7
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 7
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld8
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 8
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld9
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 9
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld10
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 10
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld11
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 11
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld12
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 12
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld13
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 13
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld14
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 14
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld15
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 15
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld16
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 16
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld17
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 17
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld18
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 18
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld19
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 19
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld20
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 20
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld21
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 21
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld22
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 22
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld23
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 23
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld24
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 24
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld25
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 25
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld26
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 26
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld27
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 27
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld28
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 28
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld29
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 29
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld30
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 30
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld31
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 31
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the build user _nixbld32
           Created:	Yes
            Hidden:	Yes
    Home Directory:	/var/empty
              Note:	Nix build user 32
   Logins Disabled:	Yes
  Member of nixbld:	Yes
    PrimaryGroupID:	350

~~> Setting up the basic directory structure
chown: /nix/.Trashes: Operation not permitted
chown: /nix/.Trashes: Operation not permitted
install: mkdir /nix/var
install: mkdir /nix/var/log
install: mkdir /nix/var/log/nix
install: mkdir /nix/var/log/nix/drvs
install: mkdir /nix/var/nix
install: mkdir /nix/var/nix/db
install: mkdir /nix/var/nix/gcroots
install: mkdir /nix/var/nix/profiles
install: mkdir /nix/var/nix/temproots
install: mkdir /nix/var/nix/userpool
install: mkdir /nix/var/nix/daemon-socket
install: mkdir /nix/var/nix/gcroots/per-user
install: mkdir /nix/var/nix/profiles/per-user
install: mkdir /nix/store
install: mkdir /etc/nix

~~> Installing Nix
      Alright! We have our first nix at /nix/store/46p1z0w9ad605kky62dr53z4h24k2a5r-nix-2.25.3
      Just finished getting the nix database ready.

~~> Setting up shell profiles: /etc/bashrc /etc/profile.d/nix.sh /etc/zshrc /etc/bash.bashrc /etc/zsh/zshrc

# Nix
if [ -e '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh' ]; then
  . '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh'
fi
# End Nix


# Nix
if [ -e '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh' ]; then
  . '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh'
fi
# End Nix


# Nix
if [ -e '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh' ]; then
  . '/nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh'
fi
# End Nix


~~> Setting up shell profiles for Fish with conf.d/nix.fish inside /etc/fish /usr/local/etc/fish /opt/homebrew/etc/fish /opt/local/etc/fish

~~> Setting up the default profile
installing 'nix-2.25.3'
building '/nix/store/bdh1f44dhyx55i3fa8dvrvb09gdb8j83-user-environment.drv'...
installing 'nss-cacert-3.101'
building '/nix/store/v3zpqwdqyw0axm5pbdx6nzp3pcagb1fa-user-environment.drv'...
unpacking 1 channels...

~~> Setting up the nix-daemon LaunchDaemon
Alright! We're done!
Try it! Open a new terminal, and type:

  $ nix-shell -p nix-info --run "nix-info -m"

Thank you for using this installer. If you have any feedback or need
help, don't hesitate:

You can open an issue at
https://github.com/NixOS/nix/issues/new?labels=installer&template=installer.md

Or get in touch with the community: https://nixos.org/community

---- Reminders -----------------------------------------------------------------
[ 1 ]
Nix won't work in active shell sessions until you restart them.
