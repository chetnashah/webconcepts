
https://debian-handbook.info/browse/stable/

`apt` is the package manager in ubuntu.

`apt subcommand` is the syntax.
e.g. `apt install`

`apt search` for searching/getting info on packages.

`apt autoremove` for packages that can be safely removed
Usually when removing package, apt might keeps the config and other files of the package around. In order to remove those, use
`apt purge`.

`apt update`: apt-get update updates the list of available packages and their versions, but it does not install or upgrade any packages

`apt upgrade`: actually upgrade the packages.

`apt dist-upgrade`: upgrade the distribution e.g. `wheezy` -> `xenial`

`apt show pkgName`: get package information

On the other hand there are also 
`apt-` commands e.g. `apt-get`

Debian official sources: `/etc/apt/sources.list` - File that lists sources form which packages can be obtained.

External sources directory: `/etc/apt/sources.list.d/`, In this directory we will find files like `erlang-solutions.list` etc.

The contents of `sources.list` look like following:
```
deb http://site.example.com/debian distribution component1 component2 component3
deb-src http://site.example.com/debian distribution component1 component2 component3
```

Where are all the binaries(`.deb`) saved?
In `/var/cache/apt/archives/`.

Seeing where a package's files are installed:
`dpkg -L pkgName`.

UI tools for pkg mgmt: `Gnome manager`, `Synaptic package manager` and `aptitude (ncurses interface for apt)`.


* component types:
`main`: consists of DFSG compliant packages, which do not rely outside this area outside this to operate.

`contrib`: packages contain DFSG compliant but have dependencies not in `main`, possible in `non-free`.

`non-free`: contains software that does not comply with DFSG

* Archive types:

1. `deb`: archive repo contains binary packages(`.deb`), the pre compiled packages that we normally use.

2. `deb-src`: archive repo contains source packages. i.e. (original sources + debian control file `.dsc` + `diff.gz` containing changes needed for packaging the program)

The 'distribution' can be either the release code name / alias (jessie, stretch, buster, sid, xenial, trusty) or the release class (oldstable, stable, testing, unstable) respectively. 

`DFSG` (Debian Free software guidelines):

### Debian Repository

A Debian repository is a set of Debian binary or source packages organized in a special directory tree and with various infrastructure files - checksums, indices, signatures, descriptions translations, ... - added.

A Debian repository contains several releases. Debian `releases` are named after characters from the "Toy Story" movies (wheezy, jessie, stretch, ...). The codenames have aliases, so called `suites` (stable, oldstable, testing, unstable). A release is divided in several components.

```
# Security updates
deb http://security.debian.org/ jessie/updates main contrib non-free
deb-src http://security.debian.org/ jessie/updates main contrib non-free

## Debian mirror

# Base repository
deb http://ftp.debian.org/debian jessie main contrib non-free
deb-src http://ftp.debian.org/debian jessie main contrib non-free

# Stable updates
deb http://ftp.debian.org/debian jessie-updates main contrib non-free
deb-src http://ftp.debian.org/debian jessie-updates main contrib non-free

# Stable backports
deb http://ftp.debian.org/debian jessie-backports main contrib non-free
deb-src http://ftp.debian.org/debian jessie-backports main contrib non-free
```

We opted to name `jessie` explicitly instead of using the corresponding `stable alias (stable, stable-updates, stable-backports) because we don't want to have the underlying distribution changed outside of our control when the next stable release comes out.


### dpkg-deb

`dpkg-deb` packs, unpacks and provides information about debian archives.

In many cases `dpkg` will spot that you wanted
`dpkg-deb` and run it for you.



### Package listing and repositories

1. `Main` - The main component contains applications that are free software, can be freely redistributed and are fully supported by the Ubuntu team. This includes the most popular and most reliable open-source applications available, many of which are included by default when you install Ubuntu.

2. `restricted` - proprietary drivers are kept in the restricted component. non-open-source artifacts

3. `Universe` - The universe component is a snapshot of the free, open-source, and Linux world. It houses almost every piece of open-source software, all built from a range of public sources. Canonical does not provide a guarantee of regular security updates for software in the universe component, but will provide these where they are made available by the community.

4. `Multiverse` - The multiverse component contains software that is not free, which means the licensing requirements of this software do not meet the Ubuntu main component licence policy. The onus is on you to verify your rights to use this software and comply with the licensing terms of the copyright holder.


### Personal Package Archives (PPAs)

Personal Package Archives (PPAs) are a kind of repository. Developers create them in order to distribute their software. In order to add a PPA you need its "location", which is in the format  `ppa:[username]/[ppaname]`. You can find this information on the PPA's Launchpad page.

Packages in PPAs do not undergo the same process of validation as packages in the main repositories. PPAs are a low-security alternative to the main repositories, so the user will be installing software at their own risk.

Adding ppas to the list of repositiories to fetch packages from:
```sh
sudo add-apt-repository ppa:user/ppa-name
sudo apt-get update
```


### Font management

There are various locations in GNU/Linux in which fonts can be kept. 
These locations are defined in `/etc/fonts/fonts.conf`; 
standard ones include `/usr/share/fonts` (multiple users), `/usr/local/share/fonts`, and `~/.fonts` (single user).

Fonts reside in `usr/share/fonts` so that they can be used by all the users of the system.

Installing fonts using `fc-cache`:
```sh
## Note: if you do not have fc-cache 
## you can install it by `apt install fontconfig`
sudo fc-cache -f -v
```


The fonts that appear in the barebones terminal are also known as console-fonts.
and usually located in `/usr/share/consolefonts/`

```sh
# see table of glyphs
showconsolefont
```

Changing font of console using setfont:
```sh
# setfont temporarily change the font if passed a font name
setfont /usr/share/consolefonts/UbuntuMono-R-8x16.psf
```
**Note** - In order to use a font inside terminal it has to be a `.psf` i.e. a PC Screen font.

You might need to convert this way a regular font to be used in console `.otf -> .bdf -> .psf`



## Using ubuntu on Mac OS

Use mulltipass

https://multipass.run/install

Startin with config:
```sh
multipass launch --name ubunut --cloud-init cloud-config.yaml
```