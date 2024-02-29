:::::::::::::::::::::::::::::::::::> Twito <::::::::::::::::::::::::::::::::::::::::::

Pre final year project   1.) Twitter Users -> a) Friends b) follower c) @mentions d) retwitte  etc .

TECH SATCK USED :

 1) Javascript
 2) React
 3) Node js
 4) Express
 5) mysql
 6) sequalize


-> we will explore more as we move forward in the project  and we model ourself according to the new of the application and usage 


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
LETS DESIGN TWITO

-> Question in my find before designing TWITO 

• Will users of our service be able to post tweets and follow other people?
• Should we also design to create and display the user’s timeline?
• Will tweets contain photos and videos?
• Are we focusing on the backend only or are we developing the front-end too?
• Will users be able to search tweets?
• Do we need to display hot trending topics?
• Will there be any push notification for new (or important) tweets?


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Step 2: System interface definition

postTweet(user_id, tweet_data, tweet_location, user_location, timestamp, ...)
generateTimeline(user_id, current_time, user_location, ...)
markTweetFavorite(user_id, tweet_id, timestamp, ...)

Step 3: Back-of-the-envelope estimation  

when i generally think about system design ( It is always a good idea to estimate the scale of the system we’re going to design )

:: you shoud keep this points in you mind thinking about scaleing

• What scale is expected from the system (e.g., number of new tweets, number of tweet views, number of timeline generations per sec., etc.)?
• How much storage will we need? We will have different numbers if users can have photos and videos in their tweets.
• What network bandwidth usage are we expecting? This will be crucial in deciding how we will manage traffic and balance load between servers.


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



Step 4: Defining data model

:: lets think and design data model 

The candidate should be able to identify various entities of the system, how they will interact with each other, and different aspect of data management like storage, transportation, encryption, etc.

:: Remember in you mind dont add any extra table or featute or futuristic thing in your DB that is not going to be used in present time 

User: UserID, Name, Email, DoB, CreationData, LastLogin, etc.
Tweet: TweetID, Content, TweetLocation, NumberOfLikes, TimeStamp, etc. UserFollowo: UserdID1, UserID2
FavoriteTweets: UserID, TweetID, TimeStamp

::: NOW HERE COMES ONE OF THE BIGGEST QUESTION 
IN YOU MIND WHICH KIND OF DATA-BASE YOU SHOULD USE FOR YOUR PROJECT or APPLICATION ::::

Step 5: High-level design

the simple way to visualize is to Draw a block diagram 

<img width="629" alt="Screenshot 2024-02-28 at 10 15 41 AM" src="https://github.com/audiorpod/Twito/assets/91730407/8a073aa6-ca0d-4b27-bb71-5427f467b64e">



----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



Step 6: Detailed design

Dig deeper into two or three components; interviewer’s feedback should always guide us what parts of the system need further discussion. We should be able to present different approaches, their pros and cons, and explain why we will prefer one approach on the other. Remember there is no single answer, the only important thing is to consider tradeoffs between different options while keeping system constraints in mind.
• Since we will be storing a massive amount of data, how should we partition our data to distribute it to multiple databases? Should we try to store all the data of a user on the same database? What issue could it cause?
• How will we handle hot users who tweet a lot or follow lots of people?
• Since users’ timeline will contain the most recent (and relevant) tweets, should we try to store
our data in such a way that is optimized for scanning the latest tweets?
• How much and at which layer should we introduce cache to speed things up?
• What components need better load balancing?


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Done for the Day feb 28-02-24  WE WILL CONTINUE  feb 29-02-24 

Step 7: Identifying and resolving bottlenecks

Try to discuss as many bottlenecks as possible and different approaches to mitigate them.
• Is there any single point of failure in our system? What are we doing to mitigate it?
• Do we have enough replicas of the data so that if we lose a few servers we can still serve our
users?
• Similarly, do we have enough copies of different services running such that a few failures will
not cause total system shutdown?
• How are we monitoring the performance of our service? Do we get alerts whenever critical
components fail or their performance degrades?



:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



1. Requirements and Goals of the System
2. 
We will be designing a simpler version of Twitter with the following requirements:


Functional Requirements

1. Users should be able to post new tweets.
2. A user should be able to follow other users.
3. Users should be able to mark tweets as favorites.
4. The service should be able to create and display a user’s timeline consisting of top tweets from all the people the user follows.
6. Tweets can contain photos and videos.

<<<<<<< HEAD


=======


