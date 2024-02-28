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











    

