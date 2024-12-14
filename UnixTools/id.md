
## Display ids

The id utility displays the user and group names and numeric IDs, of the calling process, to the standard output.  If the real and effective IDs are
     different, both are displayed, otherwise only the real ID is displayed.

     If a user (login name or user ID) is specified, the user and group IDs of that user are displayed.  In this case, the real and effective IDs are
     assumed to be the same.

e.g.
```sh
% id
# prints below
# uid=501(jayshah) gid=20(staff) groups=20(staff),101(access_bpf),12(everyone),61(localaccounts),79(_appserverusr),80(admin),81(_appserveradm),98(_lpadmin),701(com.apple.sharepoint.group.1),33(_appstore),100(_lpoperator),204(_developer),250(_analyticsusers),395(com.apple.access_ftp),398(com.apple.access_screensharing),399(com.apple.access_ssh),400(com.apple.access_remote_ae)
```