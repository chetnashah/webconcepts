
A GitHub App acts on its own behalf, taking actions via the API directly using its own identity, which means you don't need to maintain a bot or service account as a separate user.


## You can create and register a GitHub App under your personal account or under any organization you have administrative access to.


## only organization owners can manage the settings of GitHub Apps in an organization

## App installation (and installation access token)

When a GitHub App is installed in a repository, you get assigned an `installation_id`. 

When GitHub is sending you a webhook event, it will include the `installation_id` as the payload. 

**You can then use the installation_id to create an installation access token.**
**The installation access token can be used to make API calls, similar to how you use a personal access token.**

