# README

(Get Together And...)[https://get-together-and.herokuapp.com/] a Meetup.com clone

## Summary of the project
This is a clone of Meetup.com. It allows users to create groups, becoming their organizer, as well as to join or leave existing groups as a member. Organizers can edit their groups including adding a cover photo, as well as to delete their group. They can also create and edit events. Users can see a list of groups that they can join or unjoin.

Upcoming features are: the ability for organizers to add an event photo, delete events, to remove members, for members to RSVP to events, view a feed of their events, and to search for groups and/or events.

## Instructions
![Signup Screenshot](./Screenshot_SignUp.png "Signup Screenshot")
Click Sign Up to create a user. You will then be directed to a home feed, which currently displays the list of groups. You can also create a group by clicking on the Start a new group link.
![Create a New Group Screenshot](./Screenshot_StartNewGroup.png "Start New Group")

After creating a group, you will see a group's homepage. If you are the owner, you can edit the group info and add / edit events. If you are not the owner, you can join / leave a group.
![Group Show Page](./Screenshot_GroupShow.png "Group Show Page")

In the future, you will be able to RSVP "going" or "not going" to events, and see your own event feed and search for events/groups from the menu bar.

## How to build / run the code

To build this code, run `bundle install` in the root directory, then `rails s` to start the rails server. If you'd like to reset and reseed the database, run `rails db:seed:replant`. Run `npm start` in the `./frontend` folder.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions