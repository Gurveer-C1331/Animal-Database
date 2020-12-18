# Animal-Database
Animal Database is an Electron-based application that holds multiple animal entries where a user can learn facts about a specific animal. The application is designed to allow the user to grow the database by adding new animal entries. There are multiple pages of the application:
- **Home:** the landing page of the application
- **Stats:** displaying different stats like the population of the database, a geographic map displaying the number of animals in a specific region, and three pie charts displaying a representation of the database based on the different categories (Diet, Class, Status)
- **Add:** allows the user to add new animal entries to the database by entering in the different data required
- **Remove:** allows the user to remove an animal entry from the database
- **Edit:** allows the user to make changes to an animal entry (accessed through an animal's page)
- **Search:** allows the user to search through the database via two methods (by name or by continent)
- **Display:** displays the total list of animals in the database

This is one of my larger projects based on an idea I got while watching a BBC wildlife documentary ("Seven Worlds, One Planet" voiced by David Attenborough). The basic idea was to have an application that displayed where in the world a specific animal lives. My first attempt was a console-based Python application that had similar functionality as this application. My second attempt got me to create a GUI version of the first application. Finally, this version was created because I wanted something that looked clean, modern and just something that looked better than the GUI in Python.

This project got me to learn new languages like Javascript, CSS, HTML. Additionally, I learned to work with the Electron Framework and Google's Chart Library. Along the way, I have created multiple smaller projects to apply the new skills I have learnt (Colour-Selector and Map-Value). Because the original version is written in Python, I needed a way to connect the Javascript with Python. So I learned the basics of the Flask Framework (to set up the Python code as the server-side of the application) and learned how to use Fetch in Javascript (to send and request data from the client-side to the server-side). Using Fetch allowed me to learn the concepts of using the "await" and "async" functions. This gave me a better understanding of the difference "await" makes to how code is run in JavaScript.

**Made using Electron, need to install Electron as dev dependency and make changes to package.json so "main.js" is the Main**

**"node-fetch" and "python-shell" packages were used and installed as dev dependency**

Concepts/Skills Applied:
- Flask Framework
- Google's Chart Library
- Fetch in Javascript
- "await", "async" function and Promise

Created: June - July 2020