Non-functional Requirements
1. Our service needs to be highly available.
2. Acceptable latency of the system is 200ms for timeline generation.
3. Consistency can take a hit (in the interest of availability); if a user doesn’t see a tweet for a while, it should be fine.

______________________________________________________________________________________________________________

Extended Requirements
1. Searching for tweets.
2. Replying to a tweet.
3. Trending topics – current hot topics/searches. 4. Tagging other users.
5. Tweet Notification.
6. Who to follow? Suggestions?
7. Moments.

______________________________________________________________________________________________________________

3. Capacity Estimation and Constraints

_______________ Just having Study via taking assumption ___________________________

Let’s assume we have one billion total users with 200 million daily active users (DAU). Also assume we have 100 million new tweets every day and on average each user follows 200 people.


How many favorites per day? If, on average, each user favorites five tweets per day we will have: 200M users * 5 favorites => 1B favorites
How many total tweet-views will our system generate? Let’s assume on average a user visits their timeline two times a day and visits five other people’s pages. On each page if a user sees 20 tweets, then our system will generate 28B/day total tweet-views:


200M DAU * ((2 + 5) * 20 tweets) => 28B/day


Storage Estimates Let’s say each tweet has 140 characters and we need two bytes to store a character without compression. Let’s assume we need 30 bytes to store metadata with each tweet (like ID, timestamp, user ID, etc.). Total storage we would need:


100M * (280 + 30) bytes => 30GB/day


What would our storage needs be for five years? How much storage we would need for users’ data, follows, favorites? We will leave this for the exercise.

Not all tweets will have media, let’s assume that on average every fifth tweet has a photo and every tenth has a video. Let’s also assume on average a photo is 200KB and a video is 2MB. This will lead us to have 24TB of new media every day.


(100M/5 photos * 200KB) + (100M/10 videos * 2MB) ~= 24TB/day


Bandwidth Estimates Since total ingress is 24TB per day, this would translate into 290MB/sec.


Remember that we have 28B tweet views per day. We must show the photo of every tweet (if it has a photo), but let’s assume that the users watch every 3rd video they see in their timeline. So, total egress will be:

   
(28B * 280 bytes) / 86400s of text => 93MB/s
+ (28B/5 * 200KB ) / 86400s of photos => 13GB/S + (28B/10/3 * 2MB ) / 86400s of Videos => 22GB/s
Total ~= 35GB/s


______________________________________________________________________________________________________________


4. System APIs

Once we've finalized the requirements, it's always a good idea to define the system APIs. This should explicitly state what is expected from the system.

We can have SOAP or REST APIs to expose the functionality of our service. Following could be the definition of the API for posting a new tweet:
tweet(api_dev_key, tweet_data, tweet_location, user_location, media_ids,
maximum_results_to_return)


______________________________________________________________________________________________________________


Parameters:

api_dev_key (string): The API developer key of a registered account. This will be used to, among other things, throttle users based on their allocated quota.
tweet_data (string): The text of the tweet, typically up to 140 characters.
tweet_location (string): Optional location (longitude, latitude) this Tweet refers to. user_location (string): Optional location (longitude, latitude) of the user adding the tweet.


media_ids (number[]): Optional list of media_ids to be associated with the Tweet. (All the media photo, video, etc. need to be uploaded separately).
Returns: (string)

A successful post will return the URL to access that tweet. Otherwise, an appropriate HTTP error is returned.

______________________________________________________________________________________________________________


6. Database Schema


<img width="633" alt="Screenshot 2024-02-29 at 12 25 14 PM" src="https://github.com/audiorpod/Twito/assets/91730407/4e92c21a-f779-44c8-b855-40ca63df68b5">




______________________________________________________________________________________________________________


7. Data Sharding


Since we have a huge number of new tweets every day and our read load is extremely high too, we need to distribute our data onto multiple machines such that we can read/write it efficiently. We have many options to shard our data; let’s go through them one by one:


Sharding based on UserID: We can try storing all the data of a user on one server. While storing, we can pass the UserID to our hash function that will map the user to a database server where we will store all of the user’s tweets, favorites, follows, etc. While querying for tweets/follows/favorites of a user, we can ask our hash function where can we find the data of a user and then read it from there. This approach has a couple of issues:


1. What if a user becomes hot? There could be a lot of queries on the server holding the user. This high load will affect the performance of our service.

   
3. Over time some users can end up storing a lot of tweets or having a lot of follows compared to others. Maintaining a uniform distribution of growing user data is quite difficult.


To recover from these situations either we have to repartition/redistribute our data or use consistent hashing.


