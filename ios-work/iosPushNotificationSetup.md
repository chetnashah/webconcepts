

An iOS **Push Certificate is required** for push notification delivery to all iOS mobile apps.


## Capabilities and entitlements

### Adding Push notification capability

A capability grants your app access to an app service that Apple provides, such as CloudKit, Game Center, or In-App Purchase. To use some app services, you must provision your app, adding a capability with Xcode’s project editor that configures the app service correctly for you.

![addingcapablity](images/addingcapability.png)


Selecting capability from list of capabilities:
![select capability](images/capabilityselectionlist.png)

All capabilities list:
![All capabilities list](images/allcapabilitieslist.png)


### Adding background modes - remote notifications capability (different from Push Notifications capability)

![background modes capability](images/backgroundmodescapability.png)

After adding background modes capability, select "Remote Notifications"

![background modes added capability](images/backroundmodesaddedcapability.png)

## Registering with APNs

https://developer.apple.com/documentation/usernotifications/registering_your_app_with_apns

## Creating a Push notification certificate from Web UI

Click on "+" button on "Certificates" tab in: "Certificates, Identifiers and profile" Page.

You will see below screen:

![Generate PN certificate](images/GeneratePNCertificate.png)

* Then generate Cert Signing request using "Keychain"

![Create CSR from keychain](images/CreateCSRfromKeyChain.png)

* Save "CSR - cert signing request" to disk

* Upload CSR to create final "Push Certificate"

![uploadcsr to create push cert](images/uploadCSRToCreatePushCert.png)

* Download and install "Push Certificate" - contains both private & public key.

![download push cert](images/downloadyourcert.png)

![downloaded push cert](images/downloadedpushcert.png)