When you create a new `Firebase` project in the Firebase console, you're actually creating a `Google Cloud Platform (GCP)` project behind the scenes. You can think of a GCP project as a virtual container for data, code, configuration, and services. A Firebase project is a GCP project that has additional Firebase-specific configurations and services. You can even create a GCP project first, then add Firebase to the project later.

Since a Firebase project is a GCP project:

* Projects that appear in the Firebase console also appear in the GCP console and Google APIs console.

* Billing and permissions for projects are shared across Firebase and GCP.

* Unique identifiers for a project (like project ID) are shared across Firebase and GCP.

* You can use products and APIs from both Firebase and GCP in your project.

* Deleting a project deletes it across Firebase and GCP.


### Firebase Project

A firebase project can have multiple apps.
All these apps use same cloud firestore and cloud storage.
Good use case is Android, ios, web app would fall under same firebase project.

If apps are going to use same data/configuration, it is good idea to put them under single project.

