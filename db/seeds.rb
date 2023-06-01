ActiveStorage::Blob.create!([
  {key: "gylupjvl6o4hfcw8eo38lmg71fkb", filename: "weird-knits-dwarven-helm-bySadDaysCrochet.jpg", content_type: "image/jpeg", metadata: {"identified"=>true, "analyzed"=>true}, service_name: "amazon_dev", byte_size: 42031, checksum: "GgBv6Znrnm6OFmjSrolvrQ=="},
  {key: "igos9v7aidrjexcbvult4h13rygg", filename: "sfstylepizza.jpg", content_type: "image/jpeg", metadata: {"identified"=>true, "analyzed"=>true}, service_name: "amazon_dev", byte_size: 269595, checksum: "Ztc2NStDEPZx2HoZL6Cmhg=="},
  {key: "mpw2u64doqkefatmcymkcp82d70f", filename: "program-manager.jpg", content_type: "image/jpeg", metadata: {"identified"=>true, "analyzed"=>true}, service_name: "amazon_dev", byte_size: 87295, checksum: "dF7czTqp+oI5xP3nhJHt2g=="},
  {key: "g4xegv0paju96lztq1wd73xslkt2", filename: "20150115183825-books-reading.webp", content_type: "image/webp", metadata: {"identified"=>true, "analyzed"=>true}, service_name: "amazon_dev", byte_size: 50682, checksum: "FrIRG3ylru6M310DEEUW0Q=="},
  {key: "pircnte7yztc1m6sng3kklwcnsco", filename: "scaryfunnymovies.jpg", content_type: "image/jpeg", metadata: {"identified"=>true, "analyzed"=>true}, service_name: "amazon_dev", byte_size: 120988, checksum: "nF+jviUkH11D6td75CRTPQ=="},
  {key: "q28v4lfas7wgnswfskijbrwj3t4p", filename: "57-577153_academy-award-statue-png-trofeo-oscar-png.png", content_type: "image/jpeg", metadata: {"identified"=>true, "analyzed"=>true}, service_name: "amazon_dev", byte_size: 93880, checksum: "j1oJBFAGU+M5kW03LIdntw=="},
  {key: "hlz6v5yo1a405rzbxq47e4yfk6ag", filename: "lab-image-full-denture.png", content_type: "image/png", metadata: {"identified"=>true, "analyzed"=>true}, service_name: "amazon_dev", byte_size: 175746, checksum: "LqyRccdPR2vr61QuRjHmVQ=="}
])
ActiveStorage::Attachment.create!([
  {name: "cover_photo", record_type: "Group", record_id: 1, blob_id: 4},
  {name: "cover_photo", record_type: "Group", record_id: 2, blob_id: 5},
  {name: "cover_photo", record_type: "Group", record_id: 3, blob_id: 6},
  {name: "cover_photo", record_type: "Group", record_id: 7, blob_id: 7},
  {name: "cover_photo", record_type: "Group", record_id: 9, blob_id: 8},
  {name: "cover_photo", record_type: "Group", record_id: 8, blob_id: 9},
  {name: "cover_photo", record_type: "Group", record_id: 13, blob_id: 12}
])
User.create!([
  {name: "Lucius Malfoy", email: "l.malfoy@harthouse.ca", password_digest: "$2a$12$rJU6d3tHucwyQTEGGmo/E.9LGOwjYeiPzwwWptksf4uDJpgNNJIBu", session_token: "v-VslnCYIAEwqOjQJLTTRA", location: "Toronto, ON"},
  {name: "Linda Berman", email: "linda.berman@utoronto.ca", password_digest: "$2a$12$YmHr55Xkqd.Nii74lqV/Reyer0IBO8biF5v8JZpOA2JZeCedoy.me", session_token: "Bi3Kgg87gPqmXh9CiSnqrA", location: "Whitby, ON"},
  {name: "Tara Reid", email: "tara.reid@hollywood.com", password_digest: "$2a$12$Ci0uxkp0YlK5d7s/3iULpOG6myeWghTCmZAepXfkzrTR.RPoOHhpm", session_token: "-UJinnXrWoFJWwZBxHWRSg", location: "Burbank, CA"},
  {name: "Jane Rabinowitz", email: "jane.d.rabinowitz@gmail.com", password_digest: "$2a$12$wng6m1jQN5h5VbtJZkeKm.xLuZLIDRID22Zg/6pyPGE11jRoXl09e", session_token: "5OpCj4yFVO-sLdr-ro6gxw", location: "Los Angeles, CA"},
  {name: "Ryan Reynolds", email: "ryan.reynolds@kpu.ca", password_digest: "$2a$12$7TVXrbHVum8jEJkuJypsAeksSpLskLkTQqfSIFEdB1zGMkm2d9Eu2", session_token: "dYen9MPVqrc_2KWYe57VPw", location: "Vancouver, BC"},
  {name: "Taylor Tomlinson", email: "ttom93@gmail.com", password_digest: "$2a$12$uNB2yU5JWolpwtirPGhca.ysHKRx70Bzwnr3CGCCtwjNeYoh6aEoK", session_token: "pvxAB2uGYDoEBG8ZKHvCGg", location: "Los Angeles, CA"},
  {name: "Seth Goldstein", email: "seth@yorku.ca", password_digest: "$2a$12$u47G/YXNBSlN3ezY/8XdRuL0zUFEKw2kiA6BHux1L2j.TzRj7t3C.", session_token: "1J-XIbw_RO1YPBjfmh7F0g", location: "Thornhill, ON"},
  {name: "Daphne Bridgerton", email: "d.bridgerton@oxford.edu", password_digest: "$2a$12$9K46GoqtHipyjLy9y3TcveAZ86qhqk7ks5oyUywPX/m8zZgPECtvK", session_token: "hH7HgfTdsnase66-piURIw", location: "Stratford, ON"}
])
Signup.create!([
  {event_id: 3, attendee_id: 7, rsvp_status: "going"},
  {event_id: 1, attendee_id: 7, rsvp_status: "going"},
  {event_id: 7, attendee_id: 1, rsvp_status: "going"},
  {event_id: 3, attendee_id: 1, rsvp_status: "going"},
  {event_id: 7, attendee_id: 4, rsvp_status: "going"},
  {event_id: 10, attendee_id: 4, rsvp_status: "going"},
  {event_id: 2, attendee_id: 4, rsvp_status: "going"},
  {event_id: 1, attendee_id: 4, rsvp_status: "not"},
  {event_id: 12, attendee_id: 2, rsvp_status: "going"},
  {event_id: 10, attendee_id: 2, rsvp_status: "going"},
  {event_id: 9, attendee_id: 2, rsvp_status: "going"},
  {event_id: 1, attendee_id: 2, rsvp_status: "going"},
  {event_id: 9, attendee_id: 1, rsvp_status: "not"},
  {event_id: 10, attendee_id: 5, rsvp_status: "not"},
  {event_id: 7, attendee_id: 5, rsvp_status: "not"},
  {event_id: 12, attendee_id: 7, rsvp_status: "going"},
  {event_id: 15, attendee_id: 1, rsvp_status: "going"},
  {event_id: 15, attendee_id: 2, rsvp_status: "going"},
  {event_id: 10, attendee_id: 1, rsvp_status: "going"},
  {event_id: 12, attendee_id: 1, rsvp_status: "going"},
  {event_id: 13, attendee_id: 1, rsvp_status: "going"},
  {event_id: 2, attendee_id: 8, rsvp_status: "going"},
  {event_id: 2, attendee_id: 7, rsvp_status: "going"},
  {event_id: 23, attendee_id: 8, rsvp_status: "going"},
  {event_id: 17, attendee_id: 8, rsvp_status: "going"}
])
Membership.create!([
  {member_id: 6, group_id: 2},
  {member_id: 6, group_id: 1},
  {member_id: 7, group_id: 2},
  {member_id: 7, group_id: 3},
  {member_id: 1, group_id: 9},
  {member_id: 7, group_id: 7},
  {member_id: 7, group_id: 13},
  {member_id: 5, group_id: 1},
  {member_id: 1, group_id: 3},
  {member_id: 1, group_id: 1},
  {member_id: 8, group_id: 1}
])
Keyword.create!([
  {keyword: "knitting"},
  {keyword: "tech"},
  {keyword: "food"},
  {keyword: "East Bay"},
  {keyword: "music"},
  {keyword: "movies"},
  {keyword: "language"},
  {keyword: "drinking"},
  {keyword: "hiking"},
  {keyword: "dancing"},
  {keyword: "improv"},
  {keyword: "literature"},
  {keyword: "beauty"},
  {keyword: "healing"}
])
GroupKeyword.create!([
  {keyword_id: 1, group_id: 1},
  {keyword_id: 4, group_id: 1},
  {keyword_id: 3, group_id: 2},
  {keyword_id: 2, group_id: 3},
  {keyword_id: 4, group_id: 3},
  {keyword_id: 13, group_id: 13},
  {keyword_id: 5, group_id: 19},
  {keyword_id: 8, group_id: 19},
  {keyword_id: 10, group_id: 19},
  {keyword_id: 3, group_id: 20},
  {keyword_id: 6, group_id: 9},
  {keyword_id: 7, group_id: 9},
  {keyword_id: 12, group_id: 23},
  {keyword_id: 13, group_id: 23},
  {keyword_id: 7, group_id: 17},
  {keyword_id: 8, group_id: 17},
  {keyword_id: 12, group_id: 17},
  {keyword_id: 3, group_id: 7},
  {keyword_id: 12, group_id: 7},
  {keyword_id: 6, group_id: 8},
  {keyword_id: 8, group_id: 8}
])
Group.create!([
  {name: "East Bay Extreme Knitters", description: "Imagine knitting taken as an extreme sport.", member_label: "fan-knit-tics", location: "Piedmont, CA", owner_id: 2},
  {name: "Pizza Lovers in SF", description: "We are the discerning pizza-critics of the Bay", member_label: "pizza lover", location: "San Francisco, CA", owner_id: 4},
  {name: "Oakland Windows 3.1 Enthusiasts", description: "Aficionados of the OS that started it all", member_label: "progman", location: "Oakland, CA", owner_id: 5},
  {name: "Lower Mainland Movie Buffs Group", description: "This group is for people in the Lower Mainland to come and discuss great movies. We'll go watch movies together", member_label: "", location: "Vancouver, BC", owner_id: 7},
  {name: "San Francisco Literature Group", description: "Come 'round and let's discuss the greatest of literature over the hills of the City! Rain or shine we'll be discussing", member_label: "avid readers", location: "San Francisco, CA", owner_id: 1},
  {name: "San Francisco Movies and TV Group", description: "A fun gathering of people who love discussing the latest and greatest movies and TV and streaming services", member_label: "cinephiles", location: "San Francisco, CA", owner_id: 1},
  {name: "South Bay Cosmetic Dentists Commune", description: "We are a group of dentists in the South Bay who love to get together to talk about the latest in cosmetic dentistry and to shmooze", member_label: nil, location: "Palos Verdes Estates, CA", owner_id: 1},
  {name: "DC Area Irish Music Group", description: "This is the group for people who love listening to Irish music and dancing to it. We will have events that serve food and are social for people to meet each other", member_label: nil, location: "Chantilly, VA", owner_id: 1},
  {name: "Maricopa County Mexican Food Lovers", description: "This group is for people who love Mexican food and live in the Valley of the Sun. We will be having weekly meetups where people can vote on where to go next. Please RSVP at least two days before the meetup to reserve your seat.", member_label: nil, location: "Chandler, AZ", owner_id: 1},
  {name: "San Francisco Austro-Bavarian Language and Beer Group", description: "We speak Austro-Bavarian (all dialects welcome) over beer at various venues in San Francisco", member_label: "", location: "San Francisco, CA", owner_id: 1},
  {name: "San Francisco Feminist Literature Group", description: "This group will study the evolution and effect of beauty standards in Victorian and Continental literature in the 19th century.", member_label: nil, location: "San Francisco, CA", owner_id: 7}
])
Event.create!([
  {title: "Samuel Clemens Discussion", date_time: "2023-10-28 20:00:00", duration: 60.0, description: "We'll talk about Samuel Clemens's books in the garden of the Presidio and drink some tea", online: "no", venue: "Presidio", group_id: 7},
  {title: "New York City-based movies", date_time: "2022-11-10 05:23:00", duration: 90.0, description: "We'll be discussing movies that take place in New York City and the rest of the tri-state area. Jersey-ites, rejoice!", online: "no", venue: "Stanley Park by the tree", group_id: 9},
  {title: "Detroit Style Pizza Showdown", date_time: "2022-10-06 23:57:00", duration: 60.0, description: "We're going to taste test three pizza places: Tony's Pizza Napoletana, Pizza Squared, and Square Pizza Guys. Let's see which one you like best!!!", online: "no", venue: "Moscone Center West", group_id: 2},
  {title: "Monthly Planning Meeting", date_time: "2022-11-12 02:04:00", duration: 60.0, description: "Our monthly planning meeting where we plan the next events and figure out fundraisers. At every meeting, we vote on where we hold the next meeting. This month our meeting will be at Chico's Pizza in SOMA.", online: "no", venue: "Chico's Pizza", group_id: 2},
  {title: "Battle of Middle Earth", date_time: "2022-11-28 02:07:00", duration: 90.0, description: "Battle of Middle Earth! 90 yards of yarn, 90 minutes. Who will win, the orcs or the elves? Pick your team and come in an outfit that matches your team. Winner gets more yarn and a gift certificate to Bennigan's!", online: "no", venue: "Atelier", group_id: 1},
  {title: "Canadian Actors Secret Meeting", date_time: "2022-12-10 20:17:00", duration: 60.0, description: "If you are a Canadian member of SAG, you are welcome to this top-secret gathering. text me to get the secret location.", online: "no", venue: "Secret location", group_id: 9},
  {title: "Scary Funny movies", date_time: "2022-12-08 20:14:00", duration: 90.0, description: "We'll be meeting up at the Indigo bookstore downtown to talk about scary funny movies, like Scary Movie for exaxmple.", online: "no", venue: "Downtown Indigo bookstore in Vancouver", group_id: 9},
  {title: "1980's Scifi movie meetup", date_time: "2022-12-19 01:48:00", duration: 90.0, description: "We'll be meeting up at the Indigo bookstore downtown to talk about scifi movies from the 1980's, think Terminator and Alien", online: "no", venue: "Downtown Indigo bookstore in Vancouver", group_id: 9},
  {title: "Windows 3.1 vs. Windows for Workgroups", date_time: "2022-12-08 05:07:00", duration: 60.0, description: "We compare the functionality of these two. Despite the small version difference (3.1 vs. 3.11) there are some important differences", online: "no", venue: "San Francisco Public LIbrary, Merced Branch", group_id: 3},
  {title: "Connecting Win3.1x to the Web", date_time: "2022-12-19 19:14:00", duration: 90.0, description: "Let's get IE3.0 and Netscape 3.0 running on Windows for Workgroups! Come and bring your computer and we'll see how much web browsing we can do on our beloved machines", online: "yes", venue: "", group_id: 3},
  {title: "File Manager vs. MS-DOS Shell", date_time: "2022-12-12 01:56:00", duration: 60.0, description: "Come learn about File Manager vs. MS-DOS Shell, and compare it to other file managers like XTreeGold, Midnight Commander, and MacOS's Finder", online: "yes", venue: "", group_id: 3},
  {title: "Redondo Beach Meet n' Greet", date_time: "2023-01-25 00:55:00", duration: 60.0, description: "We'll be meeting up at Sea Level Restaurant to meet fellow dentites.", online: "no", venue: "Sea Level Restaurant", group_id: 13},
  {title: "Torrance Dentists Hangout", date_time: "2023-02-28 01:45:00", duration: 60.0, description: "We're going to get some nice dinner at Tender Greens in Torrance", online: "no", venue: "Torrance Tender Greens", group_id: 13},
  {title: "Bavarian Pretzel Fair", date_time: "2023-02-18 01:00:00", duration: 90.0, description: "Today we'll gather at Patricia's Green and share Bavarian Pretzels", online: "no", venue: "Patricia's Green", group_id: 17},
  {title: "West Coast Literature of the late 20th century", date_time: "2023-05-15 01:18:00", duration: 60.0, description: "Let's talk about literature from the late 20th century (1980's-1990's)", online: "no", venue: "Merced Branch SF Library", group_id: 7},
  {title: "New Movie Thursday at the Metreon", date_time: "2023-05-23 05:19:00", duration: 120.0, description: "We'll vote on what movie to watch next week", online: "no", venue: "Metreon", group_id: 8}
])