Sharding based on TweetID: Our hash function will map each TweetID to a random server where we will store that Tweet. To search for tweets, we have to query all servers, and each server will return a set of tweets. A centralized server will aggregate these results to return them to the user. Let’s look into timeline generation example; here are the number of steps our system has to perform to generate a user’s timeline:


1. Our application (app) server will find all the people the user follows.

3. App server will send the query to all database servers to find tweets from these people.
   
5. Each database server will find the tweets for each user, sort them by recency and return the top
tweets.

7. App server will merge all the results and sort them again to return the top results to the user.


This approach solves the problem of hot users, but, in contrast to sharding by UserID, we have to query all database partitions to find tweets of a user, which can result in higher latencies.

We can further improve our performance by introducing cache to store hot tweets in front of the database servers.

Sharding based on Tweet creation time: Storing tweets based on creation time will give us the advantage of fetching all the top tweets quickly and we only have to query a very small set of servers. The problem here is that the traffic load will not be distributed, e.g., while writing, all new tweets will be going to one server and the remaining servers will be sitting idle. Similarly, while reading, the server holding the latest data will have a very high load as compared to servers holding old data.
 
What if we can combine sharding by TweedID and Tweet creation time? If we don’t store tweet creation time separately and use TweetID to reflect that, we can get benefits of both the approaches. This way it will be quite quick to find the latest Tweets. For this, we must make each TweetID universally unique in our system and each TweetID should contain a timestamp too.

We can use epoch time for this. Let’s say our TweetID will have two parts: the first part will be representing epoch seconds and the second part will be an auto-incrementing sequence. So, to make a new TweetID, we can take the current epoch time and append an auto-incrementing number to it. We can figure out the shard number from this TweetID and store it there.

What could be the size of our TweetID? Let’s say our epoch time starts today, how many bits we would need to store the number of seconds for the next 50 years?
86400 sec/day * 365 (days a year) * 50 (years) => 1.6B

______________________________________________________________________________________________________________




<img width="647" alt="Screenshot 2024-02-29 at 12 30 35 PM" src="https://github.com/audiorpod/Twito/assets/91730407/10961063-af50-47a8-9fe7-fe18e8541203">



______________________________________________________________________________________________________________



 We would need 31 bits to store this number. Since on average we are expecting 1150 new tweets per second, we can allocate 17 bits to store auto incremented sequence; this will make our TweetID 48 bits long. So, every second we can store (2^17 => 130K) new tweets. We can reset our auto incrementing sequence every second. For fault tolerance and better performance, we can have two database servers to generate auto-incrementing keys for us, one generating even numbered keys and the other generating odd numbered keys.
 
If we assume our current epoch seconds are “1483228800,” our TweetID will look like this:

1483228800 000001 1483228800 000002 1483228800 000003 1483228800 000004 ...

If we make our TweetID 64bits (8 bytes) long, we can easily store tweets for the next 100 years and also store them for mili-seconds granularity.

In the above approach, we still have to query all the servers for timeline generation, but our reads (and writes) will be substantially quicker.

1. Since we don’t have any secondary index (on creation time) this will reduce our write latency. 2. While reading, we don’t need to filter on creation-time as our primary key has epoch time
included in it.


______________________________________________________________________________________________________________



 8. Cache

>>>>>>> c0e19d6a47e5f645aa0585d2d40c7b6025be424c
    
<img width="672" alt="Screenshot 2024-02-29 at 12 29 44 PM" src="https://github.com/audiorpod/Twito/assets/91730407/35787c47-828a-42ef-8523-7bcb893b8803">



    
We can introduce a cache for database servers to cache hot tweets and users. We can use an off-the- shelf solution like Memcache that can store the whole tweet objects. Application servers, before hitting database, can quickly check if the cache has desired tweets. Based on clients’ usage patterns we can determine how many cache servers we need.


Which cache replacement policy would best fit our needs? When the cache is full and we want to replace a tweet with a newer/hotter tweet, how would we choose? Least Recently Used (LRU) can be a reasonable policy for our system. Under this policy, we discard the least recently viewed tweet first.


How can we have a more intelligent cache? If we go with 80-20 rule, that is 20% of tweets generating 80% of read traffic which means that certain tweets are so popular that a majority of people read them. This dictates that we can try to cache 20% of daily read volume from each shard.


