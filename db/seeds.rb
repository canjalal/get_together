# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'open-uri'

# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    puts "User first has #{User.count} elements"
    User.destroy_all
    puts "User now has #{User.count} elements"
    puts "Group first had #{Group.count} elements"
    Group.destroy_all
    puts "Group now has #{Group.count} elements"
    puts "Keyword first had #{Keyword.count} elements"
    Keyword.destroy_all
    puts "Keyword now has #{Keyword.count} elements"
    puts "GroupKeyword first had #{GroupKeyword.count} elements"
    GroupKeyword.destroy_all
    puts "GroupKeyword now has #{GroupKeyword.count} elements"

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('groups')
    ApplicationRecord.connection.reset_pk_sequence!('keywords')
    ApplicationRecord.connection.reset_pk_sequence!('group_keywords')
    
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    u = User.create!(
        name: "Seth Goldstein",
        email: "seth@yorku.ca",
        password: "password",
        location: "Thornhill, ON"
    )
    u = User.create!(
        name: 'Jane Rabinowitz', 
        email: 'jane.d.rabinowitz@gmail.com', 
        password: 'password',
        location: "Los Angeles, CA"
    )
    u = User.create!(
        name: 'Lucius Malfoy', 
        email: 'l.malfoy@harthouse.ca', 
        password: 'password',
        location: "Toronto, ON"
    )
    u = User.create!(
        name: 'Tara Reid', 
        email: 'tara.reid@hollywood.com', 
        password: 'password',
        location: "Burbank, CA"
    )
    u = User.create!(
        name: 'Daphne Bridgerton', 
        email: 'd.bridgerton@oxford.edu', 
        password: 'password',
        location: "Stratford, ON"
    )

    puts "Creating groups..."
    g = Group.create!(
        name: "East Bay Extreme Knitters",
        owner_id: 2,
        description: "Imagine knitting taken as an extreme sport.",
        member_label: "fan-knit-tics",
        location: "Piedmont, CA"
    )
    file = URI.open('https://active-storage-get-together-seeds.s3.us-west-1.amazonaws.com/weird-knits-dwarven-helm-bySadDaysCrochet.jpg')
    g.cover_photo.attach(io: file, filename: 'weird-knits-dwarven-helm-bySadDaysCrochet.jpg')
    g = Group.create!(
        name: "Pizza Lovers in SF",
        owner_id: 4,
        description: "We are the discerning pizza-critics of the Bay",
        member_label: "pizza lover",
        location: "San Francisco, CA"
    )
    file = URI.open('https://active-storage-get-together-seeds.s3.us-west-1.amazonaws.com/sfstylepizza.jpg')
    g.cover_photo.attach(io: file, filename: "sfstylepizza.jpg")

    g = Group.create!(
        name: "Oakland Windows 3.1 Enthusiasts",
        owner_id: 5,
        description: "Aficionados of the OS that started it all",
        member_label: "progman",
        location: "Oakland, CA"
    )
    file = URI.open('https://active-storage-get-together-seeds.s3.us-west-1.amazonaws.com/program-manager.jpg')
    g.cover_photo.attach(io: file, filename: "program-manager.jpg")

    puts "Creating keywords..."
    Keyword.create!(
        keyword: "knitting"
    )
    Keyword.create!(
        keyword: "tech"
    )
    Keyword.create!(
        keyword: "food"
    )
    Keyword.create!(
        keyword: "East Bay"
    )
    Keyword.create!(
        keyword: "music"
    )
    Keyword.create!(
        keyword: "movies"
    )
    Keyword.create!(
        keyword: "language"
    )
    Keyword.create!(
        keyword: "drinking"
    )
    Keyword.create!(
        keyword: "hiking"
    )
    Keyword.create!(
        keyword: "dancing"
    )
    Keyword.create!(
        keyword: "improv"
    )
    Keyword.create!(
        keyword: "literature"
    )
    Keyword.create!(
        keyword: "beauty"
    )
    Keyword.create!(
        keyword: "healing"
    )


    puts "Creating group keywords..."
    GroupKeyword.create!(group_id: 1, keyword_id: 1)
    GroupKeyword.create!(group_id: 1, keyword_id: 4)
    GroupKeyword.create!(group_id: 2, keyword_id: 3)
    GroupKeyword.create!(group_id: 3, keyword_id: 2)
    GroupKeyword.create!(group_id: 3, keyword_id: 4)
# end