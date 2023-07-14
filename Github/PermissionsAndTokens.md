

## Types of accounts

* Personal accounts
* Organization accounts
* Enterprise accounts
E
very person who uses GitHub signs into a personal account. 

An organization account enhances collaboration between multiple personal accounts, and an enterprise account allows central management of multiple organizations.

## when 

Don't build a GitHub App if you only want to act as a GitHub user and do everything that user can do.


## Can a organization be Private? No!

https://github.com/orgs/community/discussions/23157

don’t have fully private organisations, but I think you might still be able to accomplish what you want with a couple settings.

You can name your organisation anything you want, including totally random characters, so that it’s unlikely anyone will guess it and go straight to the URL. It’s not likely anyone is going to go to github.com/uuurygveryrandomorgname9865vtttk by chance.

You can hide your organisation membership so that nobody can see that you are a member of this organisation.

In this way, the organisation itself isn’t private, but to find it, people would have to know the name of it - they wouldn’t discover it from your profile page, or just by the the name of a project.

As long as your repositories are also private, none of your work will be viewed by anyone who you don’t explicitly give access to either.

## Where do I see the Organization and enterprises I am part of?

Go to profile.
On left you should see organization and enterprises you are part of.

## How to hide my organization membership?

https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-your-membership-in-organizations/publicizing-or-hiding-organization-membership

## user to server requests

An API request used by an application that performs a task on behalf of a particular user. Where a task is carried out with user-to-server authentication it's shown on GitHub as **having been done by a user via an application.**

For example, you might choose to create an issue from within a third-party application, and the application would do this on your behalf on GitHub. The scope of tasks an application can perform using a user-to-server request is restricted by both the app's and the user's permissions and access.

The token used in a user-to-server request is acquired via OAuth.



## user to user requests



## server to server requests

An API request used by an application that acts as a bot, independently of any particular user.

For example, an application that runs on a scheduled basis and closes issues where there has been no activity for a long time.

The token used in a server-to-server request is acquired programmatically, via the GitHub API.