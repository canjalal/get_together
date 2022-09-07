# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
    name: 'Jane Rabinowitz', 
    email: 'jane.d.rabinowitz@gmail.com', 
    password: 'password',
    location: "Los Angeles, CA"
    )
    User.create!(
        name: 'Lucius Malfoy', 
        email: 'l.malfoy@harthouse.ca', 
        password: 'password',
        location: "Toronto, ON"
    )
    User.create!(
        name: 'Tara Reid', 
        email: 'tara.reid@hollywood.com', 
        password: 'password',
        location: "Burbank, CA"
    )
    User.create!(
        name: 'Daphne Bridgerton', 
        email: 'd.bridgerton@oxford.edu', 
        password: 'password',
        location: "Stratford, ON"
    )

    puts "Creating groups..."
    Group.create!(
        id: 1,
        name: "East Bay Extreme Knitters",
        owner_id: 2,
        description: "Imagine knitting taken as an extreme sport.",
        member_label: "fan-knit-tics",
        location: "Piedmont, CA"
    )
    Group.create!(
        id: 4,
        name: "Pizza Lovers in SF",
        owner_id: 4,
        description: "We are the discerning pizza-critics of the Bay",
        member_label: "pizza lover",
        location: "San Francisco, CA"
    )
    Group.create!(
        id: 5,
        name: "Oakland Windows 3.1 Enthusiasts",
        owner_id: 5,
        description: "Aficionados of the OS that started it all",
        member_label: "progman",
        location: "Oakland, CA"
    )
end