Clarifying questions:
1st endpoint
- should the count be returned?
    > i.e. to simplify x and count-1 others have liked/commented on this post
    > not an issue since frontend can simply count length of array with O(1)
- suggestions on the structure for each notification
    > combining both read: true/false per post. The resulting array would be {..., likes: {read: [...], unread: [...]}}
    > separating per read per type (i.e. [{read: true, likes: [...]}, {read: true, comments: [...], ... }])

Assumptions:
1st endpoint:
- posts that doesnt have a like nor a comment are not included in the notifications feed
    > query

Technical debts and nice to have:
graphql
- from what I know, the consumer has more flexibility when it comes to retrieving the data that they want without additional complexity in the backend
    > Rationale: filtering unwanted fields from the database (e.g. 1.) ONLY _id and name, 2.) ALL except name ) this is called projection in mongodb
Middlewares
- Request validation handler
- Standardized response handler for generics like success, bad request, etc.