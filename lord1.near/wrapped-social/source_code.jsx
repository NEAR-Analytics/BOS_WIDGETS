const themeColor = props.themeColor;
const API_KEY = props.API_KEY;

const singer = props.singer;
const interval = props.interval || "week";
const queries = [
  {
    hash: null,
    firstReqTime: 20,
    id: 1,
    queryOption: {
      sortBy: [
        {
          column: "User",
          direction: "desc",
        },
      ],
    },
    query: `with 
users_posts as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    POST_TEXT as post, BLOCK_ID as blockHeight, tx_hash
    from near.social.fact_posts    
    where BLOCK_TIMESTAMP::date> '2023-01-01'

    ),

users_comments as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value):text as comment, 
    split(TRY_PARSE_JSON(l.value):item:path,'/')[0] as accountId,
    TRY_PARSE_JSON(l.value):item:blockHeight as blockHeight, tx_hash
    from near.social.fact_decoded_actions, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where l.key='comment' and comment is not null    
    and BLOCK_TIMESTAMP::date> '2023-01-01'

    ),

users_repost as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value)[0]:value:type as type, 
    split(TRY_PARSE_JSON(l.value)[0]:value:item:path,'/')[0] as accountId,
    TRY_PARSE_JSON(l.value)[0]:value:item:blockHeight as blockHeight, tx_hash
    from near.social.fact_decoded_actions as a, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where l.key='repost'    and BLOCK_TIMESTAMP::date> '2023-01-01'

    ),

users_follow as (
    with temp_data as (
        select BLOCK_TIMESTAMP, SIGNER_ID as user, tx_hash, l.value as data
        from near.social.fact_decoded_actions, 
        LATERAL FLATTEN(INPUT => NODE_DATA) l
        where l.key='graph'    
        and BLOCK_TIMESTAMP::date> '2023-01-01'
)

    select BLOCK_TIMESTAMP, user,
    COALESCE(TRY_PARSE_JSON(l.value):type, TRY_PARSE_JSON(l.value):value:type) as type, 
    COALESCE(TRY_PARSE_JSON(l.value):accountId, TRY_PARSE_JSON(l.value):value:accountId) as accountId, 
    tx_hash, rank() over (partition by user, accountId order by BLOCK_TIMESTAMP desc) as rank
    from temp_data, 
    LATERAL FLATTEN(INPUT => PARSE_JSON(data)) l
    where lower(type) in ('follow', 'unfollow')),

users_pokes as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value):key as type, 
    TRY_PARSE_JSON(l.value):value:accountId as accountId, tx_hash
    from near.social.fact_decoded_actions, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where TRY_PARSE_JSON(l.value):key='poke'
    and BLOCK_TIMESTAMP::date> '2023-01-01'

    ),

users_like as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value):value:type as type, 
    split(TRY_PARSE_JSON(l.value):key:path,'/')[0] as accountId,
    TRY_PARSE_JSON(l.value):key:blockHeight as blockHeight, tx_hash,
    rank() over (partition by user, accountId, blockHeight order by BLOCK_TIMESTAMP desc) as rank
    from near.social.fact_decoded_actions, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where l.key='like' and type in ('like')
    and BLOCK_TIMESTAMP::date> '2023-01-01'

    ),


users_hashtags as (
    with temp_data as (
        select BLOCK_TIMESTAMP, SIGNER_ID as user, tx_hash, l.value as data
        from near.social.fact_decoded_actions, 
        LATERAL FLATTEN(INPUT => NODE_DATA) l
        where l.key='hashtag'    
        and BLOCK_TIMESTAMP::date> '2023-01-01'

        )

    select BLOCK_TIMESTAMP, user,
    TRY_PARSE_JSON(l.value):key as hashtag, 
    split(TRY_PARSE_JSON(l.value):value:path,'/')[2] as type,tx_hash
    from temp_data, 
    LATERAL FLATTEN(INPUT => PARSE_JSON(data)) l),

users_premium as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user, DEPOSIT/1e24 as amount, 
    TO_TIMESTAMP(l.value) as expire_date
    from(select a.*, b.args as b_args from near.core.fact_actions_events_function_call a 
        left join near.core.fact_actions_events_function_call b
        on a.tx_hash=b.tx_hash and b.METHOD_NAME='set'),
    LATERAL FLATTEN(INPUT => PARSE_JSON(b_args:data:"premium.social.near":badge:premium:accounts)) as l
    where RECEIVER_ID='premium.social.near' and METHOD_NAME='purchase'
    and BLOCK_TIMESTAMP::date> '2023-01-01'
    ),

users_activities as (
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_addkey_events
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_decoded_actions
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_posts
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_profile_changes
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_widget_deployments),

users_min as (
    select user, min(BLOCK_TIMESTAMP) as min_date
    from users_activities
    group by 1),

posts as (
    select user, count(*) as posts
    from users_posts
    group by 1 
    ), 

sent_comments as (
    select user, count(*) as sent_comments
    from users_comments
    group by 1 
    ), 

received_comments as (
    select accountId, count(*) as received_comments
    from users_comments
    group by 1 
    ), 

sent_reposts as (
    select user, count(*) as sent_reposts
    from users_repost
    group by 1 
    ), 

received_reposts as (
    select accountId, count(*) as received_reposts
    from users_repost
    group by 1 
    ),

followings as (
    select user, count(*) as followings
    from users_follow
    where rank=1 and type ilike'follow'
    group by 1 
    ), 

followers as (
    select accountId, count(*) as followers
    from users_follow
    where rank=1 and type ilike 'follow'
    group by 1 
    ), 

sent_pokes as (
    select user, count(*) as sent_pokes
    from users_pokes
    group by 1 
    ), 

received_pokes as (
    select accountId, count(*) as received_pokes
    from users_pokes
    group by 1 
    ),

sent_likes as (
    select user, count(*) as sent_likes
    from users_like
    where rank=1 and type='like'
    group by 1 
    ), 

received_likes as (
    select accountId, count(*) as received_likes
    from users_like
    where rank=1 
    group by 1 
    ), 

hashtags as (
    select user, count(distinct hashtag) as hashtags
    from users_hashtags
    group by 1 
    ), 

widgets as (
    select SIGNER_ID as user, count(distinct TX_HASH) as widgets
    from near.social.fact_widget_deployments
    where  BLOCK_TIMESTAMP::date> '2023-01-01'
    group by 1 
    ),

users_stats as (
    select  a.user as user,
    posts, sent_comments, received_comments, sent_reposts, received_reposts,
    followings, followers, sent_pokes, received_pokes, sent_likes, received_likes, hashtags,
    widgets, min_date
    from users_min a
    
    left join users_premium b 
    on a.user=b.user and expire_date>=current_date
    
    left join posts up
    on a.user=up.user
    
    left join sent_comments uc_s
    on a.user=uc_s.user
    left join received_comments uc_r
    on a.user=uc_r.accountId
    
    left join sent_reposts ur_s
    on a.user=ur_s.user
    left join received_reposts ur_r
    on a.user=ur_r.accountId
    
    left join followings uf_s
    on a.user=uf_s.user 
    left join followers uf_r
    on a.user=uf_r.accountId 
    
    left join sent_pokes up_s
    on a.user=up_s.user 
    left join received_pokes up_r
    on a.user=up_r.accountId
    
    left join sent_likes ul_s
    on a.user=ul_s.user
    left join received_likes ul_r
    on a.user=ul_r.accountId 
    
    left join hashtags uh
    on a.user=uh.user
    
    
    left join widgets uw
    on a.user=uw.user)

select 
    user as "User",
     COALESCE(followers,0) as "followers",
     COALESCE(followings,0) as "followings",
     COALESCE(posts,0) as "posts",
     COALESCE(sent_reposts,0) as "reposts",
     COALESCE(received_reposts,0) as "received_reposts",
     COALESCE(sent_comments,0) as "comments",
     COALESCE(received_comments,0) as "received_comments",
     COALESCE(sent_likes,0) as "likes",
     COALESCE(received_likes,0) as "received_likes",
     COALESCE(sent_pokes,0) as "pokes",
     COALESCE(received_pokes,0) as "received_pokes",
     COALESCE(hashtags,0) as "hashtags",
     COALESCE(widgets,0) as "widgets",
     split(min_date::date,'T')[0] as "join_date"
from users_stats
where user ='{{singer}}'`,
  },
  {
    hash: null,
    firstReqTime: 20,
    id: 2,
    queryOption: {
      sortBy: [
        {
          column: "favorite_score",
          direction: "desc",
        },
      ],
    },
    query: ` with 
users_posts as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    POST_TEXT as post, BLOCK_ID as blockHeight, tx_hash
    from near.social.fact_posts
    where BLOCK_TIMESTAMP>='2023-01-01'),

users_comments as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value):text as comment, 
    split(TRY_PARSE_JSON(l.value):item:path,'/')[0] as accountId,
    TRY_PARSE_JSON(l.value):item:blockHeight as blockHeight, tx_hash
    from near.social.fact_decoded_actions, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where l.key='comment' and comment is not null
    and BLOCK_TIMESTAMP>='2023-01-01'),

users_repost as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value)[0]:value:type as type, 
    split(TRY_PARSE_JSON(l.value)[0]:value:item:path,'/')[0] as accountId,
    TRY_PARSE_JSON(l.value)[0]:value:item:blockHeight as blockHeight, tx_hash
    from near.social.fact_decoded_actions as a, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where l.key='repost'
    and BLOCK_TIMESTAMP>='2023-01-01'),

users_follow as (
    with temp_data as (
        select BLOCK_TIMESTAMP, SIGNER_ID as user, tx_hash, l.value as data
        from near.social.fact_decoded_actions, 
        LATERAL FLATTEN(INPUT => NODE_DATA) l
        where l.key='graph'
        and BLOCK_TIMESTAMP>='2023-01-01')

    select BLOCK_TIMESTAMP, user,
    COALESCE(TRY_PARSE_JSON(l.value):type, TRY_PARSE_JSON(l.value):value:type) as type, 
    COALESCE(TRY_PARSE_JSON(l.value):accountId, TRY_PARSE_JSON(l.value):value:accountId) as accountId, 
    tx_hash, rank() over (partition by user, accountId order by BLOCK_TIMESTAMP desc) as rank
    from temp_data, 
    LATERAL FLATTEN(INPUT => PARSE_JSON(data)) l
    where type in ('follow', 'unfollow')),

users_pokes as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value):key as type, 
    TRY_PARSE_JSON(l.value):value:accountId as accountId, tx_hash
    from near.social.fact_decoded_actions, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where TRY_PARSE_JSON(l.value):key='poke'
    and BLOCK_TIMESTAMP>='2023-01-01'),

users_like as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value):value:type as type, 
    split(TRY_PARSE_JSON(l.value):key:path,'/')[0] as accountId,
    TRY_PARSE_JSON(l.value):key:blockHeight as blockHeight, tx_hash,
    rank() over (partition by user, accountId, blockHeight order by BLOCK_TIMESTAMP desc) as rank
    from near.social.fact_decoded_actions, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where l.key='like' and type in ('like')
    and BLOCK_TIMESTAMP>='2023-01-01'),


users_hashtags as (
    with temp_data as (
        select BLOCK_TIMESTAMP, SIGNER_ID as user, tx_hash, l.value as data
        from near.social.fact_decoded_actions, 
        LATERAL FLATTEN(INPUT => NODE_DATA) l
        where l.key='hashtag'
        and BLOCK_TIMESTAMP>='2023-01-01')

    select BLOCK_TIMESTAMP, user,
    TRY_PARSE_JSON(l.value):key as hashtag, 
    split(TRY_PARSE_JSON(l.value):value:path,'/')[2] as type,tx_hash
    from temp_data, 
    LATERAL FLATTEN(INPUT => PARSE_JSON(data)) l),

users_premium as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user, DEPOSIT/1e24 as amount, 
    TO_TIMESTAMP(l.value) as expire_date
    from(select a.*, b.args as b_args from near.core.fact_actions_events_function_call a 
        left join near.core.fact_actions_events_function_call b
        on a.tx_hash=b.tx_hash and b.METHOD_NAME='set'),
    LATERAL FLATTEN(INPUT => PARSE_JSON(b_args:data:"premium.social.near":badge:premium:accounts)) as l
    where RECEIVER_ID='premium.social.near' and METHOD_NAME='purchase'
    and BLOCK_TIMESTAMP>='2023-01-01'),

users_activities as (
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_addkey_events
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_decoded_actions
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_posts
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_profile_changes
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_widget_deployments),

users_min as (
    select user, min(BLOCK_TIMESTAMP) as min_date
    from users_activities
    group by 1),

posts as (
    select user, count(*) as posts
    from users_posts
    group by 1 
    ), 

sent_comments as (
    select user, count(*) as sent_comments
    from users_comments
    group by 1 
    ), 

received_comments as (
    select accountId, count(*) as received_comments
    from users_comments
    where user='{{singer}}'
    group by 1 
    ), 

sent_reposts as (
    select user, count(*) as sent_reposts
    from users_repost
    group by 1 
    ), 

received_reposts as (
    select accountId, count(*) as received_reposts
    from users_repost
    where user='{{singer}}'
    group by 1 
    ),

followings as (
    select user, count(*) as followings
    from users_follow
    where rank=1 and type='follow'
    group by 1 
    ), 

followers as (
    select accountId, count(*) as followers
    from users_follow
    where rank=1 and type='follow'
    group by 1 
    ), 

sent_pokes as (
    select user, count(*) as sent_pokes
    from users_pokes
    group by 1 
    ), 

received_pokes as (
    select accountId, count(*) as received_pokes
    from users_pokes
    where user='{{singer}}'
    group by 1 
    ),

sent_likes as (
    select user, count(*) as sent_likes
    from users_like
    where rank=1 and type='like'
    group by 1 
    ), 

received_likes as (
    select accountId, count(*) as received_likes
    from users_like
    where user='{{singer}}'
    and rank=1 
    group by 1 
    ), 

hashtags as (
    select user, count(distinct hashtag) as hashtags
    from users_hashtags
    group by 1 
    ), 

widgets as (
    select SIGNER_ID as user, count(distinct TX_HASH) as widgets
    from near.social.fact_widget_deployments
    where BLOCK_TIMESTAMP>='2023-01-01'
    group by 1 
    ),

users_stats as (
    select  a.user  as user, 
    posts, sent_comments, received_comments, sent_reposts, received_reposts,
    followings, followers, sent_pokes, received_pokes, sent_likes, received_likes, hashtags,
    widgets, min_date
    from users_min a
    
    left join users_premium b 
    on a.user=b.user and expire_date>=current_date
    
    left join posts up
    on a.user=up.user
    
    left join sent_comments uc_s
    on a.user=uc_s.user
    left join received_comments uc_r
    on a.user=uc_r.accountId
    
    left join sent_reposts ur_s
    on a.user=ur_s.user
    left join received_reposts ur_r
    on a.user=ur_r.accountId
    
    left join followings uf_s
    on a.user=uf_s.user 
    left join followers uf_r
    on a.user=uf_r.accountId 
    
    left join sent_pokes up_s
    on a.user=up_s.user 
    left join received_pokes up_r
    on a.user=up_r.accountId
    
    left join sent_likes ul_s
    on a.user=ul_s.user
    left join received_likes ul_r
    on a.user=ul_r.accountId 
    
    left join hashtags uh
    on a.user=uh.user
    
    
    left join widgets uw
    on a.user=uw.user)

select user as "user",
COALESCE(received_reposts,0) as "received_reposts",
COALESCE(received_comments,0) as "received_comments",
COALESCE(received_likes,0) as "received_likes",
COALESCE(received_pokes,0) as "received_pokes",
-- 10 * IFNULL(posts, 0) +           -- Impact of posts
2 * IFNULL(received_comments, 0) +  -- Impact of received comments
3 * IFNULL(received_reposts, 0) +  -- Impact of received reposts
0.1 * IFNULL(received_pokes, 0) + -- Impact of received pokes
0.5 * IFNULL(received_likes, 0)  -- Impact of received likes
AS "favorite_score"
from users_stats
where "favorite_score">0
order by "favorite_score" desc 
limit 200`,
  },

  {
    hash: null,
    firstReqTime: 20,
    id: 3,
    queryOption: {
      sortBy: [
        {
          column: "fan_score",
          direction: "desc",
        },
      ],
    },
    query: ` with 
users_posts as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    POST_TEXT as post, BLOCK_ID as blockHeight, tx_hash
    from near.social.fact_posts
    where BLOCK_TIMESTAMP>='2023-01-01'),

users_comments as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value):text as comment, 
    split(TRY_PARSE_JSON(l.value):item:path,'/')[0] as accountId,
    TRY_PARSE_JSON(l.value):item:blockHeight as blockHeight, tx_hash
    from near.social.fact_decoded_actions, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where l.key='comment' and comment is not null
    and BLOCK_TIMESTAMP>='2023-01-01'),

users_repost as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value)[0]:value:type as type, 
    split(TRY_PARSE_JSON(l.value)[0]:value:item:path,'/')[0] as accountId,
    TRY_PARSE_JSON(l.value)[0]:value:item:blockHeight as blockHeight, tx_hash
    from near.social.fact_decoded_actions as a, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where l.key='repost'
    and BLOCK_TIMESTAMP>='2023-01-01'),

users_follow as (
    with temp_data as (
        select BLOCK_TIMESTAMP, SIGNER_ID as user, tx_hash, l.value as data
        from near.social.fact_decoded_actions, 
        LATERAL FLATTEN(INPUT => NODE_DATA) l
        where l.key='graph'
        and BLOCK_TIMESTAMP>='2023-01-01')

    select BLOCK_TIMESTAMP, user,
    COALESCE(TRY_PARSE_JSON(l.value):type, TRY_PARSE_JSON(l.value):value:type) as type, 
    COALESCE(TRY_PARSE_JSON(l.value):accountId, TRY_PARSE_JSON(l.value):value:accountId) as accountId, 
    tx_hash, rank() over (partition by user, accountId order by BLOCK_TIMESTAMP desc) as rank
    from temp_data, 
    LATERAL FLATTEN(INPUT => PARSE_JSON(data)) l
    where type in ('follow', 'unfollow')),

users_pokes as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value):key as type, 
    TRY_PARSE_JSON(l.value):value:accountId as accountId, tx_hash
    from near.social.fact_decoded_actions, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where TRY_PARSE_JSON(l.value):key='poke'
    and BLOCK_TIMESTAMP>='2023-01-01'),

users_like as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value):value:type as type, 
    split(TRY_PARSE_JSON(l.value):key:path,'/')[0] as accountId,
    TRY_PARSE_JSON(l.value):key:blockHeight as blockHeight, tx_hash,
    rank() over (partition by user, accountId, blockHeight order by BLOCK_TIMESTAMP desc) as rank
    from near.social.fact_decoded_actions, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where l.key='like' and type in ('like')
    and BLOCK_TIMESTAMP>='2023-01-01'),


users_hashtags as (
    with temp_data as (
        select BLOCK_TIMESTAMP, SIGNER_ID as user, tx_hash, l.value as data
        from near.social.fact_decoded_actions, 
        LATERAL FLATTEN(INPUT => NODE_DATA) l
        where l.key='hashtag'
        and BLOCK_TIMESTAMP>='2023-01-01')

    select BLOCK_TIMESTAMP, user,
    TRY_PARSE_JSON(l.value):key as hashtag, 
    split(TRY_PARSE_JSON(l.value):value:path,'/')[2] as type,tx_hash
    from temp_data, 
    LATERAL FLATTEN(INPUT => PARSE_JSON(data)) l),

users_premium as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user, DEPOSIT/1e24 as amount, 
    TO_TIMESTAMP(l.value) as expire_date
    from(select a.*, b.args as b_args from near.core.fact_actions_events_function_call a 
        left join near.core.fact_actions_events_function_call b
        on a.tx_hash=b.tx_hash and b.METHOD_NAME='set'),
    LATERAL FLATTEN(INPUT => PARSE_JSON(b_args:data:"premium.social.near":badge:premium:accounts)) as l
    where RECEIVER_ID='premium.social.near' and METHOD_NAME='purchase'
    and BLOCK_TIMESTAMP>='2023-01-01'),

users_activities as (
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_addkey_events
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_decoded_actions
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_posts
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_profile_changes
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_widget_deployments),

users_min as (
    select user, min(BLOCK_TIMESTAMP) as min_date
    from users_activities
    group by 1),

posts as (
    select user, count(*) as posts
    from users_posts
    group by 1 
    ), 

sent_comments as (
    select user, count(*) as sent_comments
    from users_comments
    where accountId='{{singer}}'
    group by 1 
    ), 

received_comments as (
    select accountId, count(*) as received_comments
    from users_comments
    where user='{{singer}}'
    group by 1 
    ), 

sent_reposts as (
    select user, count(*) as sent_reposts
    from users_repost
    where accountId='{{singer}}'
    group by 1 
    ), 

received_reposts as (
    select accountId, count(*) as received_reposts
    from users_repost
    where user='{{singer}}'
    group by 1 
    ),

followings as (
    select user, count(*) as followings
    from users_follow
    where rank=1 and type='follow'
    group by 1 
    ), 

followers as (
    select accountId, count(*) as followers
    from users_follow
    where rank=1 and type='follow'
    group by 1 
    ), 

sent_pokes as (
    select user, count(*) as sent_pokes
    from users_pokes
    where accountId='{{singer}}'
    group by 1 
    ), 

received_pokes as (
    select accountId, count(*) as received_pokes
    from users_pokes
    where user='{{singer}}'
    group by 1 
    ),

sent_likes as (
    select user, count(*) as sent_likes
    from users_like
    where rank=1 and type='like'
    and accountId='{{singer}}'
    group by 1 
    ), 

received_likes as (
    select accountId, count(*) as received_likes
    from users_like
    where user='{{singer}}'
    and rank=1 
    group by 1 
    ), 

hashtags as (
    select user, count(distinct hashtag) as hashtags
    from users_hashtags
    group by 1 
    ), 

widgets as (
    select SIGNER_ID as user, count(distinct TX_HASH) as widgets
    from near.social.fact_widget_deployments
    where BLOCK_TIMESTAMP>='2023-01-01'
    group by 1 
    ),

users_stats as (
    select  a.user  as user, 
    posts, sent_comments, received_comments, sent_reposts, received_reposts,
    followings, followers, sent_pokes, received_pokes, sent_likes, received_likes, hashtags,
    widgets, min_date
    from users_min a
    
    left join users_premium b 
    on a.user=b.user and expire_date>=current_date
    
    left join posts up
    on a.user=up.user
    
    left join sent_comments uc_s
    on a.user=uc_s.user
    left join received_comments uc_r
    on a.user=uc_r.accountId
    
    left join sent_reposts ur_s
    on a.user=ur_s.user
    left join received_reposts ur_r
    on a.user=ur_r.accountId
    
    left join followings uf_s
    on a.user=uf_s.user 
    left join followers uf_r
    on a.user=uf_r.accountId 
    
    left join sent_pokes up_s
    on a.user=up_s.user 
    left join received_pokes up_r
    on a.user=up_r.accountId
    
    left join sent_likes ul_s
    on a.user=ul_s.user
    left join received_likes ul_r
    on a.user=ul_r.accountId 
    
    left join hashtags uh
    on a.user=uh.user
    
    
    left join widgets uw
    on a.user=uw.user)

select user as "user",
COALESCE(sent_reposts,0) as "reposts",
COALESCE(sent_comments,0) as "comments",
COALESCE(sent_likes,0) as "likes",
COALESCE(sent_pokes,0) as "pokes",
-- 10 * IFNULL(posts, 0) +           -- Impact of posts
2 * IFNULL(sent_comments, 0) +  -- Impact of received comments
3 * IFNULL(sent_reposts, 0) +  -- Impact of received reposts
0.1 * IFNULL(sent_pokes, 0) + -- Impact of received pokes
0.5 * IFNULL(sent_likes, 0)  -- Impact of received likes
AS "fan_score"
from users_stats
where user!='{{singer}}' and "fan_score">0
order by "fan_score" desc 
limit 200`,
  },

  {
    hash: null,
    firstReqTime: 8,
    id: 4,
    queryOption: {
      sortBy: [
        {
          column: "date",
          direction: "desc",
        },
      ],
    },
    query: ` with 
users_posts as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    POST_TEXT as post, BLOCK_ID as blockHeight, tx_hash
    from near.social.fact_posts
    where BLOCK_TIMESTAMP>='2023-01-01'),

users_comments as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value):text as comment, 
    split(TRY_PARSE_JSON(l.value):item:path,'/')[0] as accountId,
    TRY_PARSE_JSON(l.value):item:blockHeight as blockHeight, tx_hash
    from near.social.fact_decoded_actions, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where l.key='comment' and comment is not null
    and BLOCK_TIMESTAMP>='2023-01-01'),

users_repost as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value)[0]:value:type as type, 
    split(TRY_PARSE_JSON(l.value)[0]:value:item:path,'/')[0] as accountId,
    TRY_PARSE_JSON(l.value)[0]:value:item:blockHeight as blockHeight, tx_hash
    from near.social.fact_decoded_actions as a, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where l.key='repost'
    and BLOCK_TIMESTAMP>='2023-01-01'),

users_follow as (
    with temp_data as (
        select BLOCK_TIMESTAMP, SIGNER_ID as user, tx_hash, l.value as data
        from near.social.fact_decoded_actions, 
        LATERAL FLATTEN(INPUT => NODE_DATA) l
        where l.key='graph'
        and BLOCK_TIMESTAMP>='2023-01-01')

    select BLOCK_TIMESTAMP, user,
    COALESCE(TRY_PARSE_JSON(l.value):type, TRY_PARSE_JSON(l.value):value:type) as type, 
    COALESCE(TRY_PARSE_JSON(l.value):accountId, TRY_PARSE_JSON(l.value):value:accountId) as accountId, 
    tx_hash, rank() over (partition by user, accountId order by BLOCK_TIMESTAMP desc) as rank
    from temp_data, 
    LATERAL FLATTEN(INPUT => PARSE_JSON(data)) l
    where type in ('follow', 'unfollow')),

users_pokes as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value):key as type, 
    TRY_PARSE_JSON(l.value):value:accountId as accountId, tx_hash
    from near.social.fact_decoded_actions, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where TRY_PARSE_JSON(l.value):key='poke'
    and BLOCK_TIMESTAMP>='2023-01-01'),

users_like as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value):value:type as type, 
    split(TRY_PARSE_JSON(l.value):key:path,'/')[0] as accountId,
    TRY_PARSE_JSON(l.value):key:blockHeight as blockHeight, tx_hash,
    rank() over (partition by user, accountId, blockHeight order by BLOCK_TIMESTAMP desc) as rank
    from near.social.fact_decoded_actions, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where l.key='like' and type in ('like')
    and BLOCK_TIMESTAMP>='2023-01-01'),


users_hashtags as (
    with temp_data as (
        select BLOCK_TIMESTAMP, SIGNER_ID as user, tx_hash, l.value as data
        from near.social.fact_decoded_actions, 
        LATERAL FLATTEN(INPUT => NODE_DATA) l
        where l.key='hashtag'
        and BLOCK_TIMESTAMP>='2023-01-01')

    select BLOCK_TIMESTAMP, user,
    TRY_PARSE_JSON(l.value):key as hashtag, 
    split(TRY_PARSE_JSON(l.value):value:path,'/')[2] as type,tx_hash
    from temp_data, 
    LATERAL FLATTEN(INPUT => PARSE_JSON(data)) l),


users_activities as (
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_addkey_events
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_decoded_actions
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_posts
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_profile_changes
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_widget_deployments),

users_min as (
    select user, min(BLOCK_TIMESTAMP) as min_date
    from users_activities
    group by 1),

posts as (
    select date_trunc({{week}},BLOCK_TIMESTAMP) as "Date",user as "User", 'Post' as "type", count(*) as trxs
    from users_posts
    group by 1,2,3
    ), 

sent_comments as (
    select date_trunc({{week}},BLOCK_TIMESTAMP) as "Date", user as "User", 'Comment' as "type",count(*) as trxs
    from users_comments
    group by 1,2,3
    ), 

received_comments as (
    select date_trunc({{week}},BLOCK_TIMESTAMP) as "Date", accountId as "User", 'Received_Comment' as "type",count(*) as trxs
    from users_comments
    group by 1,2,3 
    ), 

sent_reposts as (
    select date_trunc({{week}},BLOCK_TIMESTAMP) as "Date", user as "User", 'Repost' as "type",count(*) as trxs
    from users_repost
    group by 1,2,3 
    ), 

received_reposts as (
    select date_trunc({{week}},BLOCK_TIMESTAMP) as "Date", accountId as "User", 'Receive_Repost' as "type",count(*) as trxs
    from users_repost
    group by 1,2,3 
    ),

follow as (
    select date_trunc({{week}},BLOCK_TIMESTAMP) as "Date", user as "User", initcap(type) as "type", count(*) as trxs
    from users_follow
    where rank=1 and type='follow'
    group by 1,2,3 
    ),

sent_pokes as (
    select date_trunc({{week}},BLOCK_TIMESTAMP) as "Date", user as "User", 'Poke' as "type",count(*) as trxs
    from users_pokes
    group by 1,2,3 
    ), 

received_pokes as (
    select date_trunc({{week}},BLOCK_TIMESTAMP) as "Date", accountId as "User", 'Receive_Poke' as "type",count(*) as trxs
    from users_pokes
    group by 1,2,3 
    ),

sent_likes as (
    select date_trunc({{week}},BLOCK_TIMESTAMP) as "Date", user as "User", 'Like' as "type",count(*) as trxs
    from users_like
    where rank=1 and type='like'
    group by 1,2,3 
    ), 

received_likes as (
    select date_trunc({{week}},BLOCK_TIMESTAMP) as "Date", accountId as "User", 'Receive_Like' as "type", count(*) as trxs
    from users_like
    where rank=1 
    group by 1,2,3
    ), 

widgets as (
    select date_trunc({{week}},BLOCK_TIMESTAMP) as "Date", SIGNER_ID as "User", 'Widget' as "type",count(distinct TX_HASH) as trxs
    from near.social.fact_widget_deployments
    where  BLOCK_TIMESTAMP::date> '2023-01-01'
    group by 1,2,3
    )



,final as 
      (
      select * 
       from 
                (select * from posts
                union all 
                select * from sent_comments
                union all 
                select * from sent_reposts
                union all 
                select * from received_comments
                union all 
                select * from sent_reposts
                union all 
                select * from received_reposts
                union all 
                select * from follow
                union all
                select * from sent_pokes
                union all 
                select * from received_pokes
                union all 
                select * from sent_likes
                union all 
                select * from received_likes
                union all 
                select * from widgets
                )
      where "User"='{{singer}}' )


select 
date_part(epoch,to_timestamp("Date"::date)) as "date" ,
sum(case when "type"='Like' then trxs else 0 end) as "like",
sum(case when "type"='Post' then trxs else 0 end) as "post",
sum(case when "type"='Received_Comment' then trxs else 0 end) as "received_comment",
sum(case when "type"='Repost' then trxs else 0 end) as "repost",
sum(case when "type"='Receive_Repost' then trxs else 0 end) as "receive_repost",
sum(case when "type"='Poke' then trxs else 0 end) as "poke",
sum(case when "type"='Receive_Poke' then trxs else 0 end) as "receive_poke",
sum(case when "type"='Receive_Like' then trxs else 0 end) as "receive_like",
sum(case when "type"='Widget' then trxs else 0 end) as "widget",
sum(case when "type"='follow' then trxs else 0 end) as "follow"
from final 
group by 1 
order by "date" asc  
`,
  },
  {
    hash: null,
    firstReqTime: 10,
    id: 5,
    queryOption: {
      sortBy: [
        {
          column: "action",
          direction: "asc",
        },
      ],
    },
    query: `with 
users_posts as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    POST_TEXT as post, BLOCK_ID as blockHeight, tx_hash
    from near.social.fact_posts    
    where BLOCK_TIMESTAMP::date> '2023-01-01'

    ),

users_comments as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value):text as comment, 
    split(TRY_PARSE_JSON(l.value):item:path,'/')[0] as accountId,
    TRY_PARSE_JSON(l.value):item:blockHeight as blockHeight, tx_hash
    from near.social.fact_decoded_actions, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where l.key='comment' and comment is not null    
    and BLOCK_TIMESTAMP::date> '2023-01-01'

    ),

users_repost as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value)[0]:value:type as type, 
    split(TRY_PARSE_JSON(l.value)[0]:value:item:path,'/')[0] as accountId,
    TRY_PARSE_JSON(l.value)[0]:value:item:blockHeight as blockHeight, tx_hash
    from near.social.fact_decoded_actions as a, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where l.key='repost'    and BLOCK_TIMESTAMP::date> '2023-01-01'

    ),

users_follow as (
    with temp_data as (
        select BLOCK_TIMESTAMP, SIGNER_ID as user, tx_hash, l.value as data
        from near.social.fact_decoded_actions, 
        LATERAL FLATTEN(INPUT => NODE_DATA) l
        where l.key='graph'    
        and BLOCK_TIMESTAMP::date> '2023-01-01'
)

    select BLOCK_TIMESTAMP, user,
    COALESCE(TRY_PARSE_JSON(l.value):type, TRY_PARSE_JSON(l.value):value:type) as type, 
    COALESCE(TRY_PARSE_JSON(l.value):accountId, TRY_PARSE_JSON(l.value):value:accountId) as accountId, 
    tx_hash, rank() over (partition by user, accountId order by BLOCK_TIMESTAMP desc) as rank
    from temp_data, 
    LATERAL FLATTEN(INPUT => PARSE_JSON(data)) l
    where lower(type) in ('follow', 'unfollow')),

users_pokes as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value):key as type, 
    TRY_PARSE_JSON(l.value):value:accountId as accountId, tx_hash
    from near.social.fact_decoded_actions, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where TRY_PARSE_JSON(l.value):key='poke'
    and BLOCK_TIMESTAMP::date> '2023-01-01'

    ),

users_like as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user,
    TRY_PARSE_JSON(l.value):value:type as type, 
    split(TRY_PARSE_JSON(l.value):key:path,'/')[0] as accountId,
    TRY_PARSE_JSON(l.value):key:blockHeight as blockHeight, tx_hash,
    rank() over (partition by user, accountId, blockHeight order by BLOCK_TIMESTAMP desc) as rank
    from near.social.fact_decoded_actions, 
    LATERAL FLATTEN(INPUT => NODE_DATA) l
    where l.key='like' and type in ('like')
    and BLOCK_TIMESTAMP::date> '2023-01-01'

    ),


users_hashtags as (
    with temp_data as (
        select BLOCK_TIMESTAMP, SIGNER_ID as user, tx_hash, l.value as data
        from near.social.fact_decoded_actions, 
        LATERAL FLATTEN(INPUT => NODE_DATA) l
        where l.key='hashtag'    
        and BLOCK_TIMESTAMP::date> '2023-01-01'

        )

    select BLOCK_TIMESTAMP, user,
    TRY_PARSE_JSON(l.value):key as hashtag, 
    split(TRY_PARSE_JSON(l.value):value:path,'/')[2] as type,tx_hash
    from temp_data, 
    LATERAL FLATTEN(INPUT => PARSE_JSON(data)) l),

users_premium as (
    select BLOCK_TIMESTAMP, SIGNER_ID as user, DEPOSIT/1e24 as amount, 
    TO_TIMESTAMP(l.value) as expire_date
    from(select a.*, b.args as b_args from near.core.fact_actions_events_function_call a 
        left join near.core.fact_actions_events_function_call b
        on a.tx_hash=b.tx_hash and b.METHOD_NAME='set'),
    LATERAL FLATTEN(INPUT => PARSE_JSON(b_args:data:"premium.social.near":badge:premium:accounts)) as l
    where RECEIVER_ID='premium.social.near' and METHOD_NAME='purchase'
    and BLOCK_TIMESTAMP::date> '2023-01-01'
    ),

users_activities as (
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_addkey_events
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_decoded_actions
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_posts
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_profile_changes
    union 
    select distinct BLOCK_TIMESTAMP, SIGNER_ID as user
    from near.social.fact_widget_deployments),

users_min as (
    select user, min(BLOCK_TIMESTAMP) as min_date
    from users_activities
    group by 1),

posts as (
    select user, count(*) as posts
    from users_posts
    group by 1 
    ), 

sent_comments as (
    select user, count(*) as sent_comments
    from users_comments
    group by 1 
    ), 

received_comments as (
    select accountId, count(*) as received_comments
    from users_comments
    group by 1 
    ), 

sent_reposts as (
    select user, count(*) as sent_reposts
    from users_repost
    group by 1 
    ), 

received_reposts as (
    select accountId, count(*) as received_reposts
    from users_repost
    group by 1 
    ),

followings as (
    select user, count(*) as followings
    from users_follow
    where rank=1 and type ilike'follow'
    group by 1 
    ), 

followers as (
    select accountId, count(*) as followers
    from users_follow
    where rank=1 and type ilike 'follow'
    group by 1 
    ), 

sent_pokes as (
    select user, count(*) as sent_pokes
    from users_pokes
    group by 1 
    ), 

received_pokes as (
    select accountId, count(*) as received_pokes
    from users_pokes
    group by 1 
    ),

sent_likes as (
    select user, count(*) as sent_likes
    from users_like
    where rank=1 and type='like'
    group by 1 
    ), 

received_likes as (
    select accountId, count(*) as received_likes
    from users_like
    where rank=1 
    group by 1 
    ), 

hashtags as (
    select user, count(distinct hashtag) as hashtags
    from users_hashtags
    group by 1 
    ), 

widgets as (
    select SIGNER_ID as user, count(distinct TX_HASH) as widgets
    from near.social.fact_widget_deployments
    where  BLOCK_TIMESTAMP::date> '2023-01-01'
    group by 1 
    ),

users_stats as (
    select  a.user as user,
    posts, sent_comments, received_comments, sent_reposts, received_reposts,
    followings, followers, sent_pokes, received_pokes, sent_likes, received_likes, hashtags,
    widgets, min_date
    from users_min a
    
    left join users_premium b 
    on a.user=b.user and expire_date>=current_date
    
    left join posts up
    on a.user=up.user
    
    left join sent_comments uc_s
    on a.user=uc_s.user
    left join received_comments uc_r
    on a.user=uc_r.accountId
    
    left join sent_reposts ur_s
    on a.user=ur_s.user
    left join received_reposts ur_r
    on a.user=ur_r.accountId
    
    left join followings uf_s
    on a.user=uf_s.user 
    left join followers uf_r
    on a.user=uf_r.accountId 
    
    left join sent_pokes up_s
    on a.user=up_s.user 
    left join received_pokes up_r
    on a.user=up_r.accountId
    
    left join sent_likes ul_s
    on a.user=ul_s.user
    left join received_likes ul_r
    on a.user=ul_r.accountId 
    
    left join hashtags uh
    on a.user=uh.user
    
    
    left join widgets uw
    on a.user=uw.user)

      select 
           COALESCE(posts,0) as "action",
           'posts' as "type"
      from users_stats
      where user ='{{singer}}'

union 

      select 
           COALESCE(received_reposts,0) as "action",
           'received_reposts' as "type"
      from users_stats
      where user ='{{singer}}'

union 
      
      select 
           COALESCE(sent_reposts,0) as "action",
           'reposts' as "type"
      from users_stats
      where user ='{{singer}}'

union 

      select 
           COALESCE(sent_comments,0) as "action",
           'comments' as "type"
      from users_stats
      where user ='{{singer}}'

union 

      select 
           COALESCE(received_comments,0) as "action",
           'Received Comments' as "type"
      from users_stats
      where user ='{{singer}}'

union 

      select 
           COALESCE(sent_likes,0) as "action",
           'Likes' as "type"
      from users_stats
      where user ='{{singer}}'

union 

      select 
           COALESCE(received_likes,0) as "action",
           'Received Likes' as "type"
      from users_stats
      where user ='{{singer}}'

union 

      select 
           COALESCE(sent_pokes,0) as "action",
           'pokes' as "type"
      from users_stats
      where user ='{{singer}}'

union 

      select 
           COALESCE(received_pokes,0) as "action",
           'Received Pokes' as "type"
      from users_stats
      where user ='{{singer}}'

union 

      select 
           COALESCE(hashtags,0) as "action",
           'Hashtags' as "type"
      from users_stats
      where user ='{{singer}}'


union 

      select 
           COALESCE(widgets,0) as "action",
           'Widgets' as "type"
      from users_stats
      where user ='{{singer}}' 
`,
  },
];

