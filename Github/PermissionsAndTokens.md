

## Types of accounts

* Personal accounts
* Organization accounts
* Enterprise accounts
E
very person who uses GitHub signs into a personal account. 

An organization account enhances collaboration between multiple personal accounts, and an enterprise account allows central management of multiple organizations.

## when 

Don't build a GitHub App if you only want to act as a GitHub user and do everything that user can do.




## user to server requests

An API request used by an application that performs a task on behalf of a particular user. Where a task is carried out with user-to-server authentication it's shown on GitHub as **having been done by a user via an application.**

For example, you might choose to create an issue from within a third-party application, and the application would do this on your behalf on GitHub. The scope of tasks an application can perform using a user-to-server request is restricted by both the app's and the user's permissions and access.

The token used in a user-to-server request is acquired via OAuth.



## user to user requests



## server to server requests

An API request used by an application that acts as a bot, independently of any particular user.

For example, an application that runs on a scheduled basis and closes issues where there has been no activity for a long time.

The token used in a server-to-server request is acquired programmatically, via the GitHub API.