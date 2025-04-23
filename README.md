# How to run this project on you local machine
1. Clone this project to your local machine
2. Generate SSL certificate and key with openSSL and add them to 'ssl folder' under this project
3. Set up Google OAuth for you project on https://console.developers.google.com/
4. Add frontend.env, server.env and nginx.conf to 'config folder' under this project
5. Run mysql on your local machine. Create a schema named fitness_helper using db.sql under the 'mysql folder'
6. Run 'docker compose up --build' from terminal