//---------------------------------------------------------------------------------------------------

const followers = {
  height: "80px",
  align: "center",
  description: state.result["query" + 1]?.data[0].followers,
  brand: `Followers`,
  fontsize: "15px",
  fontweight: "10px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const followings = {
  height: "80px",
  align: "center",
  description: state.result["query" + 1]?.data[0].followings,
  brand: `Followings`,
  fontsize: "15px",
  fontweight: "10px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const posts = {
  height: "80px",
  align: "center",
  description: state.result["query" + 1]?.data[0].posts,
  brand: `Posts`,
  fontsize: "15px",
  fontweight: "10px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const reposts = {
  height: "80px",
  align: "center",
  description: state.result["query" + 1]?.data[0].reposts,
  brand: `Reposts`,
  fontsize: "15px",
  fontweight: "10px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const comments = {
  height: "80px",
  align: "center",
  description: state.result["query" + 1]?.data[0].comments,
  brand: `Comments`,
  fontsize: "15px",
  fontweight: "10px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const likes = {
  height: "80px",
  align: "center",
  description: state.result["query" + 1]?.data[0].likes,
  brand: `Likes`,
  fontsize: "15px",
  fontweight: "10px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const pokes = {
  height: "80px",
  align: "center",
  description: state.result["query" + 1]?.data[0].pokes,
  brand: `Pokes`,
  fontsize: "15px",
  fontweight: "10px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const widgets = {
  height: "80px",
  align: "center",
  description: state.result["query" + 1]?.data[0].widgets,
  brand: `Widgets`,
  fontsize: "15px",
  fontweight: "10px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const hashtags = {
  height: "80px",
  align: "center",
  description: state.result["query" + 1]?.data[0].hashtags,
  brand: `Hashtags`,
  fontsize: "15px",
  fontweight: "10px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
const join_date = {
  height: "80px",
  align: "center",
  description: state.result["query" + 1]?.data[0].join_date,
  brand: `Join Date`,
  fontsize: "15px",
  fontweight: "10px",
  afterbrand: "",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};

const received_pokes = {
  height: "80px",
  align: "center",
  description: state.result["query" + 1]?.data[0].received_pokes,
  brand: `Received`,
  fontsize: "15px",
  fontweight: "10px",
  afterbrand: "Pokes",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};

const received_likes = {
  height: "80px",
  align: "center",
  description: state.result["query" + 1]?.data[0].received_likes,
  brand: `Received`,
  fontsize: "15px",
  fontweight: "10px",
  afterbrand: "Likes",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};

const received_comments = {
  height: "80px",
  align: "center",
  description: state.result["query" + 1]?.data[0].received_comments,
  brand: `Received`,
  fontsize: "15px",
  fontweight: "10px",
  afterbrand: "Comments",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};

const received_reposts = {
  height: "80px",
  align: "center",
  description: state.result["query" + 1]?.data[0].received_reposts,
  brand: `Received`,
  fontsize: "15px",
  fontweight: "10px",
  afterbrand: "Reposts",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};
//---------------------------------------------------------------------------------------------------

// state ####################################
State.init({
  searchedSinger: "",
  searchedInterval: "",
  result: {},
  //loader: [],
  isLoading: false,
  error: [],
  queriesRuned: false,
  tab: tabs.left,
});

const checkNewSinger = () => {
  if (state.searchedSinger === singer && state.searchedInterval === interval) {
    return;
  } else {
    State.update({
      searchedSinger: singer,
      searchedInterval: interval,
      //loader: [],
      loader: false,
      result: {},
      isLoading: true,
      queriesRuned: false,
    });
  }
  return true;
};
if (checkNewSinger()) {
  return <div>loading...</div>;
}

checkNewSinger();
// handle hashed data #############################
const handleHasedData = ({ hash, id }) => {
  if (state.result["query" + id].isDone) return;
  const result = fetchData(hash);
  if (result.isLoading) {
    State.update({
      isLoading: true,
      result: {
        ...state.result,
        ["query" + id]: { isLoading: true, error: false, data: null },
      },
    });
  }
  if (result.error) {
    const errors = state.error;
    errors.push(`query ${id}: ${result.error}`);
    State.update({
      error: errors,
      result: {
        ...state.result,
        ["query" + id]: {
          isLoading: false,
          error: true,
          data: null,
          isDone: true,
        },
      },
    });
  }
  if (result.data) {
    const filteredData = result.data.filter(
      (row) => row.SINGER === state.searchedSinger
    );
    State.update({
      result: {
        ...state.result,
        ["query" + id]: {
          isLoading: false,
          error: false,
          data: filteredData,
          isDone: true,
        },
      },
    });
  }
};
const fetchData = (hash) => {
  const data = fetch(
    `https://api.flipsidecrypto.com/api/v2/queries/${hash}/data/latest`,
    {
      subscribe: true,
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    }
  );
  const result = {
    data: (data && data.body) || null,
    error: (data && !data.ok && (data.status || data.error)) || null,
    isLoading: !data && !error,
  };
  return result;
};
// handle runed data ###################################
const createQuery = (queries, singer, interval) => {
  const queriesArr = queries.map((q) => {
    const queryWithProps = q.query
      .replaceAll("{{singer}}", singer)
      .replaceAll("{{week}}", interval);
    q.query = queryWithProps;
    return q;
  });
  return queriesArr;
};
const isAllDataLoaded = () => {
  const resultArr = Object.entries(state.result);
  if (resultArr.length === 0) return false;
  return resultArr.every((query) => {
    return !query[1].isLoading;
  });
};
const updateResultState = ({ data, error, isLoading, queryRunId, id }) => {
  State.update(({ result, loader }) => {
    const newResult = {
      ...result,
      [`query${id}`]: {
        data:
          data?.rows === undefined ? null : data.rows === null ? [] : data.rows,
        error: !!error,
        isLoading: isLoading,
        queryRunId: queryRunId,
        id: id,
      },
    };
    //const newLoader = loader.filter(({ id: loaderId }) => loaderId !== id);
    if (error) {
      const queryError = `query${id} : ${error}`;
      return {
        ...state,
        result: { ...newResult },
        // loader: newLoader.length === 0 ? [] : newLoader,
        error: [...state.error, queryError],
      };
    } else {
      if (data) {
        Storage.set(
          `${state.searchedSinger}-${state.searchedInterval}-${id}`,
          queryRunId
        );
      }
      return {
        ...state,
        result: { ...newResult },
        //...(data && { loader: newLoader.length === 0 ? [] : newLoader }),
      };
    }
  });
};

const runqueries = (queries) => {
  if (state.searchedSinger.length === 0) {
    State.update({
      isLoading: false,
      error: [...state.error, "singer is not provided"],
    });
    return;
  }
  5;

  const queriesArr = createQuery(
    queries,
    state.searchedSinger,
    state.searchedInterval
  );
  const loader = queriesArr.map((q) => {
    const queryRunId = Storage.get(
      `${state.searchedSinger}-${state.searchedInterval}-${q.id}`
    );

    const props = {
      apiKey: API_KEY,
      id: q.id,
      query: q.query,
      onResult: updateResultState,
      firstReqTime: q.firstReqTime,
      queryRunId,
      queryOption: {
        page: {
          number: 1,
          size: 1000,
        },
        cacheTime: 60,
        ...q?.queryOption,
      },
    };
    return {
      id: q.id,
      element: (
        <Widget src="lord1.near/widget/api-flipside" id={q.id} props={props} />
      ),
    };
  });
  State.update({
    loader: loader,
    isLoading: true,
    queriesRuned: true,
  });
};

if (isAllDataLoaded()) {
  State.update({ isLoading: false });
}

if (state.isLoading) {
  const withHashQueries = [];
  const withoutHashQueries = [];
  queries.forEach(({ hash, id, query, ...other }) => {
    if (hash) {
      withHashQueries.push({ hash, id });
    }
    if (query) {
      withoutHashQueries.push({ query, hash, id, ...other });
    }
  });
  withHashQueries.forEach((query) => handleHasedData(query));
  if (!state.queriesRuned) {
    runqueries(withoutHashQueries);
  }
}

// error managment #######################
if (state.error.length > 0) {
  function hide() {
    const errors = state.error;
    errors.shift();
    if (errors.length > 0) setTimeout(hide, 2500);
    State.update({ error: errors });
  }
  setTimeout(hide, 2500);
}

// get props charts #######################################
const getMixProps = (data, dateKey, serieses, colors, chartOption) => {
  data = data || [];
  serieses = serieses || [{ key: "", seriesName: "", type: "", id: 1 }];
  colors = colors || [];
  chartOption = chartOption || {};

  const dataFormat = serieses.map((series) => {
    const dataFormated = data.map((d) => [d[dateKey] * 1000, d[series.key]]);
    return {
      data: dataFormated,
      name: series.seriesName,
      type: series.type,
      axisId: series.id,
    };
  });
  const props = {
    series: dataFormat,
    colors: colors,
    chartOption: {
      title: "chart title",
      subtitle: "chart subtitle",
      legend: true,
      stacking: "false",
      ...chartOption,
    },
    overrideOptions: {
      plotOptions: {
        column: {
          stacking: "false",
        },
        series: {
          dataGrouping: { enabled: false },
        },
      },
    },
    themeColor: { chart: themeColor.chart },
    spinnerColors: themeColor.spinnerColors,
  };
  return props;
};

const getPieProps = (data, [key, value], colors, chartOption) => {
  data = data || [];
  colors = colors || [];
  chartOption = chartOption || {};

  const groupedData = {};
  for (const item of data) {
    const keyValue = item[key];
    const valueValue = item[value];

    if (groupedData[keyValue]) {
      groupedData[keyValue] += valueValue;
    } else {
      groupedData[keyValue] = valueValue;
    }
  }

  const dataFormat = Object.entries(groupedData).map(
    ([groupKey, groupValue]) => [groupKey, groupValue]
  );

  const props = {
    data: dataFormat,
    colors: colors,
    chartOption: {
      title: "chart title",
      type: "pie",
      legend: false,
      connector: false,
      ...chartOption,
    },
    themeColor: { chart: themeColor.chart },
    spinnerColors: themeColor.spinnerColors,
  };
  return props;
};

// dom sections ##############################################
const noData = <div className="w-100 py-4 text-center"> No data available</div>;
const ChartIsLoading = (queryId) => (
  <div
    className={`w-100 ${
      state.result?.[`query${queryId}`]?.isLoading ? "d-block" : "d-none"
    }`}
  >
    <Widget
      src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
      props={{ ...spinnerColors }}
    />
  </div>
);
const ChartHasError = (queryId) =>
  state.result?.[`query${queryId}`]?.error && (
    <div className="py-4 text-center">An error occurred for this section</div>
  );

const CardIsLoading = (queryId) =>
  state.result?.[`query${queryId}`]?.isLoading && (
    <div
      className="d-flex flex-column gap-1"
      style={{
        padding: "60px 12px",
      }}
    >
      <Widget
        src={`easypoll-v0.ndc-widgets.near/widget/Common.Spinner`}
        props={{
          ...spinnerColors,
        }}
      />
      <span
        style={{
          fontWeight: "bold",
          fontsize: 15,
          color: "#4f46e5",
          textAlign: "center",
        }}
      >
        Loading...
      </span>
    </div>
  );
const CardHasError = (queryId) =>
  state.result?.[`query${queryId}`]?.error && (
    <div className="d-flex justify-content-center align-items-center h-100 p-4 pb-1">
      An error occurred for this section
    </div>
  );

let TableSection = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <Widget
                src="mob.near/widget/Profile.InlineBlock"
                props={{
                  accountId: singer,
                  themeColor: {
                    profile_large: themeColor.profile_large,
                  },
                }}
              />
            </div>
            <div className="col-md-4">
              <Widget
                src="lord1.near/widget/header-dynamic"
                props={join_date}
              />
            </div>
            <div className="col-md-2">
              <Widget src="lord1.near/widget/header-dynamic" props={hashtags} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-2">
              <Widget
                src="lord1.near/widget/header-dynamic"
                props={followers}
              />
            </div>
            <div className="col-md-2">
              <Widget src="lord1.near/widget/header-dynamic" props={posts} />
            </div>
            <div className="col-md-2">
              <Widget src="lord1.near/widget/header-dynamic" props={reposts} />
            </div>
            <div className="col-md-2">
              <Widget src="lord1.near/widget/header-dynamic" props={comments} />
            </div>
            <div className="col-md-2">
              <Widget src="lord1.near/widget/header-dynamic" props={likes} />
            </div>
            <div className="col-md-2">
              <Widget src="lord1.near/widget/header-dynamic" props={pokes} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <Widget
                src="lord1.near/widget/header-dynamic"
                props={followings}
              />
            </div>
            <div className="col-md-2">
              <Widget src="lord1.near/widget/header-dynamic" props={widgets} />
            </div>
            <div className="col-md-2">
              <Widget
                src="lord1.near/widget/header-dynamic"
                props={received_reposts}
              />
            </div>
            <div className="col-md-2">
              <Widget
                src="lord1.near/widget/header-dynamic"
                props={received_comments}
              />
            </div>
            <div className="col-md-2">
              <Widget
                src="lord1.near/widget/header-dynamic"
                props={received_likes}
              />
            </div>
            <div className="col-md-2">
              <Widget
                src="lord1.near/widget/header-dynamic"
                props={received_pokes}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

let TableLeft = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-4 overflow-auto"
    >
      {CardIsLoading(2)}
      {CardHasError(2)}
      {state.result["query" + 2]?.data && (
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.result["query" + 2]?.data,
            rowsCount: 5,
            columns: [
              {
                title: "User",
                key: "user",
                colors: "#806ce1",
                link: "yes",
                hyperlink: "yes",
                beforehref:
                  "https://near.social/mob.near/widget/ProfilePage?accountId=",
              },
              {
                title: "Received Reposts",
                key: "received_reposts",
              },
              { title: "Received Comments", key: "received_comments" },
              { title: "Received Likes", key: "received_likes" },
              { title: "Received Pokes", key: "received_pokes" },
              { title: "Favorite Score", key: "favorite_score" },
            ],
          }}
        />
      )}
    </div>
  </div>
);

