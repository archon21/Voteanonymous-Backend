#Voteanonymous Backend

*archon216 --- Ryan Wetmore*

##CREDITS

`THIS PROJECT USES THE JAVASCRIPT BLOCKCHAIN TAUGHT IN THE UDEMY COURSE` Build a Blockchain and a Cryptocurrency from Scratch BY *Dvid Katz* `Thank you for giving me an introduction into the world of block chain`

`THANKS FOR STOPING BY!`

*Backend for Voteanonymous*

##Misson

This is a solo Project to make voting app using react native in an Expo enviroment that will allow users to securely make votes by casting their ballot as a block on a block chain using javascript.

##Goals

The `proof of concept` was to make a simple interface where users can make an account and login with said account where they will have a blockchain wallet associated with their account. Users are also able to cast a simple ballot that will add a block to a block chain with their simple ballot as the data. The blockchain is hosted on a heroku app that the axios requests will hit as well as the database for the users.

The `mvp` for this project is to allow users to enter their voting district to show them their local, state and federal representitives as well as proposals being proposed at each of these levels as well. Also to simulate realistic and more complex ballots based on relavent voting information such as upcoming elections. Also to make the app visually apealing to the user.

The `stretch` goal for this project is to move the users information and blockchain wallet to a encrypted raspberry-pi device where it can be pluged into a device and log the user in allowing them to vote as well as hold their vote come election day. The other goal would be to change hosts to AWS for the blockchain backend.

#Versions

*Version 1.0*
  Created backend with postgres database to house users using the Sequelize ORM. Basic express endpoints for users to login and signup. Utilizing
  blockchain Classes in various other api endpoints as well as hosting the peer to peer server that will share the blockchain.
