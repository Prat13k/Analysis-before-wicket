create database analysis_before_wicket;
use analysis_before_wicket;

create table blog_details(
	blog_id int auto_increment primary key,
    blog_title varchar(25),
    blog_author varchar(20),
    blog_content text,
    blog_publish_date timestamp default current_timestamp, 
    blog_image Longblob
);

create table subscriber_list(
	subscriber_id int auto_increment primary key,
    subscriber_email varchar(50),
	subscribed_at timestamp default current_timestamp
);

desc blog_details;
desc subscriber_list;