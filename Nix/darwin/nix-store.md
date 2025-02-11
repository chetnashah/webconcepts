## What does it look like?

On a high level it has store and var

```
/nix
├── store
└── var
```
### Detailed structure has derivations in store
```
jayshah@192 ~ % tree -L 3 /nix
/nix
├── store
│   ├── 0092x786k26fb9881xgha8hxywqwrccp-python3.12-sphinxcontrib-websupport-1.2.7.drv
│   ├── 00ph865m00bzdpd6fhclm9fpfpw1n7jy-bash52-032.drv
│   ├── 01bmwaap3bs7vj4dk8qzm098mhbdmvcz-libtool-2.4.7.tar.gz.drv
│   ├── 03hvw6lkwjka6cr1zr60p2lvjzyz3n2a-kyua-check-hook.sh
│   ├── 03n86kx4ywr6v4wp7cgdxddzl6fc5bgr-cctools-binutils-darwin-1010.6.drv
│   ├── 03rbmwfz57h11spyrwr1zh05qg4156cc-readline82-009.drv
│   ├── 0548lr2wpvycbz116jzh2plpi9i7hpwn-source.drv
│   ├── 05x5i22xm06sxaf4z9z3jqbd82ikc269-source.drv
│   ├── 067559pb5jbypnyv95kl1mfvwkiv6wqw-gettext-0.22.5.drv
│   ├── 09i2viijs3qql08qw1hiq1z2g4vzn3ba-cffi-1.17.1.tar.gz.drv
│   ├── 0bxai0mpqwvb20rg8a6q4hr0rls08czb-expand-response-params.drv
│   ├── 0c55x5az3hs6g1inji2k3m2fhc6qrasr-gnu-config-2024-01-01.drv
│   ├── 0csg080d1pq16byyd87jrhbjvckwrvzd-cctools-binutils-darwin-wrapper-1010.6.drv
│   ├── 0d1mn5hky2qkj1blgc9afr1i1d8lpq0a-cctools-binutils-darwin-wrapper-1010.6.drv
│   ├── 0gd25yf21k70nkiy8z6sh2lvw2snnpck-python-runtime-deps-check-hook.sh.drv
│   ├── 0h9kpzz87x9n7v37a93q2jak75hf9vd5-bash52-023.drv
│   ├── 0hx6al7mlw9sc9k8rmlc0l00g2kbiqky-source.drv
│   ├── 0i3b8kab08lavkzkadp6m1gg45a4xib5-bootstrap-stage1-stdenv-darwin.drv
│   ├── 0ifrrn0vbvmnr89sbi1w9giwcm7ki6p6-builder.pl
│   ├── 0iwd18z90ixhnnf1n7jm77rlj9z18lfn-atf-0.21-unstable-2021-09-01.drv
│   ├── 0jg0v1cwx8fk67vb94krrq0dl9zcg4hx-cctools-binutils-darwin-wrapper-boot.drv
│   ├── 0kmnlj40mghqa2zd7c97rwzq5w7p1kqs-bash52-007.drv
│   ├── 0kxs10nccqmq4v54zxcdgqh828jgp6r1-ed-1.20.2.drv
│   ├── 0m8jnlyg33nl1wvz20l1swgm1fp3np77-copyfile-213.drv
│   ├── 0mh5czi5hnchsmxnq6jjgkrg961m582q-source.drv
│   ├── 0nhi47d5ip48wprxnava6vv973zzzndf-libcxx-19.1.5-dev
│   │   ├── include
│   │   └── nix-support
│   ├── 0q652rqzd86cnllgmkx2n7b3c7434jx8-ncurses-6.4.20221231
│   │   ├── bin
│   │   ├── lib
│   │   └── share
│   ├── 0rslvyncnpx0ybdmq691ki8qd94k5w00-llvm-binutils-19.1.5.drv
│   ├── 0v7w62jca8nw6w31zs4y2805jj670f6p-no-arch_only-8.2.patch
│   ├── 0wi8kbbrarxy1zgbskla3q28axfb2950-007-darwin-bsd-ps-abspath.diff.drv
│   ├── 0xq1c7czwpgyc06nbdapaf81wkzsz56j-openssl-3.3.2.tar.gz.drv
│   ├── 0y5flakfvnf813cwrr8rygf1jnk0gfnc-CVE-2019-13636.patch
│   ├── 0ydaiciisqcp2h0vibc689j62hphfhbi-libev-4.33.tar.gz.drv
│   ├── 0ydjk98srs2qqi6k0fdsxjnmphd8y51v-bash52-008.drv
│   ├── 0yxfdnfxbzczjxhgdpac81jnas194wfj-gnu-install-dirs.patch
│   ├── 0z80nhqf33sipwqw6vnn5c7krzpzg8h0-utils.sh
│   ├── 0zmg36dmrb9v7bc7b7igmi434nhi1qp9-setup-hook.sh
│   ├── 12lvf0c7xric9cny7slvf9cmhypl1p67-patch-shebangs.sh
│   ├── 13vjhqn28zfphp4gsbv9hzv0n94dskqh-source.drv
│   ├── 150sgbgv137mk1kfg4wc0dpafrqi2v1i-libxml2-2.13.5.drv
│   ├── 163wk414rcvhdbldlgqx9yswmy6ms9la-libbfd-plugin-api-header.drv
│   ├── 17dn73scy63hkc8jknih2wyb6j64ym8j-sdk-hook.sh.drv
│   ├── 17kbxnwjqfxicwpvp01z4353smwhszy1-update-autotools-gnu-config-scripts-hook.drv
│   ├── 18ivqm3qsxk7lac4130ycfr0rmjzwxrw-texinfo-7.1.1.tar.xz.drv
│   ├── 1a3z7f8birsv4jq7yb28x3gwzja88m4f-source.drv
│   ├── 1asg49xar21jn8hl2bss318msh5p6nms-buildcatrust-0.3.0.tar.gz.drv
│   ├── 1bdb707v8jph12q0b3rjqwn1xwjkynp2-gnugrep-3.11
│   │   ├── bin
│   │   └── share
│   ├── 1bjsxlg57c3nva14vg2yx19x81z1695p-source.drv
│   ├── 1daybfaw91ii086dyqz92qyrv3r9q0v2-bash52-018.drv
│   ├── 1hb2vcmr05jsfqkadwjdkqalm0c2rh84-gnu-config-2024-01-01.drv
│   ├── 1jvxq8j5hwnkx45lkcd4b79ll3l5v6qx-sed-4.9.tar.xz.drv
│   ├── 1k1wn8807yizgz3ghnbd4k6zsc0dzfkr-CVE-2014-9913.patch
│   ├── 1ksmnsr3m6paw8gs7jp9b623agzdrqi2-add-flags.sh
│   ├── 1m0is6prh388bryh51f2z429qxmpfv9p-python3.12-pyyaml-6.0.2.drv
│   ├── 1m3fp3vq2w7hv5y2slpd2kqni73i9a4w-tag-date.patch
│   ├── 1my0csfq3x1i37m5w98j1k1s7zlammyg-bash52-008.drv
│   ├── 1p1x8mv7b9ryncp1fg868wrby10hbmld-update-autotools-gnu-config-scripts-hook.drv
│   ├── 1p42xp01baby4x4kdwvwcfbw4dkpmpjq-macOS-SDK-11.3.drv
│   ├── 1q9ma6zh099vnagmlagknxrrymhjmi6z-patchutils-0.4.2.drv
│   ├── 1qwyzkk85ajfj3mvknmq2nhflzzjjlbh-clang-wrapper-19.1.5.drv
│   ├── 1vvxrra5lfplz1w28c8fi59lakbr5ikg-fix-mix-flags-deps-libintl.patch
│   ├── 1xzjplr6d422ywxlkmyswk68g88w85xk-greenlet-3.1.1.tar.gz.drv
│   ├── 1yv5ipcl99w6lzy5413zp67gf2nnwhps-sysctl-system_cmds-1012.drv
│   ├── 1zjvw9db3sv4cvvia7w8vp00c7mwx3a9-python3.12-pycparser-2.22.drv
│   ├── 207bwzp5xxsvf8sn7nq16lfr5b575k6y-003-fix-unexport-env-test.diff
│   ├── 20h02nyn8y3ikbcz5m3nmbhih5h8p03y-sw_vers-CFPriv.patch
│   ├── 20ljbvvvpi1wjx5bgp3r4w7hlnidyllk-xar-minimal-501.drv
│   ├── 20z55lbaz1sawriqyjzaq4kfjvg756s2-bootstrap-stage0-clang.drv
│   ├── 22kifzp4b4vqx6avszzfarni5l2jkwj4-libcxx-19.1.5.drv
│   ├── 22mr1c60cishi68519a1jc7yamnssi44-libcxx-16.0.6
│   │   └── lib
│   ├── 233vh6y0jvlw6d6wpla0885l5n57g1an-die-hook.drv
│   ├── 239qpxgwyjwjmvxa1nfwxjxiv0g930km-mailcap-2.1.54.drv
│   ├── 240gb5f684a6whl66fj773zpdf4iwxlg-0001-Conditionally-pre-condition.patch
│   ├── 24c51k193l57vpv85h74zdwnk2j78cp3-libkrb5-1.21.3
│   │   ├── bin
│   │   ├── lib
│   │   ├── sbin -> bin
│   │   └── share
│   ├── 24gfl7jnsi02ds25mx2sk0v6bppih6fp-bash52-033.drv
│   ├── 2537hrkdnz94hraab7yab9vwj59kzvap-source.drv
│   ├── 25ncpi6zashw5pp366vybs2363smri4c-source.drv
│   ├── 27kjyq96mnwafr7kshjhp4i8g1rp65s2-bash52-022.drv
│   ├── 28d9l4zfcyqqr0dkchic50n8cc8a0amr-libstemmer-2.2.0.drv
│   ├── 28fd087y877ib45f3gpdpijdmaq9fdmd-455bf3d1ccd6a52df5e38103532c1b8f49924edc.patch.drv
│   ├── 28rcfncipnvbz4fbqav434x033zrxrr7-pypa-build-hook.sh.drv
│   ├── 2bg65dx4c32y2dgb8kp9qjhpkvyxkmdp-bash52-030.drv
│   ├── 2c79sbp5vn7j1w1wyf32lmaqcjf9bkx4-nuke-references.drv
│   ├── 2ckcgcjwnzaqbdkdlphq3argsapv2swx-subr_prf.c.drv
│   ├── 2ckkg2j721cz0w55rpr045xmgw1rfl1f-libunistring-1.3.tar.gz.drv
│   ├── 2cq4hsc1v8ylccspw8351r72s56w1fia-CVE-2015-7697.diff
│   ├── 2cwwsdwjjjwgq6slaa3sd0xvz6z20qcm-bash52-007.drv
│   ├── 2dggr1d454jbs5mzdaqd5ac5cmcqkdrq-python3.12-execnet-2.1.1.drv
│   ├── 2gcllnmq329byln64bfzw47kzi1bdvv5-fix-build-with-only-C-locale-5.40.0.patch
│   ├── 2h177nv6q4vffi87yafpl86w9qn096wj-ld64-deps-private-headers.drv
│   ├── 2j0fmwgm5ybgnc8jprc4ypcxw6s4r2nv-Allow_input_files_to_be_missing_for_ed-style_patches.patch
│   ├── 2jv8clgvd5h7bhllv5vfwlgzqj66xyd3-gnum4-1.4.19.drv
│   ├── 2jxzs4cvybzr9zz92p1j7837zcqk2vls-gnugrep-3.11.drv
│   ├── 2k3c2x1lgj9z2qvjf1d0104ayfxavn0y-bash52-004.drv
│   ├── 2k4blll74aylbc3cgym7x0bc8hxaindr-die-hook.drv
│   ├── 2km9ll1sasi9khp5g75n93vr8gb7bail-fix-darwin-dylib-names-hook.drv
│   ├── 2mjd3yinfs21zdsigwj06vbi4a394n99-bison-3.8.2.tar.gz.drv
│   ├── 2n15c25mxm9l66jvsyylin9qay67ppn9-libSystem-B.drv
│   ├── 2nk1xy25mkx540r8lk9b0dh5br1wg1y7-bash52-006.drv
│   ├── 2qibcka57kzc0hpwy7jgmld857s1syg0-apple-lib-libDER
│   │   └── include
│   ├── 2qjlmgs596j29p56l049akf89hkp85x7-readline-8.2p13
│   │   ├── bin
│   │   └── lib
│   ├── 2r0dx14jf1ddxbk1gryd12d5vanim2hn-python-remove-tests-dir-hook.drv
│   ├── 2rk1flsqkdwhg369s9d58fq9jm8w14ah-file-5.46.drv
│   ├── 2sab4kpswgzsqsw7w0wwrrd12ljj96cp-gzip-1.13.tar.xz.drv
│   ├── 2y71rl5mnazwnpwpcq07xx97jl7sy5lh-apple-sdk-11.3
│   │   ├── Library
│   │   ├── Platforms
│   │   ├── Toolchains
│   │   ├── nix-support
│   │   └── usr
│   ├── 30i9m0c45vab0ik6dnpwvwpzskmwbwvv-gnu-config-2024-01-01.drv
│   ├── 30qhz45nwgfyns13ijq0nwrsjp8m7ypa-relaxedsandbox.nix
│   ├── 314vsy165dl6h9spg1j95cx8abs2r7b5-0005-Support-LTO-in-nixpkgs.patch
│   ├── 31554zl0d34cgi81dkczdkpx453l6lkd-diffutils-3.10.tar.xz.drv
│   ├── 33229n8rqg2iy8w0pnvr8h9a31pljs33-readline82-012.drv
│   ├── 339w0jdaqpn1gksqkn9cbawvq6058wjm-diffutils-3.10
│   │   ├── bin
│   │   └── share
│   ├── 33j3cjsqzjdx3hmlwlacsssn9326ysal-bash52-035.drv
│   ├── 34qn4by9lqrri323ahm5vizv6bgsbhfn-006-darwin-always-set-runtime-c-flag.diff
│   ├── 367bpsvy7w29xfmz6x6034v8vq7iyrbh-libssh2-1.11.0
│   │   └── lib
│   ├── 36r4vb4vd5d3g41hzikn2q4hxwggsdd3-bash52-019.drv
│   ├── 379kfgsv9b801xpjnq24q8ai1a293dr5-python3.12-idna-3.10.drv
│   ├── 38gfgxdrm2vm0f72n2v9zpa2ivf1y3sh-aws-c-common-0.9.17
│   │   ├── include
│   │   ├── lib
│   │   └── nix-support
│   ├── 38gi04nh4ggisr515n0iy57lp2yqhvfp-source.drv
│   ├── 38vvrki98468s0ii6449b30lcgn00cp1-html5lib-1.1.tar.gz.drv
│   ├── 39ipvg8shb5qgxkrd6w9x4vbfqqz24pp-0006-Fix-more-non-Darwin-stuff.patch
│   ├── 39k9w37ahpcmhzr1kad7k69g999srar3-source.drv
│   ├── 39qw3viiz7kni1kz66b20sc3hvrzad04-nix-info
│   │   └── bin
│   ├── 3airpa9yhaz2a1y1fxr91wwh8zsy9ylv-coreutils-9.5.drv
│   ├── 3am3qlmwm52szcbwf2w02d7r5y7n59s1-cups-2.4.11-source.tar.gz.drv
│   ├── 3arv9ycnwpj3qcb05spjhyff417d3mxj-0001-Support-static-module-loading.patch
│   ├── 3ban2px707jr1mlly0a4clq9s10rywgz-clang-at-least-16-LLVMgold-path.patch.drv
│   ├── 3bsyiahg8p3xkj8m6g0g0s6vb2ckdxyp-bash52-026.drv
│   ├── 3cjr4l8flx4qw0mmpi780i7wf4dkpfif-pcre2-10.44.drv
│   ├── 3ddxhqrlvnzpsvkaa60fls5yhi6mps5x-PySocks-1.7.1.tar.gz.drv
│   ├── 3dnw7ads4hgq32k8bgl514q23mf3cczs-xcode-project-check-hook.drv
│   ├── 3dq8aws4whfq72xhhbgx06n18vgr1rny-pypa-install-hook.sh
│   ├── 3f2pkabc914gy4sgqidvskqr2kncz8b4-python3.12-buildcatrust-0.3.0.drv
│   ├── 3fqlfqqb53qif2b17005n2qvkjq5d8v8-python-runtime-deps-check-hook.py
│   ├── 3hds42r22i98l7xwqsnismv1a7p6d8p9-0001-tests-Rename-a-a-o-_-.py-_-.py.patch
│   ├── 3hkz7myvwgf9mkm0llxwz9vlf8a63wr8-readline82-008.drv
│   ├── 3hp748iap8y61bp1acfa1i1fpa84pagl-execnet-2.1.1.tar.gz.drv
│   ├── 3j1rabl84rja7ww9il8jr55ynvhx2293-expat-2.6.4.drv
│   ├── 3jmrmfci8g0mwq9336q96zcl7xz3iif8-bzip2-1.0.6.2-autoconfiscated.patch.drv
│   ├── 3m9sk6sqyqch1q5km9ff8lxxxr4ayg7g-bootstrap-stage3-stdenv-darwin.drv
│   ├── 3mbf908mbrv2qwj9d60q4l862f2pvng5-gnugrep-3.11.drv
│   ├── 3mh6c4q81qkirl2xil3ah9j7v018yzks-cpio-2.15.tar.bz2.drv
│   ├── 3p6c6r0cqrmdf4ldy605pivg2bnc69hs-python3.12-zope.interface-6.4.post2.drv
│   ├── 3pd0lxmgkbcmbinzvvzb9340ca9ssgqh-remove-unused-and-incomplete-blob-clone.diff
│   ├── 3q9vpdf0bqlbqr3s867nisz8phx4c9kb-tzdata-setup-hook.sh
│   ├── 3qa7w8c0snkk9xj0yl0yll9fq1pm11qq-bash52-034.drv
│   ├── 3ris9s0ggsdgzqwblqlwdr7yjnnniyhw-readline82-003.drv
│   ├── 3rvyhc0jk6g78wvdkyp0mwbz8c03vzfk-bootstrap-stage-xclang-stdenv-darwin.drv
│   ├── 3v07xcbdg0v49c3f712shvvn62kadhnw-boehm-gc-8.2.6
│   │   ├── lib
│   │   └── share
│   ├── 3v9801rf9r9zkr08w29mllr9xp76c7dx-bash52-035.drv
│   ├── 3x4d19jbkxxiq7z3m42aihslqdwg76f7-nixpkgs-unstable
│   ├── 3xabwg8bbirvwi7rfh1nkw40dg63i3pd-cups-headers-2.4.11.drv
│   ├── 3yx89v6sqx9fvn05y6w0njiglv13xj6h-pkgconf-2.3.0.tar.xz.drv
│   ├── 3zphkh9zd2035cxqy8s5cic123zrlhy5-diagnostics-sandbox.drv
│   ├── 41giid4r8mvsmbhm641y8y0qcra3jjhf-libsbuf-14.1.0.drv
│   ├── 424dxshwasznj79850jcpjxpk96jqx1h-unzip-6.0.drv
│   ├── 42pzdm5r1px15z4g1xyz878cz0ymy8fp-libSystem-B
│   │   ├── include
│   │   └── lib
│   ├── 443shclzvhymrl7rz42pcyv0hzw9n536-python3.12-bootstrap-pyproject-hooks-1.2.0.drv
│   ├── 445bkvdzky8ny2qqkwxywfzmszkyw30n-bc-1.07.1.drv
│   ├── 46p1z0w9ad605kky62dr53z4h24k2a5r-nix-2.25.3
│   │   ├── Library
│   │   ├── bin
│   │   ├── etc
│   │   ├── lib
│   │   ├── libexec
│   │   └── share
│   ├── 47v2ml0ydz41dw37qg3245jpvqymkbn1-aws-c-s3-0.5.7
│   │   ├── include
│   │   └── lib
│   ├── 4azrymvdymasch647fylm6vb6i5nshkf-bash52-012.drv
│   ├── 4b6kzfhfsx31hgjrw71ibxsv79r680xp-apple-llvm-src.drv
│   ├── 4cmjzk8yr6i5vls5d2050p653zzdvmvp-setup-hook.sh
│   ├── 4d5p646fn8z97qqgb9fznlrd5ppa37cw-utils.sh.drv
│   ├── 4dq81yma6drk9701h17h64zx47r7p5n8-utils.sh
│   ├── 4hnbnzk9v6jh3yv0jalbp7bklxccshnl-autoconf-2.72.drv
│   ├── 4jp32yca0mrzvqznjfq9hzwi5gc6bz9l-meson.build
│   ├── 4l5cldwlkrhpxmcxj0sfxv4znwcpia77-texinfo-7.1.1.drv
│   ├── 4lgikgnw9hc6dqgh6ib8ivhv2yhv7fwb-mpdecimal-4.0.0.drv
│   ├── 4m6hk17r9pvh1w5lfgz3qjl27bf9z69z-coreutils-9.5.tar.xz.drv
│   ├── 4mipvb2wg91qvr5m0j0kj1m83ba9x9s9-bash-5.2.tar.gz.drv
│   ├── 4msz5b0dhj33bm0cj6c9cqmb8w7r1idk-Revert-Fix-grepdiff-test.patch
│   ├── 4n40pw22893f2nrwk7fld1xyjikv156g-ncurses-6.4.tar.gz.drv
│   ├── 4na97f88z3vs1ryj2wjvfwnyxc3rs4y2-xz-5.6.3.drv
│   ├── 4nz1sp33m7hrwiy3wqswfmklxm6pbavc-system_cmds-deps-private-headers.drv
│   ├── 4qh1l55wx654v0ls51dg1wdi5xy93w9b-purity.patch
│   ├── 4r8s8hcwyvvvnpcncps09zscqkh5qapx-no-install-statedir.patch
│   ├── 4s7gw2d4gd5mb0dlfvr0w2bagl6ayxvf-source.drv
│   ├── 4vq3350zc6sqnibkqpgic2d6cvi1r9hq-substitute-all.sh
│   ├── 4wdw5mx3w87j5qglw0v5a18j4psz9kbv-source.drv
│   ├── 4wm2p7l8dv9k937lpryi6nq4n394nkyw-bmake-20240921.drv
│   ├── 4xiq4fa8v1yayl42sn737d9xyn7663gn-cacert-blocklist.txt.drv
│   ├── 4ymf7v85bn6qkm2p8q0n7wf16nj8wl25-libSystem-B.drv
│   ├── 513h22anbgz3xbjky6zvcxx8yjy9i9kz-python3.12-zope.event-4.6.drv
│   ├── 514mk5hry5vlxjxxl6lvlqkxfdzc6s5c-python3.12-markdown-it-py-3.0.0.drv
│   ├── 51h9zjkg3qslghif8p6q4rhb4lxxm5rr-libtapi-1500.0.12.3
│   │   └── lib
│   ├── 51im55n2j8k47ak0daxwccj40ib3hmkf-bootstrap-stage3-clang-wrapper-19.1.5.drv
│   ├── 52dgwlwliyvri6a0kk0ywq6aczyhgfcb-packaging-24.2.tar.gz.drv
│   ├── 52ws319lya9mz7v3ilg1h3a2paljac4y-meson.build.in
│   ├── 52z5zlzx9vmsc5v5w9qj6ia2ccrjb25k-libxml2-2.13.5.tar.xz.drv
│   ├── 531qxjibl9i5zhv2l80wj9x76qxmzxkw-pyproject_hooks-1.2.0.tar.gz.drv
│   ├── 53mm4z37xa4wssfz0ck1wzd1dkw0sz72-copyfile-deps-private-headers.drv
│   ├── 54zsya23q1l0yf1k7fw2p54cvcc4lpwh-diagnostics-sandbox
│   ├── 56d0w71pjj9bdr363ym3wj1zkwyqq97j-fix-pop-var-context-error.patch
│   ├── 56i3jsqyms6m14282c494by8f7lzbxgg-bash52-030.drv
│   ├── 59kpxafq7nqfg32ygybzg65a2q2m3dlp-libffi-3.4.6
│   │   └── lib
│   ├── 5bfabln2rcm8xq2dk7q6j7wnjbbc96ph-getopt-1.1.6.drv
│   ├── 5bgs6sz5wzli6kk6bpb15ykchms7liir-texinfo-7.1.1.drv
│   ├── 5caxnkac2s9qnwh4l0y3l4kx106gm6k8-readline82-008.drv
│   ├── 5d2pql8r2zkggpn7yl7wi0adaydp6389-aws-c-mqtt-0.10.4
│   │   ├── include
│   │   └── lib
│   ├── 5fkk2mdwvfx53jj7wm72yby6377wbh7g-readline82-010.drv
│   ├── 5hdg89rxmy3clxq6h80b900p7rz547j7-setup-hook.sh
│   ├── 5jip1ghls2gv0j6k8rzhqifvsayfj2ma-nghttp2-1.64.0.tar.bz2.drv
│   ├── 5lg0k1bwlj5lh0y70z8pqnp68bsnwimz-apple-sdk-11.3.drv
│   ├── 5mpi2pkpgkalk7iiyqavm3k2lrdvjcyi-cups-headers-2.4.11.drv
│   ├── 5nys2ys1aw4506f2xn5f0w04a0fqpqkf-bootstrap-stage4-stdenv-darwin.drv
│   ├── 5q9nxylsd7y2m0dzaysb60f3kq6fdv7d-0003-Match-designator-order-with-declaration-order.patch
│   ├── 5s3b3s1kc2i2y9j8zcm03nphg7lmcxrg-zlib-1.3.1
│   │   ├── lib
│   │   └── share
│   ├── 5s4pl24mp4ar3jir3pdqpv4891d6gfck-python3.12-editables-0.5.drv
│   ├── 5s8gdxaqr3xv130ymr7w5pakzplnmxca-sdk-hook.sh.drv
│   ├── 5siyszh3574cf5xwzdbs6d4a4a29r270-update-autotools-gnu-config-scripts-hook.drv
│   ├── 5wjj1f3pa1ndi3kvskm1fcs9kdy2xajf-bash-5.2p37
│   │   ├── bin
│   │   └── lib
│   ├── 5wkj7cvkzlz1q74x75c75wagb67z0x5q-ncurses-6.4.20221231-dev
│   │   ├── bin
│   │   ├── include
│   │   ├── lib
│   │   └── nix-support
│   ├── 5wqx62zhc8gyyj60q9nycjiqbvgdkpi3-apple-framework-CoreFoundation-11.0.0
│   │   ├── Library
│   │   ├── lib
│   │   └── nix-support
│   ├── 5x14g258x3bd92sjnn1hkgf4m6048kbl-file-5.46
│   │   ├── bin
│   │   ├── lib
│   │   └── share
│   ├── 5y9npfmzh5p28jlbgjsabkh3mn97vlsc-004-gir-fallback-path.patch
│   ├── 5yzw0vhkyszf2d179m0qfkgxmp5wjjx4-move-docs.sh
│   ├── 600zynn9l83dign2qdnas467dwcxqqcw-libresolv-83-dev
│   │   ├── include
│   │   └── nix-support
│   ├── 62bmqlmriy9xjlzzrzz43jzs7zws419y-python3.12-toml-0.10.2.drv
│   ├── 65fbsb29m94jwybrwrwcm0acsv9wxh5q-llvm-19.1.5
│   │   ├── bin
│   │   └── share
│   ├── 6602zq9jmd3r4772ajw866nkzn6gk1j0-sandbox.nix
│   ├── 663hjgynpn6ii82bjljl1kcqmsb1a5l2-ensure-newer-sources-hook.sh.drv
│   ├── 66wps9vy4qhccksrlhnsgajrhnhyhm7w-cctools-1010.6
│   │   └── bin
│   ├── 67531hvjc7dp7ndlvs9ya5hxydcdixbv-fix-use-after-free.patch.drv
│   ├── 683jpk21h0l5cvb9xxd2qjbw5rlrhwv2-binutils-2.43.1.tar.bz2.drv
│   ├── 69lid8xyqwl0fx6f4czvdbqwjl85bm6a-gettext-0.22.5
│   │   ├── bin
│   │   ├── include
│   │   ├── lib
│   │   ├── nix-support
│   │   └── share
│   ├── 6a2psk3qs60l7kbzmjjaypijkvl8grby-make-binary-wrapper-hook.drv
│   ├── 6ag32dimxbc019zm5nx09v40wl1w0ysv-bootstrap-tools.drv
│   ├── 6b9v7v02npab086yaba2j4yfqrph5mgp-utils.bash
│   ├── 6ch0xl0a37wc5czypmc07vw7zikjgdbb-gzip-1.13.drv
│   ├── 6cm9yls25qxhsj0g44lggjdavs590yqd-readline82-007.drv
│   ├── 6dh6lw0j8gk3hz6ypip2gq699cdl6pj6-pypa-build-hook.sh.drv
│   ├── 6grafqn0641yp7rzg5r2phn8qknbzjn1-gettext-0.22.5.drv
│   ├── 6inzcvqj75cdmg64sm6rhr50vr4k1krm-0001-Add-function-definitions-needed-to-build-zlog-in-sys.patch
│   ├── 6ky5ypr7bx3cql4n0v65f4sd9k5jmw29-which-2.21.drv
│   ├── 6ljwni424xqfi53bqpcnnwl50n9b7v7p-sphinxcontrib_htmlhelp-2.1.0.tar.gz.drv
│   ├── 6mrpgiwrw7y54igixs64ik8c5lhxp127-python3-3.12.8-env.drv
│   ├── 6np2acjv1nxcg0xzsv9a76wyrpxznkna-CVE-2014-8141.diff
│   ├── 6pjdl18a9cmg2k55ql4g513xw7y9zvip-remove-references-to.sh
│   ├── 6qdks86zkflaap1wnahf8cxfpfnqz11y-bash52-011.drv
│   ├── 6wajvaiid5h7c9yxgcligs8bl9v5h9mv-meson.build.in
│   ├── 6whhgq02434ymp9zjf4zlvljvg240nmj-libffi-3.4.6.tar.gz.drv
│   ├── 6wvgnbv1brnl8qkv3hz6am8zfiv5yr3y-diffutils-3.10.drv
│   ├── 6xizqkp4bnhydwc7ihyqi93171gbj5n4-darwin-sdk-setup.bash
│   ├── 6xnznri235gkvngf5pxqsvp09h0p4wrx-texinfo-7.1.1.drv
│   ├── 6y2jlgjpnyccy1qgv454sw68fzz2n7bq-apple-sdk-11.3.drv
│   ├── 6ywhksm7gljpgkrhnl9h0wfhgq8gf4ci-atf-0.21-unstable-2021-09-01.drv
│   ├── 6zqn6w9rwkgfa6z1hpagnh5xhz2dag6m-CVE-2015-7696.diff
│   ├── 6zqxg0mvmwq7kxrzrqbdmwwxi1wqmbj3-bash52-037.drv
│   ├── 6zrqxay25ninx90fsz40b83gmwkqpsc7-ca-load-regression.patch
│   ├── 705g035ind4dzrnxwjaw5gp6wy32bkar-implicit-declarations-fix.patch
│   ├── 71im1hmkl666rvcky5alj0871irp4d8v-python3.12-pystemmer-2.2.0.1.drv
│   ├── 71vi2f2zqx45wjrfj9q23fi32a72zk0f-005-boost-Do-not-add-system-paths-on-nix.patch
│   ├── 73c5cpfhkgm2n9j1ifygna86wdpbhv4x-user-environment
│   │   ├── Library -> /nix/store/46p1z0w9ad605kky62dr53z4h24k2a5r-nix-2.25.3/Library
│   │   ├── bin -> /nix/store/46p1z0w9ad605kky62dr53z4h24k2a5r-nix-2.25.3/bin
│   │   ├── etc
│   │   ├── lib -> /nix/store/46p1z0w9ad605kky62dr53z4h24k2a5r-nix-2.25.3/lib
│   │   ├── libexec -> /nix/store/46p1z0w9ad605kky62dr53z4h24k2a5r-nix-2.25.3/libexec
│   │   ├── manifest.nix -> /nix/store/bzab2jhhiv81zfjdqnic0hzzrb4aip45-env-manifest.nix
│   │   └── share -> /nix/store/46p1z0w9ad605kky62dr53z4h24k2a5r-nix-2.25.3/share
│   ├── 73cnmp55lw80s0aji82a2afyyd9sypgz-python3-3.12.8.drv
│   ├── 73qy0kda2d5qmnczfh7qqyq1acp62vbq-0008-Fix-configure.ac-not-finding-AR-with-target-prefix.patch
│   ├── 74ki55lc1c918mq9g9110911ds288f8a-python3.12-typing-extensions-4.12.2.drv
│   ├── 754kpc35lzp5wrybh6sfaag0iawpb0cw-builder.pl.drv
│   ├── 764qng362gd6kx69qqs6iaqllpfn78r2-make-shell-wrapper-hook.drv
│   ├── 768lc2aclr2bhf1f6xshixln192s8vd9-source.drv
│   ├── 76r5n8z21f3ai7d56m30mji20vq60iaf-cross-bc.patch
│   ├── 76vvi4a261ni7z03blq8r7cd4j26m7q6-gnutar-1.35
│   │   ├── bin
│   │   └── share
│   ├── 76vx3znassfa3nk7dn447v36klkda3qi-stdenv-darwin
│   │   ├── nix-support
│   │   └── setup
│   ├── 786k1qn3gzbxqklqrclqmnxcb0i3cv6a-python3.12-bootstrap-packaging-24.2.drv
│   ├── 78kj0223j81bvdwlz7j6ymqvdy29s8r4-bash52-009.drv
│   ├── 791b1bgkbynwr9ax4p29xd6kfpqj0jzx-bash52-027.drv
│   ├── 79m0jh37ajirz4r1xy8h13g6y8d4nm7d-meson.build.in
│   ├── 7b7snxryzvxvpv10gm8k7w66sqg6a84k-cmake-minimal-3.30.5.drv
│   ├── 7bfsgmsnrib01i12p5si2nqr4zi0c90j-007-freebsd-pkgconfig-path.patch
│   ├── 7f26mgj9vx5izbkbfirkd4m0dyxlrkvv-platform-triplet-detection.patch
│   ├── 7ga1bszcc2raf0lbq1waxlcqd14ls2cc-bootstrap-stage3-stdenv-darwin.drv
│   ├── 7gybqhi6cdpfv8p5a0b4hrjcxzbvz6i6-kyua-0.13-unstable-2024-01-22.drv
│   ├── 7k52hs6x27gf7al3505mw0yxb6hkbl86-libgit2-20240516095848-lib
│   │   └── lib
│   ├── 7kf2w0ix4kz6lsqqp94ss55a3g6cdai7-post-link-sign-hook.drv
│   ├── 7lbvaac1dm3mkqfmkk253wj671v1q858-nix-info.drv
│   ├── 7lfyc4j89cxdz2s0svbvi5h8qa00b089-python3.12-build-1.2.2.post1.drv
│   ├── 7m3f297gsj9gh2qhgjnyrd65hcg90cvm-source.drv
│   ├── 7nx3lixg6ypml1xrylb4cbra3fdr4hbz-readline82-004.drv
│   ├── 7r8zlypri1qmxmq6awi3d5v38rc29v3c-DarwinTools-1.tar.gz.drv
│   ├── 7s1shq74n8mzv0qmf274x3z536qhflvz-system_cmds-1012.drv
│   ├── 7s8qm3lxzmapiwlrakndkfjn124xnj4p-source.drv
│   ├── 7shwhhav05paj8wc1x5yp2grmqlsdmr1-help2man-1.49.3.tar.xz.drv
│   ├── 7szl4y85k1l3pr67cl9zlm94am0i1bdp-llvm-19.1.5.drv
│   ├── 7vw9sbi8swyzw3rnnw1b6kkjw9jwc0r7-bash52-014.drv
│   ├── 7x05hjwpxlacch40c0c2l7d1b3dngk5b-readline82-007.drv
│   ├── 7yjka9xvfmk5s2cn1alkqlmkbqifcgv6-002-application-services.diff
│   ├── 7ylzczrx0ld6m9dvjrw7bhb3vg2c3anv-importlib_metadata-8.5.0.tar.gz.drv
│   ├── 80w4xnr3869dpwzl8hvkfa8kz7b5znmj-bash52-036.drv
│   ├── 819fzxfwzp7zhhi4wy5nkapimkb1bsx5-die.sh
│   ├── 81gwh57vnrm6qpw3gxmdmrjsp26dxi7p-find-xml-catalogs.sh
│   ├── 81iq6njw7b8kawgkfjhl0rmpk6q0jd31-pkg-config-0.29.2.drv
│   ├── 82g2g1ksv4hirl556q9lfb92vf8v5ks6-user-environment
│   │   ├── manifest.nix -> /nix/store/nw3c02cq84mgx1jj7cd7kgirfspk1y8l-env-manifest.nix
│   │   └── nixpkgs -> /nix/store/cwy7b8lcbfskclw84mk7lc88fc7259nm-nixpkgs/nixpkgs
│   ├── 82wlqrxqlz9n6njmr1aizy6lx4drcygk-bash52-021.drv
│   ├── 84jpq33k9rpp89ljhbwm7bgsfz817dr2-macOS-SDK-11.3.drv
│   ├── 85rvqgp8667ykghxxibsllqayb88ckhj-lua-5.2.4.tar.gz.drv
│   ├── 86bxcwddj7hrhsw3sqks1pdsbsxwrwb5-pytest-hook.drv
│   ├── 86fcmrzy8jyd8q59qrsnrhwx9kinj4nc-file-5.46.drv
│   ├── 86vs8mxfpzzw6vjrqv1ml9734qz83g8h-libcxx-19.1.5
│   │   ├── lib
│   │   └── share
│   ├── 86w42ydwcwpd2d4xvq0643k5ary0l9b2-setup-hook.sh
│   ├── 87927ap7wx6q23vy6fa367mb3jyai6qc-compiler-rt-libc-19.1.5-dev
│   │   ├── include
│   │   └── nix-support
│   ├── 87nbhqhiv9gh2lzjdzcbzby6zlrpfk4y-make-4.4.1.tar.gz.drv
│   ├── 88s5l4w54p5k68bs7pk0rq9j1x4i8iz2-SystemConfiguration-11.0.drv
│   ├── 88vinxr2bjd4gbyhhhp5wgvrmsg1m6yf-python3.12-sphinx-7.4.7.drv
│   ├── 89rbgpnza9q28d4ydgpyqv4ba90c8wjc-libxml2-2.12.7
│   │   └── lib
│   ├── 8ahh99a3skvwj71k16h002cjjcnlc9s8-bootstrap-stage2-stdenv-darwin.drv
│   ├── 8b2gvg216hgqzpplcjvzavkg7v9yd156-tzdata2024b.tar.gz.drv
│   ├── 8bmy49hx09bw9d379a25zq0z7i2pdpb5-libtool-2.4.7.drv
│   ├── 8djp1rizc1dblv8svnb0mpa0c3lwvc17-drop-comments.patch
│   ├── 8f9vk4m9vv56k2z6ydcwfgw4knajgva8-ed-1.20.2.drv
│   ├── 8g3fxfd8h0xz72jf7hxkf157hq524k61-bash-interactive-5.2p37
│   │   ├── bin
│   │   ├── lib
│   │   └── share
│   ├── 8gjyh2h27b439iciqqv13837xxrisrsw-libffi-3.4.6.drv
│   ├── 8glvgjqwxnckdk8yrsd2wfvbl2jrsmbw-python3.12-greenlet-3.1.1.drv
│   ├── 8ihsllps5qvkzxadbzmli3811qf1mf1d-source.drv
│   ├── 8j6q60h7a2qfjkrafr8rfj7nqd1nza9g-openbsm-1.1.drv
│   ├── 8jsqhgjslynay1prjiv86wa2l5ylkg2g-imagesize-1.4.1.tar.gz.drv
│   ├── 8k5fc9afdpa44xdkma0g7sb4a3r2vq65-bash52-024.drv
│   ├── 8kjsvwax7f8hphck86qj8hi2ml4p68f6-bash-5.2p37.drv
│   ├── 8lbkry18z2iil1y2fh0px7wxhc3bggl7-signing-utils.drv
│   ├── 8mnz62y7kpabxl8r9g9njd7hflv3wra7-bash52-010.drv
│   ├── 8ms7abrwg2nbqdjdcdf1aig4y7yha4v7-openssl-3.3.2
│   │   ├── etc
│   │   └── lib
│   ├── 8mvcwn96881p7v9zgjgl6n37128ppfig-armv6-no-ldrexd-strexd.patch
│   ├── 8nl4nw5cdzmzj5pfa484z9j1pyz7bgan-bash52-028.drv
│   ├── 8nqkv91z9v3q2mfa8bp77wkwyqhcmkg1-source.drv
│   ├── 8p3z4jsrxr5ck92iasc9bc7bmapb5mmg-CVE-2018-6951.patch
│   ├── 8pjqhghdr3ldvnd0d1msjm4j34lhll64-lzip-1.24.1.drv
│   ├── 8pkq80pfdx5sfdrb3885mgci0bb3q2hj-bootstrap-stage-xclang-stdenv-darwin.drv
│   ├── 8pr453wi336phmhkhc4wz71yvx3s8z4z-python3.12-pysocks-1.7.1.drv
│   ├── 8pwy5fbypnk4z6ksl4l37z2b8n77f1d9-python3.12-pytest-8.3.3.drv
│   ├── 8sfk6bmgq5433x3408zikfk8w71ylm2g-0006-Support-target-prefixes-in-ranlib-detection.patch
│   ├── 8sgb5p8zfx1znibc4yjrh7mn45xyqf2x-python3.12-snowballstemmer-2.2.0.drv
│   ├── 8v3za2mqyvhzl9k1ndfy40hbi025pyz1-source.drv
│   ├── 8xbdfb1pf9mwnnld1gcf8ghyv45lkqza-automake-1.16.5.drv
│   ├── 8ya0makx15r1548hxg48nx4yrn899jm4-python3.12-filelock-3.16.1.drv
│   ├── 8yrqvlsii837j73ali9pcziv6h4aclgz-stdin.patch
│   ├── 8zc2l044znlqqigjcp8w5q1wbx93df6q-openpam-20230627.tar.gz.drv
│   ├── 90gm4fhg7c7pmm16im1295vxsgm2rrc4-meson.options
│   ├── 9227in10sd4ksh51dzm94qzy0k3v07l2-source.drv
│   ├── 94w7asrxzrjqn9yh8s8p1k381hwiqjbb-python3.12-packaging-24.2.drv
│   ├── 95hbghcws7h8k405msd9khax27nhji67-DarwinTools-1.drv
│   ├── 95w2wn27wnmsg6jlqr2dbc7dw7hyicmr-clang-19.1.5.drv
│   ├── 96cbfymn788ssbhmay4sy7h268qg81fl-gnu-install-dirs.patch
│   ├── 96rvfw5vlv1hwwm9sdxhdkkpjyym6p2x-update-autotools-gnu-config-scripts.sh
│   ├── 97d26l91h0db8h0qkmhxwi5d8shrilv6-CVE-2016-9844.patch
│   ├── 97qhq63grgz17pn2nksjlak1sxb45c28-mpdecimal-4.0.0.tar.gz.drv
│   ├── 98s0lf97zhbnpb9if7pnb19f032cd1la-bootstrap-stage2-clang-wrapper-19.1.5.drv
│   ├── 99m4sdf3z6la9j076v3cmf7njlh2pfjz-update-autotools-gnu-config-scripts-hook.drv
│   ├── 9abxga8s6ypli1gi9ldbcprmfp0yqsi1-libyaml-0.2.5.drv
│   ├── 9bi1c25p9v60x488jzd8ldawaz31hqrr-libiconv-1.17.tar.gz.drv
│   ├── 9bmnqqfh5k34j0fwr33d6d9c26z45xzn-libtapi-1500.0.12.3.drv
│   ├── 9brgrdgnqml6n680pqsdqsswg2nxf72i-subr_sbuf.c.drv
│   ├── 9c4rfa3cqxy3c8yspbglxqdpyp65sbkz-bison-3.8.2.drv
│   ├── 9ckkiyf1q5shd87k2v73j8lpmc5krsxz-python-remove-tests-dir-hook.sh
│   ├── 9dlv525maw19a1ip88sm5vzqcsh41rra-0007-Add-OpenSSL-based-CoreCrypto-digest-functions.patch
│   ├── 9faaipqp356w01xphshdv249v48l4hyh-python3.12-trove-classifiers-2024.9.12.drv
│   ├── 9gzqlxk1z38hzfqrn1n4qwhyk1hm6gsa-libpng-apng-1.6.43.drv
│   ├── 9h0nl9zxc373ccn2amfps2w32kb03v2i-setup-hook.sh
│   ├── 9i3qychygx47jblr6g1cqdh5ys4bhbis-ed-1.20.2.tar.lz.drv
│   ├── 9ibwnnclakhmp2z2zdk3gf7nm57zv7si-readline82-006.drv
│   ├── 9jywi22qd1c4nv6z6da1waqh3f0cizl7-autoconf-2.72.drv
│   ├── 9knnyzkx14a3cwmppbhb5f8ik35jgrzf-clang-19.1.5.drv
│   ├── 9l5kk7sqgy0abp7rpcwygygi8fpf93qv-locale-118.drv
│   ├── 9ld4ig71ff8rx9lfrx6jlbjivfklv95x-python3.12-six-1.17.0.drv
│   ├── 9m54l1bi5814x9cqznwlga7yfs5ipi6h-nuke-refs.sh
│   ├── 9nigfrwvrympalc4zhns5pif408zvnhd-babel-2.16.0.tar.gz.drv
│   ├── 9p64b5qc82s68wci74wfw826393b3hv5-CVE-2019-13232-3.patch.drv
│   ├── 9p8xzyx9q5wsnwqqzcnls0p3xi2a6zyc-CrashReporterClientSPI.h.drv
│   ├── 9pk3nq1g8xxw1adnwvg09q50b31rzjb2-source.drv
│   ├── 9py87r9927k5d5kgaq57hw1fxym87d9d-setuptools-build-hook.sh
│   ├── 9qchy9s7fh0ls30y0f4y8ki3iz2qa7xh-python3.12-docutils-0.21.2.drv
│   ├── 9rbhrgjx88m9vixm9yxk88jj04ln9fin-bash52-037.drv
│   ├── 9rq2ab2wl3ia1ism6zjvdxcnpv9s9rgn-add-hardening.sh
│   ├── 9s91a8qqqy70w1b1k67wnnp9qms97vvh-python3.12-certifi-2024.08.30.drv
│   ├── 9w1scnw1zsdji5xs8ikxq2lczv8fjncn-xz-5.6.3-bin
│   │   └── bin
│   ├── 9x1bbfhmnsycfq8p5y790jylnjiv0yif-nss-cacert-3.101
│   │   ├── etc
│   │   └── nix-support
│   ├── 9yf6ks0n4qh96lk1il592mfgap40dv35-lld-src-19.1.5.drv
│   ├── 9ys45f5j7anwq5db058vkph3a185d4sc-cctools-binutils-darwin-1010.6.drv
│   ├── 9z4nigjkqrskph83by8h25g9nbdsmaxn-python3.12-myst-parser-4.0.0.drv
│   ├── a0jahn4dzh3cqbidn3b44vkkkibxmrgi-diagnostics-multiuser.drv
│   ├── a0jhpi7k6xdw2w4k0lwbs6h6fjbxpb0x-fix-netrc-regression.patch
│   ├── a0q8xh6ahficlniy3f83wls4rzshsqsc-source.drv
│   ├── a2jw8yx20scjkyfijd3pggppm0z7n4bg-config.guess-948ae97.drv
│   ├── a3fdgnffhh2sqgqgwpk69v537jmzqasg-use-etc-ssl-certs-darwin.patch
│   ├── a4mx48n4k3ndv379p71qiyvsicv7kha7-bash52-016.drv
│   ├── a6igw22xcdrkvv6rcdcyd4gsnw3g8xqx-cpio-2.15.drv
│   ├── a7jh8svbbws15m64g62kw3jc0qpca2ny-pystemmer-relax-cython.patch.drv
│   ├── a7nj5y64nzhpkbysf3ijxgxyfc0ljr7h-locale-118.drv
│   ├── a7x4w8a3zdby1ll2zs49psaji7z61i66-editables-0.5.tar.gz.drv
│   ├── a99kyj8cm1g9pw0d1fdidrf5nd9yva8z-0014-Fix-segfault-when-copying-xattr-buffers.patch
│   ├── aazf105snicrlvyzzbdj85sx4179rpfp-set-source-date-epoch-to-latest.sh
│   ├── ac2r6f0q712dwd161zyq16bq53ipli7h-nss-cacert-certdata-3.107.drv
│   ├── acf7jbpzba4p2hqi5fsy96vhfii2s590-bash52-004.drv
│   ├── afbhv9jqy0snbc5g57ig9ggdmh1idvgx-sqlite-3.45.3
│   │   └── lib
│   ├── afip06mcc8w2igqz43bn4pnpcc5azaa4-python3.12-mdit-py-plugins-0.4.2.drv
│   ├── afm1lk6939qifg2z1vmfwyjc8xmry2ij-libutil-72
│   │   └── lib
│   ├── ag08f67r0l3gm18saynagb2bi6d96q3a-pcre2-10.44.tar.bz2.drv
│   ├── ag815hbmmkgk4flh7rj3nw90b45kik64-wrap.sh
│   ├── agdbzr6f6ss8a5ida4h8mzc603xqdxyp-bash52-015.drv
│   ├── ahla0a0zihmxi73881qv9a9x29vaabf2-autoreconf-hook.drv
│   ├── ahr05lsf0mlfv51gfzx8s88naancddil-webencodings-0.5.1.tar.gz.drv
│   ├── ajp481cdrqcc8abqggwffbx34nnhswd2-python3.12-python-dateutil-2.9.0.post0.drv
│   ├── ajsy05zn8gf5cg3qas6w9lb3f9f6mla3-libiconv-107.drv
│   ├── ajyqv129cdakix74f35jxbms855yv14s-toml11-3.7.1
│   │   ├── include
│   │   └── lib
│   ├── al012pnf4ylmflg6aqn3n7z1zmbpss8k-libxslt-1.1.42.drv
│   ├── al2qf1gbai7mz1ixbsw6idai0l2gf1v2-no-sys-dirs-5.40.0.patch
│   ├── alb1jiih910milr8fcnqqpqm98ml5sxx-perl-5.40.0.drv
│   ├── alcysd7q46s4bzl3c2gnjqk02q60khqp-source.drv
│   ├── alh93qg7789azxzvx75jx6xcf335ljv3-002-dont-test-while-installing.diff
│   ├── ammab07wszvb4qy5pldgq5a7zcfbigs4-autoreconf-hook.drv
│   ├── amzbrmq1zqz4cmjpk5zygbvjnxykpj3m-source.drv
│   ├── anx9cx7cd9jqm9yfmvxbxmjqwag0m1xx-setup-hook.sh
│   ├── ap8vhcwaaix1bgkh1nfrs2rf0dd130d5-11983a71f5e29df578b7e2184400728b4e3f451d.patch.drv
│   ├── apjjhvdq8d2j0l0fghfzm0fd9zkbw9h5-source.drv
│   ├── aps9nf83z050a3sf6xymjh0xcp0c8jm7-libtapi-1500.0.12.3.drv
│   ├── aqmgwasx0zgmgyqpa4lldv1l0acvafkv-bc-1.07.1.tar.gz.drv
│   ├── ar1p4gcvlqf8dwbkfrcb01srbywinaj5-check-pc-files-hook.sh
│   ├── arip4ajg4ibr6lbhm4x0gksd7xyc1nxq-bootstrap-stage2-stdenv-darwin.drv
│   ├── asz9nh8zysiw1p7firymf4mn91m844nr-die-hook.drv
│   ├── awg3kvbcfdkwk9cbhblxlcvdgls4m5lq-apple-sdk-11.3.drv
│   ├── axg8ccikpb2vzqwax0phxb5qvldb5s8d-readline82-002.drv
│   ├── azr6wi5wsazarrg23pcsmss1j1x6m3wm-python3.12-pytz-2024.2.drv
│   ├── b078icilnrb0a0j90p8a42vz2pnz5rig-add-clang-cc-cflags-before.sh
│   ├── b1k65r5afih6yz67xslq9s4bgarf9987-pypa-install-hook.drv
│   ├── b1kwyy41pv7v9w7c6p2k7yqrllmljxvx-sigtool-0.1.3.drv
│   ├── b24jqmqzmis82iww4jjfji5vlhi0r212-clang-src-19.1.5.drv
│   ├── b2lvq7qylpy256l45ndmligh24ywj575-gnu-config-2024-01-01.drv
│   ├── b2wy8z23knc1qxag4x0vsj3gpbkgpsyl-bash52-018.drv
│   ├── b519k9z44in1cvksf1xbijc06s2iyal0-gnu-config-2024-01-01.drv
│   ├── b54w1gvl1gpsv7y4969ki19kvphlaczv-007-darwin-bsd-ps-abspath.diff
│   ├── b5icf2rgwr25d2bdyvcd1xzcq3y67jal-bash52-032.drv
│   ├── b7zivgr1a8vyhjnqa97qfrfyjxx79s3x-make-shell-wrapper-hook.drv
│   ├── b84c30v8q3xmff59mk4dy7nqx0ss78kh-readline-8.2.tar.gz.drv
│   ├── b8jk8is71isif43qpkc06z6d4nsvf91a-die-hook.drv
│   ├── ba0kp233cnr75pmrr7ryhgr41gqnh1pn-python3.12-alabaster-0.7.16.drv
│   ├── bbq4ab17p1d4nlmk88rgr3ngi7551r96-meson.build.in
│   ├── bchnpidz9j43pgrq090pjj94afy5wvp7-bison-3.8.2.tar.gz.drv
│   ├── bcnlymwaalz24a5wl42inavkw8h5dipf-curl-8.11.0.drv
│   ├── bd6qgq10q1a160zvzi006zz1s4cz2ry1-Suppress-unknown-key-warnings.patch
│   ├── bdh1f44dhyx55i3fa8dvrvb09gdb8j83-user-environment.drv
│   ├── bhvng1zshp4ryqw5q1sixbsaqi63vap3-lld-19.1.5.drv
│   ├── bi0nwx7d9qqh224l4c3ffmn8q497wmm7-bash52-009.drv
│   ├── bj72jakrmxmgdkndc2pqk5q54lgzn88f-06-initialize-the-symlink-flag.patch.drv
│   ├── bkkp2g7wfwmd3rmzcf4glrkp74ply11x-fix-netrc-regression-2.patch
│   ├── bn0392qc3x3ia3a2n9kmzajq1fgna4af-libxo-1.7.5.drv
│   ├── bn7vb5bf9mrdhsxnmv879swbsp8q54m3-update-autotools-gnu-config-scripts-hook.drv
│   ├── bpcqa3nqq86b2h4rr8lz6c71q7lxz7i8-python3.12-importlib-metadata-8.5.0.drv
│   ├── bps1inr8mlk12a61bvg5w0mj7qmnx17i-005-remove-systemconfiguration-dep.diff
│   ├── bpv6yjxckp3k5gn3madny01msnfz537k-patch-2.7.6.tar.xz.drv
│   ├── bsnakysr7vsg7v7iffbjrigyvg3pzklm-libxcrypt-4.4.36.drv
│   ├── bw6aa38615ww5karcn8kslsf5hxgz412-link-against-ncurses.patch
│   ├── bybz12bxjbk94hm58zc70sc0xhj2dxif-add-darwin-ldflags-before.sh
│   ├── bys9kajgmik32007y1bp83593pp6rd88-die-hook.drv
│   ├── bzab2jhhiv81zfjdqnic0hzzrb4aip45-env-manifest.nix
│   ├── bzjr68pz8d438hm3y5kc2vk9814vhsp6-gawk-5.3.1.tar.xz.drv
│   ├── bzx98yb86791m7jbwinz23m0xjn2inag-pcre2-10.44
│   │   └── lib
│   ├── c2myhgn4zwi5cvg3ylf9rimrdbmxqr9s-python3.12-setuptools-75.3.0.drv
│   ├── c36jgjdpdw5mdnl33y3i3yl07d4i09md-bash52-022.drv
│   ├── c3lzljwa2l9x9xxwqpbrabfady6v7xn0-sqlite-3.47.0.drv
│   ├── c4akajrb4jg50k72jw7zfbyv8z139ri0-setup-hook.sh
│   ├── c4h4iyzpq056nb7w5vmyxif9w33bdam8-setup-hook.sh
│   ├── c4mk4297wlnj9xb9x8wk5dldp14h62r3-nixpkgs.drv
│   ├── c4sj1ag4aai2j2sildrw3lz8l3rk3cd7-bzip2-1.0.8.tar.gz.drv
│   ├── c5iby6817ak2wr3x3b3qvybsknp8xkjm-clang-19.1.5-lib
│   │   ├── lib
│   │   └── libexec
│   ├── c68fny59whi863livi6q0yva7fs4njbw-python-setup-hook.sh.drv
│   ├── c7a829bgaq3d1asbjmqp4sf4c75pns54-pcre2-10.44.drv
│   ├── c8ar3r33zr4a8n15pz30ivvhmb61gkpv-cctools-binutils-darwin-1010.6
│   │   ├── bin
│   │   └── include
│   ├── c8ig6wcnk5clsryd44sn13w2svpg7m94-requests-2.32.3.tar.gz.drv
│   ├── c9sjv81mbvd6pgcqhhxqa4gm10rxkfgc-c-ares-1.27.0.tar.gz.drv
│   ├── cciw7lgkldvx25d77cxpjhh1iw4xghd9-setup-hook.sh
│   ├── cgb0cp14zwcj0wigrjgfjni76x9pz8j4-aws-checksums-0.1.18
│   │   ├── include
│   │   └── lib
│   ├── cglpccxcr8s9bsjim8jjy74m4v05c016-008-FindCURL-Add-more-target-properties-from-pkg-config.diff
│   ├── cickvswrvann041nqxb0rxilc46svw1n-prune-libtool-files.sh
│   ├── civvq4xh4p0mj04l7k73p1xbsq1rs9bc-darwin-install_name_tool-wrapper.sh
│   ├── cj3l657q67hwbw1cygb3yvxll9c7hwyj-14ae0a660a38e1feb151928a14f35ff0f4487351.patch.drv
│   ├── ckjykyfw30zj1n3lcca9lwm2lzd7azdb-setup-hook.sh
│   ├── cklrwbwi889pp2fdsswdjvn12sdy5i5j-openssl-disable-kernel-detection.patch
│   ├── ckzrg0f0bdyx8rf703nc61r3hz5yys9q-builder.sh
│   ├── clw5a2da9maifwc0lxq7i6hyl59kjpw0-003-more-env-vars.patch
│   ├── cnm4ppcx6bm3b1f25v5nrhzjf7aydmiy-libiconv-107-dev
│   │   ├── include
│   │   └── nix-support
│   ├── cpbk8gkqhh5jn0q3dm1pnzaa9ac03mrz-gmp-with-cxx-6.3.0.drv
│   ├── cpv069vc5wv895m26xbl5cz0dzzq3x7v-ncurses-6.4.20221231-man
│   │   └── share
│   ├── cqmv41sm4mhyfl7w5v4d83qhc2jqjsi8-bash52-036.drv
│   ├── crfivdba7wyd4gy19hhjpbxfbrvpx18d-ninja-1.12.1.drv
│   ├── crqs1kmmi37ysda80hn6vc8k3hzb7gij-zlib-1.3.1.drv
│   ├── crs3r5h7ag41naklk49kirbknhjcajr5-perl-5.40.0.drv
│   ├── cs5g65g6hydr2myqciv8852wcz5vlisw-pytest_xdist-3.6.1.tar.gz.drv
│   ├── cs8d6m6nmxdn7w2h16y57g5fcwyr302x-pytest-8.3.3.tar.gz.drv
│   ├── cv26d2plfnc9gq4vj6n84ajw37crqb32-libsbuf-14.1.0.drv
│   ├── cvhdn51z7rp837nlf15kyyby557lz7n8-gnum4-1.4.19.drv
│   ├── cwy7b8lcbfskclw84mk7lc88fc7259nm-nixpkgs
│   │   └── nixpkgs
│   ├── cx4kzsqjv5v0vqjw0ca9iiih9hn0h3ib-make-shell-wrapper-hook.drv
│   ├── cydfsqlg2j3hvnmprcai0sanmjx272fa-gnu-install-dirs.patch
│   ├── cygv6krw4mdjhichw6rarngz8zkp3lc0-unpack.drv
│   ├── cyhw81sm5lbwcmf4z013p7yb09fs7lhh-Info.plist
│   ├── cz331fcyxd8vd53p51i9zd40vmcrylcp-locale-118
│   │   └── share
│   ├── d06x56as0q4igxl6y6zawzhr9mgdg0rg-bash52-015.drv
│   ├── d13plffnxi62mih1q6hv4k1jfhm09ccr-bash52-011.drv
│   ├── d1hxn7dyd0zkzns9dndi1zaxnislcj7p-0002-Add-CF_EXPORT-To-const-symbols.patch
│   ├── d1iminvsq89frwn0rhy86v5al3zfnfzk-python3.12-mdurl-0.1.2.drv
│   ├── d2hmvhnb97v8cha1935730clc9jizz77-python3.12-bootstrap-flit-core-3.10.0.drv
│   ├── d3w5bdkxvp2kfn5hs9b5pa0qq75mq72m-urllib3-2.2.3.tar.gz.drv
│   ├── d49gdm68h6vjzlq9bqsi9i1dqnqsrqxg-python3.12-zipp-3.20.2.drv
│   ├── d6cv34gs3hniki7ib9m3mhvclbhawv73-flex-2.6.4.tar.gz.drv
│   ├── d76sgd4rd87wnhf2q65agqbfnvhx6qlr-python3.12-imagesize-1.4.1.drv
│   ├── d7qqdcl7ynjfxm1rvgjhhzh7q1rwybrk-0004-Use-std-atomics-and-std-mutex.patch
│   ├── d889r2x3h9j1jxc9s495nnich9x929d0-source.drv
│   ├── d98905jp3axprsgyyzacb5v932b19wni-meson.options
│   ├── d9b2qrrq32jzdsdx4y33inzrra5n5z5n-CVE-2014-8140.diff
│   ├── d9srxx92wdf00pbzmmkr1mr2pi63avbp-add-flags-extra.sh
│   ├── dc47vmncjwvp8cg6a564yg7h03llkiks-user-environment
│   │   ├── Library -> /nix/store/46p1z0w9ad605kky62dr53z4h24k2a5r-nix-2.25.3/Library
│   │   ├── bin -> /nix/store/46p1z0w9ad605kky62dr53z4h24k2a5r-nix-2.25.3/bin
│   │   ├── etc -> /nix/store/46p1z0w9ad605kky62dr53z4h24k2a5r-nix-2.25.3/etc
│   │   ├── lib -> /nix/store/46p1z0w9ad605kky62dr53z4h24k2a5r-nix-2.25.3/lib
│   │   ├── libexec -> /nix/store/46p1z0w9ad605kky62dr53z4h24k2a5r-nix-2.25.3/libexec
│   │   ├── manifest.nix -> /nix/store/xvkwcziqihg5vzwxw8s2hfk8kwddpfkb-env-manifest.nix
│   │   └── share -> /nix/store/46p1z0w9ad605kky62dr53z4h24k2a5r-nix-2.25.3/share
│   ├── dcajgxfimyvkrlp1q7z916h01bzcaivh-clang-wrapper-19.1.5.drv
│   ├── df1mm3ny3gx9njiyk2mrjhw67dwnachz-aws-c-cal-0.6.12
│   │   ├── include
│   │   ├── lib
│   │   └── nix-support
│   ├── dfaw84mk6i0jhgn9nr2y3ki5sa6bpnw4-bash52-026.drv
│   ├── dj1w73ahr16g8w974ppmxcngnb24m5rd-cmake-3.30.5.tar.gz.drv
│   ├── djbcpkh9ps1afmvc5p9q9wkjr3631nq8-bootstrap-stage0-binutils-wrapper-boot.drv
│   ├── dm81j9qdcdr4c458pqbc9wvq9ymgzk4m-setup-hook.sh
│   ├── dmk8pjlgslv6di92i8ca54l4sigrh9zp-libsbuf-14.1.0-dev
│   │   ├── include
│   │   └── nix-support
│   ├── dn4a8dpgg84bnx73kg4sw8dhggl71lsp-python3.12-bootstrap-build-1.2.2.post1.drv
│   ├── dnbvfhlp8kqimx8qh76yr4mmxv44lqjv-source.drv
│   ├── dni243yxyhli2fb2mry4llm0x4g9cbf1-apple-sdk-11.3.drv
│   ├── dnl7k0izh4w3jpw09hf46snlfw114gih-0003-Fix-undefined-EXT2_ECOMPR_FL-for-e2fsprogs.patch
│   ├── dqkvd5p44f6appppmw6hq0hp287hkh8h-xz-5.6.3.tar.xz.drv
│   ├── drcqh5yy2wjr7dcxb6k5lgxpjp6p0rv6-gmp-with-cxx-6.3.0.drv
│   ├── drcwgs09almpmcrjwmk46x9ir0n03d1z-iniconfig-2.0.0.tar.gz.drv
│   ├── dsl0cw2hkqkisbhk70ga9ws0kk1gsmwf-source.drv
│   ├── dsm2rslq4z37c473xx6prbrmbz24m4zl-darwin-use-libffi-closures.diff
│   ├── dsskgm775cxbgc5l769dsxjf705zqbdb-readline82-011.drv
│   ├── dvqfqfcasxvdkjnb8ivyjsm909bbflrn-ensure-newer-sources-hook.drv
│   ├── dx8x6rfydabraxnjv0r4m2psnxwgf2bw-trove_classifiers-2024.9.12.tar.gz.drv
│   ├── dz8aqg1rz46zahqb4k03nwx885lg06jl-pytest-check-hook.drv
│   ├── dzbxz3pglzhwnz01475xqj6p8y0rdm78-gnused-4.9
│   │   ├── bin
│   │   └── share
│   ├── f12rqnazz3pm60k9yafil70kdb3zs1mi-curl-8.11.0.tar.xz.drv
│   ├── f1iwkgfvcrj2z1yrxlcvd29rf69l5lh1-2c19b9899ab3a3e8bd0ca35e5d78544334204169.patch.drv
│   ├── f1kvkfigync29bnh159frf9xchfm1dpm-cc-wrapper.sh
│   ├── f4bmyw30gijjmcdz66j724ll3cdzbah7-pypa-build-hook.sh
│   ├── f4bvwqvj0y3z6blvh0knz71a8yq1c45p-requires-private.patch
│   ├── f6mgh60587jnwg3mbgy79bzjj5zfg32z-0001-Fix-build-issues-with-misc-redo_prebinding.c.patch
│   ├── f78kl4fdhzfc6hncmavrjmb98ax5168s-python3.12-pytest-xdist-3.6.1.drv
│   ├── f98j3ibik76fvzir3hvbybsqfha1m29b-cctools-1010.6.drv
│   ├── fcqda8pbnxiq0jj3prbjdk532vj2bb8k-xcode-project-check-hook.drv
│   ├── fd86r5l03pyqv7kr89zm01gm9ndz09k3-source.drv
│   ├── fdh1qh9zm2fdiq6k8yfialjvibn7zzd7-python3.12-sphinxcontrib-qthelp-1.0.8.drv
│   ├── ffn24pdddlv77ibzanplhkrc4c83678i-libxml2-2.13.5.drv
│   ├── ffz174gqwh4jl753mr7ixriz2g5w3g0j-CoreSymbolication-0-unstable-2018-06-17.drv
│   ├── fh9mzpbkk4siry3wvsnl7c9p5ai17434-re2c-4.0.1.drv
│   ├── fhnzv81mdp5rcj9zny7pvdxid6mbkpdf-update-autotools-gnu-config-scripts-hook
│   │   └── nix-support
│   ├── fiivgbv739g1148fqcik7bzbscx8in6y-bootstrap-stage2-stdenv-darwin.drv
│   ├── fjmcvlb81f4p6j3a8nnwfciq22arfgdy-libssh2-1.11.1.tar.gz.drv
│   ├── fkphwimicmm7gyxvjfbqya3i7dai2m7j-libSystem-B.drv
│   ├── fmlzjhxgms1k1zlnvnagbzdpiwl9kbpa-coreutils-9.5.drv
│   ├── fpmgvbf2gpfg5a0mgrljry9ghzsm9vwg-hatchling-1.26.1.tar.gz.drv
│   ├── fq6rrkxi3f68l3kvza8yxvi4qdwqdyc9-CoreServices-11.0.drv
│   ├── fqx30y8bxywndq57c9f98djydnp03pgm-python3.12-pygments-2.18.0.drv
│   ├── fs3ahzjhxd42m4hknms96zj71ry6n93c-add-private-frameworks.sh
│   ├── fs3yzwjlx81qw5na95ya212r3sfd8qdg-nixpkgs_test.c
│   ├── fs4fhxbip34b8yxqm1pwym8bxmfq2z1x-python3.12-sphinxcontrib-jsmath-1.0.1.drv
│   ├── fscd8f71wmpwphcmi5mx8qnif2402x9m-run_setup.py
│   ├── fvxhawhmkpn7ssmgwqjkjkxvchiznvj9-findutils-4.10.0
│   │   ├── bin
│   │   ├── libexec
│   │   └── share
│   ├── fwcklfs3i840mr8s334mfszjxnmg32gg-source.drv
│   ├── fwgifqz2mqs1wx4drppja4girqd8c3sc-0007-replace-initialized-constant-with-define-statement.patch
│   ├── fwzc1sfxyax3cq2mq96jzbicwq9w6ivh-bootstrap-stage-xclang-stdenv-darwin.drv
│   ├── fyaryjvghbkpfnsyw97hb3lyb37s1pd6-move-lib64.sh
│   ├── fzw86ilxhziz3hw0qmqpqxvzs6x3nc71-python-catch-conflicts-hook.drv
│   ├── g02a468m02al1raci9qwx86rwgg5f5w4-lutok-0.4.drv
│   ├── g0gn91m56b267ncx05w93kihyqia39cm-builder.sh
│   ├── g0m0l6pv6zyb6aj9lk2bjdfgpnccmfr3-python-relax-deps-hook.drv
│   ├── g11pxr60xdim5g8rlvw5m7352cfkgcbc-llvm-src-19.1.5.drv
│   ├── g2bgl0dry6k4crmazzwn3s6870j00p1i-python-relax-deps-hook.sh
│   ├── g2ys0z8vdlw845izq6454kc2z2jpcdmr-expand-response-params
│   │   └── bin
│   ├── g33nba865rxzc61s4m3f4pm7v9qbhayd-Abort_when_cleaning_up_fails.patch
│   ├── g3ydfy72f5krf54b696k390rj7v23yqb-readline82-005.drv
│   ├── g4vzjfy4b1is75v2pymgykd886plzsyk-findutils-4.10.0.drv
│   ├── g69aq9qd5h7pd4kdp7h4ylnhndffl1k5-gnu-config-2024-01-01
│   │   ├── config.guess
│   │   └── config.sub
│   ├── g7jym9iazfs2dz6ykm7nxbs8n54gf2cz-source.drv
│   ├── g7ynr2y86m4pvxnx6ac7rpbmvabg4njj-CoreServices-11.0.drv
│   ├── g9v8xvik66yqy6fclx246434jpv2yclz-bootstrap-tools.tar.xz.drv
│   ├── gbr9malmycq3h9fjcvz7bjvwh90w174m-libarchive-3.7.4-lib
│   │   └── lib
│   ├── gc9lsgg5yljin0rc6hz334qkl9jf05pq-python3.12-html5lib-1.1.drv
│   ├── gd2546zkaizg9cfgq3rfawvr2d9xxfk5-libresolv-83
│   │   └── lib
│   ├── gdlwk6bcqi1ldil4a1zkcpqvlsm4vccm-python3.12-bootstrap-installer-0.7.0.drv
│   ├── gf4arbdyh5sf85xhpiadzm6jip5lyy5z-bash52-025.drv
│   ├── gfcwzclbbrrm4ln0l5rkppwhg36mdh06-gawk-5.3.1
│   │   ├── bin
│   │   ├── etc
│   │   ├── include
│   │   ├── lib
│   │   ├── libexec
│   │   └── share
│   ├── ggi0yb4v4v08pm2nim0hd7ccw0d1i9ip-python-runtime-deps-check-hook.sh
│   ├── gic90zgsmv6l15yvpg38hp0515l7gfs1-readline82-002.drv
│   ├── gim3gxx5jkkwk05r355cs023qra55pj1-0002-Update-for-modern-liblzma5-versions.patch
│   ├── giph9s3mwcmvk1i9jxji49bn74fwkfiy-jq-1.7.1.drv
│   ├── gjcrxxnivniz44dr9r41wb4acmh20il8-filelock-3.16.1.tar.gz.drv
│   ├── gl2vqsbjakiw3gypqkpc8z8m5n7v705f-0016-Do-not-set-property-for-empty-ACL.patch
│   ├── glwymxk4ghmppm1linjwhva6ax6pfnn6-source.drv
│   ├── gm4aai0k3w02zximb0vq0qaws2kawjl2-help2man-1.49.3.drv
│   ├── gp5kw9r5rg6ixpx49d0v6and0pqh7zha-locale-118.drv
│   ├── gps9qrh99j7g02840wv5x78ykmz30byp-strip.sh
│   ├── gq4z6j5m5mvg0y93gyc21m6hk5dwnr1n-python3.12-pyproject-hooks-1.2.0.drv
│   ├── gqcjy77drp28ra95a2d0xnq66nkhjnqf-0005-Find-ld64-in-the-store.patch
│   ├── gr73nf6sca9nyzl88x58y3qxrav04yhd-polly-lit-cfg-add-libs-to-dylib-path.patch
│   ├── grh577v1fx373vri979axh2rp9hxp1qp-meson.build
│   ├── grmsckqgpwxcfndx5j099h757cxjqn91-python3.12-bootstrap-packaging-24.2.drv
│   ├── gs6w26ils03rsvkqqs8nz5cdp7b60px0-0006-Add-libcd_is_blob_a_linker_signature-implementation.patch
│   ├── gs9gna3936nsrlnbb318vd9hfppipblp-CVE-2019-13232-1.patch.drv
│   ├── gv9ik39iiw4nhw29sfz6bcy3jg97y97g-python3.12-cffi-1.17.1.drv
│   ├── gwziz64kxf38l0fyh7nnvf8kx32xyjsv-xcbuild-0.1.1-unstable-2019-11-20
│   │   ├── Library
│   │   ├── bin
│   │   └── lib
│   ├── gx4pa1m75g8rrrggj7gi3bg38m4lg3q5-sitecustomize.py
│   ├── gydfs8mz7bna6dygbl4xchbzbqn0y3rj-xar-minimal-501-lib
│   │   └── lib
│   ├── gygpl3q606lgb1q6qq5cn0w2zq2s7xrc-python3.12-webencodings-0.5.1.drv
│   ├── gzkdc96gbdvjiynbc85kyl9pdp9dc74r-idna-3.10.tar.gz.drv
│   ├── h2dr82zzhif0bfbhkfmdj9pmflm0jn8h-hatch_vcs-0.4.0.tar.gz.drv
│   ├── h2fcbw7ghgn3i4qadszdp272w4dab7ln-lzip-setup-hook.sh
│   ├── h35snyvwlm08dfbfsfpzja93ddcbnz7m-0001-darwin-compatibility.patch
│   ├── h3iizx3klhm6qwvps2yhslwmcyqk1iyn-28-cve-2022-0529-and-cve-2022-0530.patch.drv
│   ├── h4xmdx4682niay4pws2ypmxa9ijbbs77-perl-5.40.0.tar.gz.drv
│   ├── h5w1irii5ysndzw79svj87llmxhj0k7a-includes.patch
│   ├── h6mlv3qi7i0f232pb6r49a9mqyiq1nlv-python3.12-setuptools-scm-8.1.0.drv
│   ├── h7ih2gyz1x7c1lzng3wiibm393hi982r-source.drv
│   ├── h82l3gsf68s38y8ls49zlbs6gw1nylk9-0004-Use-nixpkgs-clang-with-the-assembler-driver.patch
│   ├── h8g9267kz64hyqx518xzlvc07rwch86a-source.drv
│   ├── h8hxlpks5syp5anyqzwqpk6ljp58s1qi-bzip2-1.0.8.drv
│   ├── h8nslw27vn2d2v92n4g4da3nnavz53hs-source.drv
│   ├── h9lc1dpi14z7is86ffhl3ld569138595-audit-tmpdir.sh
│   ├── havj63jlrkczv92ycmhwbg8jh5a5jszw-setup-hook.sh
│   ├── hf21hixg110wh9vicjx7dhar2ys5301m-source.drv
│   ├── hf2dsd6cxld6b252n8wlbzc780f4g1jy-libiconv-1.17.drv
│   ├── hgm926zkxg05ig585sniylkncnvf0bn6-readline82-011.drv
│   ├── hhbbbc4vzql2y6yvqcl5vfr367k6zcn7-bash-5.2p37.drv
│   ├── hhjnisqi40faqiqyiisf4s0j198z0imk-glibc-2.26.patch.drv
│   ├── hhqvml4a4bacd9crg4qbm0x93iwzcyhb-patchutils-0.4.2.tar.xz.drv
│   ├── hi8hbyqdjyqiv5rpdfzwyi94riy44yrv-stdenv-darwin.drv
│   ├── hi8pird1pj8d90bjpk2nihvqyjwv5lp0-DarwinTools-1
│   │   ├── System
│   │   ├── bin
│   │   └── sbin -> bin
│   ├── hibp6cys4zajy7z5hkjk3qchk006lx13-update-autotools-gnu-config-scripts-hook.drv
│   ├── hjwy9naf4fnlwdgmv3wpjl0ydlizyihv-usbuf.h.drv
│   ├── hk8450ix0q7xawpplmzmlw5fgfsvk1a9-cctools-binutils-darwin-wrapper-1010.6.drv
│   ├── hlapgwfjgb7fffdina5qk0si7n7px20z-gettext-0.21.1
│   │   ├── bin
│   │   ├── include
│   │   ├── lib
│   │   ├── nix-support
│   │   └── share
│   ├── hmbr8bgg6xw1gz4f6kqrwxvcipibf84x-sphinxcontrib-jsmath-1.0.1.tar.gz.drv
│   ├── hnnqg5s7hp8fl9vhh77374kh6h9m06zz-file-5.46.drv
│   ├── hq3ka59vj3y14axir2a3wjmgsghdb19l-bash52-023.drv
│   ├── hv31bdk3b4n6r8gxbxqqfbzkw2d9q2wb-python3.12-freezegun-1.5.1.drv
│   ├── hvxw18w2mgzkbkkv90h7x0d7nlxyx4q7-source.drv
│   ├── hw794g7g92lqzipd36nij2aglh4zvhsm-aws-sdk-cpp-1.11.318
│   │   ├── include
│   │   └── lib
│   ├── hxgxcwpf9vmhhp078l1y65q15wagjh6v-xar-minimal-501.drv
│   ├── i23kn25mbkkjy38p7h4y8krskl2s0hm2-bash52-001.drv
│   ├── i2lmh51pas1shhasma2p3qi0fnhqlq04-libuv-1.49.2.drv
│   ├── i2lzrm5fy3r38b6l8ad3krqi2r630lvl-jinja2-3.1.4.tar.gz.drv
│   ├── i422fyakl9pd3jyv6wvjl4cmvg0mj0na-bootstrap-stage4-clang-wrapper-19.1.5.drv
│   ├── i79hssfvc017h2m3fpmh3djvznnbmpkh-python-remove-bin-bytecode-hook.drv
│   ├── i7i4cc7mczv7rkn8zsz9dpi9h44n2n10-pkg-config-wrapper-0.29.2.drv
│   ├── i7mzabmp6zqjqac4p67ki05flgpqmbv8-gmp-with-cxx-6.3.0
│   │   └── lib
│   ├── i8cwdyy6qizqj4g531jyb34wcf03qkii-setup-hook.sh
│   ├── i9ppkgrcq317znc0amazc41p7kw0q2iy-source.drv
│   ├── i9sss0rpj380ylyrvs6zgjqki0n0zvvr-toml-0.10.2.tar.gz.drv
│   ├── i9ww146pcblgwkb66bmm4290lfmrqp0w-remove-references-to.drv
│   ├── iajh7d0zsxs3y1bj8qb8zpny2mr5zppx-apple-sdk-14.4.drv
│   ├── iaycs0an93nyi49lww9vyh49wvnqnia2-brotli-1.1.0.drv
│   ├── ib8q30mw0s975fkzlkyrfs7jhkf32dlv-nixexprs.tar.xz
│   ├── ibs6m9c7xmqgqdfrvrhdmph0caxl89pr-gnutar-1.35.drv
│   ├── ifr4n98w3kd4r3kqqs4bmwn6a8qkcyf9-python3.12-urllib3-2.2.3.drv
│   ├── ifyg74xb8jqngjhdhdnrjbylc3794cp0-patchutils-0.3.3.drv
│   ├── igiximgawgig988s0lhnpb9yx3r6aapn-unittest-check-hook.sh
│   ├── ih3qy956n0ay1r6yvjnjpkawazbl234y-config.sub-948ae97.drv
│   ├── ihd8jib7srbwqqch3kqas1ihgg4vq395-lzip-1.24.1.drv
│   ├── ihhd47fy96x5kg0sqkxcgk2f32ik4n4b-sphinxcontrib_websupport-1.2.7.tar.gz.drv
│   ├── ihykkf98zqlp09p8rgl2l5dndv2z01a9-source.drv
│   ├── iiz5lijkkhvdmqh0xzfhc7hvg1970lhc-bzip2-1.0.8.drv
│   ├── ik6kv913l00w3ia8rdwzhbdva5782k7f-libiconv-99
│   │   ├── bin
│   │   ├── lib
│   │   └── share
│   ├── ikcpgsjpsr4ikz9zdgz5bshiz74pybad-pytest-mock-3.14.0.tar.gz.drv
│   ├── indk27kkr4i1w6blvfbik8y67knpd3f9-zope.interface-6.4.post2.tar.gz.drv
│   ├── ins9k4dw0gs9iqi2gd2dhj1g4y9dcycw-0005-Fix-configure.ac-for-Linux-headers.patch
│   ├── ipvkcm5d4b02dn9whsm5mh2zmp41j912-python3.12-charset-normalizer-3.3.2.drv
│   ├── ird2kvjhmyfgbfrw6gysjjr422xbzm10-CoreFoundation-11.0.drv
│   ├── iryzqbdpv33ija3m18rjypplvhx3y3fz-apple-sdk-11.3.drv
│   ├── iy4wp1wspv98nl2hlqn2w7y5pghfl9jh-normalize-var.patch
│   ├── iysv08b5ls5ayiafjcqdg1cxagg3nibz-source.drv
│   ├── j0yclcycnlkqixxq1rxvfyj3azh1yisn-libxslt-1.1.42.tar.xz.drv
│   ├── j2aqanh33ry0vwpjnv2sxvvwb0b9b2n3-apple-framework-IOKit-11.0.0
│   │   ├── Library
│   │   ├── lib
│   │   └── nix-support
│   ├── j2mxl9qh1q77ik1zjdwmzwhxdg58967y-bash52-031.drv
│   ├── j4jl91jqv3gck657m8bm8n3dzsyz2f8g-source.drv
│   ├── j4l24bbpd540shn6gkh81ap5bqkizcy9-aws-c-sdkutils-0.1.16
│   │   ├── include
│   │   └── lib
│   ├── j4lk1cij380x7qn4phv82pz6acn2i12r-info.sh
│   ├── j4mway1f027rqyff5bwzfn16hkac6nd0-openpam-20230627.drv
│   ├── j5gkc30jp4bdcpsdl5avc13iwk4jwx4k-pkg-config-wrapper-0.29.2.drv
│   ├── j5y1ii6yaqm91y1brh8lhlhkypxm5r4y-post-link-sign-hook.drv
│   ├── j60mwj2bd6rplcllp8gb5asmzm2n3kfy-python-catch-conflicts-hook.sh
│   ├── j7bd2a4fafw9rchrf1ag9xf920g37kk7-link-libiconv.patch
│   ├── j7yk5caljxg94g6kn285hz5ysiyv1bmi-parallel.patch
│   ├── j86fbxcrsl42cp98p2w488x25sm1z33v-signing-utils.drv
│   ├── j87a0hkzczlz5ldywvy7pd3bzf9x6x96-pathspec-0.12.1.tar.gz.drv
│   ├── j9f5p38qpbc8ajl1ahs15viyqyfiq0xa-xz-5.4.7
│   │   └── lib
│   ├── j9lspxnlbkrcskxpxg7q6nb74wnn6v2b-darwin-plistbuddy-workaround.patch
│   ├── jagxd5g57xrspbayfqsxnmq3l1hk0p8d-libpsl-0.21.5
│   │   └── lib
│   ├── jcqy60jpbk4hldxrfxn7x74v1pfm51f5-psutil-6.0.0.tar.gz.drv
│   ├── jdjkinkjassprf9lh2sa31959bhlkrdi-source.drv
│   ├── jggw04lcra5br2z1vpmq85zvhqsxhcn1-python3.12-defusedxml-0.8.0rc2.drv
│   ├── jgp2r4xx6pcqfs9n9mi7ys75kq108jbf-pkgconf-2.3.0.drv
│   ├── jgx8lpj0pccgkkdpb4c3g5l39mv20x8w-find-xml-catalogs-hook.drv
│   ├── jh2pda7psaasq85b2rrigmkjdbl8d0a1-llvm-lit-cfg-add-libs-to-dylib-path.patch
│   ├── jik02mkz72r2f6hhxnlhp6h5f0fi89gw-expand-response-params.c
│   ├── jivxp510zxakaaic7qkrb7v1dd2rdbw9-multiple-outputs.sh
│   ├── jks0cq3cd082hakxznxklrgzazifa4h5-patchutils-0.3.3.drv
│   ├── jlm28l70qq6ii3kk2iyb30wfwr5q77ql-clang-src-19.1.5.drv
│   ├── jmylwzzk2fv6lcwpy2hx6fsmn9j9zcfk-llvm-manpages-19.1.5.drv
│   ├── jnl9rqxgy8hn5a0pmcf07l4y6m1gik69-apple-sdk-14.4.drv
│   ├── jnq9wxv459dl1lmhll4x2jgsswjd50gj-which-2.21.tar.gz.drv
│   ├── jqg6d73zcfi5qz70qvnr4raxr336mb1c-lit-shell-script-runner-set-dyld-library-path.patch
│   ├── jqhyhhgkcsfd665y7a4sk2f9iq77m2fh-0019-Prefer-OpenSSL-over-CommonCrypto-if-available.patch
│   ├── jqqccbyrx4ys9nnd6p0b0wc08g49wbz2-source.drv
│   ├── jqrb3ycv7pvq1fjygr1gw6srhrk8z4w1-openssl-3.0.14
│   │   ├── etc
│   │   └── lib
│   ├── jqxcg4yfq9y48zr2dc36435bpll3237p-python3.12-markupsafe-3.0.2.drv
│   ├── jr3ivp9a90ysqsii3f35h80jpsjdbd1j-000-nixpkgs-cmake-prefix-path.patch
│   ├── js1lic1bmif60d4mlffkpbvz5jim34n3-darwin-strip-wrapper.sh
│   ├── jswgii1damgl6gwidqxzd12c2vb1xbvi-install-shell-files.drv
│   ├── jvfpqq7xmwcamixvk5znw720g4qk0v06-0002-Pass-fileType-to-writeToStream.patch
│   ├── jvrq78cabrcwrlbpdn4509n859ai8n8m-bootstrap-stage1-clang-wrapper-boot.drv
│   ├── jx0nbsmjvs6s8da6q4xqk9fszh5khxmm-clang-at-least-16-LLVMgold-path.patch.drv
│   ├── jylyc7273d8ph3dxc6yrb0nhgn3rg63n-perl-5.40.0.drv
│   ├── jyxjpji3sbwxha0i8iyhfhzkndni2ips-m4-1.4.19.tar.bz2.drv
│   ├── k0qj9nfiy76y67ga43pszjqdk8f3915i-001-search-path.diff
│   ├── k32f0d9w31mnxv5l67c478n8hqbgd1ba-ksh-2020.0.0.drv
│   ├── k3n6vi61z9smr2zx3nchridqsicfq18l-meson-1.6.0.drv
│   ├── k4i1573xxvq7d1i01jsfjsvwznab7kqn-pytz-2024.2.tar.gz.drv
│   ├── k5wxxc0khazy6mlhcs80j8a0i9a630w9-bash52-002.drv
│   ├── k7rmcw2ijw1wz6pyg0z3swlc5bjbbpsl-compiler-rt-19.1.5.drv
│   ├── k7sv2i1x3ga3f29xbaqjc88fgkkqld14-sphinxcontrib_devhelp-1.0.6.tar.gz.drv
│   ├── k9h17975kixig57a0daz07dm01h75skg-source.drv
│   ├── k9hn9c1hfxc72q3k8p15ij96d0fbizwj-make-binary-wrapper.sh
│   ├── k9vx9v1yjwlndg84jjk5s310vv12g0j5-mailcap-2.1.54.tar.xz.drv
│   ├── k9xkin44qfxfbvgq2mkzbc337cq911az-bash52-029.drv
│   ├── ka15hbbrv80vgl61yj7zlzag2vkxaq83-onig-6.9.9.tar.gz.drv
│   ├── kab8rkqwbjs4igqandldck8jzwn6pb27-libpng-1.6.43.tar.xz.drv
│   ├── kayj17gv47h7mxw6hm62i4rpcb6vnwkp-lowdown-1.1.0-lib
│   │   └── lib
│   ├── kd4xwxjpjxi71jkm6ka0np72if9rm3y0-move-sbin.sh
│   ├── kg9fz2vg0qhsp9l8hss33ccg831plqlc-Python-3.12.8.tar.xz.drv
│   ├── kh3bz86i3xbf15br6qyj69g33cb3pdn3-clang-wrapper-19.1.5.drv
│   ├── kiipjfyskvj223zbggx19mln0naiqqp6-lua-5.2.4.drv
│   ├── kiv8dz975pi3y2kl28grajmaj5wdg22b-gdbm-1.24.drv
│   ├── kj4mpdil67d2qsmlnzhxj904yilrhf6y-python-runtime-deps-check-hook.sh.drv
│   ├── kj6d12niij76m6mbjiswkyqgfi96mdsm-cctools-binutils-darwin-wrapper-1010.6.drv
│   ├── km4bcg37mmvc1ns2h5lvbirhzmzrchjh-clang-unsupported-option.patch
│   ├── kmmskr4rnr3kx4gx5hc1c6i1c4sxmrj1-bash52-003.drv
│   ├── kmqm2fllh9bp5qgcrysv2qv7yg4pawwa-CoreServices-11.0.drv
│   ├── kpdhhzmjha9zj5g2j8x567h6mlv6i7c9-remove-references-to.drv
│   ├── kpkc0p7nm2x5iiy0km4pq4wwq1l0p8zy-0009-Add-useless-descriptions-to-AC_DEFINE.patch
│   ├── kpyba9nb3b68jlvdrcbhxrih685ayrhx-sbuf.9.drv
│   ├── krcs10gqilp615462n0v6xiq90266nq4-xz-5.6.3.drv
│   ├── ksgb2726hgjnfsf6mc97mrs6p97nqyb7-ld64-deps-private-headers.drv
│   ├── kw0k4hsymnnznh701xqzzm88j0w75qnp-xnu-src.drv
│   ├── kwfaal82z5yxzhvya3rmr8rb5nlf5lnv-0001-Check-for-no_exported_symbols-linker-support.patch
│   ├── kwibv3va0b70dyq6j41cpbrvh64fv2b2-meson.build.in
│   ├── kz7hhivh19j3fswz9i5knbq3xwsy7sp5-gnumake-4.4.1
│   │   ├── bin
│   │   ├── include
│   │   └── share
│   ├── kzhs0iqzhs4iscivr27rbgz3hc27zyfc-lua-setup-hook
│   ├── l0a3y5k2p3hh606kmhblf64c5z01rrvl-bsm-add-audit_token_to_pid.patch
│   ├── l2z8k3rzdrb9a3f4wr1giibbissnahn7-readline82-003.drv
│   ├── l3w4hh88c4wwldzzhqj4laxanvbd592r-bootstrap-stage4-stdenv-darwin.drv
│   ├── l47b95ia6czwsmkp1cyxixb7fy08a9bi-bash52-027.drv
│   ├── l4nrfmdj8nj52g7hi6r3vgchlk99aap9-libxo-1.7.5.drv
│   ├── l70mfrp9azcc6srkaph0jdcffrjmg4gw-python3.12-wheel-0.45.1.drv
│   ├── l82dgmw1i6qq7p041px2hbwr6j3w61bg-unittest-check-hook.drv
│   ├── l8wh1dy0c15n760p7gi6w23y2jx07kqx-readline82-001.drv
│   ├── l9xgss5iwr6c2k9j2pbj3fq4vngfmci9-sdk-hook.sh.drv
│   ├── laalq1kmn2n9xiy3jp71v1l1z72spyq7-source.drv
│   ├── lamfkzqk5jk779ykhxfkpjp3f7ay17f1-apple-sdk-private-frameworks-hook.drv
│   ├── lgzwzczcl03mxwigjbfagvrxzngk5x2m-aws-c-auth-0.7.18
│   │   ├── include
│   │   ├── lib
│   │   └── nix-support
│   ├── lhc7jvng5na77ahrhxljx1b4w81adnx3-python3.12-calver-2022.06.26.drv
│   ├── lhkq6l14c14nvcqrmrzfbjj9m8fjmibj-revert-runpath.patch.drv
│   ├── li7r2lv82i1a90k9gir1w7c0rzf8lmir-gzip-1.13
│   │   └── bin
│   ├── li8qv5r8174hlg4dp12vsz7jhzc7j38c-python-imports-check-hook.sh.drv
│   ├── lm60b0gdds255849nyncy0pdcsfic9dn-clang-19.1.5
│   │   ├── bin
│   │   ├── lib
│   │   └── share
│   ├── ln4ji1rf7f2kzxg7b8g16x78mvfj3lml-libxcrypt-4.4.36.tar.xz.drv
│   ├── lnyf41h1ygjbfi3si8npr4cgsr5h7liq-bootstrap-stage-xclang-stdenv-darwin.drv
│   ├── lpfs02z2i2hamz9f50p4bz6v0fs0600j-mimetypes.patch
│   ├── lqz5cx35jyad0c60iqhwz9j402bg9dgm-patchutils-0.3.3.drv
│   ├── lriw19kaz6ch9jacswiyjchm1irhxalq-bash52-024.drv
│   ├── lrs8wfi7jl06d1dxpcdpqvhbzz17cfk5-0013-Enable-extended-attributes-for-btrfs.patch
│   ├── lsc4fn55702vkwy3m54ifjdssibfj96z-xcbuild-0.1.1-unstable-2019-11-20.drv
│   ├── lw3ld9mliq8djn04g45my6r6zq1zm638-gnu-config-2024-01-01.drv
│   ├── lwlw80k5c78mxhgx11wf8zqa132lwczl-perl5.40.0-gettext-1.07.drv
│   ├── lx8kzgkxqwf4gdmnzzxgf1k1w8sfinjy-zope.event-4.6.tar.gz.drv
│   ├── lxvyb9f33dficspkb0fqmbbgkzrgbj3q-ncurses-6.4.20221231.drv
│   ├── lxx53alpbw1zsifd0sly7k0zc3q729ym-readline82-001.drv
│   ├── lyb5zdapcrlw02hwkrp9gv0nf2xbsk96-version.patch.drv
│   ├── lypyhrdqir7lhwhsvrr1cp85ywh3dhas-pkg-config-wrapper.sh
│   ├── m0f03pqnp9za1xyygq7mfgygld5dqk5k-diagnostics-multiuser
│   ├── m0isf85cn74zzjn7hk1nmxn4hcl7xlxl-cacert-extra-certificates-bundle.crt.drv
│   ├── m0x7mnpfhlgpmfq27qc34gxzvph012jg-bash52-017.drv
│   ├── m1qnbq0pwlsbggjwwxwbq93ni8ila0gr-stdenv-darwin
│   │   ├── nix-support
│   │   └── setup
│   ├── m229jqcgls8nd9ckl1zx559ld6f3y2cz-zipp-3.20.2.tar.gz.drv
│   ├── m399ccws7jjk88v0023vnscwcamp9xk9-m4-1.4.19.tar.bz2.drv
│   ├── m3dm6wlwm1w58824dhn392pz5ammvxbr-locale-118.drv
│   ├── m3jzhwg8h7fhy913lh27rmlpp36szg8v-libiconv-107
│   │   ├── bin
│   │   ├── lib
│   │   └── share
│   ├── m3r7mag3gqs7ywadw0q173qnmwpdlnj8-sdk-hook.sh.drv
│   ├── m52flz19mymd1j5kj7pbjpqvgk5a6pyr-ed-1.20.2
│   │   ├── bin
│   │   └── share
│   ├── m54bmrhj6fqz8nds5zcj97w9s9bckc9v-compress-man-pages.sh
│   ├── m6ba0cx9xqdji0dr54prys33vlk8asrm-python-output-dist-hook.sh
│   ├── m75ab8cpfsgx027spnwky8n2bky9msl1-lzip-1.24.1.tar.gz.drv
│   ├── m7cifmd438gi1yjshf3zbsv39h85va66-xcbuild-0.1.1-unstable-2019-11-20-xcrun
│   │   └── bin
│   ├── m7yimac3jlp5wwqqnppi62qjbpgvzlvs-libunistring-1.3.drv
│   ├── m9qvr6m0bylrjqb5ind6hfzsax14xys9-gnu-binutils-strip-wrapper.sh
│   ├── mbw21x9hxpxg2dizrpvz4z93r9ifza3k-expand-response-params.drv
│   ├── mbw3gd73zqn0c12kh6k9bpvvpx5cc753-python3.12-brotlicffi-1.1.0.0.drv
│   ├── mc5cx870f3x982gds5fq3p13k9z5rsj7-0001-No-impure-bin-sh.patch
│   ├── mdvd0ffl5id9zj9qmhmh3yya5z17y31z-nlohmann_json-3.11.3
│   │   ├── include
│   │   └── share
│   ├── mhc62w82sdszn146lgwnb0z2c5d2b9gw-getopt-1.1.6.tar.gz.drv
│   ├── mj5h9lkqzx3146b6dn526n9211s5mw4b-unzip60.tar.gz.drv
│   ├── mkadg3j7d4cq9mxxgm8x1pgq3gsg6dq0-file-5.46.tar.gz.drv
│   ├── mmq2qh88pqvpgnlrw6p7xps4f07zmgd4-bash-interactive-5.2p37.drv
│   ├── mnhrxypk6zkb462kyffrw5670aw360my-oniguruma-6.9.9.drv
│   ├── mpf9klxlhxfq4571q4vsgbsi1jczqfgr-cups-headers-2.4.11
│   │   └── include
│   ├── mq51m9p13fsbcm036dwy7sknggg9d5zw-source.drv
│   ├── mqh4284pl0w2ynvcppwc6z5cxzgf5c6v-006-disable-bitcode.patch
│   ├── mrqw4zq2wl0y7wrj2fazns5i9c4sc2g1-cctools-binutils-darwin-wrapper-1010.6
│   │   ├── bin
│   │   └── nix-support
│   ├── mrzpfh0ml9k07sw019ydagbb2z1q4sxz-add-flags.sh
│   ├── ms1p6rd83v7lp2ymqs5h7rfhj4gjcwjq-sphinxcontrib_serializinghtml-1.1.10.tar.gz.drv
│   ├── msf66qwbdwxl660wpd823crbf2jgf6m8-armv6-scudo-libatomic.patch
│   ├── mvpafhq9alp2vvxv7g288g6y7h34215b-grep-3.11.tar.xz.drv
│   ├── mxhsm8w2bfdqrh3zdhrvrp9lrfyjszsh-bash52-021.drv
│   ├── mya03w3qni0l2x282v7ykdd77dzl703h-libutil-72.drv
│   ├── n198dlpnc10acfygcii1j7jzbyri4ph8-setup.sh
│   ├── n21gz774cv5876qgn7q19vp9cjaz9nf4-zlib-1.3.1.drv
│   ├── n23klvksfvy6w6ydgqhq4k6i6y54ncbi-meson.options
│   ├── n2xjpxpd3faxwis2ayr1py6dbwczi9qn-cups-headers-2.4.11.drv
│   ├── n315a3g9bcxlypqzbm36nzrrg40h6lcj-cpp-precomp.patch
│   ├── n50qah6105r33farqnxq648xlvjqmm5c-findutils-4.10.0.tar.xz.drv
│   ├── n704avb6mpb9jpjs0wrbsaky7c502ckj-bzip2-1.0.8-bin
│   │   └── bin
│   ├── n9vidvqa3axgn7anaww39jz2yabxjipa-zstd-1.5.6
│   │   ├── bin
│   │   ├── lib
│   │   └── share
│   ├── na6i3zqb3ibphzzv8vhi86dl0n1s91b9-aws-c-event-stream-0.4.2
│   │   ├── include
│   │   └── lib
│   ├── nag8744n9skinpwdy17gc1gslkq8gsjn-readline82-013.drv
│   ├── nbc74zwyl19biy38ckiijcq6ynaxc2wf-readline82-005.drv
│   ├── nbx7s35hs5ya2sx7nbmqxnxzi512c57i-aws-c-io-0.14.7
│   │   ├── include
│   │   ├── lib
│   │   └── nix-support
│   ├── ncp4s7n5ghjmrfm58jpwhix42q0rkq01-python-imports-check-hook.sh
│   ├── ncykhkcc90ymmfdm6jykrpdk7qcki1z0-CoreSymbolication-0-unstable-2018-06-17.drv
│   ├── ndmny04bxpw9yspz4icg72yh0rpq2fkw-bootstrap-stage0-locale.drv
│   ├── ndpadjdaxqwmj8bwncjzy7l47iyqls9k-cctools-binutils-darwin-wrapper-1010.6.drv
│   ├── nfn8gj01b8k7ypmb384fb41pwxmggz6j-automake-1.16.5.drv
│   ├── ni1620if3kz6ya1gdmv6fa1mhzbhp174-expand-response-params.drv
│   ├── nix1n2a323q407cbnky51rvqyx5ms5cf-llvm-src-19.1.5.drv
│   ├── nj799q4bnwlf82bbbvsypb9cwvw47dwk-config.sub-948ae97.drv
│   ├── nk023fs3f3ihdcimx8yf3xp2krzm8nr3-compiler-rt-src-19.1.5.drv
│   ├── nl4njln3x7lhrm1dby6zyw4iy83bvy3x-mirrors-list.drv
│   ├── nlkidkdwgk1wps5j26d2fqfi7brppczx-copyfile-213.drv
│   ├── nm1mg4ilciiwhzkj26scwybw6x4ijpf0-coreutils-9.5.drv
│   ├── nm9f1qlvwip0g17laznraqcd5aa10rgz-bash52-034.drv
│   ├── npq79bzmi639jfyifp1nhwbvlixp6wid-source.drv
│   ├── npqvgz8c8w9kpj1gdma5bbn0pdkisyzp-CVE-2018-6952.patch
│   ├── npys6p5vqck7saz92r6wbkbwg65dnhax-bash52-013.drv
│   ├── nvn0q0zqwjkbpb312808yqs3xapqvmqd-source.drv
│   ├── nw3c02cq84mgx1jj7cd7kgirfspk1y8l-env-manifest.nix
│   ├── nx2fq4fqgkv4v456plmycvhglq8g71qr-pkgconf-wrapper-2.3.0.drv
│   ├── nx77l9qwx680kjsv12sv188mj825cqqb-0003-Do-not-search-for-a-C-compiler-and-set-MAKE_CXX.patch
│   ├── nxvdf6mim3w8m0i94m505qk9ikj2r30a-libsodium-1.0.19
│   │   └── lib
│   ├── nxxf8q111yqdnnnxnybmpl3i5yd9d3sm-openssl-3.3.2.drv
│   ├── ny42y6hs4p294rvnrwbmrpwzqghw2816-gettext-setup-hook.sh
│   ├── p0xbqdfvdplcs3s8sggndqmbvmz93jsw-bash52-019.drv
│   ├── p2cjik46zvb240av68mv2wnycc63j6gp-libresolv-83.drv
│   ├── p2fp6i7hjx9af1wbwr32k217wp2dxmiw-absolute-paths.diff
│   ├── p2z73r7d0sw2hqn5wznyis9qb7d7hdcy-clang-wrapper-19.1.5.drv
│   ├── p30b2nmrr8cy4wqbl1w6ng87s51p5vgs-lutok-0.4.drv
│   ├── p46prhgmv7ibjh9igfkbc6zfxbbi6sk5-dont-hardcode-cc.patch
│   ├── p55a764pi2f4kkx3adb43bxb2dnb4z6r-CVE-2018-18384.patch
│   ├── p5j8g8g63gpqp75zi6kdym2rzql83sr3-source.drv
│   ├── p5s4h8k5nnk0a8l0jdbdw3brhiqqs4dd-zlib-1.3.1.tar.gz.drv
│   ├── p6zflk3lfxv2rjpckiafgmzkp0mch967-libsbuf-14.1.0
│   │   └── lib
│   ├── p86c38va977n9lyw1lqbxx0syl0vllph-add-flags.sh
│   ├── p87ki1g93i9f1v6ksdz69kprvx6zzgdl-CVE-2022-28805.patch
│   ├── p8b1z6n9qcgy4x6q3cmsdzx60yad9d1v-0001-Update-tests-for-Python-3-and-Nix-sandbox.patch
│   ├── p8idd7s46jsxz8y8lk33c1ng0vnj1sz7-libev-4.33.drv
│   ├── p9laigmhgrqbx0j1f6dbyc9zgdjx0lvw-001-fix-rpath.patch.drv
│   ├── p9m0bsw49c5m6wnm3m4fs97yx5rxcmfj-coreutils-9.5
│   │   ├── bin
│   │   └── libexec
│   ├── pag6l61paj1dc9sv15l7bm5c17xn5kyk-move-systemd-user-units.sh
│   ├── pbj837qjmq7b3n1p7jfpg4sfkc06nfgw-xz-5.6.3
│   │   └── lib
│   ├── pcbfhr5v6sdll6ykh5vb9g6f6dqj496p-source.drv
│   ├── pd12gxqpbf5lfrf800k7dc1vvy4sf8qg-update-autotools-gnu-config-scripts-hook.drv
│   ├── pdcj2chp5c2gvm2jc3shbajfc62kbx1i-CVE-2014-9636.diff
│   ├── pdh1d188s8ck4c1cf81ldmx5r12yr60x-file-5.46.drv
│   ├── pdqbag9saj8i15pq5226i40gga55jnfy-sdk-hook.sh
│   ├── pf7919pkd4r4rvngp1pwbgb5jvk4ag11-0011-Fix-missing-includes-and-silence-string-format-warni.patch
│   ├── pi07d6xbcg53nq9i2r5lh5j8363a1fp7-gnused-4.9.drv
│   ├── pibc5836dji5difn4ymig31rpigvmfp0-pypa-install-hook.drv
│   ├── piyf71rpcx0cq04jdm9s4d7vaphwkz47-source.drv
│   ├── pjkn6pb0mb1654az66h2f2mkzmzgghb9-tzcode2024b.tar.gz.drv
│   ├── pm01z2ccwdw4i65zhr9bs31cg07j4hq7-adv_cmds-231.drv
│   ├── pm08hy0dzswr0wj3n7nczm5pbzzjxdh6-darwin-sign-fixup.sh
│   ├── pn1rvisdppcb4jn7l28wqi6dqws33zyh-libresolv-83.drv
│   ├── pnz6hpy3j088fsanxs5yq2d6b0gr3ily-patch-2.7.6.drv
│   ├── ppahijfhlrjvpw5757f8hjrmhxck4x3c-bash52-012.drv
│   ├── ppm26x60zvaqzapqjnp540rislz3ml48-autoreconf.sh
│   ├── ppy39rf5hfk20if0qsb0vblmv2d0kpis-config.guess-948ae97.drv
│   ├── pqpw5hmbgqsvw82v767lgcj2b5lzq56r-adv_cmds-deps-private-headers.drv
│   ├── prz7rswgzzc7anyzi1dv58b2arwa0vws-python3.12-jinja2-3.1.4.drv
│   ├── pxs0lwlh8hazlhcx1y78qy2yhgz6hdjq-editline-1.17.1
│   │   └── lib
│   ├── pyxq4hq68klccg2c1i1bc2dmxkb4b29j-cctools-1010.6.drv
│   ├── pzh8jggxli72r5pj8q0iq0b6a24xqgj5-perl-5.40.0.drv
│   ├── q06rdjg4ds7syphykpx00vsyrni79143-bootstrap-stage0-llvm.drv
│   ├── q0pm0j6gy2w3n40w4mzwahzjlcckdnx4-sdk-hook.sh.drv
│   ├── q14n7xivsfrsfvpkvf2id38cs4aj58yb-0017-Fix-time-format-for-musl.patch
│   ├── q1qahwz0n23rim93q6sclwa1cxl8ynlh-source.drv
│   ├── q3rd6xgjwwvflpq1q9f31b95z2hkkjhb-bash52-031.drv
│   ├── q3wmlji8javn1ncc4rgg02vcxvw02rr3-adv_cmds-deps-private-headers.drv
│   ├── q4zicjr780xd4z7rvh4jld4cb1xwy2mx-pygments-2.18.0.tar.gz.drv
│   ├── q53cwr1pw15iq8z4kq5x79afgm7660wq-pkg-config-0.29.2.drv
│   ├── q56k4qz1l82x5nr8dv2l4jc0bwn9bzgx-label-before-cfi_startproc.patch
│   ├── q7ay1wcpyna5jgswpgp5w6ym42pyfz5f-python3.12-sphinxcontrib-htmlhelp-2.1.0.drv
│   ├── q9h2x1brjsxxb7s0jd30zkzbhq5qq7f0-bzip2-1.0.8
│   │   └── lib
│   ├── q9y8s07nhs9x6s5cmgdcvv83hy0hl7rw-curl-8.7.1
│   │   └── lib
│   ├── qa8c915dvll71yxn21lirb1rk4pws8hc-bash52-003.drv
│   ├── qbmr7py68sn38glycgyg211kdy98xkj0-pytest-check-hook.sh
│   ├── qc61zf963fnanwy7cdj2v6vvy4nlanl7-gdbm-1.24.tar.gz.drv
│   ├── qdg94llm84pbmi7wgxzpndhd6za6d3k7-sphinxcontrib_applehelp-1.0.8.tar.gz.drv
│   ├── qdv28rq2xlj68lsgrar938dq38v2lh5b-multiuser.nix
│   ├── qf40fpbljwvxplqzjn2v0j02zmzwyfy7-nghttp2-1.61.0-lib
│   │   └── lib
│   ├── qfxm2jg2hl3w7g28g5f4z7ag7lbxcx4k-python3.12-pytest-mock-3.14.0.drv
│   ├── qgjf7i1r086clvm0a0w5yj6sbyk2hgam-libxml2-2.13.5
│   │   ├── lib
│   │   └── share
│   ├── qh6fn4k82dg668qn7hw7cfxbxggijy8a-455bf3d1ccd6a52df5e38103532c1b8f49924edc.patch.drv
│   ├── qibwgql63779mj8q70zhggjp0qcil8yn-clang-at-least-16-LLVMgold-path.patch
│   ├── qkjr5yfzchf4zic7gsvmnhzrprpxkp6z-libbfd-plugin-api-header.drv
│   ├── qmaaibbcds3bccz8b959mz9f579mrxcp-004-unconditional-ksh-test.diff
│   ├── qml1xsnnpk71rjq9lk6fvk4wa3p0avvh-python3.12-pytest-asyncio-0.23.8.drv
│   ├── qn025626cg3qif6bnn9lp75bblhday14-jq-1.7.1.tar.gz.drv
│   ├── qp3m5hm44g5542cp5bngm0xs8w33sbm0-version.patch
│   ├── qpv75k113dsrpigvy1qkkn2fvkzr5v90-llvm-19.1.5.drv
│   ├── qrzgqmw9yamwalrlyqdl3dg5lwd16df8-bash52-005.drv
│   ├── qs6qkd5r8kjlmwbvj4ml74jfqxl2nchd-CVE-2021-4217.patch.drv
│   ├── qswxjw0imlvkmaiyzwzbmrnfcnd1arvw-source.drv
│   ├── qvyl9jgm1a1mlix44qbsgrd1ipwciamk-X86-support-extension.patch
│   ├── qwk0251s8xdwpf9ykd6asjagd12mmjn9-tzdata-2024b.drv
│   ├── qwspa7k7xrhfxxc9riy4s7s5rvcwhasx-bash52-020.drv
│   ├── qx1v6z5rx8rh881aw5jq6s4k9g25lvvj-bash52-013.drv
│   ├── qy021bw103zkhjnycjjyl7j8swz6rpwz-fix-darwin-dylib-names-hook.drv
│   ├── qz2b76krhv1fhb3hyxz5fiiv1rrnxl53-CoreSymbolication-0-unstable-2018-06-17.drv
│   ├── qzf6bvkjaq8zscxll85x2m74d9nhyp64-bash52-017.drv
│   ├── r0nh13i6wlvw6k1g8p1px0vqmhxf5sif-0002-Remove-impure-dirs.patch
│   ├── r0xjvvl61d1ckjxzxqv0giblhb4901a8-cctools-binutils-darwin-boot.drv
│   ├── r112dk8w7zvdjipki58ch00m825li7fq-virtualenv-permissions.patch
│   ├── r1159ddl9zmsfg2dh98i5xcdh940qjga-DarwinTools-1.drv
│   ├── r6ib7q0nqvv2hq9fz4v1pwnd0kp30liz-gen_compile_stubs.py
│   ├── r6ksiw954ypwxy43bivk7qsw9ycjd1j6-pkg-config-0.29.2.tar.gz.drv
│   ├── r7cgqbglygj0rnx54qad8m5j2vlbp8ry-sqlite-doc-3470000.zip.drv
│   ├── r7sqrq0f1b65limzy4va6b0ls988psfi-autoreconf-hook.drv
│   ├── r823b8kgr3rlzcb5jg1mqnadqmr6izxs-Use-system-toolchain-for-usr-bin.patch
│   ├── r8nzdz22z7gqfjk84mqr82d55ii1397g-cctools-1010.6-libtool
│   │   └── bin
│   ├── r9c8p8lpsjfy6ymf79rgr3qsqq12c9jn-libutil-72.drv
│   ├── r9i9shqdgy2byws88yk02giy7ngvjcnf-expat-2.6.4.tar.xz.drv
│   ├── rc49slip0cgwagj1bcnb9wwgpdsz2mry-bootstrap-stage0-libcxx.drv
│   ├── rd906jfbf6m1pdh4hyb2zrq14y3b57ag-readline82-009.drv
│   ├── rdglm0hb19q9vga1ywfbs379yk1lww21-user-environment.drv
│   ├── rdkdki1f24q8mqgnbsyk7gmh28c027ks-CVE-2014-8139.diff
│   ├── rf1alh5vh79fz1kr1j8r7pb38b5akagz-python3.12-requests-2.32.3.drv
│   ├── rg726g6q75cs31rxiaq9ncsknbghvp4l-ncurses-6.4.20221231.drv
│   ├── rgf2xf39gyb693k2m2dg63j6zgyygl0s-make-shell-wrapper-hook.drv
│   ├── ri9mgbjshkl4jhz3ss7lhs5mmbhcnr8a-python3.12-sphinxcontrib-devhelp-1.0.6.drv
│   ├── rlbpzcksr20x8psrzr878s7khh7smvvb-CoreSymbolication-0-unstable-2018-06-17.drv
│   ├── rljfcci6z1dkxfhb8ji39cfqyqz4rhsm-python3.12-bootstrap-tomli-2.0.1.drv
│   ├── rmh7gp2zhdgxrgs6lhj7sdma3h71ng3m-libiconv-107.drv
│   ├── rq41inv92jszcs5x62nc5cci5hapbjpw-003-libuv-application-services.diff
│   ├── rr4ci71jlbzbyxp7j9k52b3mj9lgdzzi-libxcrypt-4.4.36.drv
│   ├── rriv0j8lcnqjks2qv1kpsnw9hzw97f6b-tar-1.35.tar.xz.drv
│   ├── rsl5l4jq2nh83p4y4lgqyff4ajhlwhm5-source.drv
│   ├── rsq5n734s12c77nzg1f8cvk2a1g9iqvh-autoreconf-hook.drv
│   ├── rv3rxs22l98hjkrmpdsdzc64ry40hnx5-source.drv
│   ├── rwhzv6fznlp0j2biv17mim3vdgbi825h-automake-1.16.5.tar.xz.drv
│   ├── rxgi2l6jrgd5xmrrsbcv5cwi558lb36m-CVE-2019-13638-and-CVE-2018-20969.patch
│   ├── s046piarfqid5ry32kfdi2a7hrnjz5vi-meson.build.in
│   ├── s0vbi9hm54h2vr94y5f4p4qiymhgyw4f-sphinxcontrib_qthelp-1.0.8.tar.gz.drv
│   ├── s12j89r0j78cdlkw0qvcz2swcbgvq7nn-bootstrap-stage0-compiler-rt.drv
│   ├── s32hmdr4r2lkhy5c7z0rkm17jzl4393f-libobjc-11.0.0
│   │   ├── include
│   │   └── lib
│   ├── s4xzpbb2irf2ijmg4vp34lzv624jkbac-000-nixpkgs-cmake-prefix-path.diff
│   ├── s5695a6bx7kfxvbcvcxbg5b55iga4a8j-stdenv-darwin.drv
│   ├── s5myj3ybdn7wrsfpydj48mm24vnvw6bc-no-ldconfig.patch
│   ├── s6yvzi6qsswkppv5w5w6w55hs1lrabf0-source.drv
│   ├── s8q2xzixrsps9h64dpvpajv6pjy65kfl-0010-Update-configure.ac-for-openssl-libxml2-liblzma-and-.patch
│   ├── s9959x4fjp0xwhplyidbkqrdzja96m7k-source.drv
│   ├── sa63n5324skjff8mhfix600kzkprm85d-python3.12-iniconfig-2.0.0.drv
│   ├── sa7v596ba4gcp7051mrmvvdqdix35z62-perl-5.40.0.drv
│   ├── sb9khldf86fff5wv3qdlc6f2n916n1mk-libxcrypt-4.4.36.drv
│   ├── sbh155n06jhf56knlbg5czwz9qy50jri-source.drv
│   ├── scm4qjz5f58j6ad9zcz9070l3ypdz3bg-source.drv
│   ├── sd5cfmmkvn2m5r0ikgl7inrdzxcnx3h8-wrap-python-hook.drv
│   ├── sd80d8x135grzj9bl3iq6zfhv36whq03-flex-2.6.4.drv
│   ├── shsr5yx0asa0fjj22f9yv9n4jmmg6c53-apple-sdk-11.3.drv
│   ├── sl2m41c0j92dgc1jyfnlwdggq5g52ybf-apple-framework-Security-11.0.0
│   │   ├── Library
│   │   └── nix-support
│   ├── sljnds508qwixxaj5i9gvmj61brj46ic-source.drv
│   ├── spx7wc6a2k0hlrfkjdnssv0s096fydm0-bash52-025.drv
│   ├── sq4h6bqjx12v9whvm65pjss25hg1538q-nix-ssl-cert-file.patch
│   ├── sqv0c9wh9xzn6p6hl74dwjxc1ga27lhg-bison-3.8.2.drv
│   ├── sr0y3jrkw3yg2ldpv53dspb5r8mybx84-ld64-951.9.drv
│   ├── srvwvldrccpnzaxgznkd842dzmffcbpj-DarwinTools-1.tar.gz.drv
│   ├── srz8z08dqpqcvcmf9vbplwvgxn1sp4fa-gettext-1.07.tar.gz.drv
│   ├── ss149pfx03xmyz5q43wm8rdxxn0cccif-setup-hook.sh
│   ├── sscvxyl8f0sky55zhrvirq2jsgw2ylif-perl-5.40.0.drv
│   ├── ssxs0kj7akqn4yjmin0y3j7gpr0kf0fk-catch_conflicts.py
│   ├── sw1a9vcb3qbd7q7kcb75b8s5irf7jd2g-ld64-951.9.drv
│   ├── sw2bfbv9jfz2b99c8qk178xx06qf1x5i-0002-Fix-ISO-2022-out-of-bounds-write-with-encoded-charac.patch
│   ├── sx7pl40b81hai2gmz1zjfky1wwcwc4sm-libpng-apng-1.6.43.drv
│   ├── sz6rhpf50kqh75fhqwl75q6dm6fr9xyd-CVE-2018-1000156.patch
│   ├── szbxyb8zln19chl1wj8yc0h2b9brgxjb-bash-5.2.tar.gz.drv
│   ├── szkqmcy1y119yvkkbz10rfjzffnb1iai-bmake-20240921.tar.gz.drv
│   ├── v1mci0m3hx23qvrkpdcncbyn4s84q8wq-python3.12-flit-core-3.10.0.drv
│   ├── v25b28yqfkh8yfcpnblsd71sya3bf3g2-make-shell-wrapper-hook.drv
│   ├── v2phna292s3qs3qn3v6hyviq4hhycl0g-openssl-3.3.2.drv
│   ├── v3zpqwdqyw0axm5pbdx6nzp3pcagb1fa-user-environment.drv
│   ├── v53z5xk22p1j4qd8mnnf0fkp0zy4nlma-tapi-src.drv
│   ├── v5w9b1ybpgfl5qbp5wm6bzfbx0bhpv9y-meson.build.in
│   ├── v6x3cs394jgqfbi0a42pam708flxaphh-default-builder.sh
│   ├── v9034cqc4h5bm10z4vz3n1q2n55grv5y-role.bash
│   ├── va5d6h5nbfc67m6iqhqw77dnf9k25q19-libffi-3.4.6.drv
│   ├── vaap4xhlzlhs0i23sg9p6q062zxfcchk-gnu-config-2024-01-01.drv
│   ├── vdrchh5qcy52l905wg67j5yibi708sy3-python-output-dist-hook.drv
│   ├── vf5n7vi7g4hqxgmi3l3x0b7h95s81g32-locale-118.drv
│   ├── vg5jy5y6zwk9nhd82dynjnz9fqna609v-bash52-010.drv
│   ├── vj56nl1m0flnzf7qjisq7jymr3brakxj-zlib-1.3.1
│   │   ├── lib
│   │   └── share
│   ├── vkd33fi3bi0rkafc7pg51r7kbmg5gmqd-python-namespaces-hook.sh.drv
│   ├── vn1kva8g1hrgycq01l3mqr2ha8q20cf0-python3.12-cython-3.0.11-1.drv
│   ├── vvc3qzdvbdlh5pv585gmh4nimxcz4xvb-python3.12-babel-2.16.0.drv
│   ├── vw3kiq8fjily8hhck7k9dp8bif5834qg-libidn2-2.3.7
│   │   └── lib
│   ├── vwxmab3wgxsvxb1y63z5v3shpdxiqalz-readline82-006.drv
│   ├── vx4w8c0v5yywyc7iblkxgbi5zfbknvs8-texinfo-7.1.1.tar.xz.drv
│   ├── vxdnn960ra9if78giw220xrpvqcwi5n4-python-remove-bin-bytecode-hook.sh
│   ├── w0dp4y3r2nknmspzn5mv3c6paj0m77di-patch-2.7.6
│   │   ├── bin
│   │   └── share
│   ├── w0nkhndkvg5m349icyag8hw59f9gagyb-bootstrap-stage-xclang-clang-wrapper-boot.drv
│   ├── w21wv8n396m41xiys6s9r39hdfpcfg5d-kyua-0.13-unstable-2024-01-22.drv
│   ├── w22chnim97qzwxkraaxq0pchf8z3k8bj-boost-1.81.0
│   │   └── lib
│   ├── w2jqy7vgwm5grmv72k9diym0k1l44gvw-source.drv
│   ├── w3zv5r77gah2v00m521k1lbcfcff259j-Architectures.xcspec
│   ├── w4nv2riyn7bkc9393w0hqw5pdi9mi089-sdk-hook.sh.drv
│   ├── w58ybjamf406l2vkxxv83yfszhv5d7qk-bash52-005.drv
│   ├── w5a41j3qjkqx90c8fpal78xcmghqanxc-pycparser-2.22.tar.gz.drv
│   ├── w9ar9qaq175gg4klyci0gnchpnx80dyg-CVE-2024-12254.patch
│   ├── waqrzd9pfdwp7mg53y6mxj3n125m25by-mirrors-list.drv
│   ├── wb1w87wq6jsd9z4wdz7as6s7rcq9xd19-make-wrapper.sh
│   ├── wb35jwbv6smxk7zlp5vgikg1vca6raba-bootstrap-stage2-stdenv-darwin.drv
│   ├── wbnkyyw45499cz84z2ydc76dqdlw9dcj-readline-8.2p13.drv
│   ├── wdn9w1jidgzy2zs8ks5wm35q1p897sly-expand-response-params.drv
│   ├── wfmihvz8yyzhh55bb82fql0s6pdqxsnv-pbzx-1.0.2.drv
│   ├── wgrbkkaldkrlrni33ccvm3b6vbxzb656-make-symlinks-relative.sh
│   ├── wgssgzixavcrmqc21nr8kdp9hvd67ahc-bash52-014.drv
│   ├── wjhzc9ql2bqw954pffvfhm3ljbxnli9n-0018-Replace-memcpy-with-memmove-for-musl.patch
│   ├── wkadfwbhn9b4kdih88j7izzy20qw79bk-clang-wrapper-19.1.5
│   │   ├── bin
│   │   ├── nix-support
│   │   └── resource-root
│   ├── wl8lzf0dqnzbbhn18llpq4yzpfvkvizi-ToolchainInfo.plist
│   ├── wlz97ssm7zy5c8h1gi2yj9clgilpy20d-openssl-3.3.2.drv
│   ├── wm2vndzq7rv5xf5nfv4rhvsi1qnjmrk7-gnumake-4.4.1.drv
│   ├── wmvs87grg3gm6fd9i7ay85gdqarxqayz-find-xml-catalogs-hook.drv
│   ├── wnwz26j30wlsqazs7h8lyw8z0b1cib3c-bootstrap-stage1-stdenv-darwin.drv
│   ├── wpdjbz58yv6xb2rwg7mg07i8kl83mrnw-readline-8.2p13.drv
│   ├── wrgwf3kjv67xfpfak34sgawz95xxpi9f-publicsuffix-list-0-unstable-2024-01-07
│   │   └── share
│   ├── wrjdma5q9dg2vlixyg11kcgqv2pm94gq-xcbuild-0.1.1-unstable-2019-11-20.drv
│   ├── wrmgipxmv44axw7ssmjy14r8x64kl5j4-bash-5.2p26
│   │   ├── bin
│   │   └── lib
│   ├── wrvpg90jy5w730kbkxrl922c5m17hyqw-bootstrap-stage-xclang-stdenv-darwin.drv
│   ├── wsh3xdgc4ks5nmr3mnaxsip2fndl283p-readline82-012.drv
│   ├── wshxpsb2a9fmawb2ms62fv4icymn7wsp-python3.12-installer-0.7.0.drv
│   ├── wys5hz3ivnir7q9mzdgrhyi7rhyinr2b-0004-Fix-compatibility-with-openssl-1.0.patch
│   ├── wzp0giqc4ny7812pmn4ga5darb3xvr7h-source.drv
│   ├── x0ll5lnagy6lg7hgvqb26il3qnmsqisd-sw_vers.patch
│   ├── x367mik18ghx2slnvzvpknzybzvp8fn5-python3.12-gevent-24.2.1.drv
│   ├── x3qnhi5jln5w18d5dlm9j4b7bqylf293-source.drv
│   ├── x3wcyjkmgs869vhkkz4i88g2g07ybc7h-macOS-SDK-14.4.drv
│   ├── x4255s9h2x6wzj0p4vp8p9d7z62i51y5-builder.sh
│   ├── x47djw2l1dkkd0703w46aql7xn76jymm-die-hook.drv
│   ├── x4dkss3ik4dkacak2sdky6r52wri5pck-setup-hook.sh
│   ├── x7vgx584rdrff1avarn4i3cq0r4balvd-aws-c-http-0.8.1
│   │   ├── include
│   │   └── lib
│   ├── x84h0mb62685v243g7wcn2k6df2szxp0-gettext-0.22.5.tar.gz.drv
│   ├── x868j4ih7wqiivf6wr9m4g424jav0hpq-gnu-install-dirs-polly.patch
│   ├── x8cdwcfr5a8kws371n2lgkhisgqc7l31-0012-Fix-char-signedness-for-ARM-and-PowerPC.patch
│   ├── xbis5ib1iy2lm1qdjqm3cp53hyn2pqfx-readline82-013.drv
│   ├── xc3qnr9izav194ingf9mr2s9gw25q80a-IOKit-11.0.drv
│   ├── xd1dmgf14ig9534021lscpjhzl9j1m7g-shell.drv
│   ├── xfyavb7anyn8aamd0wsnkgf8qbwm0x5x-gnum4-1.4.19.drv
│   ├── xhx5k9ljfydmf76hfk2hxgb1sgg3205y-libpng-1.6.43-apng.patch.gz.drv
│   ├── xiq4ig2yypmpzf177bnhx140z2fq4zx0-source.drv
│   ├── xjz0ywafbzh3vapmp86vqr90jlsfnl48-aws-c-compression-0.2.18
│   │   ├── include
│   │   └── lib
│   ├── xln1n349s5idq6ilwvcpabwpyw0mw0ps-llvm-19.1.5-lib
│   │   └── lib
│   ├── xn7sbm29b0ri3ky8sl3ilc43ad989m5v-002-clear-old-rpath.patch
│   ├── xq7xkvk0am0vdqd47h4f2j76nxp7i767-python3.12-pathspec-0.12.1.drv
│   ├── xr9qgbi0wik917d09722zyn3kl1d1m3x-compiler-rt-libc-19.1.5.drv
│   ├── xrvbfm0ahaiik1vlxzn3vsp5gyhksy2n-setup-hook.sh
│   ├── xs5clqmxk7pbk8y0j6f7lxpi0swv3gcy-bash52-002.drv
│   ├── xsc6bq51if8vzc1z50qhi03as0hnhblr-ld64-951.9
│   │   ├── bin
│   │   └── share
│   ├── xscmcmlj24iazyfbwp561x693c3gqad3-bash52-001.drv
│   ├── xsmki2ajqh9pz280h7lyr9j1n6gs68qb-setup-hook.sh
│   ├── xsnw6j1brr7r30j3naamqd86jjkhhxrr-perl-5.40.0.tar.gz.drv
│   ├── xvkwcziqihg5vzwxw8s2hfk8kwddpfkb-env-manifest.nix
│   ├── xwgkpsmb0r44c1fdvy9ab9lr6ws6lsvs-findutils-4.10.0.drv
│   ├── xwlxckkh57pqsivkzp14f58a8h2c4mgb-bootstrap-stage3-stdenv-darwin.drv
│   ├── xxfpb2sfscpljp59gwwxzh1m8bvdxr43-python3.12-sphinxcontrib-serializinghtml-1.1.10.drv
│   ├── xyff06pkhki3qy1ls77w10s0v79c9il0-reproducible-builds.sh
│   ├── xyvs26vy7pcazf6ymcj86q727b59jd9a-typing_extensions-4.12.2.tar.gz.drv
│   ├── xzggicdrpg0jwxypn9c1167yvz6231q0-python3.12-hatch-vcs-0.4.0.drv
│   ├── xzkmf9nskd1ab8vqdh80dr3mfn4q3wgx-python-namespaces-hook.sh
│   ├── xzmm3ikv0pinxspy0jwz4jkbjvl7815q-bzip2-1.0.8
│   │   └── lib
│   ├── y0rbc4r8cl2360ypj7nll31kv81fldbl-copyfile-deps-private-headers.drv
│   ├── y20qljxxc64sm79yf85irnxz2ldnsnxi-readline82-004.drv
│   ├── y3pa7iaxn9chh784p9v1ax4wrzgqj23i-bash52-020.drv
│   ├── y4vv5fm874y0wbq5qpj6wzn7kbigrpp3-ProductTypes.xcspec
│   ├── y5pvzq3zw4vbnjbg5913y1q7vf9av42g-perl-5.40.0.drv
│   ├── y6bl520y42q8jhwjybk32lsmgcxf8b71-alabaster-0.7.16.tar.gz.drv
│   ├── y6q3p5rxx42i9869w4a04wmhm5kgsqbr-ld64-951.9-lib
│   │   └── lib
│   ├── y8qr6bfq1v15wmdkghw1nxfiwca92a6g-source.drv
│   ├── y9v96xfly4xffzisxnrqly644jcm07jy-DarwinTools-1.drv
│   ├── yarsr0xznmw0g8xd68q9661w2ijjhji2-make-binary-wrapper-hook.drv
│   ├── ybx1n4pnrbh3pb5ranin0ns5m1z7z0sf-ps-adv_cmds-231.drv
│   ├── yca1pg820mwrky7py8r1mf6k0cglb8rb-nghttp2-1.64.0.drv
│   ├── ycnrdf6fjizqapj0i7mk1zgb3rz6bmrm-python3.12-pluggy-1.5.0.drv
│   ├── ycwm35msmsdi2qgjax1slmjffsmwy8am-write-mirror-list.sh
│   ├── ydc2aq6ykhwbj9vs0anp6si15f6l1skw-0002-Rely-on-libcd_is_blob_a_linker_signature.patch
│   ├── yhmisrzslyzjlqq3mqfv2hw309abg4ps-python3.12-sphinxcontrib-applehelp-1.0.8.drv
│   ├── yi31nbw1bfvl07v92w3r587mhvvg4m4b-bash52-028.drv
│   ├── yibwyn4pk9md0kyv451g0bkiqdbfdddm-freezegun-1.5.1.tar.gz.drv
│   ├── yl59s1v3fhbl8n6yb91q5f4imwhw81k6-nss-cacert-3.107.drv
│   ├── yl616m02dyq048i79vci2a3ymrqxgxny-libunistring-1.1
│   │   └── lib
│   ├── yl75lkf8g5jjg5v2wm4ivl0s12hbi9d0-source.drv
│   ├── ym8zqxn8v0rm0vykpqpqwrvn06hkambn-libcxx-src-19.1.5.drv
│   ├── ymi8xq5lxkjhyhk6sfb5d32nkbqz9pvg-substitute.sh
│   ├── yndags23r8fss0a8ib4dxrq2jyhqqxaw-fix-darwin-dylib-names.sh
│   ├── ynlpr8z8gjml8xgr141ybah4z78k39cg-python-dateutil-2.9.0.post0.tar.gz.drv
│   ├── yp52g0wbhcr26dfwbbn0663qml3hfwfd-0015-Fix-segfault-in-xar_attrcopy_from_heap.patch
│   ├── ypp37qb3nbmm8vwb06idzbzq05zkchm3-c-ares-1.27.0.drv
│   ├── yq0lz1byj4v2rym2ng23a3nj4n6pvqdj-pgrp-pipe-5.patch
│   ├── yq55j04dmpqfhz0wj08g1sf00avjj7pw-bash52-016.drv
│   ├── yqlf6fm29z52hvj5q8z73858jnphmpr9-001-fix-rpath.patch
│   ├── yqwx9yln5i68nw61mmp9gz066yz3ri99-0001-msginit-Do-not-use-POT-Creation-Date.patch
│   ├── yrwphan7mi168vnn4bamwg5795rjbkzh-ld-wrapper.sh
│   ├── ys7raz6zja2nn3y96gpasdblii780s60-bash52-029.drv
│   ├── ysnrj1i5jlbmfj1a7qah5ijf97k46pvi-libssh2-1.11.1.drv
│   ├── yv9733w80ajn6vn7l9ksnbjfq02yany2-gawk-5.3.1.drv
│   ├── yw83bh3592x5x812hgdi9skk4wnza140-gmp-6.3.0.tar.bz2.drv
│   ├── yy5b97nl5x9fdrrh3041vn9nf69z08xm-autoconf-2.72.tar.xz.drv
│   ├── yzhfv9skl9hbwi3hriawb1ilw0x9mbqg-bash52-006.drv
│   ├── z0zn93apqqlb1zrkqrd85dw63qpr97gv-file-5.46.drv
│   ├── z1akqi4c4b5fa29z57gbnd0kwh3l4c8h-5.2.darwin.patch
│   ├── z27xlhl5vc4s58wh5zg286n2m66wccv0-brotli-1.1.0-lib
│   │   └── lib
│   ├── z3pi0klghnwzxb5l3bcy8p5v0c7rw4ab-CVE-2019-13232-2.patch.drv
│   ├── z4kvb7mmq3cyg9wdpxjsglxpy6dmkyn0-readline82-010.drv
│   ├── z5682qgrpw8gyvpw2pafr8r6ip05qdkn-libtool-2.4.7.drv
│   ├── z56b96n467ghqbipw5wbczfk3h630yb6-bash52-033.drv
│   ├── z6g7i13bj7i4pmp51d8cjm6qfx1pnqb5-make-binary-wrapper-hook.drv
│   ├── z6rfi1v8ri8gmjv1bi1vqmqrw5ich5xg-cctools-binutils-darwin-boot.drv
│   ├── z6xg489sa53swz3d8rx2fc360qai8d4s-source.drv
│   ├── z745d6wsdh21mjp8i0sxjlzmkhkbzw7g-env.patch
│   ├── z92mp8vpy41sc5x6ljhwwp1mjlrzg3aw-setuptools_scm-8.1.0.tar.gz.drv
│   ├── za3a911a958pcyvz3wigmap56qi5l030-aws-crt-cpp-0.26.8
│   │   └── lib
│   ├── zb8y7ifcjk14isylqy2ajk0659r2dc63-sqlite-autoconf-3470000.tar.gz.drv
│   ├── zbba1mqnm6nw0hc736by0f9cjp1z5767-setuptools-build-hook.drv
│   ├── zdgxmq5l91bwz0yg56zf0f85g8w76p3f-python3.12-hatchling-1.26.1.drv
│   ├── zf662cmb78glliw564cn84f7s15p1086-snowballstemmer-2.2.0.tar.gz.drv
│   ├── zi0m9pfmvy5lw89x7a8x674rm99i8qiq-setup-hook.sh
│   ├── zjb2q6v01x61lnghzpm62imz0ldqklw1-gevent-24.2.1.tar.gz.drv
│   ├── zkiyzm58b6cgv6k4b3rql3ybwpygx3n7-compiler-rt-libc-19.1.5
│   │   ├── lib
│   │   └── share
│   ├── zkxs815zbdy4xkmjrksviiqaqn3g1ylg-source.drv
│   ├── zm9v5j5w1nxkzryrr88x896hlrn3l7fy-readline-8.2.tar.gz.drv
│   ├── zmjg2cgh3l8wh26wa2mfa9ynn6qlq370-PackageTypes.xcspec
│   ├── zq22rvyy29sgnq9d6ypa4826s3v2fm1w-add-hardening.sh
│   ├── zrdfxpiksk1alg6cib38ibx8yzj2c8rv-adv_cmds-231.drv
│   ├── zvsi06713dgy3m59s05pmc3r8szqvi10-patchutils-0.3.3.tar.xz.drv
│   ├── zwbpspmmnacvlb4sr5k96c5ql2yns8w9-python3.12-psutil-6.0.0.drv
│   ├── zyiqikcl95q99m1kc4pg4h2nnqpazmz2-python3.12-lxml-5.3.0.drv
│   └── zywn5jgiihvv0z60d8k2p8yxnj8yxs61-bootstrap-stage0-stdenv-darwin.drv
└── var
    ├── log
    │   └── nix
    └── nix
        ├── daemon-socket
        ├── db
        ├── gc.lock
        ├── gcroots
        ├── profiles
        ├── temproots
        └── userpool

365 directories, 1039 files

```