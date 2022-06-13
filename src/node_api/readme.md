follow the steps bellow to run the api:

1. change to src/node_api directory
2. Install the dependencies:
    npm install
3. Run the server:
    npm run start
4. To run with nodemon install nodemon on your system and use the command bellow:
    npm run dev 
The api will be available at http://localhost:4000 with the follow endpoints:

   ## 1 - index = "/"
    ## 2 -  user = "/user"
    ##### - POST = "/user/register"
    ###### body : 
     <code>
     {
    "name": "Clayton Guimaraes Leite Pereira",
    "email": "cpereiramt@gmail.com",
    "password": "cl111100" } 
    </code>

    ##### - POST = "/user/authenticate"
    ###### body : 
   <code> 
   {
     "email": "cpereiramt@gmail.com",
    "password": "cl111100" } 
    </code>

    ##### - GET = "/user/current"
    ##### - GET = "/user/:id"
    ## 3 - project = "/project"
    ##### - POST = "/project/create"
     ###### body : 
    <code> 
     { "name": "project-x"} 
    </code>

    ##### - GET = "/project/getByUser"
    ##### - PUT = "/project/:id"

    ## 4 - task = "/task"
    ##### - POST = "/task/create"
    ###### body : 
     <code> {
"description": "task one ttt",
"projectID": 2
}</code>
   ##### - GET = "/task/getByProject"
    ##### - PUT = "/task/:id"
    ##### - PUT = "/task/finish/:id"
