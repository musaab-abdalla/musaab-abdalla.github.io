var data = '%data%';
// Bio section
var bio = {
    "name": "Musaab Abdalla",
    "role": "Web Developer",
    "contacts": {
        "mobile": "(919) 337-8292",
        "email": "saabana7@gmail.com",
        "github": "musaab-abdalla",
        "twitter": "saabana",
        "location": "Cary, NC, US"
    },
    "welcomeMessage": "Welcome to my resume website",
    // TODO: add other skills
    "skills": ["HTML", "CSS", "JS", "BOOTSTRAP", "WORDPRESS"],
    "biopic": "images/profile.jpg",
    "display": function() {
        // formattedContacts
        var formattedContacts = [
            HTMLmobile.replace(data, bio.contacts.mobile),
            HTMLemail.replace(data, bio.contacts.email),
            HTMLgithub.replace(data, bio.contacts.github),
            HTMLtwitter.replace(data, bio.contacts.twitter),
            HTMLlocation.replace(data, bio.contacts.location)
        ];

        // Displaying name and role
        $("#header").prepend(HTMLheaderRole.replace(data, bio.role));
        $("#header").prepend(HTMLheaderName.replace(data, bio.name));

        // Contacts in header and footer
        formattedContacts.forEach(function(contact) {
            $("#topContacts, #footerContacts").append(contact);
        });

        // Displaying profile pic
        $("#header").append(HTMLbioPic.replace(data, bio.biopic));
        // Displaying welcome message
        $("#header").append(HTMLwelcomeMsg.replace(data, bio.welcomeMessage));

        // Displaying skills
        if (bio.skills.length > 0) {
            $("#header").append(HTMLskillsStart);
            bio.skills.forEach(function(skill) {
                $("#skills").append(HTMLskills.replace(data, skill));
            });
        }
    }
};

// Education  section
var education = {
    "schools": [{
        "name": "University of Science and Technology",
        "location": "Omdurman, Sudan",
        "degree": "BA",
        "majors": ["Computer Science"],
        "dates": "1997",
        "url": "http://ust.edu.sd/en/index.php"
    }],

    "onlineCourses": [{
        "title": "Front-End Web Developer Nanodegree",
        "school": "Udacity",
        "dates": "2016",
        "url": "https://udacity.com"
    }],
    // Displaying educations - schools
    "display": function() {
        for (var i = 0; i < education.schools.length; i++) {
            var HTMLname = HTMLschoolName.replace(data, education.schools[i].name);
            var HTMLlocation = HTMLschoolLocation.replace(data, education.schools[i].location);
            var HTMLdates = HTMLschoolDates.replace(data, education.schools[i].dates);
            var HTMLdegree = HTMLschoolDegree.replace(data, education.schools[i].degree);
            var HTMLmajors = HTMLschoolMajor.replace(data, education.schools[i].majors);

            $("#education").append(HTMLschoolStart);
            $(".education-entry:last").append(HTMLname + HTMLdegree);
            $(".education-entry:last").append(HTMLdates);
            $(".education-entry:last").append(HTMLlocation);
            $(".education-entry:last").append(HTMLmajors);
        }
        // Online Courses
        $(".education-entry:last").append(HTMLonlineClasses);
        for (var online = 0; online < education.onlineCourses.length; online++) {
            var HTMLtitle = HTMLonlineTitle.replace(data, education.onlineCourses[online].title);
            HTMLtitle = HTMLtitle.replace("#", education.onlineCourses[online].url);
            var HTMLdate = HTMLonlineDates.replace(data, education.onlineCourses[online].dates);
            var HTMLurl = HTMLonlineURL.replace(data, education.onlineCourses[online].url);
            HTMLurl = HTMLurl.replace("#", education.onlineCourses[online].url);

            $(".education-entry:last").append(HTMLtitle);
            $(".education-entry:last").append(HTMLdate);
            $(".education-entry:last").append(HTMLurl);
        }
    }
};

