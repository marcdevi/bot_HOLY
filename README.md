# bot_HOLY

Discord Bot designed for storing and managing your favorite music list and searching for them on YouTube.

## Contributors
- Imane lahrach 
- N'GBEHIN RIKE MARC DEVY
- OTCHOUMARE Kenneth
- QUENUM Maël

## How to install

# 1 Clone the repository:

- git clone https://github.com/marcdevi/bot_HOLY

# 2 Create a configuration file in the base directory with the following fields:

> When it is done, create a config file in the base directory with these fields inside:
>
> > ```
> > {
> >   "token": "Your Bot Token Here",
> >   "clientId": "Your Bot Application ID Here",
> >   "guildId": "The Guild Id, you can get it by right clicking the guild icon while being in developer mode"
> > }
> > ```
# 3 Install dependencies:
- npm i to install 

# 4 Register commands in the guild:
- node deployCommands.js

# 5 Launch the Bot:
- node index.js to launch the Bot

## How to add Commands

- Commands folder -> Create new commands inside subfolders, each must have a data & execute
- Events folder -> You can add new events here, no need for subfolders

## Available Commands

- /song_search:

Params: song (song title)
Description: Get a song video on YouTube by its title.

- /add_music:

Params: title, artist, mood (how you feel)
Description: Store a user's favorite song on the bot.

- /list_music:

Params: None
Description: Get a list of a user's favorite songs.

- /user_info:

Params: None
Description: Get all information about the connected user.
 
- /my_favorite_list:

Params: None
Description: Retrieve all favorite music from the database and search for their links and titles.
