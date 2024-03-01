# bot_HOLY

Discord Bot used for stocking all favorite music in a list then you can searching for it on youtube

## How to install

- git clone https://github.com/marcdevi/bot_HOLY

> When it is done, create a config file in the base directory with these fields inside:
>
> > ```
> > {
> >   "token": "Your Bot Token Here",
> >   "clientId": "Your Bot Application ID Here",
> >   "guildId": "The Guild Id, you can get it by right clicking the guild icon while being in developer mode"
> > }
> > ```

- npm i to install dependencies
- node deployCommands.js to register your commands in the guild
- node index.js to launch the Bot

## How to add stuff

- Commands folder -> Create new commands inside subfolders, each must have a data & execute
- Events folder -> You can add new events here, no need for subfolders

## Possible commands on the bot 
- /song_search : params -> song (song title) 
                 description -> get song video on youtube by song title
-/add_music    : params -> title, artist, mood (how you feel)
                 description -> stock user favorit song on the bot 
-/list_music   : params -> None
                 description -> Get all user liste of favorit song
-/user_info    : params -> None
                 description -> Get all informations about the user connected
