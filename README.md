# Animal-Database
Animal Database is an Electron based application that holds multiple animal entries where a user can learn facts about a specific animal. The application is designed so that the user is able to enter in new animals into the application to grow the database of animals. There are multiple pages of the application:
- **Home:** the landing page of the application
- **Stats:** this page shows different stats like the population of the database, a geographic map displaying the number of animal in that region based on the total entries in the database, and three pie charts displaying a representation of the database based on the different categories (Diet, Class, Status)
- **Add:** this page allows the user to add a new animal entry to the database by entering in the different data required
- **Remove:** allows the user to remove an animal entry from the database
- **Edit:** allows the user to make changes to an animal entry (accessed through an animal's page)
- **Search:** allows the user to search through the database via two methods (by name or by continent)
- **Display:** displays the total list of animals that are in the database

This is one of my larger projects based on an idea I got while watching the latest BBC wildlife documentary ("Seven Worlds, One Planet") voiced by David Attenborough. The basic idea was having an application that displayed where in the world a specific animal lives. My first attempt was a console/terminal based Python application that had similar functionality as this application. My second attempt got me to create a GUI version of the first version. Finally this version was created because I wanted something that looked clean, modern and just something that looked better than the GUI in Python.

This project got me to learn new languages: Javascript, CSS, HTML; work with the Electron Framework and learn to use Google's Chart Library. Because the orginial version is written in Python, I needed a way for me to connect the Javascript with Python, so I learned the basics of the Flask Framework (to setup the Python code as the server-side of the application) and learned how to use Fetch in Javascript (to send and request data from the client-side to the server-side). The use of Fetch also  exposed me to the concepts of using "await" and "async" function, this gave me a better understanding of how instructions are run in js with and without using "await".

**Made using Electron, need to install Electron as dev dependency and make changes to package.json so "main.js" is the Main**

**"node-fetch" and "python-shell" packages was used, install as dev dependency**

Concepts/Skills Applied:
- Flask Framework
- Google's Chart Library
- Fetch in Javascript
- "await", "async" function and Promise

Created: June - July 2020