What if we cache the latest data? Our service can benefit from this approach. Let’s say if 80% of our users see tweets from the past three days only; we can try to cache all the tweets from the past three days. Let’s say we have dedicated cache servers that cache all the tweets from all the users from the past three days. As estimated above, we are getting 100 million new tweets or 30GB of new data every day (without photos and videos). If we want to store all the tweets from last three days, we will need less than 100GB of memory. This data can easily fit into one server, but we should replicate it onto multiple servers to distribute all the read traffic to reduce the load on cache servers. So whenever we are generating a user’s timeline, we can ask the cache servers if they have all the recent tweets for that user. If yes, we can simply return all the data from the cache. If we don’t have enough tweets in the cache, we have to query the backend server to fetch that data. On a similar design, we can try caching photos and videos from the last three days.


Our cache would be like a hash table where ‘key’ would be ‘OwnerID’ and ‘value’ would be a doubly linked list containing all the tweets from that user in the past three days. Since we want to retrieve the most recent data first, we can always insert new tweets at the head of the linked list, which means all the older tweets will be near the tail of the linked list. Therefore, we can remove tweets from the tail to make space for newer tweets.


______________________________________________________________________________________________________________




  10. Timeline Generation

      
For a detailed discussion about timeline generation, take a look at Designing Facebook’s Newsfeed. 10. Replication and Fault Tolerance


Since our system is read-heavy, we can have multiple secondary database servers for each DB partition. Secondary servers will be used for read traffic only. All writes will first go to the primary server and then will be replicated to secondary servers. This scheme will also give us fault tolerance, since whenever the primary server goes down we can failover to a secondary server.



______________________________________________________________________________________________________________



12. Load Balancing

    
We can add Load balancing layer at three places in our system 1) Between Clients and Application servers 2) Between Application servers and database replication servers and 3) Between Aggregation servers and Cache server. Initially, a simple Round Robin approach can be adopted; that distributes incoming requests equally among servers. This LB is simple to implement and does not introduce any overhead. Another benefit of this approach is that if a server is dead, LB will take it out of the rotation and will stop sending any traffic to it. A problem with Round Robin LB is that it won’t take servers

   
load into consideration. If a server is overloaded or slow, the LB will not stop sending new requests to that server. To handle this, a more intelligent LB solution can be placed that periodically queries backend server about their load and adjusts traffic based on that.



______________________________________________________________________________________________________________



12. Monitoring

    
Having the ability to monitor our systems is crucial. We should constantly collect data to get an instant insight into how our system is doing. We can collect following metrics/counters to get an understanding of the performance of our service:


1. New tweets per day/second, what is the daily peak?
2. Timeline delivery stats, how many tweets per day/second our service is delivering. 3. Average latency that is seen by the user to refresh timeline.
By monitoring these counters, we will realize if we need more replication, load balancing, or caching.



______________________________________________________________________________________________________________



13. Extended Requirements

    
How do we serve feeds? Get all the latest tweets from the people someone follows and merge/sort them by time. Use pagination to fetch/show tweets. Only fetch top N tweets from all the people someone follows. This N will depend on the client’s Viewport, since on a mobile we show fewer tweets compared to a Web client. We can also cache next top tweets to speed things up.


Alternately, we can pre-generate the feed to improve efficiency; for details please see ‘Ranking and timeline generation’ under Designing Instagram.



______________________________________________________________________________________________________________


Retweet: With each Tweet object in the database, we can store the ID of the original Tweet and not store any contents on this retweet object.


______________________________________________________________________________________________________________


Trending Topics: We can cache most frequently occurring hashtags or search queries in the last N seconds and keep updating them after every M seconds. We can rank trending topics based on the frequency of tweets or search queries or retweets or likes. We can give more weight to topics which are shown to more people.


Who to follow? How to give suggestions? This feature will improve user engagement. We can suggest friends of people someone follows. We can go two or three levels down to find famous people for the suggestions. We can give preference to people with more followers.


As only a few suggestions can be made at any time, use Machine Learning (ML) to shuffle and re- prioritize. ML signals could include people with recently increased follow-ship, common followers if the other person is following this user, common location or interests, etc.

______________________________________________________________________________________________________________


Moments: Get top news for different websites for past 1 or 2 hours, figure out related tweets, prioritize them, categorize them (news, support, financial, entertainment, etc.) using ML – supervised learning or Clustering. Then we can show these articles as trending topics in Moments.



______________________________________________________________________________________________________________



Search: Search involves Indexing, Ranking, and Retrieval of tweets. A similar solution is discussed in our next problem Design Twitter Search.



______________________________________________________________________________________________________________


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


Done  >>>>  if we needed anything i will change  or add Stay updated 