let TableRight = (
  <div
    style={{ background: themeColor?.sbt_area?.section_bg }}
    className="shadow-sm rounded-2 overflow-auto p-2"
  >
    <div
      style={{ background: themeColor?.sbt_area?.card_bg }}
      className="shadow-sm rounded-4 overflow-auto"
    >
      {CardIsLoading(3)}
      {CardHasError(3)}
      {state.result["query" + 3]?.data && (
        <Widget
          src="lord1.near/widget/table-pagination"
          props={{
            themeColor: { table_pagination: themeColor.table_pagination },
            data: state.result["query" + 3]?.data,
            rowsCount: 5,
            columns: [
              {
                title: "User",
                key: "user",
                colors: "#806ce1",
                link: "yes",
                hyperlink: "yes",
                beforehref:
                  "https://near.social/mob.near/widget/ProfilePage?accountId=",
              },
              { title: "Reposts", key: "reposts" },
              { title: "comments", key: "comments" },
              { title: "likes", key: "likes" },
              { title: "Pokes", key: "pokes" },
              { title: "Fan Score", key: "fan_score" },
            ],
          }}
        />
      )}
    </div>
  </div>
);
let Chartpie = (
  <div className=" col-12 col-md-12">
    <div className=" col-12 ">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="w-100 mx-auto shadow-sm rounded-4 p-2"
      >
        {ChartIsLoading(5)}
        {ChartHasError(5)}
        {state.result["query" + 5]?.data && (
          <Widget
            src="lord1.near/widget/Pie-chart"
            props={getPieProps(
              state.result["query" + 5]?.data,
              ["type", "action"],
              themeColor.chartColor,
              {
                title: "",
                type: "pie",
                connector: true,
                legend: true,
              }
            )}
          />
        )}
      </div>
    </div>
  </div>
);
let ChartSections = (
  <div className=" col-12 col-md-12">
    <div className="py-2"></div>
    <div className=" col-12">
      <div
        style={{ background: themeColor?.sbt_area?.card_bg }}
        className="shadow-sm rounded-2"
      >
        {ChartIsLoading(4)}
        {ChartHasError(4)}
        {state.result["query" + 4]?.data && (
          <Widget
            src="lord1.near/widget/mix-chart"
            props={getMixProps(
              state.result["query" + 4]?.data,
              "date",
              [
                {
                  key: "like",
                  seriesName: "Like",
                  type: "column",
                  id: 1,
                },
                {
                  key: "received_comment",
                  seriesName: "Received Comment",
                  type: "column",
                  id: 1,
                },
                {
                  key: "post",
                  seriesName: "Post",
                  type: "column",
                  id: 1,
                },
                {
                  key: "repost",
                  seriesName: "Repost",
                  type: "column",
                  id: 1,
                },
                {
                  key: "receive_repost",
                  seriesName: "Receive Repost",
                  type: "column",
                  id: 1,
                },
                {
                  key: "poke",
                  seriesName: "Poke",
                  type: "column",
                  id: 1,
                },
                {
                  key: "receive_poke",
                  seriesName: "Receive Poke",
                  type: "column",
                  id: 1,
                },
                {
                  key: "receive_like",
                  seriesName: "Receive Like",
                  type: "column",
                  id: 1,
                },
                {
                  key: "widget",
                  seriesName: "Widget",
                  type: "column",
                  id: 1,
                },
                {
                  key: "follow",
                  seriesName: "Follow",
                  type: "column",
                  id: 1,
                },
              ],
              themeColor.chartColor,
              {
                title: "Activity",
                subtitle: `Number of transactions `,
                stacking: "normal",
              }
            )}
          />
        )}
      </div>
    </div>
  </div>
);
return (
  <>
    {state.loader && (
      <div className="d-none">
        {state.loader.map((l) => (
          <pre key={l.id}>{l?.element}</pre>
        ))}
      </div>
    )}
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {state.error.length > 0 &&
        state.error.map((er) => (
          <div
            key={er}
            className="toast show align-items-center text-bg-danger border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">{er}</div>
            </div>
          </div>
        ))}
    </div>
    <div
      className="w-100"
      style={{ backgroundColor: themeColor?.search_sbt?.table_bg }}
    >
      <Widget src="lord1.near/widget/header-dynamic" props={tabel} />
      <div className="w-100">{TableSection}</div>
      <div className="row">
        <div className="col-md-8">{ChartSections}</div>
        <div className="col-md-4">{Chartpie}</div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Widget
            src="lord1.near/widget/header-dynamic"
            props={favorite_score}
          />
          {TableLeft}
        </div>
        <div className="col-md-6">
          <Widget src="lord1.near/widget/header-dynamic" props={fan_score} />
          {TableRight}
        </div>
      </div>
    </div>
  </>
);
