
### Canonical user Id

A 64 digit alphanumeric id for one's account.

### Policy

Describes actions only, nothing about identity or user.

e.g.
1. can create a instance
2. can upload an object
etc.

Also need to specify Resources that this policy applies to.

A `policy` is an alias for permission.


### User

A User might represent a person/application/API.
User gets assigned policies.

### VPC

Stands for `Virtual Private Cloud`. i.e. Your own private network.
Availability zones/centers are some sub region/data center within a region.

EC2 or RDS instances are spun up inside an availability zone/center.

A VPC spans all availability zones in a region.

Internet Gateway connects a VPC to the outside world.

`Subnets`:
`NACLs`: Network access control lists.
`Route tables`:

0.0.0.0/0 is also known as default. You can call it "everything else" other than what is already specified in your routing table.

With IP routing there is a concept of "more specific route". `0.0.0.0/0` is the most common network with all addresses from `0.0.0.0` to `255.255.255.255`. `192.168.0.0/16` is inside it, but is more specific, covering addresses between `192.168.0.0` and `192.168.255.255`. `192.168.1.0/24` would be even more specific to it covering only addresses `192.168.1.0-192.168.1.255`. The traffic is routed according to the most specific route.

If a destination is local it's going to go directly to the destination. If it's not local then it's going to look at your route table to see where to go and you can create a single route 0.0.0.0/0, which means all IPs, send to the gateway


### IAM

IAM user can be a persone, app, API.

ACCESS_KEY and SECRET_ACCESS_KEY are provided when requesting
programmatic access for an IAM user.

1. `IAM user`: An IAM user is just an identity of a user. By default an IAM user cannot do anything useful, unless it has a useful policy attached to it.

2. `IAM group`: collection of users that need identical config.

3. `IAM roles`: Roles encapsulate policies. Roles can be attached to EC2 instances or other application services.

4. `IAM policies`: Policies are mapped with users/groups to give actual control.

**IAM policy/permissions resolution** - Given you are attached with multiple policies/permissions, "deny" will always take precedence over allow, i.e. the principle of most restrictive permissions.

The `Principal` element is unnecessary in an IAM policy, because the principal is by default the entity that the IAM policy is attached to.


### S3

Whenever an AWS principal issues a request to S3, the authorization decision depends on the union of all the IAM policies, S3 bucket policies, and S3 ACLs that apply.

#### S3 ACL
S3 ACLs is a legacy access control mechanism that predates IAM.

An S3 ACL is a sub-resource that’s attached to every S3 bucket and object. It defines which AWS accounts or groups are granted access and the type of access. When you create a bucket or an object, Amazon S3 creates a default ACL that grants the resource owner full control over the resource.

#### S3 bucket policy

The `Principal` element in the policy code specifies the user, account, service, or other entity that is allowed or denied access to a resource residing in AWS S3 bucket.

`Action`: The action of interest "s3:GetObject",

`Resource`: The resource of interest to which the policy is being applied to i.e bucket identifier e.g.
`arn:aws:s3:::abc-my-bucket/*`

Use `https://awspolicygen.s3.amazonaws.com/policygen.html` to create policies.

### EC2 instances

An EC2 instance is a machine which usually accessible via a public ip through ssh.
To allow/open ports on an EC2 instance, one must edit the security group associated with the EC2 instance. E.g. allowing inbound `HTTP` or allowing inbound `port 7000`.

Stopping and starting an EBS boot instance is very similar to simply rebooting the instance with a few exceptions, the most notable being:

The instance is assigned a new internal IP address.
The instance is assigned a new public IP address.
All data on ephemeral storage (often under /mnt) is lost


#### Elastic IP address (Remappable reserved IP addresses)

An Elastic IP (EIP) is an IP address that you can reserve from AWS for your account.
Once you reserve an Elastic IP, nobody else can use that IP address.

Elastic IP address is used to implement the effect of having a static IP address for public servers running on EC2. You can point the Elastic IP at any of your EC2 instances, changing the active instance at any time, without changing the IP address seen by the public outside of EC2

Whereas static IPs are associated to a particular machine, EIPs can be reassigned to different instances when necessary as you launch and terminate servers.

So, if you set up a site and update your DNS A Records to point to your Elastic IPs, you'll never have to update those records over the lifecycle of your system because the same public IP address will be used for each iteration of that server regardless of how many times it's terminated and launched.

### CloudFront

Cloudfront is global CDN provided by AWS.
The artifact we create in cloudfront is known as a `cloudfront distribution`, often comes with a url e.g. `dewlkj23lkjlkr23.cloudfront.net`.

1. We need to specify an origin S3 bucket URL. (Yes s3 bucket url e.g. `abc-bucket.s3.amazonaws.com`)

Pre requisite: Bucket must have correct permissions for cloudfront to access it.

CThis is normal: creation of and changes to CloudFront distributions often take 15-20 minutes or upto 3 hrs to "settle". I presume that during this time AWS is replicating your distribution's data out to all of the edge locations so that the changes take effect everywhere at the same time.

#### 307 redirects from CDN to S3
It seems CloudFront cached my first requests to files when distribution wasn't fully ready (but it was in deployed state at that time, so beware!). I requested invalidation to all files which were in cache, it took some minutes, but after invalidation was done, all files were curled with http 200 using CloudFront url.

The problem became clear after the comment from Michael-sqlbot:

All buckets have at least two REST endpoint hostnames. In eu-west-1, they are example-bucket.s3-eu-west-1.amazonaws.com and example-bucket.s3.amazonaws.com. The first one will be immediately valid when the bucket is created. The second one -- sometimes referred to as the "global endpoint" -- which is the one CloudFront uses -- will not, unless the bucket is in us-east-1. Over a period of seconds to minutes, variable by location and other factors, it becomes globally accessible as well. Before that, the 307 redirect is returned. Hence, the bucket was not ready.

### S3 multipart uploads

https://www.youtube.com/watch?v=14goBiDF4z0

https://aws.amazon.com/blogs/developer/announcing-the-amazon-s3-managed-uploader-in-the-aws-sdk-for-javascript/

### RDS

Amazon RDS doesn't allow direct host access to a DB instance by using Telnet or Secure Shell (SSH).

VPC security groups provide access to DB instances in a VPC. They act as a firewall for the associated DB instance, controlling both inbound and outbound traffic at the instance level. DB instances are created by default with a firewall and a default security group that protect the DB instance.

### AWS CLI

#### S3

* List objects in bucket

```sh
aws s3api list-objects-v2 --bucket formik-app-test
```

* Get object with metadata:
```sh
aws s3api head-object --bucket my-bucket --key index.html
```