// Work section
var work = {
    "jobs": [{
        "employer": "Dream Master Design",
        "title": "Web Developer",
        "location": "Cary, NC, US",
        "dates": "2009",
        "description": "The role is responsible for designing, coding and modifying websites, from layout to function and according to a client's specifications."
    }, {
        "employer": "Domino's Pizza",
        "title": "Delivery",
        "location": "Annapolis, MD, US",
        "dates": "2003-2005",
        "description": "Pack pizzas and related products and deliver to customer’s place. Collect cash and coupons from customers and receive signature with necessary verification of ID from credit card account."
    }, {
        "employer": "National Rental Car",
        "title": "Customer Service",
        "location": "Baltimore, MD, US",
        "dates": "2000-2002",
        "description": "Rent and return cars. Be responsible for timely and correct entries in our systems for maintenance, lost and found, reservations and cancellations."
    }]
    };
    work.display = function() {
        for (var job = 0; job < work.jobs.length; job++) {
            var jobEmployer = HTMLworkEmployer.replace(data, work.jobs[job].employer);
            var jobTitle = HTMLworkTitle.replace(data, work.jobs[job].title);
            var jobDates = HTMLworkDates.replace(data, work.jobs[job].dates);
            var jobLocation = HTMLworkLocation.replace(data, work.jobs[job].location);
            var jobDescription = HTMLworkDescription.replace(data, work.jobs[job].description);
            $("#workExperience").append(HTMLworkStart);
            $(".work-entry:last").append(jobEmployer + jobTitle);
            $(".work-entry:last").append(jobLocation);
            $(".work-entry:last").append(jobDates);
            $(".work-entry:last").append(jobDescription);
        }
    };


// Projects section
var projects = {
    "projects": [{
        "title": "Portfolio Website",
        "dates": "2016",
        "description": "Developed a personal portfolio page using HTML, CSS, and the Bootstrap framework. The page is fully responsive and works on mobile, tablet, and desktop browsers.",
        "images": ["images/project.jpg", "images/project-2.jpg", "images/project-3.jpg"]
    }, {
        "title": "Health Max Training",
        "dates": "2015",
        "description": "Health Max Training, needed a methodical, yet creative approach to branding that would help take their brand and online presence to the next level.",
        "images": ["images/health-max.jpg", "images/health-max-2.jpg", "images/health-max-3.jpg"]
    }],
    "display": function() {
        for (var i = 0; i < projects.projects.length; i++) {
            var projectTitle = HTMLprojectTitle.replace(data, projects.projects[i].title);
            var projectDates = HTMLprojectDates.replace(data, projects.projects[i].dates);
            var projectDescription = HTMLprojectDescription.replace(data, projects.projects[i].description);
            var projectImages = [];

            for (var img = 0; img < projects.projects[i].images.length; img++) {
                projectImages[img] = HTMLprojectImage.replace(data, projects.projects[i].images[img]);
            }

            $("#projects").append(HTMLprojectStart);
            $(".project-entry:last").append(projectTitle);
            $(".project-entry:last").append(projectDates);
            $(".project-entry:last").append(projectDescription);

            for (var imgs = 0; imgs < projectImages.length; imgs++) {
                $(".project-entry:last").append(projectImages[imgs]);
            }
        }
    }
};

// internationalize name
function inName(name) {
    name = name.trim().split(" ");
    console.log(name);
    name[1] = name[1].toUpperCase() + name[0].slice(1).toUpperCase();
    return name[0] + " " + name[1];
}
// internationalizeButton
$("#main").append(internationalizeButton);

// Displaying sections
bio.display();
work.display();
projects.display();
education.display();

//Click locations
$(document).click(function(loc) {
    var x = loc.pageX;
    var y = loc.pageY;
    logClicks(x, y);
});

//Interactive Map
$("#mapDiv").append(googleMap);


// Inside definition of object:

// // define
// var object = {
//     "property name": "my property value"
//     display: function () {
//         // functions body
//     }
// };

// // call
// object.display();
// Or outside using dot notation:

// // define
// object.display = function() {
//     // functions body
// };

// // call
// object.display();
