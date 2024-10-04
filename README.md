# ExoReact-Nasa_Space_Apps
ExoReact-Nasa_Space_Apps

## Setup frontend:

```bash
cd frontend
npm install
npm start
```
## Setup backend:

```bash
cd backend
npm install
# Then create a .env file in the backend folder and add the following:
DB_PASSWORD="your_postgres_password"
# Then run the following commands:
nodemon server
```


## Github Repo Collaboratoration:


```bash
git checkout -b branchname  #first create your own branch(once)
git push --set-upstream origin branchname  #push your branch to github(once)
git add .
git commit -m "message"
git push -u origin branchname   
# go to github website repo and create a pull request
    
# when u open project after a long time, first do these commands
git fetch origin main
git pull origin main
```
To Open md files in vscode - `Ctrl + Shift + V`




## For firebase
    
    ```bash
    cd frontend
    npm install -g firebase-tools
    firebase login
    firebase init

    npm run build
    firebase deploy
    ```
